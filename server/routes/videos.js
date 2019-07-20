var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Document = require('../models/video');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occurred',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Video.find()
    .populate('group')
    .then(videos => {
        res.status(200).json({
            message: 'Videos fetched successfully',
            videos: videos
        });
    })
    .catch(error => {
        returnError(res, error);
    });
}
);

router.post('/', (req, res, next) => {
    const maxVideoId =sequenceGenerator.nextId("videos");

    const video = new Video({
        id: maxVideoId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    video.save()
        .then(createdVideo => {
            res.status(201).json({
                message: 'Video added successfully',
                video: createdVideo
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Video.findOne({ id: req.param.id })
        .then(video => {
            video.name = req.body.name;
            video.description = req.body.description;
            video.url = req.body.url;
            
        Video.updateOne({ id: req.params.id }, video)
            .then(result => {
                res.status(204).json({
                    message: 'Video updated successfully'})
                })
                .catch(error => {
                    returnError(res, error);
                });
            })
        .catch(error => {
            res.status(500).json({
                message: 'Video not found.',
                error: {video: 'Video not found'}
            });
        });
    });

    router.delete("/:id", function (req, res, next) {

        video.findOne({ id: req.params.id}) 
           .then (video => {
               
                Video.deleteOne({ id: req.params.id }, video)
                .then(result => {
                    res.status(204).json({
                        message: 'Video deleted successfully'})
                })

                .catch(error => {
                    returnError(res, error);
                });
           })
           .catch(error => {
               res.status(500).json({ message: 'Video not found.',
                error: {video: 'Video not found'}
            });
           });
    });
           
    module.exports = router;
