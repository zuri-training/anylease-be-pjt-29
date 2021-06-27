const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_URI } = process.env;


//create the connection function
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (err) {
        console.error(err.message);
        
        //Exit with failure
        process.exit(1);
    }
}

module.exports = connectDB; 