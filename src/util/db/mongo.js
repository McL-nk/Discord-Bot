const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', true);
module.exports = async () => {
    await mongoose.connect('mongodb://bot:terrt565uiiuoojikjtghtxljxdslje5t9@US-MI1.SCHOST.US:25569/bamb?replicaSet=rs0&retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000 , 
        keepAlive: true
    }).catch(error => console.log(error));
    return mongoose
}