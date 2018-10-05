var MAX_HOUSE_PAGE = 9;
var MAX_CHARACTERS_PAGE=43;


var total_characters = 0;
var total_houses = 0;
var characters = {};
var houses = {};



$(document).ready(function(){

  //houses
  for(var page=1; page<=MAX_HOUSE_PAGE; page++)
  {
    $.ajax({
    url: "https://anapioficeandfire.com/api/houses?page="+page+"&pageSize=50",
    dataType: "json",
    success: function( response ) {
        for(var i=0; i<response.length; i++)
        {
          var house = response[i];
          var name = house["name"];
          name = name.toLowerCase();
          var h_url = house["url"];
          houses[name] = h_url;
          total_houses++;
        }
      }
    });
  }

  for(var page=1; page<=MAX_CHARACTERS_PAGE; page++)
  {
    $.ajax({
    url: "https://anapioficeandfire.com/api/characters?page="+page+"&pageSize=50",
    dataType: "json",
    success: function( response ) {
        for(var i=0; i<response.length; i++)
        {
          var character = response[i];
          var c_url = character["url"];
          var name = character["name"];
          if(name==="")
          {
            aliases = character["aliases"];
            for(var j=0; j<aliases.length; j++)
            {
              var alias = aliases[j];
              alias = alias.toLowerCase();
              characters[alias] = c_url;
              //console.log(alias+"-->"+c_url);
            }
          }
          else
          {
            name = name.toLowerCase();
            characters[name] = c_url;
            //console.log(name+"-->"+c_url);
          }
          total_characters++;
        }
      }
    });
  }


  $("#search_house").click(function(){

    var house_name = $("#house_name").val();
    house_name = house_name.toLowerCase();
    var house_url = houses[house_name];

    $.ajax({
    url: house_url,
    dataType: "json",
    success: function( response ) {

        var name = response["name"];
        var region = response["region"];
        var coatOfArms = response["coatOfArms"];
        var words = response["words"];
        $("#info_name").append(name);
        $("#info_region").append(region);
        $("#info_coatOfArms").append(coatOfArms);
        $("#info_words").append(words);
      }
    });

  });

});
