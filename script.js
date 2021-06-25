import {
  selfDialogue,
  characterDialogue,
  wrongSelfDialogue,
  wrongCharacterDialogue,
  startingSelfDialogue,
  characterDescription,
  dataLogsCharacters
} from "./dialogues.js";

var start = true;
var dialoghi = 0;
var tutorial = 0;
var open = false;
var pipboyanimate = true;

$(document).ready(function() {
  loading();
});

//FUNCTIONS ABOUT THE PROGRESSION OF THE STORY
function loading() {
  $("#loading2").css({
    'top': "52%",
    "left": "52%",
    "height": "6%",
    "width": "6%"
  });
  $("#loading2").removeClass("loadAnimation");
  $("#pLoading").removeClass("loadAnimation2");
  $("#pLoading").css({
    'top': "60%",
    'cursor': 'pointer'
  });
  setTimeout(function() {
    $("#pLoading").attr({
      "onclick": "introduction(0)"
    });
    $("#pLoading").text("Enter");
    $("#loading1").css({
      'opacity': "1",
      "cursor": "pointer"
    });
  }, 500);
}

window.introduction = function(progress) {
  if (progress == 0) {
    $("#loading").css({
      'pointer-events': "none"
    });
    textAppear("Every story is unique, this story makes no exception. This is a story made up of many different unique stories from all the corners of the galaxy. This is a story that takes place where diversity can be expressed, at the cost of dealing with complexity. This is a story about the struggle of understanding. Finally, this is also your story.", true, "center");
  } else if (progress == 1) {
    $(".button, p").css({
      "opacity": "0"
    });
    $("#pipboyDiv").css({
      "display": "block"
    });
    $('#appearingVideo')[0].play();
    setTimeout(function() {
      $(".button, p").remove();
      $("#appearingText").css({
        "opacity": "0"
      });
      setTimeout(function() {
        $("#appearingText").css({
          "display": "none"
        });
        $("#appearingVideoDiv").css({
          "opacity": "0"
        });
        setTimeout(function() {
          $("#appearingVideo, #videobackground, .button, #appearingVideoDiv").remove();
          gameBeginning();
        }, 1000);
        $("body").css({
          "background-color": "black",
          "background-image": "none"
        });
      }, 1000);
    }, 1000);
  }
}

window.gameBeginning = async function() {
  //Dialogue div
  let dialogueBoxHolder = $("<div></div>");
  dialogueBoxHolder.attr({
    "id": "dialogueBoxHolder"
  });
  let dialogueBox = $("<div></div>");
  dialogueBox.attr({
    "id": "dialogueBox"
  });
  let textHolder = $("<div></div>");
  textHolder.attr({
    "id": "textHolder"
  });
  $("body").append(dialogueBoxHolder);
  $("#dialogueBoxHolder").append(dialogueBox);
  $("#dialogueBox").append(textHolder);
  $("#videoContainer").addClass("turnOn");
  setTimeout(function() {
    $("#dialogueBoxHolder").css({
      "height": "39.5vw"
    });
    setTimeout(function() {
      showDialogueText("selfDialogue", "Introduction", 1)
    }, 1000);
  }, 1200);
}

window.characterChoice = function(part) {
  //Create the divs containing the sprites and QR's of the characters
  stopvideo();
  if (part == 1) {
    showDialogueText("selfDialogue", "Firstmeeting", 2);
    createCharacter("Eo", "one");
    createCharacter("Neutrum", "two");
    let continueButton = $("<button></button>").text("Wait for the dialogue to end...");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  } else if (part == 2) {
    createCharacter("Pa", "one");
    createCharacter("TEDD", "two");
    createCharacter("Joe", "three");
    let continueButton = $("<button></button>").text("Wait for the dialogue to end...");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  } else if (part == 3) {
    createCharacter("Maisie", "one");
    createCharacter("Swarm", "two");
    let continueButton = $("<button></button>").text("Wait for the dialogue to end...");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  }
}

window.sectionProgress = function(character, communication, progress) {
  if (progress < 5) {
    //Dialogue and selection of monuments
    console.log(`Section progress reached, with progress ${progress}`);
    selection(character, communication, progress);
  } else if (progress == 5) {
    //End of part
    finalDialogue(character, communication, progress);
    /*part++;
    if(part < 4){
      //Choose new character
      characterChoice(part);
    } else{
      //End adventure
      ending();
    }*/
  } else {
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

window.ending = function() {
  //Remove old dialogues and buttons
  $(".dialogue, .button").remove();
  //Self Dialogue
  let selfText = $("<p></p>").text("End of prototype");
  selfText.attr({
    "id": "finalDialogue",
    "class": "dialogue"
  });
  $("body").append(selfText);
}

//FUNCTIONS ABOUT DIALOGUES, CHOICES AND DIV CREATION

window.createCharacter = function(character, n) {
  //Create parent div
  let characterDiv = $("<div></div>").text(character);
  characterDiv.attr({
    "id": "choosecharacter",
    "class": n
  });

  setTimeout(function() {
    characterDiv.attr({
      "onclick": `characterFocus("${character}", "${n}")`
    });
    $("#chooseCharacterButton").css({
      "opacity": "0"
    });
    $("#chooseCharacterButton").text("");
    $(".selezionepersonaggio").css({
      "opacity": "1"
    });
  }, 15000);
  //Create Div with as background image the sprite of the character
  let characterPath = `./Assets/Characters/"${character}".gif`.replace(/['"]+/g, '');
  let characterId = `characterAnimation"${n}"`.replace(/['"]+/g, '');
  let characterAnimation = $(`<img id="${characterId}" src='${characterPath}' class="selezionepersonaggio" style='width:auto; height:100%; position: relative; left: 10%; transition: .5s'>`);
  //Create Div with as background the QR of the character
  let qrPath = `./Assets/QR/"${character}".png`.replace(/['"]+/g, '');
  let characterQR = $("<img id='QR' class='QR" + n + "' src=" + qrPath + "></img>");
  //Create Character Tag
  let characterTag = $("<div></div>");
  characterTag.attr({
    "id": "characterTag",
    "class": n + " " + n + character
  });
  //append everything
  $("body").append(characterDiv, characterTag);
  setTimeout(function(){
    $(".selezionepersonaggio").css({
      "opacity": ".5"
    });
  }, 200);

  $("#choosecharacter." + n).append(characterAnimation, characterQR);
  $("#choosecharacter." + n + ", #characterTag." + n).css({
    "opacity": "1"
  });
  let tagPath = `./Assets/Buttons/"${character}".png`.replace(/['"]+/g, '');

  $("#choosecharacter." + n + ", #characterTag." + n).mouseenter(function() {
    $("#characterAnimation" + n).css({
      "transform": `scale(1.1)`
    });
  });
  $("#choosecharacter." + n + ", #characterTag." + n).mouseout(function() {
    $("#characterAnimation" + n).css({
      "transform": `scale(1)`
    });
  });
}

window.startDialogue = async function(character, communication, progress, n) {
  $(".button").css({
    "opacity": "0"
  });
  setTimeout(function(){
    $(".button").remove();
  }, 500);
  startvideo();
  //Remove old dialogues and buttons
  $("#characterTag.one").css({
    "opacity": "0"
  });
  $("#characterTag.two").css({
    "opacity": "0"
  });
  if (n == "one") {
    $("#choosecharacter.two").remove();
    if ($("#choosecharacter.three")) {
      $("#choosecharacter.three").remove();
    }
  } else if (n == "two") {
    $("#choosecharacter.one").remove();
    if ($("#choosecharacter.three")) {
      $("#choosecharacter.three").remove();
    }
  } else if (n == "three") {
    $("#choosecharacter.one").remove();
    $("#choosecharacter.two").remove();
  }

  $("." + n).css({
    "left": "20%"
  });
  setTimeout(function() {
    $("#characterTag.one").remove();
    $("#characterTag.two").remove();
  }, 500);

  $("#QR").css({
    "top": "50%",
    "opacity": "0"
  });
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  for (var i = 0; i < startingSelfDialogue[character][0].length; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    let optionsSelf = {
      strings: [startingSelfDialogue[character][0][i]],
      typeSpeed: 40,
      showCursor: false
    };
    let selfName = $("<p></p>").html("<span class='bold'>Me: </span>");
    selfName.attr({
      "id": "selfDialogue",
      "class": "dialogue"
    });
    selfName.css({
      "margin-bottom": "0"
    });
    let selfText = $("<p></p>");
    selfText.attr({
      "id": "selfDialogue",
      "class": "dialogue scrollableDialogue" + dialoghi.toString()
    });
    selfText.css({
      "margin-top": "0"
    });
    $("#textHolder").append(selfName, selfText);
    new Typed(".scrollableDialogue" + dialoghi.toString(), optionsSelf);
    dialoghi++;
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    await new Promise(r => setTimeout(r, 70 * startingSelfDialogue[character][0][i].length));
  }
  sectionProgress(character, communication, 1);
}

window.progressDialogue = async function(character, communication, progress) {
  startvideo();
  //Remove old dialogues and buttons
  $(".button").remove();
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue

  for (var i = 0; i < selfDialogue[character][progress - 1].length; i++) {
    console.log(character + progress + i);
    console.log(selfDialogue[character][progress - 1]);
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    let optionsSelf = {
      strings: [selfDialogue[character][progress - 1][i]],
      typeSpeed: 20,
      showCursor: false
    };
    let selfName = $("<p></p>").html("<span class='bold'>Me: </span>");
    selfName.attr({
      "id": "selfDialogue",
      "class": "dialogue"
    });
    selfName.css({
      "margin-bottom": "0"
    });
    let selfText = $("<p></p>");
    selfText.attr({
      "id": "selfDialogue",
      "class": "dialogue scrollableDialogue" + dialoghi.toString()
    });
    selfText.css({
      "margin-top": "0"
    });
    $("#textHolder").append(selfName, selfText);
    new Typed(".scrollableDialogue" + dialoghi.toString(), optionsSelf);
    dialoghi++;
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    await new Promise(r => setTimeout(r, 35 * selfDialogue[character][progress - 1][i].length));
  }
  //Character Dialogue
  for (i = 0; i < characterDialogue[character][progress - 1].length; i++) {
    console.log(character + progress + i);
    console.log(selfDialogue[character][progress - 1]);
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    let optionsCharacter = {
      strings: [characterDialogue[character][progress - 1][i]],
      typeSpeed: 20,
      showCursor: false
    };
    let characterName = $("<p></p>").html("<span class='bold'>" + character + ": </span>");
    characterName.attr({
      "id": "characterDialogue",
      "class": "dialogue"
    });
    characterName.css({
      "margin-bottom": "0"
    });
    let characterText = $("<p></p>");
    characterText.attr({
      "id": "characterDialogue",
      "class": "dialogue scrollableDialogue" + dialoghi.toString()
    });
    characterText.addClass(character);
    characterText.css({
      "margin-top": "0"
    });
    $("#textHolder").append(characterName, characterText);
    new Typed(".scrollableDialogue" + dialoghi.toString(), optionsCharacter);
    dialoghi++;
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    await new Promise(r => setTimeout(r, 35 * characterDialogue[character][progress - 1].length));
  }
  progress++;
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({
    "id": "continueButton",
    "class": "button",
    'onclick': `sectionProgress("${character}", "${communication}", ${progress})`
  });
  //Add them to the body
  $("body").append(continueButton);
}

window.wrongDialogue = async function(character, communication, progress) {
  startvideo();
  //Remove old dialogues and buttons
  $(".button").css({
    "opacity": "0"
  });
  setTimeout(function() {
    $(".button").remove();
  }, 1000);
  progress = 1;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  let randomNumber = Math.floor(Math.random());
  console.log(randomNumber);
  console.log(character);
  console.log(wrongSelfDialogue[character][randomNumber][0]);
  let optionsSelf = {
    strings: [wrongSelfDialogue[character][randomNumber][0]],
    typeSpeed: 20,
    showCursor: false
  };
  let selfName = $("<p></p>").html("<span class='bold'>Me: </span>");
  selfName.attr({
    "id": "selfDialogue",
    "class": `dialogue`
  });
  selfName.css({
    "margin-bottom": "0"
  });
  let selfText = $("<p></p>");
  selfText.attr({
    "id": "selfDialogue",
    "class": "dialogue scrollableDialogue" + dialoghi.toString()
  });
  selfText.css({
    "margin-top": "0"
  });
  $("#textHolder").append(selfName, selfText);
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  new Typed('.scrollableDialogue' + dialoghi.toString(), optionsSelf);
  dialoghi++;
  await new Promise(r => setTimeout(r, 35 * wrongSelfDialogue[character][randomNumber][0].length));
  //Character Dialogue
  let optionsCharacter = {
    strings: [wrongCharacterDialogue[character][randomNumber][0]],
    typeSpeed: 20,
    showCursor: false
  };
  let characterName = $("<p></p>").html("<span class='bold'>" + character + ": </span>");
  characterName.attr({
    "id": "characterDialogue",
    "class": `dialogue`
  });
  characterName.css({
    "margin-bottom": "0"
  });
  let characterText = $("<p></p>");
  characterText.attr({
    "id": "characterDialogue",
    "class": "dialogue scrollableDialogue" + dialoghi.toString()
  });
  characterText.css({
    "margin-top": "0"
  });
  characterText.addClass(character);
  $("#textHolder").append(characterName, characterText);
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  new Typed('.scrollableDialogue' + dialoghi.toString(), optionsCharacter);
  dialoghi++;
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({
    "id": "continueButton",
    "class": "button",
    'onclick': `sectionProgress("${character}", "${communication}", ${progress})`
  });
  //Add them to the body
  $("body").append(continueButton);
}

window.finalDialogue = async function(character, communication, progress) {
  //Remove old dialogues and buttons
  $(".button").remove();
  progress++;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  let endingDiv = $("<div id='endingDiv'></div>");
  $("body").append(endingDiv);
  setTimeout(function(){
    $("#endingDiv").css({
      "opacity": "1"
    });
    setTimeout(function(){
      if (communication == "visual") {
        $("#video").attr({
          "src": "./Assets/BG_" + character + ".mp4"
        });
        $('#video')[0].play();
      }
    }, 2000);
  }, 200);

  for (var i = 0; i < selfDialogue[character][4].length; i++) {
    //typed
    let optionsSelf = {
      strings: [selfDialogue[character][4][i]],
      typeSpeed: 20,
      showCursor: false
    };
    let selfText = $("<p style='color: black; z-index:11; opacity: 1'></p>");
    selfText.attr({
      "id": "appearingText",
    });
    $("body").append(selfText);
    let type = new Typed("#appearingText", optionsSelf);
    dialoghi++;
    await new Promise(r => setTimeout(r, 35 * selfDialogue[character][4][i].length));
    $("#appearingText").css({
      "opacity": "0"
    });
  }

  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({
    "id": "continueButtonCenter",
    "class": "button",
    'onclick': `sectionProgress("${character}", "${communication}", ${progress})`
  });
  //Add them to the body
  $("body").append(continueButton);
}

window.characterFocus = function(character, n) {
  showDialogueText("characterDescription", character, 1);
  $("#choosecharacter." + n).css({
    "pointer-events": "none",
    "opacity": "1",
    "width": "20%",
    "height": "25%"
  });
  $("#characterTag." + n).css({
    "pointer-events": "none",
    "opacity": "1",
    "width": "6%",
    "height": "10%",
    "bottom": "35%"
  });
  $(".QRone, .QRtwo, .QRthree").css({
    "opacity": "1"
  });
  if (n == "one") {
    $("#choosecharacter.two, .QRtwo, #choosecharacter.three, .QRthree, #characterTag.two").off('mouseenter, mouseout');
    $("#choosecharacter.two, #choosecharacter.three").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
    $(".QRtwo, .QRthree").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.two, #characterTag.three").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "5%",
      "height": "8%",
      "bottom": "30%"
    });
  } else if (n == "two") {
    $("#choosecharacter.one, .QRone, #choosecharacter.three, .QRthree, #characterTag.three, #characterTag.one").off('mouseenter, mouseout');
    $("#choosecharacter.one, #choosecharacter.three").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
    $(".QRone, .QRthree").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.one, #characterTag.three").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "5%",
      "height": "8%",
      "bottom": "30%"
    });
  } else if (n == "three") {
    $("#choosecharacter.one, .QRone, #choosecharacter.two, .QRtwo, #characterTag.one, #characterTag.two").off('mouseenter, mouseout');
    $("#choosecharacter.one, #choosecharacter.two").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
    $(".QRone, .QRtwo").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.one, #characterTag.two").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "5%",
      "height": "8%",
      "bottom": "30%"
    });
  }
  $("#choosecharacter." + n).mouseenter(function() {
    $("#characterAnimation" + n).css({
      "opacity": `.5`
    });
  });
  $("#choosecharacter." + n).mouseout(function() {
    $("#characterAnimation" + n).css({
      "opacity": `1`
    });
  });

  $("#chooseCharacterButton").text("Choose " + character);
  $("#chooseCharacterButton").attr({
    'onclick': `startDialogue("${character}", "visual", 1, "${n}")`
  });
  $("#chooseCharacterButton").removeClass("chooseCharacterButtonPre");
  $("#chooseCharacterButton").addClass("chooseCharacterButton");
  $("#chooseCharacterButton").css({
    "opacity": "1"
  })
  setTimeout(function() {
    $("#choosecharacter.one, #choosecharacter.two, #choosecharacter.three").css({
      "pointer-events": "auto"
    });
  }, 10000);

}

window.selection = async function(character, communication, progress) {
  stopvideo();
  let buttons = ["choiceOne", "choiceTwo", "choiceThree"];
  //Remove old dialogues and buttons
  $(".button").remove();
  //Prototyping help
  //prototyping(progress);

  if (start) {
    //Character
    $("#choosecharacter").remove();
    let characterDiv = $("<div></div>");
    characterDiv.attr({
      "id": "character"
    });
    let characterPath = `./Assets/Characters/"${character}".gif`.replace(/['"]+/g, '');
    let characterAnimation = $(`<img id="characterAnimation" src="${characterPath}" style='width:auto; height:100%; position: relative; left: 10%; transition: .5s;'></video>`);
    let qrPath = `./Assets/QR/"${character}".png`.replace(/['"]+/g, '');
    let characterQR = $("<img id='QR' src=" + qrPath + "></img>");

    $("body").append(characterDiv);
    $("#character").append(characterAnimation, characterQR);
    start = false;
  }
  //Self Dialogue
  let optionsSelf = {
    strings: ["It’s strange, but I almost feel like I can see the directions in my head. I feel confused... Maybe i should look at my companion to find the way…"],
    typeSpeed: 20,
    showCursor: false
  };
  let selfName = $("<p></p>").html("<span class='bold'>Me: </span>");
  selfName.attr({
    "id": "selfDialogue",
    "class": "dialogue"
  });
  selfName.css({
    "margin-bottom": "0"
  });
  $("#textHolder").append(selfName);
  let selfText = $("<p></p>");
  selfText.attr({
    "id": "selfDialogue",
    "class": "dialogue scrollableDialogue" + dialoghi.toString()
  });
  selfText.css({
    "margin-top": "0"
  });
  $("#textHolder").append(selfText);
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  new Typed('.scrollableDialogue' + dialoghi.toString(), optionsSelf);
  dialoghi++;
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);

  buttons = shuffleArray(buttons);

  //Create the three buttons with the choices
  let choiceOne = $("<button></button>");
  choiceOne.css("background-image", "url(./Assets/Totems/1/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  let choiceTwo = $("<button></button>");
  choiceTwo.css("background-image", "url(./Assets/Totems/2/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  let choiceThree = $("<button></button>");
  choiceThree.css("background-image", "url(./Assets/Totems/3/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  if (character == "Neutrum") {
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`
    });
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`
    });
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `progressDialogue("${character}", "${communication}", ${progress})`
    });
  } else if (character == "Eo") {
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`
    });
    choiceOne.css("background-image", "url(./Assets/Totems/1/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `progressDialogue("${character}", "${communication}", ${progress})`
    });
    choiceTwo.css("background-image", "url(./Assets/Totems/2/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress})`
    });
    choiceThree.css("background-image", "url(./Assets/Totems/3/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  }
  //Add them to the page
  $("body").append(choiceOne, choiceTwo, choiceThree);
  $(".visual, .text, .sound").css({
    "opacity": ".8"
  });
  $("#QR").css({
    "top": "50%",
  });

  $("#characterAnimation, #QR").mouseenter(function() {
    $("#characterAnimation").css({
      "transform": `scale(1.1)`,
      "opacity": ".3"
    });
    $("#QR").css({
      "opacity": `1`
    });
  });
  $("#characterAnimation, #QR").mouseout(function() {
    $("#characterAnimation").css({
      "transform": `scale(1)`,
      "opacity": "1"
    });
    $("#QR").css({
      "opacity": `0`
    });
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

window.startvideo = function() {
  $('#video')[0].play();
  var i = 1 / 16;
  document.querySelector('video').playbackRate = i;
  var intervalId = window.setInterval(function() {
    i = i * 1.5;
    document.querySelector('video').playbackRate = i;
    if (i > 1) {
      clearInterval(intervalId);
      document.querySelector('video').playbackRate = 1.3;
    }
  }, 150);
}

window.stopvideo = function() {
  var i = 1;
  var j = 1;
  var intervalId = window.setInterval(function() {
    i = i / 1.5;
    j++;
    document.querySelector('video').playbackRate = i;
    if (j == 5) {
      clearInterval(intervalId);
      $('#video')[0].pause();
    }
  }, 150);
}

window.textAppear = function(text, intr, buttonPos) {
  if (intr) {
    $("#loading").css({
      "left": "8%",
      "top": "6%",
      "transform": "translate(-50%,-50%)",
      "width": "25%",
      "height": "25%",
      "z-index": "10"
    });
    $("#pLoading").css({
      "opacity": "0",
    });
    $("#loading1").css({
      'cursor': 'auto'
    })
  }
  let continueButton = $("<button></button>");
  continueButton.attr({
    "id": "continueButtonCenter",
    "class": "button",
    'onclick': `introduction(1)`
  });
  let appearingtext = $("<p></p>").text(text);
  appearingtext.attr({
    "id": "appearingText"
  });
  let continuetext = $("<p style='margin-top: 0;'>Continue</p>");

  $("body").append(appearingtext, continueButton);
  $("#continueButtonCenter").append(continuetext);
  setTimeout(function() {
    $("#appearingText").css({
      "opacity": "1"
    });
  }, 400);
}

window.videoAppear = function(link, intr) {
  let appearingvideodiv = $("<div id='appearingVideoDiv'></div>")
  let appearingvideo = $("<video src='./Assets/" + link + "'></div>")
  appearingvideo.attr({
    "id": "appearingVideo"
  });
  let videobackground = $("<div></div>").text("");
  videobackground.attr({
    "id": "videobackground"
  });
  $("body").append(appearingvideodiv);
  $("#appearingVideoDiv").append(appearingvideo, videobackground);
  $('#appearingVideo')[0].play();
}

window.showDialogueText = async function(part, character, progress) {
  let number;
  if (part == "selfDialogue") {
    number = selfDialogue[character][progress - 1].length;
  } else {
    number = characterDescription[character][progress - 1].length;
  }
  for (var i = 0; i < number; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    if (part == "selfDialogue") {
      var optionsSelf = {
        strings: [selfDialogue[character][progress - 1][i]],
        typeSpeed: 30,
        showCursor: false
      };
    } else {
      var optionsSelf = {
        strings: [characterDescription[character][progress - 1][i]],
        typeSpeed: 30,
        showCursor: false
      };
    }
    let selfName = $("<p></p>").html("<span class='bold'>Me: </span>");
    selfName.attr({
      "id": "selfDialogue",
      "class": "dialogue"
    });
    selfName.css({
      "margin-bottom": "0"
    });
    let selfText = $("<p></p>");
    selfText.attr({
      "id": "selfDialogue",
      "class": "dialogue scrollableDialogue" + dialoghi.toString()
    });
    selfText.css({
      "margin-top": "0"
    });
    $("#textHolder").append(selfName, selfText);
    new Typed(".scrollableDialogue" + dialoghi.toString(), optionsSelf);
    dialoghi++;
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    if (part == "selfDialogue") {
      await new Promise(r => setTimeout(r, 50 * selfDialogue[character][progress - 1][i].length));
    } else {
      await new Promise(r => setTimeout(r, 50 * characterDescription[character][progress - 1][i].length));
    }
  }
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  if (progress == 1 && character == "Introduction") {
    tutorial = 1;
  } else if (progress == 2 && character == "Introduction") {
    startvideo();
    setTimeout(function() {
      showDialogueText("selfDialogue", "Firstmeeting", 1);
      document.querySelector('video').playbackRate = 1;
    }, 3500);
    setTimeout(function() {
      characterChoice(1);
    }, 13000);
  }
}

document.body.onkeyup = function(e) {
  if (e.keyCode == 32 && tutorial == 1) {
    tutorial = 2;
    openPipBoy();
  } else if (e.keyCode == 32 && tutorial == 2) {
    tutorial = 3;
    closePipBoy();
    setTimeout(function() {
      showDialogueText("selfDialogue", "Introduction", 2);
    }, 1000);
  } else if (e.keyCode == 32 && tutorial == 3) {
    if (open) {
      closePipBoy();
    } else if (!open) {
      openPipBoy();
    }
  }
}

window.openPipBoy = function() {
  if(pipboyanimate){
    pipboyanimate = false;
    setTimeout(function(){
      open = true;
    }, 1000);
    setTimeout(function() {
      $("#pipboyDiv").css({
        "top": "50%",
        "transform": "translate(-50%, -50%) rotate(0deg) scale(1.1)"
      });
      $("#video, #dialogueBoxHolder").css({
        "filter": "blur(4px)"
      });
      setTimeout(function() {
        $("#pipboyDiv").css({
          "width": "150%",
          "height": "150%"
        });
        setTimeout(function() {
          $("#upper, #lower, #separator").css({
            "opacity": "1"
          });
          $('#buzz').prop("volume", 0.3);
          $('#piponoff').get(0).play();
          //$('#buzz').get(0).play();
          pipboyanimate = true;
        }, 500);
      }, 750);
    }, 1);
  }
}

window.activate = function(menu) {
  $(".active").removeClass("active");
  $(`span:contains("${menu}")`).addClass("active");
  if (menu == "DATALOG") {
    $("#datalogs").css({
      "display": "flex"
    });
    $("#radio, #mail").css({
      "display": "none"
    });
  } else if (menu == "MAIL SYSTEM") {
    $("#mail").css({
      "display": "flex"
    });
    $("#radio, #datalogs").css({
      "display": "none"
    });
  } else if (menu == "RADIO") {
    $("#radio").css({
      "display": "flex"
    });
    $("#mail, #datalogs").css({
      "display": "none"
    });
  }
}

window.closePipBoy = function() {
  if(pipboyanimate){
    pipboyanimate = false;
    setTimeout(function(){
      open = false;
    }, 1000);
    $("#upper, #lower, #separator").css({
      "opacity": "0"
    });
    $('#piponoff').get(0).play();
    $('#buzz').stop();
    setTimeout(function() {
      $("#pipboyDiv").css({
        "width": "100%",
        "height": "100%"
      });
      setTimeout(function() {
        $("#pipboyDiv").css({
          "top": "230%",
          "transform": "translate(-50%, -50%) rotate(35deg) scale(1.1)"
        });
        $("#video, #dialogueBoxHolder").css({
          "filter": "blur(0px)"
        });
        pipboyanimate = true;
      }, 750);
    }, 250);
  }
}

window.changenametag = function(newactive) {
  var datalogs = "";
  $(".characterpipboytag").removeClass("cpt-active");
  $("." + newactive).addClass("cpt-active");
  $("#datalogs #pipboy-text h1").text(newactive.slice(0,-3));
  $("#datalogs #pipboy-text h4, #datalogs #pipboy-text br").remove();
  dataLogsCharacters[newactive.slice(0,-3)].forEach(function(element){
    datalogs = $("<h4>" + element + "</h4>");
    $("#datalogs #pipboy-text").append(datalogs);
  });
  $("#datalogs-character").css("background-image", "url(./Assets/CharactersPipBoy/" + newactive.slice(0,-3) + "_pipboy.png)");
}

window.changeMail = function(newactive, object) {
  $(".mail").removeClass("mail-active");
  $("." + newactive).addClass("mail-active");
  $("#mail #pipboy-text h1").text(object);
}

window.changeRadio = function(newactive) {
  $(".radio-station").removeClass("radio-active");
  $("." + newactive).addClass("radio-active");
  $("#mail #pipboy-text h1").text(newactive.replace('-', ' ' ));
}

window.prototyping = function(progress) {
  //Add progress to top left
  $("#progressDialogue").remove();
  let progressText = $("<p></p>").text(`Progress: "${progress}"`);
  progressText.attr({
    "id": "progressDialogue",
    "class": "dialogue"
  });
  $("body").append(progressText);
}
