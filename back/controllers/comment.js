const { Post, User, Like, Comment} = require("../models");
const fs = require('fs');

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { postId: req.params.id } })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({where: { id: req.params.id}/*, include: 'user'*/})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.createComment = (req, res, next) => {
    const commentBody = req.body;
    Comment.create({
        /*...commentBody,*/
        userId: commentBody.userId,
        postId: req.params.id,
        content: commentBody.content,
        likes: 0
    })
        .then( () => res.status(201).json({ message: 'Commentaire créé !'}))
        .catch(error => res.status(400).json({ error }));

};

exports.modifyComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};
exports.likeComment = async (req, res, next) => { // Check if comment exists than check like state before adding or deleting like from database

    try{
        const findComment = await Comment.findOne({where: {id: req.params.id}});
        if(!findComment){ return res.status(404).json({ error: "Comment inexistant !"}) }

        const likeComment = await Like.findOne // Find Like in database
            ({where: {
                    userId: req.body.userId,
                    postId: req.params.id,
                    like: true}})
        /*.catch(error => {
               console.log(error)
               res.status(400).json({ error })
           })*/

        if (likeComment && req.body.like === false){ // if like exists in database and like request is false, delete it from db
            await deleteLike(req, res)
                .then(() =>  res.status(200).json({message: 'Like supprimé !' }))
        }
        else if(likeComment && req.body.like === true){// if like exists in database and like request is true, nothing is added to db
            return res.status(400).json({ error: 'Comment déjà liké !'})
        }
        else if(!likeComment && req.body.like === true) {// if like doesn't exist in database and like request is true, like is added to db
            await createLike(req, res)
                .then(() =>  res.status(200).json({message: 'Like ajouté' }))
        }
        else{
            return res.status(404).json({ error: 'Like inexistant !'})
        }
    }catch (error){
        console.log(error)
        return res.status(404).json({error: 'Requête invalide !'})
    }
}

async function deleteLike(req, res) { // Delete like from database
    try {
        const destroyLike = await Like.destroy({where: // Delete like from likes table in db
                {   userId: req.body.userId,
                    postId: req.params.id,
                    like: true}})
        const decrementLike = await Comment.increment({ likes: -1 }, {where: { id: req.params.id}}) // Decrement likes by 1 in Comment likes counter
        return destroyLike + decrementLike
    } catch (error){
        console.log(error)
        return res.status(400).json({ error })
    }

}

async function createLike(req, res) { // Create like from database
    try{
        const createLikeData = await Like.create({ // Create like in likes table in db
            like: true,
            userId: req.body.userId,
            postId: req.params.id
        })
        const incrementLike = Comment.increment({ likes: 1 }, {where: { id: req.params.id}}) // Increment likes by 1 in Comment likes counter
        return createLikeData + incrementLike

    }catch (error){
        console.log(error)
        return res.status(400).json({ error })
    }
}