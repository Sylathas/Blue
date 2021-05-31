import {selfDialogue, characterDialogue, wrongSelfDialogue, wrongCharacterDialogue} from "./dialogues.js"

var start = true;

$( document ).ready(function() {
  introduction();
});

//FUNCTIONS ABOUT THE PROGRESSION OF THE STORY
function introduction(){
  //Start button
  let startButton = $("<div></div>");
  startButton.attr({ "id": "introductionButton", "class": "button", 'onclick': `$( ".button" ).remove(); sectionProgress('Eo', 'visual', 0);`});
  $("body").append(startButton);
}

window.characterChoice = function(part){
  //Create the divs containing the sprites and QR's of the characters
  if(part == 1){
    createCharacter("Pa");
    createCharacter("TEDD");
    createCharacter("Joe");
  } else if(part == 2){
    createCharacter("Eo");
    createCharacter("Neutrum");
  } else if(part == 3){
    createCharacter("Maisie");
    createCharacter("Swarm");
  }
}

window.sectionProgress = function(character, communication, progress) {
  if(progress < 4){
    //Dialogue and selection of monuments
    console.log(`Section progress reached, with progress ${progress}`);
    selection(character, communication, progress);
  } else{
    //End of part
    ending();
    /*finalDialogue(character);
    part++;
    if(part < 4){
      //Choose new character
      characterChoice(part);
    } else{
      //End adventure
      ending();
    }*/
  }
}

window.ending = function(){
  //Remove old dialogues and buttons
  $( ".dialogue, .button" ).remove();
  //Self Dialogue
  let selfText = $("<p></p>").text("End of prototype");
  selfText.attr({"id": "finalDialogue", "class": "dialogue" });
  $("body").append(selfText);
}

//FUNCTIONS ABOUT DIALOGUES, CHOICES AND DIV CREATION

window.createCharacter = function(character){
  //Create parent div
  //Create Div with as background image the sprite of the character
  //Create Div with as background the QR of the character
}

window.progressDialogue = function(character, communication, progress){
  startvideo();
  //Remove old dialogues and buttons
  $( ".button" ).remove();
  progress++;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  for(var i = 0; i < selfDialogue[character][progress-1].length; i++){
    let selfText = $("<p></p>").html("<span class='bold'>Me: </span>" + selfDialogue[character][progress-1][i]);
    selfText.attr({"id": "selfDialogue", "class": "dialogue" });
    $("#dialogueBox").append(selfText);
  }
  //Character Dialogue
  for(var i = 0; i < characterDialogue[character][progress-1].length; i++){
    let characterText = $("<p></p>").html("<span class='bold'>" + character + ": </span>" + characterDialogue[character][progress-1][i]);
    characterText.attr({"id": "characterDialogue", "class": "dialogue" });
    characterText.addClass(character);
    $("#dialogueBox").append(characterText);
  }
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({ "id": "continueButton", "class": "button", 'onclick': `sectionProgress("${character}", "${communication}", ${progress})` });
  //Add them to the body
  $("body").append(continueButton);
}

window.wrongDialogue = function(character, communication, progress){
  startvideo();
  //Remove old dialogues and buttons
  $( ".button" ).remove();
  progress = 0;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  let selfText = $("<p></p>").html("<span class='bold'>Me: </span>" + wrongSelfDialogue[Math.floor(Math.random())].m);
  selfText.attr({"id": "selfDialogue", "class": "dialogue" });
  //Character Dialogue
  let characterText = $("<p></p>").html("<span class='bold'>" + character + ": </span>" + wrongCharacterDialogue[Math.floor(Math.random())].m);
  characterText.attr({"id": "characterDialogue", "class": `dialogue` });
  characterText.addClass(character);
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({ "id": "continueButton", "class": "button", 'onclick': `sectionProgress("${character}", "${communication}", ${progress})` });
  //Add them to the body
  $("body").append(continueButton);
  $("#dialogueBox").append(selfText, characterText);
}

window.selection = function(character, communication, progress){
  stopvideo();
  let buttons = ["choiceOne", "choiceTwo", "choiceThree"];
  //Remove old dialogues and buttons
  $( ".button" ).remove();
  //Prototyping help
  //prototyping(progress);

  if(start){
    //Dialogue div
    let dialogueBox = $("<div></div>");
    dialogueBox.attr({"id": "dialogueBox"});
    //Character
    let characterDiv = $("<div></div>");
    characterDiv.attr({"id": "character"});
    let characterAnimation = $(`<img id="characterAnimation" src='./Assets/Eo.gif' style='width:auto; height:100%; position: relative; left: 10%; transition: .5s;'></video>`);
    let characterQR = $("<img id='QR' src='./Assets/QR/Eo.png'></img>");

    $("body").append(dialogueBox, characterDiv);
    $("#character").append(characterAnimation, characterQR);
    start = false;
  }
  //Self Dialogue
  let selfText = $("<p></p>").html("<span class='bold'>Me: </span> Which of these monuments do I want to go to?");
  selfText.attr({"id": "selfDialogue", "class": "dialogue" });
  //Character Dialogue
  let characterText = $("<p></p>").text("");
  characterText.attr({"id": "characterDialogue", "class": `dialogue` });
  characterText.addClass(character);

  buttons = shuffleArray(buttons);

  //Create the three buttons with the choices
  let choiceOne = $("<button></button>").text("Wrong");
  choiceOne.attr({"id": buttons[0], "class": communication + " button", 'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`});
  choiceOne.css("background-image", "url(./Assets/totem_a.png)");
  let choiceTwo = $("<button></button>").text("True");
  choiceTwo.attr({"id": buttons[1], "class": communication + " button", 'onclick': `progressDialogue("${character}", "${communication}", ${progress})`});
  choiceTwo.css("background-image", "url(./Assets/totem_b.png)");
  let choiceThree = $("<button></button>").text("Wrong");
  choiceThree.attr({"id": buttons[2], "class": communication + " button", 'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`});
  choiceThree.css("background-image", "url(./Assets/totem_c.png)");
  //Add them to the page
  $("body").append(choiceOne, choiceTwo, choiceThree);
  $("#dialogueBox").append(selfText, characterText);
  $('#dialogueBox').scrollTop($('#dialogueBox')[0].scrollHeight);

  $("#characterAnimation, #QR").hover(function(){
    $("#characterAnimation").css({"opacity": `.8`});
    $("#QR").css({"opacity": `1`});
  });
  $( "#characterAnimation, #QR" ).mouseout(function() {
    $("#characterAnimation").css({"opacity": `1`});
    $("#QR").css({"opacity": `0`});
  });
}

//STRUMENTAL FUNCTIONS

window.shuffleArray = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

window.startvideo = function(){
  $('#video')[0].play();
  var i = 1/16;
  document.querySelector('video').playbackRate = i;
  var intervalId = window.setInterval(function(){
    i = i * 1.5;
    document.querySelector('video').playbackRate = i;
    if(i > 1){
      clearInterval(intervalId);
      document.querySelector('video').playbackRate = 1;
    }
  }, 150);
}

window.stopvideo = function(){
  var i = 1;
  var j = 1;
  var intervalId = window.setInterval(function(){
    i = i / 1.5;
    j++;
    document.querySelector('video').playbackRate = i;
    if(j == 5){
      clearInterval(intervalId);
      $('#video')[0].pause();
    }
  }, 150);
}

window.prototyping = function(progress){
  //Add progress to top left
  $("#progressDialogue").remove();
  let progressText = $("<p></p>").text(`Progress: ${progress}`);
  progressText.attr({"id": "progressDialogue", "class": "dialogue" });
  $("body").append(progressText);
}
