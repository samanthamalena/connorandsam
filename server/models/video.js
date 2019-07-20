const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    url: {type: String, required: true}
});

module.exports = mongoose.model('Video', videoSchema);