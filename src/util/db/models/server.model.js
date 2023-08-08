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
    ip: reqString,
    version: reqString,
    online: Boolean,
    uptime: [],
    players_numbers: [],
    max_players: Number,
    online_players: Number
})

module.exports = mongoose.model("server", serverSchema)