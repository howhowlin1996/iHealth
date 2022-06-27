
  var hostname= 'api/v1' // By aianlinb
  function signin(data) {
    console.log(data)
    return fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST'
    }).then((response) => response.json());
  }
  
function passwordVerification(email){
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
  }

function signup(data){
  console.log(data)
  return fetch(`http://localhost:3001/${hostname}/user/signup?category=patient`, {
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST'
  }).then((response) => response.json())
}

module.exports={
  signup,signin
}