const express = require("express");
const router = express.Router();
const {
    handleCreateUser,
    handleDeleteUserById,
    handleGetUserById,
    handleGetUsers,
    handleUpdateUserById,
} = require("../controllers/users");

router.route("/").get(handleGetUsers).post(handleCreateUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;
