const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URI = process.env.DB_URI + process.env.DB_NAME;
(async () => {
    try {
        await mongoose.connect(URI, {
        });
        console.log("Successfully connected to database!");
    } catch (error) {
        console.log("Unable to connect to Database!", error);
        process.exit();
    }
})();