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
var part = 0;

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

window.characterChoice = function() {
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
    createCharacter("Pa", "three");
    createCharacter("Tedd", "four");
    createCharacter("Joe", "five");
    let continueButton = $("<button></button>");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  } else if (part == 3) {
    createCharacter("Maisie", "six");
    createCharacter("Swarm", "seven");
    let continueButton = $("<button></button>");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  }
}

window.sectionProgress = function(character, communication, progress, n) {
  if (progress < 5) {
    //Dialogue and selection of monuments
    console.log(`Section progress reached, with progress ${progress}`);
    selection(character, communication, progress, n);
  } else if (progress == 5) {
    //End of part
    progress = 0;
    part++;
    finalDialogue(character, communication, progress, 0);
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
  if(n === "one" || n === "two"){
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
  } else{
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
  }
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
  setTimeout(function() {
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
  setTimeout(function() {
    $(".button").remove();
  }, 500);
  startvideo();
  //Remove old dialogues and buttons
  $("#characterTag.one, #characterTag.two, #characterTag.three, #characterTag.four, #characterTag.five, #characterTag.six, #characterTag.seven").css({
    "opacity": "0"
  });
  if (n == "one") {
    $("#choosecharacter.two").remove();
  } else if (n == "two") {
    $("#choosecharacter.one").remove();
  } else if (n == "three") {
    $("#choosecharacter.four").remove();
    $("#choosecharacter.five").remove();
  } else if (n == "four") {
    $("#choosecharacter.five").remove();
    $("#choosecharacter.three").remove();
  } else if (n == "five") {
    $("#choosecharacter.four").remove();
    $("#choosecharacter.three").remove();
  } else if (n == "six") {
    $("#choosecharacter.seven").remove();
  } else if (n == "seven") {
    $("#choosecharacter.six").remove();
  }

  $("." + n).css({
    "left": "20%"
  });
  setTimeout(function() {
    $("#characterTag.one").remove();
    $("#characterTag.two").remove();
    $("#characterTag.three").remove();
    $("#characterTag.four").remove();
    $("#characterTag.five").remove();
    $("#characterTag.six").remove();
    $("#characterTag.seven").remove();
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
  sectionProgress(character, communication, 1, n);
}

window.progressDialogue = async function(character, communication, progress, n) {
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
    'onclick': `startvideo(); $(".button, #totemone").remove(); setTimeout(() => {sectionProgress("${character}", "${communication}", ${progress})}, 2000);`
  });
  //Add them to the body
  setTimeout(() => {
    stopvideo();
    let totem = $("<div id='totemone'></div>");
    $("body").append(continueButton, totem);
    totem.css({
      "opacity": "1"
    });
    if(character == "Eo" || character == "Tedd" || character == "Swarm"){
      totem.addClass("totemRound");
    } else if(character == "Pa" || character == "Maisie"){
      totem.addClass("totemSquare");
    } else if(character == "Joe" || character == "Neutrum"){
      totem.addClass("totemTriangle");
    }
  }, 3000);
}

window.wrongDialogue = async function(character, communication, progress, n) {
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
    'onclick': `$(".button").remove();setTimeout(() => {sectionProgress("${character}", "${communication}", "${progress}", "${n}")}, 1000);`
  });
  //Add them to the body
  setTimeout(() => {
    $("body").append(continueButton);
  }, 3000);
}

window.finalDialogue = async function(character, communication, progress, partNumber) {
  stopvideo();
  if (partNumber == 0) {
    //Remove old dialogues and buttons
    $(".button").remove();
    //Create white DIV
    let endingDiv = $("<div id='endingDiv'></div>");
    $("body").append(endingDiv);
    setTimeout(() => {
      $("#endingDiv").css({
        "opacity": "1"
      });
      setTimeout(() => {
        $("#appearingText").css({
          "opacity": "1"
        });
      }, 1000);
    }, 200);
    //Self Dialogue
    let selfText = $("<p style='color: black; z-index:11; opacity: 1'></p>");
    selfText.attr({
      "id": "appearingText",
    });
    $("#endingDiv").append(selfText);
  }
  $("#appearingText").css({
    "opacity": "1"
  });

  progress++;
  //Prototyping help
  //prototyping(progress);

  setTimeout(function() {
    if (communication == "visual") {
      $("#video").attr({
        "src": "./Assets/BG_" + character + ".mp4"
      });
      $('#video')[0].play();
    }
  }, 2000);

  $("#appearingText").text(selfDialogue[character][4][partNumber]);

  setTimeout(function() {
    if (partNumber < selfDialogue[character][4].length) {
      $("#appearingText").css({
        "opacity": "1"
      });
      setTimeout(() => {
        finalDialogue(character, communication, progress, partNumber + 1);
      }, 1000);
    } else {
      //Continue button
      let continueButton = $("<button style='z-index: 11; opacity: 0;'></button>").text("Continue");
      continueButton.attr({
        "id": "continueButtonCenter",
        "class": "button",
        'onclick': `part++; if(part < 4){intermezzo();} else{ending();}`
      });
      //Add them to the body
      $("body").append(continueButton);
      continueButton.css({
        "opacity": "1"
      });
    }
  }, 2000);
}

window.intermezzo = function() {
  $(".button").remove();
  $("#character").remove();
  $("#endingDiv").css({"opacity": "0"});
  setTimeout(() => {
    $("#endingDiv").remove();
    startvideo();
    characterChoice();
  }, 2000);
}

window.characterFocus = function(character, n) {
  let style;
  showDialogueText("characterDescription", character, 1);
  $("#choosecharacter." + n).removeClass("temp");
  $("#characterTag." + n).removeClass("tempTag");
  $(".QRone, .QRtwo, .QRthree, .QRfour, .QRfive, .QRsix, .QRseven").css({
    "opacity": "1"
  });
  if (n == "one") {
    style = "visual";
    $("#choosecharacter.two, .QRtwo, #characterTag.two").off('mouseenter, mouseout');
    $("#choosecharacter.two").addClass("temp");
    $(".QRtwo").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.two").addClass("tempTag");
  } else if (n == "two") {
    style = "visual";
    $("#choosecharacter.one, .QRone, #characterTag.one").off('mouseenter, mouseout');
    $("#choosecharacter.one").addClass("temp");
    $(".QRone").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.one").addClass("tempTag");
  } else if (n == "three") {
    style = "text";
    $("#choosecharacter.four, .QRfour, #characterTag.four, #choosecharacter.five, .QRfive, #characterTag.five").off('mouseenter, mouseout');
    $("#choosecharacter.four, #choosecharacter.five").addClass("temp");
    $(".QRfour, .QRfive").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.four, #characterTag.five").addClass("tempTag");
  } else if (n == "four") {
    style = "text";
    $("#choosecharacter.six, .QRsix, #characterTag.six, #choosecharacter.five, .QRfive, #characterTag.five").off('mouseenter, mouseout');
    $("#choosecharacter.six, #choosecharacter.five").addClass("temp");
    $(".QRsix, .QRfive").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.six, #characterTag.five").addClass("tempTag");
  } else if (n == "five") {
    style = "text";
    $("#choosecharacter.six, .QRsix, #characterTag.six, #choosecharacter.four, .QRfour, #characterTag.four").off('mouseenter, mouseout');
    $("#choosecharacter.six, #choosecharacter.four").addClass("temp");
    $(".QRsix, .QRfour").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.six, #characterTag.four").addClass("tempTag");
  } else if (n == "six") {
    style = "sound";
    $("#choosecharacter.seven, .QRseven, #characterTag.seven").off('mouseenter, mouseout');
    $("#choosecharacter.seven").addClass("temp");
    $(".QRseven").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.seven").addClass("tempTag");
  } else if (n == "seven") {
    style = "sound";
    $("#choosecharacter.six, .QRsix, #characterTag.six").off('mouseenter, mouseout');
    $("#choosecharacter.six").addClass("temp");
    $(".QRsix").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.six").addClass("tempTag");
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
  $("#chooseCharacterButton").text("Choose " + character);
  $("#chooseCharacterButton").css({
    "opacity": ".5"
  })
  $("#chooseCharacterButton").removeClass("chooseCharacterButtonPre");
  $("#chooseCharacterButton").addClass("chooseCharacterButton");
  setTimeout(function() {
    $("#choosecharacter.one, #choosecharacter.two, #choosecharacter.three, #choosecharacter.four, #choosecharacter.five, #choosecharacter.six, #choosecharacter.seven").css({
      "pointer-events": "auto"
    });
    $("#chooseCharacterButton").attr({
      'onclick': `startDialogue("${character}", "${style}", 1, "${n}")`
    });
    $("#chooseCharacterButton").css({
      "opacity": "1"
    })
  }, 10000);

}

window.selection = async function(character, communication, progress, n) {
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
      "id": "character",
      "class": `${n}char`
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
  let choiceThree = $("<button></button>");
  let choiceOne = $("<button></button>");
  let choiceTwo = $("<button></button>");
  if(communication == "visual"){
    choiceOne.css("background-image", "url(./Assets/Totems/1/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceTwo.css("background-image", "url(./Assets/Totems/2/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceThree.css("background-image", "url(./Assets/Totems/3/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  } else if(communication == "text"){
    choiceOne.css("background-image", "url(./Assets/Buttons/TextBox.png");
    choiceTwo.css("background-image", "url(./Assets/Buttons/TextBox.png");
    choiceThree.css("background-image", "url(./Assets/Buttons/TextBox.png");
  } else if(communication == "audio"){
    choiceOne.css("background-image", "url(./Assets/Buttons/PlayBox.png");
    choiceTwo.css("background-image", "url(./Assets/Buttons/PlayBox.png");
    choiceThree.css("background-image", "url(./Assets/Buttons/PlayBox.png");
  }

  if (character == "Neutrum" || character == "Pa" || character == "Swarm") {
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `progressDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
  } else if (character == "Eo" || character == "Joe" || character == "Maisie") {
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `progressDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
  } else if (character == "Tedd"){
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `progressDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
    });
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
  let continuetext = $("<p style='margin-top: 0; color: white'>Continue</p>");

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

window.showDialogueText = async function(textPart, character, progress) {
  let number;
  if (textPart == "selfDialogue") {
    number = selfDialogue[character][progress - 1].length;
  } else {
    console.log(character);
    number = characterDescription[character][progress - 1].length;
  }
  for (var i = 0; i < number; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    if (textPart == "selfDialogue") {
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
    if (textPart == "selfDialogue") {
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
      part++;
      characterChoice();
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
  if (pipboyanimate) {
    pipboyanimate = false;
    setTimeout(function() {
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
  if (pipboyanimate) {
    pipboyanimate = false;
    setTimeout(function() {
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
  $("#datalogs #pipboy-text h1").text(newactive.slice(0, -3));
  $("#datalogs #pipboy-text h4, #datalogs #pipboy-text br").remove();
  dataLogsCharacters[newactive.slice(0, -3)].forEach(function(element) {
    datalogs = $("<h4>" + element + "</h4>");
    $("#datalogs #pipboy-text").append(datalogs);
  });
  $("#datalogs-character").css("background-image", "url(./Assets/CharactersPipBoy/" + newactive.slice(0, -3) + "_pipboy.png)");
}

window.changeMail = function(newactive, object) {
  $(".mail").removeClass("mail-active");
  $("." + newactive).addClass("mail-active");
  $("#mail #pipboy-text h1").text(object);
}

window.changeRadio = function(newactive) {
  $(".radio-station").removeClass("radio-active");
  $("." + newactive).addClass("radio-active");
  $("#mail #pipboy-text h1").text(newactive.replace('-', ' '));
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
