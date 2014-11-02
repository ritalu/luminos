var loadIdea=function() {
    var id = location.pathname.substring(location.pathname.length - 24, location.pathname.length);
  $.ajax({//initial ajax call 
    type:"GET",
    url:"../api/ideas/" +  id,
    success: function(data){
        renderIdea(data);
        loadProject(data.projects)
    }
  });
}

var renderIdea=function(data){
	var content = "";
	if (data == null) {
    }
    else {
        content =  data.name + 
                   '<div class="like">' + 
                    '<img src="../public/img/icon_like_red.png">' + data.likes.length + 
                   '</div>'
        $('.idea').children('.title').empty();
        $('.idea').children('.title').append(content);
        $('.idea').children('.desc').empty();
        $('.idea').children('.desc').append(data.description);

        $('.projects').children('.projectlink').children('.proj').children('.title').empty();
        $('.projects').children('.projectlink').children('.proj').children('.title').empty();


	}
}

var loadProject = function(data) {
  $.ajax({//initial ajax call 
    type:"GET",
    url:"../api/project/" +  data[0],
    success: function(d){
        renderProject(d);
    }
  });
}

var renderProject=function(data){
	var content = "";
	if (data == null) {
    }
    else {

        $('.projects').find('.proj').children('.title').empty();
        $('.projects').find('.proj').children('.title').append(data.name);
       // $('.projects').find('.proj').children('.desc').empty();
       // $('.projects').find('.proj').children('.desc').append(data.description);
	}
}
