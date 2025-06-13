const mognoose = require("mongoose");
require("dotenv").config()
const dbConnect = async () => {
    try {
        await mognoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.error(error.message)
    }
}


module.exports = {dbConnect}