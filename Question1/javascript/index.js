$(document).ready(function(){
  $("#try_it").click(function(){
    var text = $("#myTextarea").val();
    document.getElementById('myIframe').contentDocument.write(text);
  });
  $("#clear_code").click(function(){
    $("#myTextarea").val('');
  });
  $("#clear_display").click(function(){
    $("#myIframe").attr("src","about:blank");
  });
});
