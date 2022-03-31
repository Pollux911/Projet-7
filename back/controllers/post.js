const { Post, User} = require("../models");
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({ include: 'user' })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ uuid: req.params.uuid})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};


exports.createPost = (req, res, next) => {
    const { userUuid, ...postBody } = req.body;

    User.findOne({where: { uuid: userUuid }})
        .then((user) => {
            if (!user) {
                console.log(' user 404 404')
                return res.status(404).json({
                    error: 'Utilisateur non trouvée !'
                })
            }
            /*if (user.id !== req.auth.id) { //check auth
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
    Post.findOne( {where: { uuid: req.params.id}})
        .then((post) => {
                if(!post) {
                    return res.status(404).json({
                        error: 'Post non trouvée !'
                    })
                }
            Post.destroy({where: { uuid: req.params.id }})
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

/*exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((sauce) => {
            if(req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Post.updateOne({_id: req.params.id }, {$inc: { likes: 1 }, $push: { usersLiked: req.body.userId }})
                    .then(() => res.status(200).json({ message: 'Like modifié !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else if (req.body.like === -1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Post.updateOne({_id: req.params.id }, {$inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
                    .then(() => res.status(200).json({ message: 'Dislike modifié !'}))
                    .catch(error => res.status(400).json({ error }))
            }
            else if(req.body.like === 0 && sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Post.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Like retiré !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else if(req.body.like === 0 && !sauce.usersLiked.includes(req.body.userId) && sauce.usersDisliked.includes(req.body.userId)){
                Post.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Dislike retiré !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else {
                console.log(req.body, 'la req')
                console.log(!sauce.usersLiked.includes(req.body.userId), 'allo');
                console.log(!sauce.usersDisliked.includes(req.body.userId), 'allui');
                return res.status(400).json({ error: 'Vous ne pouvez pas liker ou disliker plusieurs fois une sauce' })
            }
        })
        .catch(error => res.status(404).json({ error }))
}*/
