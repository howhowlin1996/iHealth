const db = require('../../service/db.js'); 
const getInform=require('./getClinicInform')
async function setUp(){
    var createClinicTable ='CREATE TABLE IF NOT EXISTS clinic(id BIGINT NOT NULL, name VARCHAR(50), clinicType VARCHAR(50), medicalType VARCHAR(50),location VARCHAR(50),phoneNumber VARCHAR(50), address VARCHAR(100), position POINT, member Boolean,clickTime BIGINT,image VARCHAR(100),createDate DATE,PRIMARY KEY(id))'
    await db.query(createClinicTable);
    var createuserInformTable ='CREATE TABLE IF NOT EXISTS userInform(id BIGINT NOT NULL AUTO_INCREMENT, name  VARCHAR(50) NOT NULL,email  VARCHAR(100)NOT NULL,password VARCHAR(100) NOT NULL ,birthday  DATE NOT NULL,weight  INT NOT NULL,height  INT NOT NULL,gender VARCHAR(10) NOT NULL,medicalHistory VARCHAR(100) NOT NULL,allergy VARCHAR(200) NOT NULL,PRIMARY KEY(id),UNIQUE(email))'
    await db.query(createuserInformTable);
    var createDrugStoreQuery ='CREATE TABLE IF NOT EXISTS drugStore(id BIGINT NOT NULL  AUTO_INCREMENT, name VARCHAR(50) ,location VARCHAR(50),phoneNumber VARCHAR(50), address VARCHAR(100), position POINT, member Boolean,clickTime BIGINT,createDate DATE,insurance BOOLEAN NOT NULL,image VARCHAR(100),PRIMARY KEY(id),UNIQUE(address))'
    await db.query(createDrugStoreQuery);
}


setUp();
getInform.getClinic();
getInform.getDrugStore();