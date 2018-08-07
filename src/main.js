import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { Tamagotchi } from './tamagotchi';

var timeTick = function(object) {
  let hunger = object.hunger; $(".hunger").text(object.hunger);
  let happiness = object.happiness; $(".happiness").text(object.happiness);
  let energy = object.energy; $(".energy").text(object.energy);

  if (hunger <= 200 || happiness <= 200 || energy <= 200) {
    $(".status").text("😀");
  }
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
    $(".status").text("😵");
    $("button").attr("disabled", true);
    $(".res").attr("disabled", false);
    clearTimeout(timeout);
  }
};

var timeout;

var buttonDisable = function(button) {
  button.attr("disabled", true);
  timeout = setTimeout( function() { button.attr("disabled", false); }, 2000);

  if (button.hasClass("rest")) {
    $(".feed, .play").attr("disabled", true);
    timeout = setTimeout( function() { $(".feed, .play").attr("disabled", false); }, 2000);
  }
};

$(document).ready(function() {

  let tama = new Tamagotchi("tama");
  tama.timeElapse();
  $(".tama-name").text(tama.name);
  setInterval(() => { timeTick(tama); }, 500);

  $(".feed").click(function() {
    tama.feed();
    buttonDisable($(this));
  });

  $(".play").click(function() {
    tama.play();
    buttonDisable($(this));
  });

  $(".rest").click(function() {
    tama.rest();
    buttonDisable($(this));
  });

  $(".res").click(function() {
    tama.res();
    $("button").attr("disabled", false);
    $(this).attr("disabled", true);
  });

  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=portland&appid=${process.env.API_KEY}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      console.log(`The humidity in portland is ${response.main.humidity}%`);
      console.log(`The temperature in Kelvins is ${response.main.temp}.`);
    },
    error: function() {
      console.log("There was an error processing your request. Please try again.");
    }
  });

  $(".square").each(function(o) {
    setTimeout(() => {
      let that = $(this);
          that.html(o);
    }, 80 * o);
  });

  $(".square").click(function() {
    $(this).addClass("infect");
  });
  $.ajax({
    // url: `api.giphy.com/v1/gifs/random?q=portland&appid=${process.env.API_KEY}`,
    url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.giphy_API_KEY}&tag=pokemon&rating=R&fmt=json`,
    type: 'GET',
    success: function(response) {
      $(".giphy").html(`<img src="${response.data.images.fixed_width_small.url}">` )
    },
    error: function() {
      console.log("There was an error processing your request. Please try again.");
    }
  });


});
