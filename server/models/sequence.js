
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxVideoId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);