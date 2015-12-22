var sequence = [];
var clicks = 0;
var myAudio = new Audio("beep.mp3");
var boo = new Audio("boo.mp3");
                            

function animate(element){
	element.animate({opacity: '1'}, {	
		duration: 50,
		complete: function(){
		$(this).animate({opacity: '0.6'});
		}
	});
};

function addNumber(){
  var num = Math.floor(Math.random() * 4 + 1); //choose a random number from 1 -4 
  sequence.push(num);
};

function start(){
  $(".start").click(function(){
  gamePlay();
  });
};

function gamePlay(){
  sequenceActive = false;
  sequence.forEach(function(number,index){
    setTimeout(function(){
      var tile = $("#" + number);
      animate(tile);
      // myAudio.play();
    }, 1000 * (index +1));
  });
  setTimeout(function(){
    sequenceActive = true;
  }, 1000 * sequence.length);
};

$('.tile').click(function(){
  if(sequenceActive){
    myTile = $(this);
    // myAudio.play();
    animate(myTile);
    userPlay($(this).attr('id'));
  }
});

function userPlay(id){
  // var id = $(this).attr('id');
  if(id == sequence[clicks] && (clicks + 1) == sequence.length){
    clicks = 0
    addRound();
    $(".status").text("Next Round");
  } else if(id == sequence[clicks]){
    clicks++;
    $(".status").text("Keep Going!");
  }else{
    $(".status").text("You are a loser");
    $(".wrapper").hide();
    $(".trump").css({"background": "url(trump.gif)" , "background-repeat": "no-repeat" , "z-index": "99999"});
    boo.play();
    sequence = [];
    play();
  }
};


function addRound(){
  addNumber();
  gamePlay();
};

function play(){ 
  addNumber();
  start();
};

play();

// $(".tile").off("click");


