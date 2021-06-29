const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    "productName": { "type": String, "required": true },
    "durationOfLease": { "type": String, "required": true },
    "dateOfLease": { "type": Date },
    "leaseExpiry": { "type": Date },
    "costOfLease": { "type": Number }
});

module.exports = mongoose.model('Product', ProductSchema);