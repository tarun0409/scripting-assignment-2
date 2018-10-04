//http://dynamic.xkcd.com/api-0/jsonp/comic/?callback=func
//http://dynamic.xkcd.com/api-0/jsonp/comic/1234?callback=func
var baseUrl = "http://dynamic.xkcd.com/api-0/jsonp/comic";
var maxId = 0;
var currId = 0;
$(document).ready(function(){

  $.ajax({
    url: baseUrl,
    dataType: "jsonp",
    success: function( response ) {
        console.log(response);
        $("#image").attr("src",response["img"]);
        currId = response["num"];
        maxId = currId;
    }

});

  $("#next").click(function(){

    if(currId<maxId)
    {
      var nextId = currId+1;
      var nextUrl = baseUrl+"/"+nextId;
      $.ajax({
        url: nextUrl,
        dataType: "jsonp",
        success: function( response ) {
            console.log(response);
            $("#image").attr("src",response["img"]);
            currId = response["num"];
          }
      });

    }

  });

  $("#prev").click(function(){

      if(currId>1)
      {
        var prevId = currId-1;
        var prevUrl = baseUrl+"/"+prevId;

        $.ajax({
          url: prevUrl,
          dataType: "jsonp",
          success: function( response ) {
              console.log(response);
              $("#image").attr("src",response["img"]);
              currId = response["num"];
          }

        });
      }

  });

  $("#first").click(function(){

      var firstUrl = baseUrl+"/"+1;

      $.ajax({
        url: firstUrl,
        dataType: "jsonp",
        success: function( response ) {
            console.log(response);
            $("#image").attr("src",response["img"]);
            currId = response["num"];
        }

    });

  });

  $("#last").click(function(){

      var lastUrl = baseUrl+"/"+maxId;

      $.ajax({
        url: lastUrl,
        dataType: "jsonp",
        success: function( response ) {
            console.log(response);
            $("#image").attr("src",response["img"]);
            currId = response["num"];
        }

    });

  });

  $("#random").click(function(){

      var randNum = Math.floor((Math.random() * maxId) + 1);
      var randomUrl = baseUrl+"/"+randNum;

      $.ajax({
        url: randomUrl,
        dataType: "jsonp",
        success: function( response ) {
            console.log(response);
            $("#image").attr("src",response["img"]);
            currId = response["num"];
        }

    });

  });

});
