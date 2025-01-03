const express = require("express");
const router = express.Router();
const controller = require("../controller/Ctodo");

router.get("/", controller.readAll);

router.get("/:id", controller.readOne);

router.post("/", controller.create);

router.patch("/:id", controller.update);

router.delete("/:id", controller.delete);

module.exports = router;
