import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var ajaxFunc = function() {
  $.ajax({
      type: 'get',
      url: '/test.html',
      success: function (result) {
          $("body").append(result);
      }
  });
}

var timeElapse = function() {
  let hunger = $(".hunger").text();
  let happiness = $(".happiness").text();
  let energy = $(".energy").text();

  if (hunger <= 0 || happiness <= 0 || energy <= 0) {
    clearInterval(interval);
    console.log("dead end");
  }
  else {
    let rand = randomNum();
    hunger-= rand; $(".hunger").text(hunger);
    rand = randomNum();
    happiness-= rand; $(".happiness").text(happiness);
    rand = randomNum();
    energy-= rand; $(".energy").text(energy);
  }
}

var randomNum = function() {
  let rand = Math.floor(Math.random() * 10) + 1;
  return rand;
}

var interval = setInterval(function(){ timeElapse(); }, 500);

$(function() {



});
