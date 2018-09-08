const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    note: {
        type: String,
        required: true,
    },

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


const Note = mongoose.model('Note', NoteSchema);
module.exports = {Note};