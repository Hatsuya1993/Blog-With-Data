const mongoose = require("mongoose");

const archiveDocs = new mongoose.Schema({
    archiveItems: {
        type: Array,
        default: []
    }
})

const Archive = mongoose.model("Archive", archiveDocs);

module.exports = Archive