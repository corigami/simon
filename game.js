var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var gamePattern = [];
var gameLevel = 0;
var seqNum = 0;
var sounds = [];
var started = false;

buttonColors.forEach(function (el) {
    sounds.push(new Audio('sounds/' + el + '.mp3'))
});
sounds.push(new Audio('sounds/wrong.mp3'))

function nextSequence() {
    var rand = Math.floor(Math.random() * 4)
    var randColor = buttonColors[rand];
    gamePattern.push(randColor);
    playSound(randColor);
    flashButton(randColor);
}

function playSound(color) {
    var sound;
    switch (color) {
        case 'red':
            sound = 0;
            break;
        case 'blue':
            sound = 1;
            break;
        case 'green':
            sound = 2;
            break;
        case 'yellow':
            sound = 3;
            break;
        case 'wrong':
            sound = 4;
            break
    }
    sounds[sound].play();
}

function flashButton(color) {
    $('#' + color).fadeOut(100).fadeIn(100);
}

function clickHandler(e) {
    var color = $(this).attr("id");
    $(this).toggleClass('pressed', 100).toggleClass('pressed', 100);
    playSound(color);
    flashButton(color);
    userClickPattern.push(color);
    if (userClickPattern[seqNum] == gamePattern[seqNum]) {
        if (seqNum === gameLevel) {
            seqNum = 0;
            gameLevel++;
            userClickPattern = []
            $('h1').text("Level " + gameLevel);
            setTimeout(function () {
                nextSequence();
            }, 1500);

        } else {
            seqNum++;
        }
    } else {
        $('body').toggleClass("game-over", 500).toggleClass("game-over", 500);
        playSound('wrong');
        started = false;

        $('h1').text("Game Over! - Hit any key to continue.");
    }
}

function startOver() {
    $('h1').text("Level 0");
    userClickPattern = [];
    gamePattern = [];
    gameLevel = 0;
    seqNum = 0;
    started = true;
    nextSequence()
}

$('.btn').click(clickHandler);

$(document).on('keydown', function (event) {
    if (!started) {
        startOver();
    }
});