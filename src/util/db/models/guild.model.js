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

// server formatting: {_id: documentid (this is the global uptime and other stuff), status_channels: false (default config for status channels)}

const userSchema = new Schema({
    _id: reqString,
    servers: [{_id: {type:String, required: true}, status_channels: [], status_channels_enabled: false}],
    name: reqString,
    premium: 0
})

module.exports = mongoose.model("guild", userSchema)