const {User, Post, Like, Comment} = require("../models");
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['firstName', 'lastName', 'id']
            },

            {
                model: User,
                as: 'postLike',
                attributes: ['firstName', 'lastName', 'id' ],
                through: {
                    attributes: ['like']
                },
            },
            {
                model: Comment,
                as: 'postComments',
                attributes: ['content', 'createdAt', 'id'],
                include: {
                    model: User,
                    as:'commentUser',
                    attributes: ['firstName', 'lastName', 'id']
                }
            }
        ]

    })
        .then(posts => res.status(200).json(posts))
        .catch(error => {
            res.status(400).json({ error });
        })
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({where: { id: req.params.id},
        include: [
            {
                model: User,
                as:'postLike',
                attributes: ['firstName', 'lastName', 'id'],
                through: {
                    attributes: ['like']
            }
        },
            {
                model: Comment,
                as: 'postComments',
                attributes: ['content', 'createdAt', 'id'],
                include: {
                    model: User,
                    as:'commentUser',
                    attributes: ['firstName', 'lastName', 'id']
                }
            }
        ]
    })
        .then(post => res.status(200).json(post))
        .catch(error => {
            res.status(404).json({ error });
        })
};


exports.createPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } :   JSON.parse(req.body.post) ;
    User.findOne({where: { id: postObject.userId }})
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: 'Utilisateur non trouvée !'
                })
            }
            if (user.id !== req.auth.userId) { // check auth of user
                return res.status(401).json({
                    error: 'Requête non autorisée !'})
            }

            Post.create({
                ...postObject,
                userId: postObject.userId,
                likes: 0
            })
                .then( () => res.status(201).json({ message: 'Post créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch( error => {
            res.status(500).json({ error })}
        )
}



exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : JSON.parse(req.body.post);
    User.findOne({where: { id: postObject.userId }})
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: 'Utilisateur non trouvée !'
                })
            }
            if (user.id !== req.auth.userId && user.isAdmin !== true ) { // check user status
                return res.status(401).json({
                error: 'Requête non autorisée !'})
        }})
    Post.update({ ...postObject}, {where: { id: req.params.id }})
        .then(() => {
            res.status(200).json({ message: 'Post modifiée !'})
        })
        .catch(error => {
            res.status(400).json({ error });
        })
};

exports.deletePost = (req, res, next) => {
    Post.findOne( {where: { id: req.params.id}})
        .then(post => {
            if(!post) {
                return res.status(404).json({
                    error: 'Post non trouvée !'
                })
            }
            User.findOne({where: { id: req.body.user }})
                .then(userStored => {
                    if (!userStored) {
                        return res.status(404).json({
                            error: 'Utilisateur non trouvée !'
                        })
                    }
                    if (post.userId !== req.auth.userId && userStored.isAdmin !== true) { // check status of user
                        return res.status(401).json({
                            error: 'Requête non autorisée !'})
                    }
                })
            if(!post.attachment) { //If there is no image, delete post
                return Post.destroy({where: { id: req.params.id }})
                    .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                    .catch(error => res.status(400).json({ error }))
            }
            const filename = post.attachment.split('/images/')[1]; //Delete image from database
            fs.unlink(`images/${filename}`, () =>
            Post.destroy({where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                .catch(error => res.status(400).json({ error }))
            )
        })
        .catch( error => {
                res.status(500).json({error})
            }
        )
}

exports.likePost = async (req, res, next) => { // Check if post exists than check like state before adding or deleting like from database

    try{
        const findPost = await Post.findOne({where: {id: req.params.id}});
        if(!findPost){ return res.status(404).json({ error: "Post inexistant !"}) }

        const likePost = await Like.findOne // Find Like in database
            ({where: {
                userId: req.body.userId,
                postId: req.params.id,
                like: true}})
        .catch(error => {
               res.status(400).json({ error })
           })

        if (likePost && req.body.like === false){ // if like exists in database and like request is false, delete it from db
            await deleteLike(req, res)
                .then(() =>  res.status(200).json({message: 'Like supprimé !' }))
        }
        else if(likePost && req.body.like === true){// if like exists in database and like request is true, nothing is added to db
            return res.status(400).json({ error: 'Post déjà liké !'})
        }
        else if(!likePost && req.body.like === true) {// if like doesn't exist in database and like request is true, like is added to db
            await createLike(req, res)
                .then(() =>  res.status(200).json({message: 'Like ajouté' }))
        }
        else{
            return res.status(404).json({error: 'Like inexistant !'})}

    }catch (error){
        return res.status(500).json({error: 'Requête invalide !'})
    }
}

async function deleteLike(req, res) { // Delete like from database
    try {
        const destroyLike = await Like.destroy({where: // Delete like from likes table in db
                {   userId: req.body.userId,
                    postId: req.params.id,
                    like: true}})
        const decrementLike = await Post.increment({ likes: -1 }, {where: { id: req.params.id}}) // Decrement likes by 1 in Post likes counter
        return destroyLike + decrementLike
    } catch (error){
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
        const incrementLike = Post.increment({ likes: 1 }, {where: { id: req.params.id}}) // Increment likes by 1 in Post likes counter
        return createLikeData + incrementLike

    }catch (error){
        return res.status(400).json({ error })
    }
}