
  var hostname= 'https://18.236.9.61:3001/api/v1' // By aianlinb
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
    let inform;
    return fetch(`${hostname}/medical/clinic?type=nearby`, {
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
  signUp,signIn,getClinicNearBy
}