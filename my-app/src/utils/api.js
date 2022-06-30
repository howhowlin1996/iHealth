
  var hostname= 'https://18.236.9.61/api/v1' // By aianlinb

  const api={
    
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
   
    return fetch(`${hostname}/medical/clinic?type=nearby`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json())
   
  },
  getClinicPopular:async function getClinicPopular(){
    return fetch(`${hostname}/medical/clinic?type=popular`, {
      method: 'GET'
    }).then((response) => response.json())
   
  },

  getDrugStoreNearBy:async function getDrugStoreNearBy(data){
   
    return fetch(`${hostname}/medical/drugStore`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
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