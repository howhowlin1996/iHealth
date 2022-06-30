const mysql = require('mysql2/promise');
const config= require('./config.js');
async function query(sql, params) {
  const db =config['configParams'];                   //get the database parameters
  const connection = await mysql.createConnection(db);
  let results;
  try{
    if(params===undefined) await connection.execute(sql);
    else  [results, ] = await connection.execute(sql, params);
   
  }
  catch(err){
 
    console.log(err);
    connection.end();

  }

  
  connection.end();
  return results;
}
async function transaction(sql) {
  const db =config['configParams'];                   //get the database parameters
  let results;
  const connection = await mysql.createConnection(db);
  results=await connection.query(sql);
  

  
  connection.end();
  return results;
  
}

module.exports = {
  query,
  transaction
}
