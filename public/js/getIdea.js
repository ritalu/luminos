var loadIdea=function() {
    console.log("running load");
  $.ajax({//initial ajax call 
    type:"GET",
    url:"./api/getallideaswithuser",
    success: function(data){
        console.log(data);
        renderIdea(data);
    }
  });
}


var renderIdea=function(data){
  console.log("rendering");
	var content="";
	for (var i = 0; i < data.length; i++) {
		if (data[i] == null) {
      break;
    }
    else {
      content +=
        '<div class="title">'+
          data[i].name +
           ' <span class="user">'+
            ' <img src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png">' +
            data[i].username + '</span>' +
         '</div>' +
         '<div class="desc">' +
            '<div class="text">' + data[i].description + '</div>' +
            '<a href="/"><div class="readmore">Read more</div></a>' +
            '<div class="actions">' +
                '<img src="../public/img/icon_like.png">' + data[i].likes.length +
                '<img src="../public/img/icon_project.png">' + data[i].projects.length +
                '<img src="../public/img/icon_comment.png">' + 'data4' + '</div>' +
          '</div>' +
         '</div>'
      };

      $('.idea-container').replaceWith(content);
    }
}

var loadProj=function() {
    console.log("running load");
  $.ajax({//initial ajax call 
    type:"GET",
    url:"./api/projects",
    success: function(data){
        console.log(data);
        renderProj(data);
    }
  });
}
()

var renderProj=function(data){
  console.log("rendering");
	var content="";
	for (var i = 0; i < data.length; i++) {
		if (data[i] == null) {
      break;
    }
    else {
      content +=
       '<div class="idea-container">' +
        '<div class="title">'+
          data[i].name +
           ' <span class="user">'+
            ' <img src="http://exmoorpet.com/wp-content/uploads/2012/08/cat.png">' +
            data[i].username + '</span>' +
         '</div>' +
         '<div class="desc">' +
            '<div class="text">' + data[i].description + '</div>' +
            '<a href="/"><div class="readmore">Read more</div></a>' +
            '<div class="actions">' +
                '<img src="../public/img/icon_like.png">' + data[i].likes.length +
                '<img src="../public/img/icon_project.png">' + data[i].projects.length +
                '<img src="../public/img/icon_comment.png">' + 'data4' + '</div>' +
          '</div>' +
         '</div>'
      };
        //Set inner html to nothing and do append.
      $('.idea-container').replaceWith(content);
    }
}
