
var createIdea=function() {
    console.log("create idea");
  $.ajax({//initial ajax call 
    type:"GET",
    url:"http://luminos.me/",
    success: function(data){
        console.log(data);
	console.log("submit=1&name="+idea_name);
        displayResult(data);
    }
  });
}

var getFormContent = function() {
  var formData = {name:"Pokemon Creator",description:"3D printer which can print all Pokemon."}; //Array
}

var displayResult = function (data) {
    console.log("final idea created!");
}