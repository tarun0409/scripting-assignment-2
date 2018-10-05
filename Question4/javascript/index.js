var move_clock_hands = function(){
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  h = 30*((h%12) + (m/60));
  m=6*m;
  s=6*s;
  document.getElementById("second_hand").style.cssText="transform:rotate("+s+"deg)";
  document.getElementById("minute_hand").style.cssText="transform:rotate("+m+"deg)";
  document.getElementById("hour_hand").style.cssText="transform:rotate("+h+"deg)";
  setTimeout(move_clock_hands,1000);
}
window.onload=move_clock_hands;
