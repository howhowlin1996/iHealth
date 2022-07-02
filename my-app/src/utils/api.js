
  //var hostname= 'https://18.236.9.61/api/v1'
 

  const api={
  hostname:'http://localhost:3001/api/v1', 
  redirect_uri:'http://localhost:3000/memberInform', 
  signIn:function signIn(data) {
    return fetch(`${this.hostname}/user/signIn?category=patient`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json());
  },

  signUp:function signUp(data){
    
    return fetch(`${this.hostname}/user/signUp?category=patient`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
  },

  getClinicNearBy:async function getClinicNearBy(data){
    console.log(data);
   
    return fetch(`${this.hostname}/medical/clinic?type=nearby`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  getClinicPopular:async function getClinicPopular(){
    return fetch(`${this.hostname}/medical/clinic?type=popular`, {
      method: 'GET'
    }).then((response) => response.json())
   
  },

  getDrugStoreNearBy:async function getDrugStoreNearBy(data){
   
    return fetch(`${this.hostname}/medical/drugStore`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  getLineNotify:async function getLineNotify(data){
    console.log(JSON.stringify(data));
    return fetch(`${this.hostname}/notify/accessToken`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  getIndividualInform:async function getIndividualInform(data){
    console.log(JSON.stringify(data),'herre');
    return fetch(`${this.hostname}/medical/individualInform`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  insertClinicReserve:async function insertClinicReserve(data){
    console.log(JSON.stringify(data),'herre');
    return fetch(`${this.hostname}/reserve/createClinic`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  getClinicReserve:async function getClinicReserve(clincId){
    console.log(clincId);
    return fetch(`${this.hostname}/reserve/getClinic?clinicId=`+clincId, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET'
    }).then((response) => response.json())
   
  },
  getIndividualTotal:async function getIndividualTotal(userId){
    console.log(userId);
    return fetch(`${this.hostname}/reserve/getIndividualTotal?userId=`+userId, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'GET'
    }).then((response) => response.json())
   
  }


}
  
/*function passwordVerification(email){
    return fetch(hostname+`/validation/passwordReset?email=${email}`
    ).then((response) => response.json());
  }  
function emailVerification(jwtToken){
    return fetch(`${this.hostname}/validation/verifyEmail`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      })
    }).then((response) => response.json());
  }*/



/*module.exports= {
  signUp,signIn,getClinicNearBy,getClinicPopular,getDrugStoreNearBy
}*/
export default api;