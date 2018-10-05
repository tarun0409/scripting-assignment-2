$(document).ready(function(){
  $("#mybutton").click(function(){
    var text = $("#myTextarea").val();
    //console.log(text);
    document.getElementById('myIframe').contentDocument.write(text);
  });
});
