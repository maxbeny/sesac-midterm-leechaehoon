const express = require("express");
const app = express();
const PORT = 8080;
const { sequelize } = require("./models/index");
const todoRouter = require("./routes/todo");
const todoSeeder = require("./seeds/todoSeeder");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", todoRouter);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, async () => {
      console.log("데이터베이스 연결 성공");

      // 시드 데이터 추가
      try {
        await todoSeeder();
        console.log("시드 데이터 추가 완료");
      } catch (error) {
        console.error("시드 데이터 추가 실패:", error);
      }

      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("데이터베이스 연결 실패");
    console.error(err);
  });
