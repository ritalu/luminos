var myKeyVals = { A1984 : 1, A9873 : 5, A1674 : 2, A8724 : 1, A3574 : 3, A1165 : 5 }
var formData = {name:"Pokemon Creator",description:"3D printer which can print all Pokemon."}; //Array

var createIdea=function() {
    console.log("create idea");
  $.ajax({//initial ajax call 
    type:"POST",
    url:"./api/ideas",
    data:formData,
    success: function(data){
        console.log(data);
	console.log("submit=1&name="+idea_name);
        displayResult(data);
    }
  });
}

var getFormContent = function() {
  
}

var displayResult = function (data) {
    console.log("final idea created!");
}