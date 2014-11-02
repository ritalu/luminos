
var createIdea=function() {
    console.log("create idea");
  $.ajax({//initial ajax call 
    type:"POST",
    url:"./api/ideas",
    data:getFormContent(),
    success: function(data){
        console.log(data);
        //document.location.href='./ideas'
	window.location = "./ideas"
    }
  });
  window.location = "./ideas"
  document.location.href='./ideas'
}

var getFormContent = function() {
  var id = document.getElementById("idea_name").value;
  var des = document.getElementById("description").value;
  return {name:id,description:des}; //Array
}
