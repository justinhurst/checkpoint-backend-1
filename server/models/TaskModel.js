let mongoose = require("mongoose");
// i want to code a definition of what a vehicle looks like

const schema = new mongoose.Schema({
    task: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports =  mongoose.model("Task", schema);