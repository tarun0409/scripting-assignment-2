
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
      if(name!=="")
      {
        $("#char_string").append(name);
        $("#char_string_div").show();
      }
      var gender = response["gender"];
      $("#char_gender").empty();
      if(gender!=="")
      {
        $("#char_gender").append(gender);
        $("#char_gender_div").show();
      }
      var culture = response["culture"];
      $("#char_culture").empty();
      if(culture!=="")
      {
        $("#char_culture").append(culture);
        $("#char_culture_div").show();
      }
      var born = response["born"];
      $("#char_born").empty();
      if(born!=="")
      {
        $("#char_born").append(born);
        $("#char_born_div").show();
      }
      var died = response["died"];
      $("#char_died").empty();
      if(died!=="")
      {
        $("#char_died").append(died);
        $("#char_died_div").show();
      }
      var titles = response["titles"];
      $("#char_titles").empty();
      for(var i=0; i<titles.length; i++)
      {
        if(i==0 && titles[i]!=="")
        {
          $("#char_titles_div").show();
        }
        if(titles[i]!=="")
        {
          $("#char_titles").append(titles[i]);
          $("#char_titles").append(" * ");
        }
      }
      var aliases = response["aliases"];
      $("#char_aliases").empty();
      for(var i=0; i<aliases.length; i++)
      {
        if(i==0 && aliases[i]!=="")
        {
          $("#char_aliases_div").show();
        }
        if(aliases[i]!=="")
        {
          $("#char_aliases").append(aliases[i]);
          $("#char_aliases").append(" * ");
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
            $("#char_allegiances").append(" * ");
          }
        });
      }
    }
  });
}

var display_house_data = function(house_url)
{
  $("#search_urls").empty();
  $.ajax({
  url: house_url,
  dataType: "json",
  success: function( response )
  {
    var name = response["name"];
    $("#house_string").empty();
    if(name!=="")
    {
      $("#house_string").append(name);
      $("#house_string_div").show();
    }
    var region = response["region"];
    $("#house_region").empty();
    if(region!=="")
    {
      $("#house_region").append(region);
      $("#house_region_div").show();
    }
    var coatOfArms = response["coatOfArms"];
    $("#house_sigil").empty();
    if(coatOfArms!=="")
    {
      $("#house_sigil").append(coatOfArms);
      $("#house_sigil_div").show();
    }
    var words = response["words"];
    $("#house_words").empty();
    if(words!=="")
    {
      $("#house_words").append(words);
      $("#house_words_div").show();
    }
    var titles = response["titles"];
    $("#house_titles").empty();
    for(var i=0; i<titles.length; i++)
    {
      if(i==0 && titles[0]!=="")
      {
        $("#house_titles_div").show();
      }
      if(titles[i]!=="")
      {
        $("#house_titles").append(titles[i]);
        $("#house_titles").append(" * ");
      }
    }
    var seats = response["seats"];
    $("#house_seats").empty();
    for(var i=0; i<seats.length; i++)
    {
      if(i==0 && seats[i]!=="")
      {
        $("#house_seats_div").show();
      };
      if(seats[i]!=="")
      {
        $("#house_seats").append(seats[i]);
        $("#house_seats").append(" * ");
      }
    }
    var lord_url = response["currentLord"];
    $("#house_lord").empty();
    $.ajax({
      url: lord_url,
      dataType: "json",
      success: function(response)
      {
        var lord_name = response["name"];
        if(lord_name!=="")
        {
          $("#house_lord_div").show();
          $("#house_lord").append(response["name"]);
        }
      }
    });
    var heir_url = response["heir"];
    $("#house_heir").empty();
    $.ajax({
      url: heir_url,
      dataType: "json",
      success: function(response)
      {
        var heir_name = response["name"];
        if(heir!=="")
        {
          $("#house_heir_div").show();
          $("#house_heir").append(response["name"]);
        }
      }
    });
    var overlord_url = response["overlord"];
    $("#house_overlord").empty();
    $.ajax({
      url: overlord_url,
      dataType: "json",
      success: function(response)
      {
        var lord_name = response["name"];
        if(lord_name!=="")
        {
          $("#house_overlord_div").show();
          $("#house_overlord").append(response["name"]);
        }
      }
    });
    var founded = response["founded"];
    $("#house_founded").empty();
    if(found!=="")
    {
      $("#house_founded").append(founded);
      $("#house_founded_div").show();
    }
    var founder_url = response["founder"];
    $("#house_founder").empty();
    $.ajax({
      url: founder_url,
      dataType: "json",
      success: function(response)
      {
        var found_name = response["name"];
        if(found_name!=="")
        {
          $("#house_founder_div").show();
          $("#house_founder").append(response["name"]);
        }
      }
    });
    var weapons = response["ancestralWeapons"];
    $("#house_weapon").empty();
    for(var i=0; i<weapons.length; i++)
    {
      if(i==0 && weapons[i]!=="")
      {
        $("#house_weapon_div").show();
      }
      if(weapons[i]!=="")
      {
        $("#house_weapon").append(weapons[i]);
        $("#house_weapon").append(" * ");
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
          $("#house_cadet").append(" * ");
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
          $("#house_sworn").append(" * ");
        }
      });
    }
  }
  });

}

var get_characters_from_house = function(house_name)
{
  var character_names = [];
  var house_split = house_name.split(" ");
  for(var i=0; i<house_split.length; i++)
  {
    var house_name = house_split[i];
    if(house_name==="house")
    {
      continue;
    }
    for(char_name in characters)
    {
      if(!characters.hasOwnProperty(char_name))
      {
        continue;
      }
      var char_name_split = char_name.split(" ");
      for(var j=0; j<char_name_split.length; j++)
      {
        var sur_name = char_name_split[j];
        if(sur_name===house_name)
        {
          character_names.push(char_name);
        }
      }
    }
    if(character_names.length>0)
    {
      break;
    }
  }
  return character_names;
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
        else if(btn_value==="search_character")
        {
          $("div.search_div").hide();
          $("#char_div").show();
        }
        else
        {
          $("div.search_div").hide();
          $("#house_char_div").show();
        }
    });

    $("#rand_house").click(function(){
        $("div.char_display").hide();
        $("div.search_div").hide();
        var rh = Math.floor((Math.random() * total_houses) + 1);
        var h_url = "https://anapioficeandfire.com/api/houses/"+rh;
        display_house_data(h_url);
    });
    $("#rand_char").click(function(){
        $("div.house_display").hide();
        $("div.search_div").hide();
        var rc = Math.floor((Math.random() * total_characters) + 1);
        var c_url = "https://anapioficeandfire.com/api/characters/"+rc;
        display_char_data(c_url);
    });

    $("#search_house_char").click(function(){
        $("div.char_display").hide();
        var house_name = $("#house_char_name").val();
        var char_names = get_characters_from_house(house_name);
        if(char_names.length==0)
        {
          $("#got_char_display").empty();
          $("#got_char_display").append("<p class='text'>No results found</p>");
        }
        else
        {
          var rc = Math.floor((Math.random() * (char_names.length-1)));
          var char_name = char_names[rc];
          var char_url = characters[char_name];
          display_char_data(char_url);
        }
    });


  $("#search_char").click(function(){
    $("div.char_display").hide();
    var char_name = $("#char_name").val();
    char_name = char_name.toLowerCase();
    var count = 0;
    for(ch in characters)
    {
      if(!characters.hasOwnProperty(ch))
      {
        continue;
      }
      if(ch.indexOf(char_name)>-1)
      {
        count++;
        var su = document.getElementById("search_urls");
        var div_node = document.createElement("div");
        div_node.setAttribute("class","row");
        var btn = document.createElement("button");
        btn.setAttribute("class","search_result_button");
        var char_url = characters[ch];
        temp_url = char_url;
        var func_str = "display_char_data('"+char_url+"')";
        btn.setAttribute("onclick",func_str);
        var buttonText = document.createTextNode(ch);
        btn.appendChild(buttonText);
        div_node.appendChild(btn);
        su.appendChild(div_node);
      }
    }
    if(count==0)
    {
      $("#got_char_display").empty();
      $("#got_char_display").append("<p class='text'>No results found</p>");
    }
    if(count==1)
    {
      display_char_data(temp_url);
    }
  });
  $("#search_house").click(function(){
    $("div.house_display").hide();
    var house_name = $("#house_name").val();
    house_name = house_name.toLowerCase();
    var count = 0;
    for(house in houses)
    {
      if(!houses.hasOwnProperty(house))
      {
        continue;
      }
      if(house.indexOf(house_name)>-1)
      {
        count++;
        var su = document.getElementById("search_urls");
        var div_node = document.createElement("div");
        div_node.setAttribute("class","row");
        var btn = document.createElement("button");
        btn.setAttribute("class","search_result_button");
        var house_url = houses[house];
        temp_url = house_url;
        var func_str = "display_house_data('"+house_url+"')";
        btn.setAttribute("onclick",func_str);
        var buttonText = document.createTextNode(house);
        btn.appendChild(buttonText);
        div_node.appendChild(btn);
        su.appendChild(div_node);
      }
    }
    if(count==0)
    {
      $("#got_house_display").empty();
      $("#got_house_display").append("<p class='text'>No results found</p>");
    }
    else if(count==1)
    {
      display_house_data(temp_url);
    }
  });
});
