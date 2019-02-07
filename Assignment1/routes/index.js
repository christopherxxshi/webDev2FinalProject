"use strict";
const allTaskRoutes = require("./allTasks");
const getSingelTaskRoutes = require("./singelTask");
const createTaskRoutes = require("./createTask");
const changeTaskRoutes = require("./changeTask");
const updateTaskRoutes = require("./updateTask");
const addCommentRoutes = require("./addComment");
const deleteCommentRoutes = require("./deleteComment");
const express = require("express");
const router = express.Router();
try {

    // app.use("/api/tasks",(req,res)=>{

    // });

    router.get("/:id", getSingelTaskRoutes);

    router.put("/:id", changeTaskRoutes);
    
    router.patch("/:id", updateTaskRoutes);

    router.use("/", allTaskRoutes);

    router.post("/",createTaskRoutes);

    router.post("/:id/comments",addCommentRoutes)

    router.delete("/:taskId/:commentId",deleteCommentRoutes)

    router.use("*", (req, res) => {
        res.status(404).json({ "message": "Page not Found." });
    });



    module.exports = router

}
catch (e) {
    console.log(e);
}
