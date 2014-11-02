var loadIdea=function() {
    var id = location.pathname.substring(location.pathname.length - 24, location.pathname.length);
  $.ajax({//initial ajax call 
    type:"GET",
    url:"../api/ideas/" +  id,
    success: function(data){
        renderIdea(data);
        loadProjectForIdea(data.projects)
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

var loadProjectForIdea = function(data) {
  $.ajax({//initial ajax call 
    type:"GET",
    url:"../api/project/" +  data[0],
    success: function(d){
        renderProjectForIdea(d);
    }
  });
}

var renderProjectForIdea=function(data){
	var content = "";
	if (data == null) {
    }
    else {

        $('.projects').find('.proj').children('.title').empty();
        $('.projects').find('.proj').children('.title').append(data.name);
        $('.projects').find("a").attr("href", "../project/" + data._id);
       // $('.projects').find('.proj').children('.desc').empty();
       // $('.projects').find('.proj').children('.desc').append(data.description);
	}
}

var loadProject=function() {
    var id = location.pathname.substring(location.pathname.length - 24, location.pathname.length);
  $.ajax({//initial ajax call 
    type:"GET",
    url:"../api/project/" +  id,
    success: function(data){
        renderProject(data);
        //loadProject(data.projects)
    }
  });
}

var renderProject=function(data){
	var content = "";
	if (data == null) {
    }
    else {
        content =  data.name + 
                   '<div class="like">' + 
                    '<img src="../public/img/icon_like_red.png">' + data.likes.length + 
                   '</div>'
        $('.project').children('.title').empty();
        $('.project').children('.title').append(content);
        $('.project').children('.desc').empty();
        var status = "";
        if (data.completed == false) status = "In progress";
        else status = "Complete";
        content =  '<span>Status:</span>' + status + '<br>' + 
                    '<span>Inspired by:</span> <a href="../idea/' +  '">' + "this idea" + '</a><br>' + 
                    '<span>URL:</span> <a href="http://' + data.link + '">' + data.link + '</a><br>' +  
                    // <span>Platform:</span> android<br>
                    // <span>Category:</span> social media 
                    +'<br><br>'+
                   data.description;
        $('.project').children('.desc').append(content);

	}
}
