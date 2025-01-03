const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const id = req.body;

    const todos = await Todo.readAll({
      where: {
        title,
        done,
      },
      attributes: ["id", "title", "done"],
      raw: false,
    });

    success(res, todos, "투두 전체 목록 불러오기");
  } catch (err) {
    serverError(res, err);
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const { title, done } = req.body;

    const todo = await Todo.readOne({
      where: {
        title,
        done,
      },
      attributes: ["id", "title", "done"],
      raw: false,
    });

    success(res, todo, "투두 한개 불러오기");
  } catch (err) {
    serverError(res, err);
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const { title, done } = req.body;

    const todo = await Todo.create({
      title,
      done,
    });

    if (content && content.length > 0) {
      const contentData = content.map((item) => ({
        content: typeof item === "string" ? item : item.content,
        state: typeof item === "string" ? false : !!item.state,
      }));

      await TodoContent.bulkCreate(contentData);
    }

    success(res, todo, "Todo 생성 완료");
  } catch (err) {
    serverError(res, err);
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const { title, done } = req.body;

    const [updated] = await Todo.update(
      {
        id,
        title,
        done,
      },
      { where: { id } }
    );

    if (!updated) {
      return notFound(res, null, "Todo를 찾을 수 없습니다.");
    }

    if (contents) {
      const contentsArray = Array.isArray(contents) ? contents : [contents];

      for (const content of contentsArray) {
        const { id: contentId, content: text, state } = content;

        if (contentId) {
          await TodoContent.update(
            { content: text, state: state === "true" },
            { where: { id: contentId, todo_id: id } }
          );
        } else {
          await TodoContent.create({
            todo_id: id,
            content: text,
            state: state === "true",
          });
        }
      }
    }

    success(res, null, "Todo 업데이트 완료");
  } catch (err) {
    serverError(res, err);
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Received delete request for id:", id);

    const [deleted] = await Todo.update(
      { deleted: true, deleted_at: new Date() },
      { where: { id } }
    );

    if (!deleted) {
      console.log("Todo not found for id:", id);
      return notFound(res, null, "Todo를 찾을 수 없습니다.");
    }

    console.log("Todo deleted successfully");
    success(res, null, "Todo 삭제 완료");
  } catch (err) {
    console.error("Error deleting todo:", err);
    serverError(res, err);
  }
};
