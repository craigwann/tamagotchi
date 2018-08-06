import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var timeElapse = function(resting = false) {
  let hunger = $(".hunger").text();
  let happiness = $(".happiness").text();
  let energy = $(".energy").text();

  if (hunger <= 175 || happiness <= 175 || energy <= 175) {
    $(".status").text("🙂");
  }
  if (hunger <= 150 || happiness <= 150 || energy <= 150) {
    $(".status").text("🙂");
  }
  if (hunger <= 100 || happiness <= 100 || energy <= 100) {
    $(".status").text("😐");
  }
  if (hunger <= 75 || happiness <= 75 || energy <= 75) {
    $(".status").text("😕");
  }
  if (hunger <= 50 || happiness <= 50 || energy <= 50) {
    $(".status").text("😢");
  }

  if (hunger <= 0 || happiness <= 0 || energy <= 0) {
    clearInterval(interval);
    $(".tama-actions button").attr("disabled", true);
    setTimeout(function() { $(".tama-actions button").attr("disabled", true); }, 2000);
    $(".status").text("😵");
    clearTimeout(one);
    clearTimeout(two);
    clearTimeout(three);
  }
  else {
    let decay = 10;
    if (resting) {
      decay = decay / 2;
    }
    hunger-= decay; $(".hunger").text(hunger);
    happiness-= decay; $(".happiness").text(happiness);
    energy-= decay; $(".energy").text(energy);
  }
}

var randomNum = function() {
  let rand = Math.floor(Math.random() * 10) + 1;
  return rand;
}

var interval = setInterval(function(){ timeElapse(); }, 500);
var one, two, three; // placeholder identity for each setTimeout

$(document).ready(function() {

  $(".feed").click(function(){
    let food = parseInt($(".hunger").text());
    food += 10;
    $(".hunger").text(food);
    $(this).attr("disabled", true);
    one = setTimeout(
      () => { $(this).attr("disabled", false); }
      , 2000
    );
  })
  $(".play").click(function(){
    let play = parseInt($(".happiness").text());
    play += 10;
    $(".happiness").text(play);
    $(this).attr("disabled", true);
    two = setTimeout(
      () => { $(this).attr("disabled", false); }
      , 2000
    );
  })
  $(".rest").click(function(){
    let energy = parseInt($(".energy").text());
    energy += 30;
    $(".energy").text(energy);
    clearInterval(interval);
    interval = setInterval(function(){ timeElapse(true); }, 500);
    $(this).attr("disabled", true);
    three = setTimeout(
      () => { $(this).attr("disabled", false); }
      , 5000
    );

  })
  $(".res").click(function() {
    $(".hunger, .happiness, .energy").text("200");
    clearInterval(interval);
    interval = setInterval(function(){ timeElapse(); }, 500);
    $(".tama-actions button").attr("disabled", false);
    $(".status").text("😀");
  })

});
