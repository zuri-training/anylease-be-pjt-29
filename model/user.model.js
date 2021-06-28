const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    
    "firstName": { "type": String, "required": true },
    "lastName": { "type": String, "required": true },
    "location": {  "type": String },
    "email": {  "type": String  },
    "phoneNumber":{ "type": String }
    
});

module.exports = mongoose.model('User', UserSchema);