const dotenv = require('dotenv');
dotenv.config();


module.exports={
    PORT:process.env.PORT,
    MONGODBSTRING:process.env.MONGODBSTRING,
    SECRETKEY:process.env.SECRETKEY+""
}