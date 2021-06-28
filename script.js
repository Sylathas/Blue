import {
  selfDialogue,
  characterDialogue,
  wrongSelfDialogue,
  wrongCharacterDialogue,
  startingSelfDialogue,
  characterDescription,
  dataLogsCharacters,
  textButtonText,
  mails,
  names,
  intermezzo
} from "./dialogues.js";

var start = true;
var dialoghi = 0;
var tutorial = 0;
var open = false;
var pipboyanimate = true;
var part = 0;
var log1 = 0;
var log2 = 0;
var log3 = 0;
var pg1 = "Understanding goes two ways.. one may think that he’s trying to understand the other, but all the while he’s the one being understood.";
var pg2 = "Purpose doesn’t exist, and if it does it can easily be ignored… sometimes though a man could very well need a purpose, while purpose almost never needs a man.";
var pg3;
var again = true;
var clickedtag = false;

$("#devices").css({
  "opacity": "1"
});
setTimeout(() => {
  $("#devices").css({
    "opacity": "0"
  });
  $("#loading1, #loading2, #pLoading").css({
    "opacity": "1"
  });
  again = false;
}, 3000);

$(document).ready(function() {
  startWebsite()
});

window.startWebsite = function() {
  if (again) {
    setTimeout(() => {
      startWebsite();
    }, 1000);
  } else {
    loading();
  }
}

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
    textAppear("Every story is unique, this story makes no exception.\n This is a story made up of many different unique stories from all the corners of the galaxy.\n This is a story that takes place where diversity can be expressed, at the cost of dealing with complexity.\n This is a story about the struggle of understanding.\n Finally, this is also your story.", true, "center");
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
        $('#music').prop("volume", 0);
        $("#music").get(0).play();
        var i = 0;
        var j = 1;
        var intervalId = window.setInterval(function() {
          i = i + 0.1;
          j++;
          $('#music').prop("volume", i);
          if (j == 5) {
            clearInterval(intervalId);
          }
        }, 100);
      }, 24000);
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
    $(".selezionepersonaggio").css({
      "opacity": "1"
    });
    let continueButton = $("<button></button>");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  } else if (part == 3) {
    createCharacter("Maisie", "six");
    createCharacter("Swarm", "seven");
    $(".selezionepersonaggio").css({
      "opacity": "1"
    });
    let continueButton = $("<button></button>");
    continueButton.attr({
      "id": "chooseCharacterButton",
      "class": "button chooseCharacterButtonPre"
    });
    $("body").append(continueButton);
  }
}

window.sectionProgress = function(character, communication, progress, n) {
  if (part < 4) {
    if (progress < 5) {
      //Dialogue and selection of monuments
      console.log(`Section progress reached, with progress ${progress}`);
      selection(character, communication, progress, n);
    } else if (progress == 5) {
      //End of part
      progress = 0;
      newMail();
      notify("mail", character);
      part++;
      finalDialogue(character, communication, progress, 0);
      start = true;
    }
  } else {
    ending();
  }
}

//FUNCTIONS ABOUT DIALOGUES, CHOICES AND DIV CREATION

window.createCharacter = function(character, n) {
  //Create parent div
  let characterDiv = $("<div></div>").text(character);
  characterDiv.attr({
    "id": "choosecharacter",
    "class": n
  });
  if (n === "one" || n === "two") {
    setTimeout(function() {
      characterDiv.attr({
        "onclick": `characterFocus("${character}", "${n}")`
      });
      $("#chooseCharacterButton").css({
        "opacity": "0"
      });
      $("#chooseCharacterButton").text("");
      $(".selezionepersonaggio, #characterAnimation" + n).css({
        "opacity": "1"
      });
    }, 15000);
  } else {
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
  $("body").append(characterDiv, characterTag, characterQR);
  if (n === "one" || n === "two") {
    setTimeout(function() {
      $(".selezionepersonaggio").css({
        "opacity": ".5"
      });
    }, 200);
  } else {
    $(".selezionepersonaggio").css({
      "opacity": "1"
    });
  }

  $("#choosecharacter." + n).append(characterAnimation);
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
  if ("communication" == "visual") {
    createLog(character, log1);
    notify("log", character);
  } else if ("communication" == "text") {
    createLog(character, log2);
    notify("log", character);
  } else {
    createLog(character, log3);
    notify("log", character);
    pg3 = selfDialogue[character][4][2];
  }
  $(".button, #QR").css({
    "opacity": "0"
  });
  setTimeout(function() {
    $(".button, #QR").remove();
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
  if (communication == "audio") {
    $("#audioButton, #chooseAudioButton").remove();
  }
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
  if ("communication" == "visual") {
    if (progress > log1 + 1) {
      log1++;
      $(`.${character}tag`).attr({
        "onclick": `changenametag('${character}tag', ${log1})`
      });
    }
  } else if ("communication" == "text") {
    if (progress > log2 + 1) {
      log2++;
      $(`.${character}tag`).attr({
        "onclick": `changenametag('${character}tag', ${log2})`
      });
    }
  } else {
    if (progress > log3 + 1) {
      log3++;
      $(`.${character}tag`).attr({
        "onclick": `changenametag('${character}tag', ${log3})`
      });
    }
  }
  //Continue button
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({
    "id": "continueButton",
    "class": "button",
    'onclick': `startvideo(); $(".button, #totemone").remove(); setTimeout(() => {sectionProgress("${character}", "${communication}", ${progress})}, 3000);`
  });
  //Add them to the body
  setTimeout(() => {
    stopvideo();
    let totem = $("<div id='totemone'></div>");
    $("body").append(continueButton, totem);
    totem.css({
      "opacity": "1"
    });
    if (character == "Eo" || character == "Tedd" || character == "Swarm") {
      totem.addClass("totemRound");
    } else if (character == "Pa" || character == "Maisie") {
      totem.addClass("totemSquare");
    } else if (character == "Joe" || character == "Neutrum") {
      totem.addClass("totemTriangle");
    }
  }, 3000);
}

window.wrongDialogue = async function(character, communication, progress, n) {
  startvideo();
  if (communication == "audio") {
    $("#audioButton, #chooseAudioButton").remove();
  }
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
    'onclick': `$(".button").remove();setTimeout(() => {sectionProgress("${character}", "${communication}", "${progress}", "${n}")}, 3000);`
  });
  //Add them to the body
  setTimeout(() => {
    $("body").append(continueButton);
  }, 3000);
}

window.finalDialogue = async function(character, communication, progress, partNumber) {
  stopvideo();
  if (partNumber == 0) {
    console.log(part);
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
    if (partNumber < selfDialogue[character][4].length - 1) {
      $("#appearingText").css({
        "opacity": "0"
      });
      setTimeout(() => {
        finalDialogue(character, communication, progress, partNumber + 1);
      }, 1000);
    } else {
      //Continue button
      let continueButton = $("<button style='z-index: 10; opacity: 0;'></button>").text("Continue");
      continueButton.attr({
        "id": "continueButtonCenter",
        "class": "button",
        'onclick': `intermezzo()`
      });
      //Add them to the body
      $("body").append(continueButton);
      continueButton.css({
        "opacity": "1"
      });
    }
  }, 4000);
}

window.ending = function() {
  //ending
  $("#endingDiv").css({
    "background-color": "black"
  });
  $("#appearingText, #continueButtonCenter").css({
    "opacity": "0"
  });
  setTimeout(() => {
    $("#appearingText, #continueButtonCenter").remove();
    let phrase1 = $(`<h2 style="color: white; font-family: Blender; text-align: center; position: absolute; left: 50%; transform: translate(-50%,-50%); top: 20%; opacity: 0; transition: 1s; font-weight: normal">${pg1}</h2>`);
    let phrase2 = $(`<h2 style="color: white; font-family: Blender; text-align: center; position: absolute; left: 50%; transform: translate(-50%,-50%); top: 50%; opacity: 0; transition: 1s; font-weight: normal">${pg2}</h2>`);
    let phrase3 = $(`<h2 style="color: white; font-family: Blender; text-align: center; position: absolute; left: 50%; transform: translate(-50%,-50%); top: 80%; opacity: 0; transition: 1s; font-weight: normal">${pg3}</h2>`);
    $("#endingDiv").append(phrase1, phrase2, phrase3);
    setTimeout(() => {
      $("#endingDiv h2").css({
        "opacity": "1"
      });
    }, 500);
    setTimeout(() => {
      $("#endingDiv h2").css({
        "opacity": "0"
      });
      let finalphrase = $(`<h1 style="font-weight: normal; color: white; font-family: Blender; text-align: center; position: absolute; left: 50%; transform: translate(-50%,-50%); top: 40%; opacity: 0; transition: 1s;">I have come a long way…<br>I feel this is the end…<br>Or maybe… a new beginning.</h1>`);
      let finalButton = $("<button style='opacity: 0; transition: 1s; color: white;'><p style='margin-top: 0;'>Send a signal</p></button>");
      finalButton.attr({
        "id": "continueButtonCenter",
        "class": "button",
        'onclick': `playFinalVideo()`
      });
      $("#endingDiv").append(finalphrase, finalButton);
      setTimeout(() => {
        $("#endingDiv h2").remove();
        $("#endingDiv h1, #endingDiv button").css({
          "opacity": "1"
        });
      }, 1000);
    }, 14000);
  }, 3000);
}

window.playFinalVideo = function() {
  $("#endingDiv h5, #continueButtonCenter").css({
    "opacity": "0"
  });
  setTimeout(() => {
    $("#endingDiv h5, #continueButtonCenter").remove();
    let finalVideoDiv = $(`<div id="finalVideo" style="opacity: 0; z-index: 10; transition: 1s; position: absolute; left: 0; top: 0; width: 100vw; height: 100vh;"></div>`);
    let finalVideo = $(`<video src="./Assets/finalVideo.mp4" style="position: relative; left: 0; top: 0; width: 100%; height: auto; transition: 1s;"></video>`);
    $("body").append(finalVideoDiv);
    finalVideoDiv.append(finalVideo);
    finalVideoDiv.css({
      "opacity": "1"
    });
    $("#finalVideo video").get(0).play();
    setTimeout(() => {
      $("#endingDiv h1, #endingDiv button").remove();
      finalVideoDiv.css({
        "opacity": "0"
      });
    }, 15000);
  }, 1000);
}

window.intermezzo = async function() {
  if (part < 4) {
    stopvideo();
    $(".button").remove();
    $("#character").remove();
    $("#endingDiv").css({
      "opacity": "0"
    });
    for (var i = 0; i < intermezzo["Intermezzo"][0].length; i++) {
      $("#textHolder").animate({
        scrollTop: $('#textHolder').prop("scrollHeight")
      }, 1000);
      //typed
      let optionsSelf = {
        strings: [intermezzo["Intermezzo"][0][i]],
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
      await new Promise(r => setTimeout(r, 70 * intermezzo["Intermezzo"][0][i].length));
    }
    setTimeout(() => {
      $("#endingDiv").remove();
      startvideo();
      setTimeout(() => {
        characterChoice();
      }, 2000);
    }, 2000);
  } else {
    ending();
  }
}

window.characterFocus = function(character, n) {
  let style;
  showDialogueText("characterDescription", character, 1);
  $("#choosecharacter." + n).css({
    "opacity": "1",
    "pointer-events": "auto"
  });
  $("#characterTag." + n).css({
    "opacity": "1"
  });
  $(".QRone, .QRtwo, .QRthree, .QRfour, .QRfive, .QRsix, .QRseven").css({
    "opacity": "1"
  });
  if (n == "one") {
    style = "visual";
    $("#choosecharacter.two, .QRtwo, #characterTag.two").off('mouseenter, mouseout');
    $("#choosecharacter.two").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRtwo").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.two").css({
      "opacity": ".5",
    });
  } else if (n == "two") {
    style = "visual";
    $("#choosecharacter.one, .QRone, #characterTag.one").off('mouseenter, mouseout');
    $("#choosecharacter.one").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRone").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.one").css({
      "opacity": ".5",
    });
  } else if (n == "three") {
    style = "text";
    $("#choosecharacter.four, .QRfour, #characterTag.four, #choosecharacter.five, .QRfive, #characterTag.five").off('mouseenter, mouseout');
    $("#choosecharacter.four, #choosecharacter.five").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRfour, .QRfive").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.four, #characterTag.five").css({
      "opacity": ".5",
    });
  } else if (n == "four") {
    style = "text";
    $("#choosecharacter.three, .QRthree, #characterTag.three, #choosecharacter.five, .QRfive, #characterTag.five").off('mouseenter, mouseout');
    $("#choosecharacter.three, #choosecharacter.five").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRthree, .QRfive").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.three, #characterTag.five").css({
      "opacity": ".5",
    });
  } else if (n == "five") {
    style = "text";
    $("#choosecharacter.three, .QRthree, #characterTag.three, #choosecharacter.four, .QRfour, #characterTag.four").off('mouseenter, mouseout');
    $("#choosecharacter.three, #choosecharacter.four").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRthree, .QRfour").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.three, #characterTag.four").css({
      "opacity": ".5",
    });
  } else if (n == "six") {
    style = "audio";
    $("#choosecharacter.seven, .QRseven, #characterTag.seven").off('mouseenter, mouseout');
    $("#choosecharacter.seven").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRseven").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.seven").addClass("tempTag");
  } else if (n == "seven") {
    style = "audio";
    $("#choosecharacter.six, .QRsix, #characterTag.six").off('mouseenter, mouseout');
    $("#choosecharacter.six").css({
      "opacity": ".5",
      "pointer-events": "none"
    });
    $(".QRsix").css({
      "pointer-events": "none",
      "opacity": "0"
    });
    $("#characterTag.six").css({
      "opacity": ".5",
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
  $("#chooseCharacterButton").css({
    "opacity": "0"
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
    strings: [`It’s strange, but I almost feel like I can see the directions in my head. I feel confused... Maybe i should look at my companion to find the way… I should scan ${character} to understand the right choice.`],
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

  //Create the three buttons with the choices
  let choiceThree = $("<button></button>");
  let choiceOne = $("<button></button>");
  let choiceTwo = $("<button></button>");
  if (communication == "visual") {
    shuffleArray(buttons);
    choiceOne.css("background-image", "url(./Assets/Totems/1/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceTwo.css("background-image", "url(./Assets/Totems/2/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
    choiceThree.css("background-image", "url(./Assets/Totems/3/" + (Math.floor(Math.random() * 5) + 1) + ".gif");
  } else if (communication == "text") {
    choiceOne.css("background-image", "url(./Assets/Buttons/TextBox.png");
    var choiceOneText = $("<p></p>").text(textButtonText["Square"][rand(5)]);
    choiceTwo.css("background-image", "url(./Assets/Buttons/TextBox.png");
    var choiceTwoText = $("<p></p>").text(textButtonText["Round"][rand(5)]);
    choiceThree.css("background-image", "url(./Assets/Buttons/TextBox.png");
    var choiceThreeText = $("<p></p>").text(textButtonText["Triangle"][rand(5)]);
  } else if (communication == "audio") {
    choiceOne.css("background-image", "url(./Assets/Buttons/PlayBox.png");
    choiceTwo.css("background-image", "url(./Assets/Buttons/PlayBox.png");
    choiceThree.css("background-image", "url(./Assets/Buttons/PlayBox.png");
    let chooseButton = $("<button id='chooseAudioButton'>Choose</button>");
    $("body").append(chooseButton);
  }

  if (character == "Neutrum" || character == "Pa") {
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
  } else if (character == "Eo" || character == "Tedd") {
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
  } else if (character == "Joe") {
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
  } else if (character == "Maisie" || character == "Swarm") {
    choiceOne.attr({
      "id": buttons[0],
      "class": communication + " button",
      'onclick': `playSound("choiceOne", '${character}', "${communication}", ${progress}, "${n}")`
    });
    choiceTwo.attr({
      "id": buttons[1],
      "class": communication + " button",
      'onclick': `playSound("choiceTwo", '${character}', "${communication}", ${progress}, "${n}")`
    });
    choiceThree.attr({
      "id": buttons[2],
      "class": communication + " button",
      'onclick': `playSound("choiceThree", '${character}', "${communication}", ${progress}, "${n}")`
    });
  }
  //Add them to the page
  $("body").append(choiceOne, choiceTwo, choiceThree);
  if (communication == "text") {
    $("#choiceOne").append(choiceOneText);
    $("#choiceTwo").append(choiceTwoText);
    $("#choiceThree").append(choiceThreeText);
  }
  $(".visual, .text, .audio").css({
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
  $("#footsteps").prop("volume", .5);
  $("#footsteps").get(0).play();
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
  $("#footsteps").get(0).pause();
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
  let appearingtext = $("<p style='white-space: pre-line;'></p>").text(text);
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
  } else if (textPart == "intermezzo") {
    number
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

window.changenametag = function(newactive, log) {
  clickedtag = true;
  var datalogs = "";
  var i = 0;
  $(".characterpipboytag").removeClass("cpt-active");
  $("." + newactive).addClass("cpt-active");
  $("#datalogs #pipboy-text h1").text(newactive.slice(0, -3));
  $("#datalogs #pipboy-text h4, #datalogs #pipboy-text br").remove();
  dataLogsCharacters[newactive.slice(0, -3)].forEach(function(element) {
    i++
    console.log(i);
    console.log(log);
    if (i < log + 1) {
      console.log("ciao");
      datalogs = $("<h4>" + element + "</h4>");
      $("#datalogs #pipboy-text").append(datalogs);
    }
  });
  $("#datalogs-character").css("background-image", "url(./Assets/CharactersPipBoy/" + newactive.slice(0, -3) + "_pipboy.png)");
}

window.updatetag = function() {
  var log;
  var i = 0;
  var datalogs = "";
  $("#datalogs #pipboy-text h4, #datalogs #pipboy-text br").remove();
  var classList = $(".cpt-active").attr('class').split(/\s+/);
  if ((classList[0].slice(0, -3)).toString() == "Eo" || (classList[0].slice(0, -3)).toString() == "Neutrum") {
    log = log1;
  } else if ((classList[0].slice(0, -3)).toString() == "Joe" || (classList[0].slice(0, -3)).toString() == "Pa" || (classList[0].slice(0, -3)).toString() == "Tedd") {
    log = log2;
  } else {
    log = log3;
  }
  console.log(log);
  console.log(classList[0].slice(0, -3));
  dataLogsCharacters[classList[0].slice(0, -3)].forEach(function(element) {
    i++
    if (i < log) {
      datalogs = $("<h4>" + element + "</h4>");
      $("#datalogs #pipboy-text").append(datalogs);
    }
  });
}

window.changeMail = function(newactive, object, partona) {
  $(".mail").removeClass("mail-active");
  $("." + newactive).addClass("mail-active");
  $("#mail #pipboy-text h1").text(object);
  $("#mail #pipboy-text h4, #mail #pipboy-text a, #mail #pipboy-text div").remove();
  for (let i = 2; i < mails["Mails"][partona].length; i++) {
    let h4text = $("<h4>" + mails["Mails"][partona][i] + "</h4>")
    $("#mail #pipboy-text").append(h4text);
  }
  if (newactive == "message-5") {
    let h4text = $("<a href='https://sdgs.un.org/goals/goal3' target='_blank'>Check the documentation</a>");
    $("#mail #pipboy-text").append(h4text);
  } else if (newactive == "message-4") {
    let imagesDiv = $("<div style='width: 100%; height: 100%;'></div>");
    $("#mail #pipboy-text").append(imagesDiv);
    for (let i = 0; i < 7; i++) {
      let images = $(`<div style='margin-bottom: 3%; position: relative; width: 50%; height: 30%; background-image: url("./Assets/Us/${i}.png"); background-size: contain; background-repeat: no-repeat; background-position: center;'></div>`);
      let caption = $(`<p style="margin-bottom: 10%;">${names["Names"][i]}</p>`);
      imagesDiv.append(images, caption);
    }
  }
}

window.newMail = function() {
  let mailNameDiv = $(`<div class="mail message-${part}" onclick="changeMail('message-${part}', '${mails["Mails"][part][1]}', '${part}')"><h2>${mails["Mails"][part][0]}</h2></div>`);
  $("#mail-names").append(mailNameDiv);
}

window.createLog = function(character, log) {
  let nameLog = $(`<div class="${character}tag characterpipboytag" onclick="changenametag('${character}tag', 0)"><h2>${character}</h2></div>`);
  $("#datalogs-charactertabs").append(nameLog);
}

window.changeRadio = function(newactive, station) {
  $(".radio-station").removeClass("radio-active");
  $("." + newactive).addClass("radio-active");
  $("#mail #pipboy-text h1").text(newactive.replace('-', ' '));
  $("#music").attr("src", "Assets/Sounds/" + station + ".mp3");
  $("#music").get(0).play();
}

window.playSound = function(choice, character, communication, progress, n) {
  $("#chooseAudioButton").css({
    "opacity": ".8"
  });
  if (character == "Maisie") {
    if (choice == "choiceThree" || choice == "choiceTwo") {
      $("#chooseAudioButton").attr({
        "onclick": `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
      });
    } else if (choice == "choiceOne") {
      $("#chooseAudioButton").attr({
        "onclick": `progressDialogue("${character}", "${communication}", ${progress}, "${n}")`
      });
    }
  } else if (character == "Swarm") {
    if (choice == "choiceOne" || choice == "choiceThree") {
      $("#chooseAudioButton").attr({
        "onclick": `wrongDialogue("${character}", "${communication}", ${progress}, "${n}")`
      });
    } else if (choice == "choiceTwo") {
      $("#chooseAudioButton").attr({
        "onclick": `progressDialogue("${character}", "${communication}", ${progress}, "${n}")`
      });
    }
  }
  $("#choiceThree, #choiceOne, #choiceTwo").css({
    "background-image": "url('./Assets/Buttons/PlayBox.png')"
  });
  $("#" + choice).css({
    "background-image": "url('./Assets/Buttons/PauseBox.png')"
  });
  $("#" + choice).attr({
    "onclick": `stopSound("${choice}", "${character}", "${communication}", ${progress}, "${n}")`
  });
  $("#audioButton").remove();
  if (choice == "choiceOne") {
    var audio = $("<audio loop id='audioButton' src='Assets/Sounds/AudioButtons/Ambient/" + (Math.floor(Math.random() * 12) + 1) + ".wav' type='audio/wav' style='display: none;'></audio>")
  } else if (choice == "choiceTwo") {
    var audio = $("<audio loop id='audioButton' src='Assets/Sounds/AudioButtons/Industrial/" + (Math.floor(Math.random() * 14) + 1) + ".wav' type='audio/wav' style='display: none;'></audio>")
  } else if (choice == "choiceThree") {
    var audio = $("<audio loop id='audioButton' src='Assets/Sounds/AudioButtons/Samba/" + (Math.floor(Math.random() * 12) + 1) + ".wav' type='audio/wav' style='display: none;'></audio>")
  }
  $("body").append(audio);
  $("#audioButton").get(0).play();
}

window.stopSound = function(choice, character, communication, progress, n) {
  $("#choiceThree, #choiceOne, #choiceTwo").css({
    "background-image": "url('./Assets/Buttons/PlayBox.png')"
  });
  $("#" + choice).attr({
    "onclick": `playSound("${choice}", "${character}", "${communication}", ${progress}, "${n}")`
  });
  $("#audioButton").remove();
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

window.notify = function(type, character) {
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  //typed
  if (type == "log") {
    var optionsSelf = {
      strings: [`<i>You have a new log about ${character} in your menu!</i>`],
      typeSpeed: 40,
      showCursor: false
    };
  } else if (type == "mail") {
    var optionsSelf = {
      strings: ["<i>You have recieved a new Mail!</i>"],
      typeSpeed: 40,
      showCursor: false
    };
  }
  let selfName = $("<p></p>").html("<span class='bold'>Computer: </span>");
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
    "class": "dialogue scrollableDialogue"
  });
  selfText.css({
    "margin-top": "0"
  });
  $("#textHolder").append(selfName, selfText);
  new Typed(".scrollableDialogue", optionsSelf);
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
}

window.rand = function(i) {
  return Math.floor(Math.random() * i);
}
