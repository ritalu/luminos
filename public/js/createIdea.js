var myKeyVals = { A1984 : 1, A9873 : 5, A1674 : 2, A8724 : 1, A3574 : 3, A1165 : 5 }
var formData = {name:"ravi",age:"31"}; //Array

var createIdea=function() {
    console.log("create idea");
  $.ajax({//initial ajax call 
    type:"POST",
    url:"./api/ideas",
    data:"submit=1&name="+idea_name,
    success: function(data){
        console.log(data);
        displayResult(data);
    }
  });
}

var getFormContent = function() {
  
}

var displayResult = function (data) {
    console.log("final idea created!");
}