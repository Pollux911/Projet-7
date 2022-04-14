const {User, Post, Like, Comment} = require("../models");
const fs = require('fs');

/*Post.findAll({ // multiple include
    include: [
        {
            model : Comment,
            as: 'comments',
            include : [ "user"]
        },
        "user"
    ]
})*/


exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: {
            model: User,
            as: 'postLike',
            attributes: ['firstName', 'lastName'],
            through: {
                attributes: ['like']
            }}
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => {
            console.log(error)
            res.status(400).json({ error });
        })
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({where: { id: req.params.id},
        include: {
        model: User,
        as:'postLike',
        attributes: ['firstName', 'lastName'],
        through: {
            attributes: ['like']
        }}
    })
        .then(post => res.status(200).json(post))
        .catch(error => {
            console.log(error)
            res.status(404).json({ error });
        })
};


exports.createPost = (req, res, next) => {
    const { userId, ...postBody } = req.body;

    User.findOne({where: { id: userId }})
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: 'Utilisateur non trouvée !'
                })
            }
            console.log(user.id, 'ztdf')
            /*if (user.id !== req.auth.id) { //check auth token
                 return res.status(401).json({
                    error: 'Requête non autorisée !'
            })
            }*/
            Post.create({
                ...postBody,
                userId: user.id,
                likes: 0 })
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
            attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Post.update({uuid: req.params.uuid }, { ...postObject, uuid: req.params.uuid })
        .then(() => res.status(200).json({ message: 'Post modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne( {where: { id: req.params.id}})
        .then((post) => {
            if(!post) {
                return res.status(404).json({
                    error: 'Post non trouvée !'
                })
            }
            /*if (post.userId !== req.auth.userId ||  ) { // check auth of user
            return res.status(401).json({
                error: 'Requête non autorisée !'})
            }*/
            Post.destroy({where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch( error => res.status(500).json({ error }))
}




/*exports.deletePost = (req, res, next) => {
    Post.findOne( {where: { uuid: req.params.id}})
        .then(post => {
            const filename = post.attachement.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.findOne({where: { uuid: req.params.id}}).then(
                    (post) => {
                        if(!post) {
                            return res.status(404).json({
                                error: 'Post non trouvée !'
                            })
                        }
                        /!*if (post.userId !== req.auth.userId) { // check auth
                            return res.status(401).json({
                                error: new Error('Requête non autorisée !')
                            })
                        }*!/
                        Post.destroy({where: { uuid: req.params.id }})
                            .then(() => res.status(200).json({ message: 'Post supprimée !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                )
            })
        })
        .catch( error => res.status(500).json({ error }))
};*/


exports.likePost = (req, res, next) => {
    const likeBody = req.body;
    Post.findOne( {where: {id: req.params.id}})
        .then((post) => {
            if(!post) {
                return res.status(404).json({
                    error: 'Post non trouvée !'
                })
            }
            Like.findOne({where: {userId: req.body.userId, postId: req.params.id, like: true}})
                .then((like) => {
                    if(like && req.body.like === false) {
                        Like.destroy({where: { userId: req.body.userId, postId: req.params.id, like: true}})
                            .then(() => res.status(200).json({ message: 'Like Supprimé !' }))
                            .catch(error => res.status(400).json({ error }))
                    }
                    else if(!like && req.body.like === true) {
                        Like.create({
                            like: true,
                            userId: req.body.userId,
                            postId: req.params.id
                        })
                            .then(() =>  res.status(200).json({message: 'Like ajouté' }))
                            .catch((error) => {
                                res.status(400).json({ error })
                            })
                    }
                    else if(like && req.body.like === true){
                        res.status(400).json({ error: 'Post déjà liké !'})
                    }
                    else{
                        res.status(404).json({ error: 'Like inexistant !'})
                    }
                })
                .catch(error => res.status(405).json({ error }))
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error:'Requête invalide' })
        })
}



