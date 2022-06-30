
  var hostname= 'http://localhost:3001/api/v1' // By aianlinb
  function signIn(data) {
    return fetch(`${hostname}/user/signIn?category=patient`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json());
  }

  function signUp(data){
    
    return fetch(`${hostname}/user/signUp?category=patient`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
  }

  async function getClinicNearBy(data){
    console.log(data);
   
    return fetch(`${hostname}/medical/clinic?type=nearby`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  }
  async function getClinicPopular(){
    return fetch(`${hostname}/medical/clinic?type=popular`, {
      method: 'GET'
    }).then((response) => response.json())
   
  }

  async function getDrugStoreNearBy(data){
   
    return fetch(`${hostname}/medical/drugStore`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
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



module.exports={
  signUp,signIn,getClinicNearBy,getClinicPopular,getDrugStoreNearBy
}