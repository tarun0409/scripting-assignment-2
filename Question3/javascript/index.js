
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
          var aliases = character["aliases"];
          var alias = aliases[0];
          var key = "";
          if(name==="")
          {
            key = key+alias;
          }
          else
          {
            key = key+name;
            key = key+" ";
            key = key+alias;
          }
          key = key.toLowerCase();
          characters[key] = c_url;
          // if(name==="")
          // {
          //   aliases = character["aliases"];
          //   for(var j=0; j<aliases.length; j++)
          //   {
          //     var alias = aliases[j];
          //     alias = alias.toLowerCase();
          //     if(alias in characters)
          //     {
          //       characters[alias].push(c_url);
          //     }
          //     else
          //     {
          //       characters[alias] = [];
          //       characters[alias].push(c_url);
          //     }
          //   }
          // }
          // else
          // {
          //   name = name.toLowerCase();
          //   if(name in characters)
          //   {
          //     characters[name].push(c_url);
          //   }
          //   else
          //   {
          //     characters[name] = [];
          //     characters[name].push(c_url);
          //   }
          // }
          total_characters++;
        }
        get_characters((page_no+1));
      }
    }
  });
}

var display_char_data = function(character_url)
{
  $("#search_urls").empty();
  $.ajax({
    url:character_url,
    dataType: "json",
    success: function(response)
    {
      var name = response["name"];
      $("#char_string").empty();
      $("#char_string").append(name);
      $("#char_string_div").show();
      var gender = response["gender"];
      $("#char_gender").empty();
      $("#char_gender").append(gender);
      $("#char_gender_div").show();
      var culture = response["culture"];
      $("#char_culture").empty();
      $("#char_culture").append(culture);
      $("#char_culture_div").show();
      var born = response["born"];
      $("#char_born").empty();
      $("#char_born").append(born);
      $("#char_born_div").show();
      var died = response["died"];
      $("#char_died").empty();
      $("#char_died").append(died);
      $("#char_died_div").show();
      var titles = response["titles"];
      $("#char_titles").empty();
      for(var i=0; i<titles.length; i++)
      {
        if(i==0)
        {
          $("#char_titles_div").show();
        }
        $("#char_titles").append(titles[i]);
        if(i!=(titles.length-1))
        {
          $("#char_titless").append(",");
        }
      }
      var aliases = response["aliases"];
      $("#char_aliases").empty();
      for(var i=0; i<aliases.length; i++)
      {
        if(i==0)
        {
          $("#char_aliases_div").show();
        }
        $("#char_aliases").append(aliases[i]);
        if(i!=(aliases.length-1))
        {
          $("#char_aliases").append(",");
        }
      }
      var allegiances = response["allegiances"];
      $("#char_allegiances").empty();
      for(var i=0; i<allegiances.length; i++)
      {
        if(i==0)
        {
          $("#char_allegiances_div").show();
        }
        var memberUrl = allegiances[i];
        $.ajax({
          url: memberUrl,
          dataType: "json",
          success: function(response)
          {
            $("#char_allegiances").append(response["name"]);
            if(i!=(allegiances.length-1))
            {
              $("#char_allegiances").append(",");
            }
          }
        });
      }
    }
  });
}

var display_house_data = function(house_full_name)
{
  var house_url = houses[house_full_name];
  $("#search_urls").empty();
  $.ajax({
  url: house_url,
  dataType: "json",
  success: function( response )
  {
    var name = response["name"];
    $("#house_string").empty();
    $("#house_string").append(name);
    $("#house_string_div").show();
    var region = response["region"];
    $("#house_region").empty();
    $("#house_region").append(region);
    $("#house_region_div").show();
    var coatOfArms = response["coatOfArms"];
    $("#house_sigil").empty();
    $("#house_sigil").append(coatOfArms);
    $("#house_sigil_div").show();
    var words = response["words"];
    $("#house_words").empty();
    $("#house_words").append(words);
    $("#house_words_div").show();
    var titles = response["titles"];
    $("#house_titles").empty();
    for(var i=0; i<titles.length; i++)
    {
      if(i==0)
      {
        $("#house_titles_div").show();
      }
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
      if(i==0)
      {
        $("#house_seats_div").show();
      }
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
        $("#house_lord_div").show();
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
        $("#house_heir_div").show();
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
        $("#house_overlord_div").show();
        $("#house_overlord").append(response["name"]);
      }
    });
    var founded = response["founded"];
    $("#house_founded").empty();
    $("#house_founded").append(founded);
    $("#house_founded_div").show();
    var founder_url = response["founder"];
    $("#house_founder").empty();
    $.ajax({
      url: founder_url,
      dataType: "json",
      success: function(response)
      {
        $("#house_founder_div").show();
        $("#house_founder").append(response["name"]);
      }
    });
    var weapons = response["ancestralWeapons"];
    $("#house_weapon").empty();
    for(var i=0; i<weapons.length; i++)
    {
      if(i==0)
      {
        $("#house_weapon_div").show();
      }
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
      if(i==0)
      {
        $("#house_cadet_div").show();
      }
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
      if(i==0)
      {
        $("#house_sworn_div").show();
      }
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

}


$(document).ready(function(){

  get_houses(1);
  get_characters(1);
  $("div.search_div").hide();
  $("div.house_display").hide();
  $("div.char_display").hide();
  $("input[name$='search_radio']").click(function() {
        var btn_value = $(this).val();
        $("div.house_display").hide();
        $("div.char_display").hide();
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


  $("#search_char").click(function(){
    $("div.char_display").hide();
    var char_name = $("#char_name").val();
    char_name = char_name.toLowerCase();
    console.log("char_name received=="+char_name);
    for(ch in characters)
    {
      console.log("ch=="+ch);
      if(!characters.hasOwnProperty(ch))
      {
        continue;
      }
      if(ch.indexOf(char_name)>-1)
      {
        var su = document.getElementById("search_urls");
        var div_node = document.createElement("div");
        div_node.setAttribute("class","row");
        var btn = document.createElement("button");
        btn.setAttribute("class","search_result_button");
        var char_url = characters[ch];
        var func_str = "display_char_data('"+char_url+"')";
        btn.setAttribute("onclick",func_str);
        var buttonText = document.createTextNode(ch);
        btn.appendChild(buttonText);
        div_node.appendChild(btn);
        su.appendChild(div_node);
      }
    }

  });
  $("#search_house").click(function(){
    $("div.house_display").hide();
    var house_name = $("#house_name").val();
    house_name = house_name.toLowerCase();
    for(house in houses)
    {
      if(!houses.hasOwnProperty(house))
      {
        continue;
      }
      if(house.indexOf(house_name)>-1)
      {
        var su = document.getElementById("search_urls");
        var div_node = document.createElement("div");
        div_node.setAttribute("class","row");
        var btn = document.createElement("button");
        btn.setAttribute("class","search_result_button");
        var func_str = "display_house_data('"+house+"')";
        btn.setAttribute("onclick",func_str);
        var buttonText = document.createTextNode(house);
        btn.appendChild(buttonText);
        div_node.appendChild(btn);
        su.appendChild(div_node);
      }
    }

  });

});
