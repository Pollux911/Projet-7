const Sauce = require("../models/Sauce");
const fs = require('fs');


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked : [ ],
        usersDisliked : [ ]
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({_id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne( { _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.findOne({ _id: req.params.id}).then(
                    (sauce) => {
                        if(!sauce) {
                            return res.status(404).json({
                                error: new Error('Sauce non trouvée !')
                            })
                        }
                        if (sauce.userId !== req.auth.userId) {
                            return res.status(401).json({
                                error: new Error('Requête non autorisée !')
                            })
                        }
                        Sauce.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                )
            })
        })
        .catch( error => res.status(500).json({ error }))
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Sauce.updateOne({_id: req.params.id }, {$inc: { likes: 1 }, $push: { usersLiked: req.body.userId }})
                    .then(() => res.status(200).json({ message: 'Like modifié !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else if (req.body.like === -1 && !sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Sauce.updateOne({_id: req.params.id }, {$inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
                    .then(() => res.status(200).json({ message: 'Dislike modifié !'}))
                    .catch(error => res.status(400).json({ error }))
            }
            else if(req.body.like === 0 && sauce.usersLiked.includes(req.body.userId) && !sauce.usersDisliked.includes(req.body.userId)){
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Like retiré !'}))
                    .catch(error => res.status(400).json({ error }));
            }
            else if(req.body.like === 0 && !sauce.usersLiked.includes(req.body.userId) && sauce.usersDisliked.includes(req.body.userId)){
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: { usersDisliked: req.body.userId } })
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
}


/*exports.likeSauce = async (req, res, next) => {
    let alreadyLiked = false;
    let alreadyDisliked = false;
    await Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.usersLiked.includes(req.body.userId)){
                alreadyLiked = true;
            }
            if (sauce.usersDisliked.includes(req.body.userId)){
                alreadyDisliked = true;
            }
        })
        .catch(error => res.status(404).json({ error }))

    if (req.body.like === 1 && !alreadyLiked && !alreadyDisliked)/!*if thumbs up and userID isn't in any array (like or dislike)*!/
    {
        Sauce.updateOne({_id: req.params.id }, {$inc: { likes: 1 }, $push: { usersLiked: req.body.userId }})
            .then(() => res.status(200).json({ message: 'Like modifié !'}))
            .catch(error => res.status(400).json({ error }));

    } else if (req.body.like === -1 && !alreadyLiked && !alreadyDisliked /!*=== false*!/)/!*if thumbs down and userID isn't in any array (like or dislike)*!/
    {
        Sauce.updateOne({_id: req.params.id }, {$inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
            .then(() => res.status(200).json({ message: 'Dislike modifié !'}))
            .catch(error => res.status(400).json({ error }))

    } else if (req.body.like === 0 && alreadyLiked){
        Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: { usersLiked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'Like/Dislike modifié !'}))
            .catch(error => res.status(400).json({ error }));
    }
    else if (req.body.like === 0 && alreadyDisliked){
        Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: { usersDisliked: req.body.userId } })
            .then(() => res.status(200).json({ message: 'Like/Dislike modifié !'}))
            .catch(error => res.status(400).json({ error }));
    }
    else {
        return error => res.status(401).json({ error })
    }
}*/
