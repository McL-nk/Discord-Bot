const { Schema }  = require("mongoose")
const mongoose = require("mongoose")

const reqNum = {
    type: Number,
    required: true,
    default: 0
}

const reqString = {
    type: String,
    required: true
}
const reqBool = {
   type: Boolean,
   required: true,
   default: true
}
const falsereqBool = {
   type: Boolean,
   required: true,
   default: true
}



const serverSchema = new Schema({
    UUID: {type: String, required: false, default: ""},
    primary_server: {type: String, required: false, default: ""},
    ip: reqString,
    version: reqString,
    uptime: [],
    players_numbers: []
})

module.exports = mongoose.model("server", serverSchema)