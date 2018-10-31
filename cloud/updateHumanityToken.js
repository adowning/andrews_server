var jobName_update_humanity_token = "token";
var kue = require('kue-scheduler');
var Queue = kue.createQueue();
var axios = require('axios')

function setToken(token, done){
    var request = require('request');
    return request({
      method: 'PUT',
      url: Parse.serverURL + '/config',
      headers: {
        'X-Parse-Application-Id': Parse.applicationId,
        'X-Parse-Master-Key': Parse.masterKey
      },
      json: true,
      body: {
        params: { humanityToken: token }
      }
    })
    done()
}

async function getToken(job, done){
    const options = {
        client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
         client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
         grant_type: 'password',
         username: 'ash@andrewscarpetcleaning.com',
         password: 'sugarlips42'
     }

    return await axios.post('https://www.humanity.com/oauth2/token.php', options).then((response) =>{
        console.log(response)
        var token = response.data.access_token
        setToken(token, done)
    })
var r = await request({
  method: 'PUT',
  url: 'https://www.humanity.com/oauth2/token.php',
  headers: {
    'Content-Type': Parse.applicationId
  },
  json: true,
  body: 
    {
        client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
         client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
         grant_type: 'password',
         username: 'ash@andrewscarpetcleaning.com',
         password: 'sugarlips42'
     }
  
}).then(( response => {
    console.log(response)
}))
//     console.log('getToken fired')
//   Parse.Cloud.httpRequest({
//     method: 'POST',
//     url: 'https://www.humanity.com/oauth2/token.php',
//     params: {
//        client_id: '0cbaa9173943569cad4c0b8267981147bac0cf5d',
//         client_secret: 'be6a34d0830ab6fb3db837958d50faace249e0d1',
//         grant_type: 'password',
//         username: 'ash@andrewscarpetcleaning.com',
//         password: 'sugarlips42'
//     },
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(function(httpResponse) {
//       console.log(httpResponse.data)
//       console.log(httpResponse.text)
//     setToken(httpResponse, done)
// }).catch((err) =>{
//     console.log(err)
// })
     
}

function updateHumanityToken(){
    console.log('starting update job')
  Queue.clear(function(error, response) {
      var job = Queue
                  .createJob(jobName_update_humanity_token)
                  .priority('normal')
                  .removeOnComplete(false);
                  //change to 45
      Queue.every('28 minutes', job);
      Queue.process(jobName_update_humanity_token, getToken);
  });
}

exports.updateHumanityToken = updateHumanityToken;