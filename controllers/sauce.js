//Sauce controllers requirements, import Sauce schema and file system (native node module)
const Sauce = require('../models/Sauce.js');
const fs = require('fs');

//getSauces find all the existing sauces in DB and return them in a json object
exports.getSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

//getSauce find one existing sauce based on id comparison
exports.getSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
}

//createSauce allow authorised user to post his own sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Post saved successfully!' }))
        .catch( error => res.status(400).json({ error }));
}

//modifySauce allow user to update existing sauce created by himself.
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        //if file is updated
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Update successful'}))
        .catch(error => res.status(400).json({ error }));
}

//deleteSauce allows to remove a sauce create by a specified user
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id : req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({ message: 'Item successfully deleted' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({error}));
}

//manageLikes allow user to like and dislike sauces
exports.manageLikes = (req, res, next) => {
    switch (req.body.like) {
        //if like or dislike already exists, case 0: remove existing one
        case 0:
            Sauce.findOne({_id : req.params.id})
                .then(sauce => {
                        if (sauce.usersLiked.some(user => user === req.body.userId)) {
                            Sauce.updateOne({_id: req.params.id}, {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId }
                            })
                                .then(() => res.status(201).json({ message: 'Like removed' }))
                                .catch(error => res.status(400).json({ error }));
                        }
                        if (sauce.usersDisliked.some(user => user === req.body.userId)) {
                            Sauce.updateOne({_id: req.params.id}, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId }
                            })
                                .then(() => res.status(201).json({ message: 'Dislike removed' }))
                                .catch(error => res.status(400).json({ error }));
                        }
                    }
                )
                .catch(error => res.status(500).json({ error }));
            break;

        //if req.body.like == 1, then add a like and push userId in usersLiked array
        case 1:
            Sauce.updateOne({ _id : req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked : req.body.userId }
            })
                .then(()=> res.status(201).json({ message: 'Like successfully added' }))
                .catch(error => res.status(400).json({ error }));
            break;

        //if req.body.like == -1, then add a dislike and push userId in usersDisliked array
        case -1:
            Sauce.updateOne({ _id : req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked : req.body.userId }
            })
                .then(()=> res.status(201).json({ message: 'Dislike successfully added' }))
                .catch(error => res.status(400).json({ error }));
            break;

        default:
            return res.status(500).json({ message: 'Internal server error '});
    }
}





