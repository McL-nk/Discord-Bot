//Simple wait function sice javascript doesnt have a built in one
module.exports.wait = (s) => new Promise((resolve) => serTimeout(resolve, parseFloat(s.toString() + "000")));
