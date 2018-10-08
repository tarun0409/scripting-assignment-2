
var total_characters = 0;
var total_houses = 0;
var characters = {};
var houses = {};

var get_houses = function(page_no)
{
  $.ajax({
  url: "https://anapioficeandfire.com/api/houses?page="+page_no+"&pageSize=50",
  dataType: "json",
  success: function( response ) {
      if(response.length>0)
      {
        for(var i=0; i<response.length; i++)
        {
          var house = response[i];
          var name = house["name"];
          name = name.toLowerCase();
          var h_url = house["url"];
          houses[name] = h_url;
          total_houses++;
        }
        get_houses((page_no+1));
      }
    }
  });
}

var get_characters = function(page_no)
{
  $.ajax({
  url: "https://anapioficeandfire.com/api/characters?page="+page_no+"&pageSize=50",
  dataType: "json",
  success: function( response ) {
      if(response.length>0)
      {
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
            }
          }
          else
          {
            name = name.toLowerCase();
            characters[name] = c_url;
          }
          total_characters++;
        }
        get_characters((page_no+1));
      }
    }
  });
}


$(document).ready(function(){

  get_houses(1);
  //console.log(houses);
  get_characters(1);
  $("div.search_div").hide();
  $("input[name$='search_radio']").click(function() {
        var btn_value = $(this).val();
        if(btn_value==="search_house")
        {
          $("div.search_div").hide();
          $("#house_div").show();
        }
        else
        {
          $("div.search_div").hide();
          $("#char_div").show();
        }
    });

  $("#search_house").click(function(){

    var house_name = $("#house_name").val();
    console.log("\n\nHouse name requested : "+house_name+"\n\n");
    house_name = house_name.toLowerCase();
    var house_url = houses[house_name];
    console.log("\n\nhouse url : "+house_url+"\n\n");
    $.ajax({
    url: house_url,
    dataType: "json",
    success: function( response )
    {

        var name = response["name"];
        $("#house_string").empty();
        $("#house_string").append(name);
        var region = response["region"];
        $("#house_region").empty();
        $("#house_region").append(region);
        var coatOfArms = response["coatOfArms"];
        $("#house_sigil").empty();
        $("#house_sigil").append(coatOfArms);
        var words = response["words"];
        $("#house_words").empty();
        $("#house_words").append(words);
        var titles = response["titles"];
        $("#house_titles").empty();
        for(var i=0; i<titles.length; i++)
        {
          $("#house_titles").append(titles[i]);
          if(i!=(titles.length-1))
          {
            $("#house_titles").append(",");
          }
        }
        var seats = response["seats"];
        $("#house_seats").empty();
        for(var i=0; i<seats.length; i++)
        {
          $("#house_seats").append(seats[i]);
          if(i!=(seats.length-1))
          {
            $("#house_seats").append(",");
          }
        }
        var lord_url = response["currentLord"];
        $("#house_lord").empty();
        $.ajax({
          url: lord_url,
          dataType: "json",
          success: function(response)
          {
            $("#house_lord").append(response["name"]);
          }
        });
        var heir_url = response["heir"];
        $("#house_heir").empty();
        $.ajax({
          url: heir_url,
          dataType: "json",
          success: function(response)
          {
            $("#house_heir").append(response["name"]);
          }
        });
        var overlord_url = response["overlord"];
        $("#house_overlord").empty();
        $.ajax({
          url: overlord_url,
          dataType: "json",
          success: function(response)
          {
            $("#house_overlord").append(response["name"]);
          }
        });
        var founded = response["founded"];
        $("#house_founded").empty();
        $("#house_founded").append(founded);
        var founder_url = response["founder"];
        $("#house_founder").empty();
        $.ajax({
          url: founder_url,
          dataType: "json",
          success: function(response)
          {
            $("#house_founder").append(response["name"]);
          }
        });
        var weapons = response["ancestralWeapons"];
        $("#house_weapon").empty();
        for(var i=0; i<weapons.length; i++)
        {
          $("#house_weapon").append(weapons[i]);
          if(i!=(weapons.length-1))
          {
            $("#house_weapon").append(",");
          }
        }
        var cadetBranches = response["cadetBranches"];
        $("#house_cadet").empty();
        for(var i=0; i<cadetBranches.length; i++)
        {
          var cadetUrl = cadetBranches[i];
          $.ajax({
            url: cadetUrl,
            dataType: "json",
            success: function(response)
            {
              $("#house_cadet").append(response["name"]);
              if(i!=(cadetBranches.length-1))
              {
                $("#house_cadet").append(",");
              }
            }
          });
        }
        var swornMembers = response["swornMembers"];
        $("#house_sworn").empty();
        for(var i=0; i<swornMembers.length; i++)
        {
          var memberUrl = swornMembers[i];
          $.ajax({
            url: memberUrl,
            dataType: "json",
            success: function(response)
            {
              $("#house_sworn").append(response["name"]);
              if(i!=(swornMembers.length-1))
              {
                $("#house_sworn").append(",");
              }
            }
          });
        }
      }
    });

  });

});
