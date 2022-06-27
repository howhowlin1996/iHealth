// to decode environment parameters to variables
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});
const host=process.env.Host;
const user=process.env.User;
const password= process.env.Password;
const database=process.env.Database;
const port=process.env.DbPort;

const configParams={
    "host":host,
    "user":user,
    "password":password,
    "database":database,
    "port":port
}


module.exports= {
    configParams
}
