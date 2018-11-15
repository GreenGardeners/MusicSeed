const { Comment, validate } = require("../models/comment");
const { User } = require("../models/user");
const { Album } = require("../models/album");
const { Music } = require("../models/music");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
    // Find
    const comments = await Comment.find()
        .populate("user")
        .sort("time");

    // Response
    res.send(comments);
});

router.get("/:id", async (req, res) => {
    // Find
    const comment = await Comment.findById(req.params.id)
        .populate("user")
    if (!comment)
        return res
            .status(404)
            .send(`The comment with given ID(${req.params.id}) was not found.`);

    // Response
    res.send(comment);
});

/* Create */
router.post("/", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Set target
    let Target;
    if(req.body.comment_type === 1) Target = User;
    if(req.body.comment_type === 2) Target = Album;
    if(req.body.comment_type === 3) Target = Music;

    // Find target
    let object = await Target.findById(req.body.comment_to);
    if (!object)
        return res
            .status(404)
            .send(`The target with given ID(${req.body.comment_to}) was not found.`);

    // Make and Save
    let comment = new Comment(req.body);
    comment = await comment.save();

    // Comment_id save
    object.comment.push(comment._id);
    object = await object.save();

    // Response
    res.send(comment);
});

/* Update */
router.patch("/:id", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Find Music and Update
    const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Response
    res.send(comment);
});

/* Delete */
router.delete("/:id", async (req, res) => {
    // Find and Delete
    const comment = await Comment.findByIdAndDelete(req.params.id);

    // Response
    res.send(comment);
});

module.exports = router;