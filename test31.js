let score = 0;
let gameOver = false;
let lastHole = 0;
let lastthing = 0;
let timer = 0;

$(document).ready(function() {
  $('#start').click(StartGame);
  $('.gamewrap').on('mousedown', '.img-game', Wackathing);
  $('img').on('dragstart', function(event) {
    event.preventDefault();
  });
});


function Wackathing() {
  $(this).parent().parent().find(".wack").show();
  $(this).parent().hide();
  $(this).parent().parent().find(".wack").fadeOut(1000);

  var stringScore = score.toString();
  stringScore = stringScore.padStart(2, '0');
  $('.score').text(stringScore);
}
//On click of start button
function StartGame() {
  score = 0;


  $('#start').hide();
  gameOver = false;
  $('.message').html('');

  //dynamically created the images
  MakeGameBoard();
  $(".thing_1>img").off().on("click", function() {
    //  PROBLEM:-increase by the no of times user click
    score = 15;
  });

  $('.score').text(`${score}`);

  //start animation
  Startthings();

  setTimeout(function() {
    return EndGame();
  }, 30000);
};

// function for staring animation
function Startthings() {

  setTimeout(function() {

    // changes the images
    changething();

  }, 1600);
  let popUp = $('.hole_' + RandomHole() + '>.thing');
  timer = Math.round(Math.random() * 1000) + 800;
  popUp.show();
  //console.log(score);
  //Pop Up
  popUp.animate({
    bottom: '0px',
    top: '110px'
  }, 800);

  setTimeout(function() {
    popUp.animate({
      bottom: '0px',
      top: '300px'
    }, 900);
    if (!gameOver) {
      Startthings();
    }
  }, 1200);
}

//for random hole,
function RandomHole() {
  let hole = 1 + (Math.floor(Math.random() * $('.hole').length));
  if (hole == lastHole) {
    return RandomHole();
  }
  lastHole = hole;
  return hole;
}


//for changing the images
function changething() {

  for (let i = 1; i < 6; i++) {
    if (i == 2) {
      $('#img_' + i + '>img').attr("id", "yellow");
    }
    $('#img_' + i + '>img').attr("src", "animal_" + i + ".png");

  }

}


function MakeGameBoard() {
  var things = 5;
  var code = "";

  for (var thing = 1; thing < things + 1; thing++) {
      code = '<div class="img-game" id="img_' + thing + '"> <img src="" class="img-block"/>  </div>';
    $('#thing_' + thing).html(code);
  }

  $('.yellow-block').mouseup(function() {
    score = score + 15;
  });



  $('.img-block').on('mousedown', function(e) {
    var nav = $(this);
    if (nav.length) {
      var contentNav = nav.offset().top;
      if($(this).attr('src')=='animal_2.png'){
        score=score+15;
      } else if (contentNav > 270 && contentNav <= 361){
        score = score + 5;
      } else if (contentNav > 225 && contentNav <= 270) {
        score = score + 10;
      } else if (contentNav >= 204 && contentNav <= 225) {
        score = score + 15;
      } else alert("ye");
    }
  });

}


function blink_text() {
  $('.message').fadeOut(300);
  $('.message').fadeIn(300);
}
setInterval(blink_text, 2000);

// function for ending the game
function EndGame() {
  gameOver = true;
  blink_text();
  setTimeout(function() {
    $('.message').html('Game Over');
    $('#start').show();
  }, timer + 500);
}
