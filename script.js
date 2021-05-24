//Arrays with dialogues
var selfDialogue = [
  { m: "I have made my first good decision" },
  { m: "I have made my second good decision" },
  { m: "I have made my third good decision" },
  { m: "This is my final self dialogue" }
];

var characterDialogue = [
  { m: "You have made your first good decision" },
  { m: "You have made your second good decision" },
  { m: "You have made your third good decision" },
  { m: "This is the final character dialogue" }
];

var wrongSelfDialogue = [
  { m: "Wrong self dialogue 1" },
  { m: "Wrong self dialogue 2" }
];

var wrongCharacterDialogue = [
  { m: "Wrong character dialogue 1" },
  { m: "Wrong character dialogue 2" }
];

//FUNCTIONS ABOUT THE PROGRESSION OF THE STORY
function introduction(){

}

function characterChoice(part){
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

function sectionProgress(character, communication, progress) {
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

function ending(){
  //Remove old dialogues and buttons
  $( ".dialogue, .button" ).remove();
  //Self Dialogue
  let selfText = $("<p></p>").text("End of prototype");
  selfText.attr({"id": "finalDialogue", "class": "dialogue" });
  $("body").append(selfText);
}

//FUNCTIONS ABOUT DIALOGUES, CHOICES AND DIV CREATION

function createCharacter(character){
  //Create parent div
  //Create Div with as background image the sprite of the character
  //Create Div with as background the QR of the character
}

function progressDialogue(character, communication, progress){
  //Remove old dialogues and buttons
  $( ".dialogue, .button" ).remove();
  progress++;
  //Prototyping help
  prototyping(progress);
  //Self Dialogue
  let selfText = $("<p></p>").text(selfDialogue[progress-1].m);
  selfText.attr({"id": "selfDialogue", "class": "dialogue" });
  //Character Dialogue
  let characterText = $("<p></p>").text(characterDialogue[progress-1].m);
  characterText.attr({"id": "characterDialogue", "class": "dialogue" });
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({ "id": "continueButton", "class": "button", 'onclick': `sectionProgress("${character}", "${communication}", ${progress})` });
  //Add them to the body
  $("body").append(selfText, characterText, continueButton);
}

function wrongDialogue(character, communication, progress){
  //Remove old dialogues and buttons
  $( ".dialogue, .button" ).remove();
  progress = 0;
  //Prototyping help
  prototyping(progress);
  //Self Dialogue
  let selfText = $("<p></p>").text(wrongSelfDialogue[Math.floor(Math.random())].m);
  selfText.attr({"id": "selfDialogue", "class": "dialogue" });
  //Character Dialogue
  let characterText = $("<p></p>").text(wrongCharacterDialogue[Math.floor(Math.random())].m);
  characterText.attr({"id": "characterDialogue", "class": "dialogue" });
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({ "id": "continueButton", "class": "button", 'onclick': `sectionProgress("${character}", "${communication}", ${progress})` });
  //Add them to the body
  $("body").append(selfText, characterText, continueButton);
}

function selection(character, communication, progress){
  //Remove old dialogues and buttons
  $( ".dialogue, .button" ).remove();
  //Prototyping help
  prototyping(progress);
  //Self Dialogue
  let selfText = $("<p></p>").text("Which monument should I choose?");
  selfText.attr({"id": "selfDialogue", "class": "dialogue" });
  //Character Dialogue
  let characterText = $("<p></p>").text("");
  characterText.attr({"id": "characterDialogue", "class": "dialogue" });
  //Create the three buttons with the choices
  let choiceOne = $("<button></button>").text("Wrong");
  choiceOne.attr({"id": "choiceOne", "class": "button", 'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`});
  let choiceTwo = $("<button></button>").text("True");
  choiceTwo.attr({"id": "choiceTwo", "class": "button", 'onclick': `progressDialogue("${character}", "${communication}", ${progress})`});
  let choiceThree = $("<button></button>").text("Wrong");
  choiceThree.attr({"id": "choiceThree", "class": "button", 'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`});
  //Add them to the body
  $("body").append(selfText, characterText, choiceOne, choiceTwo, choiceThree);
}

function prototyping(progress){
  //Add progress to top left
  let progressText = $("<p></p>").text(`Progress: ${progress}`);
  progressText.attr({"id": "progressDialogue", "class": "dialogue" });
  $("body").append(progressText);
}
