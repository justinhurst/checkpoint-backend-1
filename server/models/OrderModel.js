let mongoose = require("mongoose");
// i want to code a definition of what a vehicle looks like

const schema = new mongoose.Schema({
    orderDate: {
        type: String
    },
    orderTime: {
        type: String
    },
    amount: {
        type: String
    }
});

module.exports =  mongoose.model("Order", schema);