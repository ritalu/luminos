
var createIdea=function() {
    console.log("create idea");
  $.ajax({//initial ajax call 
    type:"POST",
    url:"./api/ideas",
    data:getFormContent(),
    success: function(data){
        console.log(data);
	console.log("submit=1&name="+idea_name);
        displayResult(data);
    }
  });
}

var getFormContent = function() {
  var id = document.getElementById("idea_name").value;
  var des = document.getElementById("description").value;
  var formData = {name:id,description:des}; //Array
}

var displayResult = function (data) {
    console.log("final idea created!");
}