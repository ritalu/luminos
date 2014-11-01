var load=function(date, number, username) {
  $.ajax({//initial ajax call 
    type:"GET",
    url:"./api/ideas",
    success: function(data){
        console.log(data);
        render(data);
    }
  });
}


var render=function(data){
  console.log("rendering");
	var content="";
	for (var i = 0; i < data.length; i++) {
		if (data[i] == null) {
      break;
    }
    else {
      content +=
        '<div class="strip">'+
          '<div class="head">'+
          data[i].title+
           ' <div class="likes">'+
            '  <img src="../public/img/heart.png")"><span id="num_likes">'+
            data[i].likes +
            '</span></div>'+
          '</div>'+
          '<a target="_blank" href="'+
          data[i].link+
          '"><div class="pic">'+
           ' <img src="'+data[i].img+'">'+
          '</div></a>'+
          '<div class="more"><a href="/'+
          data[i].comic+
          '">By: '+
          data[i].comic+
          '</a></div>'+
        '</div>'
      };

      $('#content').append(content);
    }
		
}