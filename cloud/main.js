
var axios = require('axios')
var updateHumanityToken = require('./updateHumanityToken.js');
updateHumanityToken.updateHumanityToken();

Parse.Cloud.define("test", async (request) => {
  return request
});

function getToken(){
  Parse.Config.get().then(function(config) {
    return config.get("humanityToken");
  }, function(error) {
console.log(error)
  });
}


Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  console.log('1')
  const user = request.object;
  response.success(request.object);

  // if (user.get("authData")) {
  //   response.success(request.object);
  // } else {
  //   response.error("Only oauth allow");
  // }s
});


function update_employee(params){
  if (!params.deviceId || !params.employeeId) {
    // return response.error({ message: "Need ids" });
    return "error"
  }
    var query = new Parse.Query("User");
    query.equalTo("objectId", params.employeeId).then(function(results) {
  return employee.save()
  })
  .catch(function(error) {
    console.log(error)
  });
// Parse.Cloud.useMasterKey();
  
  // var Employee = Parse.Object.extend("Employee");
  // var query = new Parse.Query(Employee);
  // query.get(params.employeeId).then(
  //   employee => {
  //     return employee.save()
  //   },
  //   error => {
  //     console.log(error)
  //   })
}


Parse.Cloud.define("clockIn", async (request) => {
  const empId = request.params.empId
  const token = request.params.token
  console.log(request)
  try {
    const data = await axios.get(`https://www.humanity.com/api/v2/timeclocks/status/${empId}/0?access_token=` + token)
    console.log(data)
    // if(data.data.data == "in"){
    // return "505"
    // }else{
    const data2 = await axios.post(`https://www.humanity.com/api/v2/employees/${empId}/clockin?access_token=` + token, {"access_token": token})
    console.log(data2.data.status)
    if(data2.data.status == 13){
     return "506"
      }else{
        var string = data2.data
        return update_employee(request.params)
        // return string
        // res.success({ data2 });
      }
    
  } catch (e) {
    console.log(e)
    return "507"
  }
});

Parse.Cloud.define("clockOut", async (request) => {
  const empId = request.params.empId
  const token = request.params.token
  console.log(empId)
  console.log(token)
  try {
    const data = await axios.get(`https://www.humanity.com/api/v2/timeclocks/status/${empId}/0?access_token=` + token)
    if(data.data.data == "out"){
      return "500"
    }else{
    const data2 = await axios.put(`https://www.humanity.com/api/v2/employees/${empId}/clockout?access_token=` + token, {"access_token": token})
    if(data2.data.status == 13){
      return "501"
      }else{
        var string = data2.data
        return string
        // res.success({ data2 });
      }
    }
  } catch (e) {
    console.log(e)
    return "503"
    // response.send(e)
  }
});

