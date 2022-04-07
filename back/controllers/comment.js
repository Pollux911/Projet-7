const { Post, User, Like, Comment} = require("../models");
const fs = require('fs');

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id } })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Post.findOne({where: { uuid: req.params.id}/*, include: 'user'*/})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.createComment = (req, res, next) => {
    const commentBody = req.body;
    Comment.create({
        ...commentBody
        /*userId: commentBody.userId,
        postId: commentBody.postId,
        content: commentBody.content*/
    })
        .then( () => res.status(201).json({ message: 'Commentaire créé !'}))
        .catch(error => res.status(400).json({ error }));

};