const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [25, "Max characters for tags is 25!"],
        required: [true, "Please enter a name"],
    }
})

module.exports = mongoose.model('Tag', TagSchema);