const { Schema }  = require("mongoose")

const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const{Types: {Long}} = mongoose
const reqNum = {
    type: Number,
    required: true,
    default: 0
}

const reqString = {
    type: String,
    required: true,
    default: " "
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

// server formatting: {_id: documentid (this is the global uptime and other stuff), status_channels: false (default config for status channels)}

const userSchema = new Schema({
    _id: reqString,
    server: {id: {type: String, required: true, default: " "}, status_channels: {players_online: {type: Long, required: true, default: 0}, server_online: {type: Long, required: true, default: 0}}},
    name: reqString,
    premium: 0
})

module.exports = mongoose.model("guild", userSchema)