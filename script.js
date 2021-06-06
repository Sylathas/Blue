import {
  selfDialogue,
  characterDialogue,
  wrongSelfDialogue,
  wrongCharacterDialogue,
  startingSelfDialogue,
  characterDescription
} from "./dialogues.js";

var start = true;
var dialoghi = 0;

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
    textAppear("Every story is unique, this story makes no exception. This is a story made up of many different unique stories from all the corners of the galaxy. This is a story that takes place where diversity can be expressed, at the cost of dealing with complexity. This is a story about the struggle of understanding. Finally, this is also your story.", true, "center");
  } else if (progress == 1) {
    $(".button, p").css({
      "opacity": "0"
    });
    setTimeout(function() {
      $(".button, p").remove();
      videoAppear("Intrvideo.mp4", true);
      setTimeout(function() {
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
      }, 27000);
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
    createCharacter("Pa", "one");
    createCharacter("TEDD", "two");
    createCharacter("Joe", "three");
  } else if (part == 2) {
    showDialogueText("selfDialogue", "Firstmeeting", 2);
    createCharacter("Eo", "one");
    createCharacter("Neutrum", "two");
  } else if (part == 3) {
    createCharacter("Maisie", "one");
    createCharacter("Swarm", "two");
  }
}

window.sectionProgress = function(character, communication, progress) {
  if (progress < 4) {
    //Dialogue and selection of monuments
    console.log(`Section progress reached, with progress ${progress}`);
    selection(character, communication, progress);
  } else if (progress == 4) {
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
  }, 18000);
  //Create Div with as background image the sprite of the character
  let characterPath = `./Assets/Characters/"${character}".gif`.replace(/['"]+/g, '');
  let characterId = `characterAnimation"${n}"`.replace(/['"]+/g, '');
  let characterAnimation = $(`<img id="${characterId}" src='${characterPath}' style='width:auto; height:100%; position: relative; left: 10%; transition: .5s;'>`);
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
  $("#choosecharacter." + n).append(characterAnimation, characterQR);
  $("#choosecharacter." + n + ", #characterTag." + n).css({
    "opacity": "1"
  });
  let tagPath = `./Assets/Buttons/"${character}".png`.replace(/['"]+/g, '');

  $("#choosecharacter." + n + ", .QR" + n).mouseenter(function() {
    $("#characterAnimation" + n).css({
      "opacity": `.5`
    });
    $(".QR" + n).css({
      "opacity": `1`
    });
  });
  $("#choosecharacter." + n + ", .QR" + n).mouseout(function() {
    $("#characterAnimation" + n).css({
      "opacity": `1`
    });
    $(".QR" + n).css({
      "opacity": `0`
    });
  });
}

window.startDialogue = async function(character, communication, progress, n) {
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
  progress = 0;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue
  let randomNumber = Math.floor(Math.random());
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
  if (communication == "visual") {
    $("#video").attr({
      "src": "BG_" + character + ".mp4"
    });
  }

  for (var i = 0; i < selfDialogue[character][4].length; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    let optionsSelf = {
      strings: [selfDialogue[character][4][i]],
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
    await new Promise(r => setTimeout(r, 35 * selfDialogue[character][4][i].length));
  }
  //Character Dialogue
  for (i = 0; i < characterDialogue[character][4].length; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    let optionsCharacter = {
      strings: [characterDialogue[character][4][i]],
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
    await new Promise(r => setTimeout(r, 35 * characterDialogue[character][4].length));
  }
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

window.characterFocus = function(character, n) {
  $(".button").remove();
  showDialogueText("characterDescription", character, 1);
  $("#choosecharacter." + n).css({
    "pointer-events": "auto",
    "opacity": "1",
    "width": "20%",
    "height": "25%"
  });
  if (n == "one") {
    $("#choosecharacter.two, .QRtwo, #choosecharacter.three, .QRthree").off('mouseenter, mouseout');
    $("#choosecharacter.two").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
    if ($("#choosecharacter.three")) {
      $("#choosecharacter.three").css({
        "pointer-events": "none",
        "opacity": "0.5",
        "width": "20%",
        "height": "15%"
      });
    }
  } else if (n == "two") {
    $("#choosecharacter.one, .QRone, #choosecharacter.three, .QRthree").off('mouseenter, mouseout');
    $("#choosecharacter.one").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
    if ($("#choosecharacter.three")) {
      $("#choosecharacter.three").css({
        "pointer-events": "none",
        "opacity": "0.5",
        "width": "20%",
        "height": "15%"
      });
    }
  } else if (n == "three") {
    $("#choosecharacter.one, .QRone, #choosecharacter.two, .QRtwo").off('mouseenter, mouseout');
    $("#choosecharacter.one, #choosecharacter.two").css({
      "pointer-events": "none",
      "opacity": "0.5",
      "width": "20%",
      "height": "15%"
    });
  }
  $("#choosecharacter." + n + ", .QR" + n).mouseenter(function() {
    $("#characterAnimation" + n).css({
      "opacity": `.5`
    });
    $(".QR" + n).css({
      "opacity": `1`
    });
  });
  $("#choosecharacter." + n + ", .QR" + n).mouseout(function() {
    $("#characterAnimation" + n).css({
      "opacity": `1`
    });
    $(".QR" + n).css({
      "opacity": `0`
    });
  });
  setTimeout(function(){
    $("#choosecharacter.one, #choosecharacter.two, #choosecharacter.three").css({
      "pointer-events": "auto"
    }, 10000);
  })
  let continueButton = $("<button></button>").text("Choose");
  continueButton.attr({
    "id": "continueButton",
    "class": "button",
    'onclick': `startDialogue("${character}", "visual", 1, "${n}")`
  });
  $("body").append(continueButton);
}

window.selection = function(character, communication, progress) {
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
    strings: ["<i>It’s strange, but I almost feel like I can see the directions in my head, I feel like I need to choose wisely…</i>"],
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

  $("#characterAnimation, #QR").mouseenter(function() {
    $("#characterAnimation").css({
      "opacity": `.5`
    });
    $("#QR").css({
      "opacity": `1`
    });
  });
  $("#characterAnimation, #QR").mouseout(function() {
    $("#characterAnimation").css({
      "opacity": `1`
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
  let continueButton = $("<button></button>").text("Continue");
  continueButton.attr({
    "id": "continueButtonCenter",
    "class": "button",
    'onclick': `introduction(1)`
  });
  let appearingtext = $("<p></p>").text(text);
  appearingtext.attr({
    "id": "appearingText"
  });
  $("body").append(appearingtext, continueButton);
  setTimeout(function() {
    $("#appearingText").css({
      "opacity": "1"
    });
  }, 400);
}

window.videoAppear = function(link, intr) {
  if (intr) {
    $("#appearingText").css({
      "opacity": "0"
    });
    setTimeout(function() {
      $("#appearingText").css({
        "display": "none"
      });
    }, 500);
  }
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
  $(".button").remove();
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
        typeSpeed: 40,
        showCursor: false
      };
    } else {
      var optionsSelf = {
        strings: [characterDescription[character][progress - 1][i]],
        typeSpeed: 40,
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
      await new Promise(r => setTimeout(r, 70 * selfDialogue[character][progress - 1][i].length));
    } else {
      await new Promise(r => setTimeout(r, 70 * characterDescription[character][progress - 1][i].length));
    }
  }
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  let continueButton = $("<button></button>").text("Continue");
  if (progress == 1 && character == "Introduction") {
    continueButton.attr({
      "id": "continueButton",
      "class": "button",
      'onclick': `showDialogueText("selfDialogue", "Introduction", 2)`
    });
    $("body").append(continueButton);
  } else if (progress == 2 && character == "Introduction") {
    startvideo();
    setTimeout(function() {
      showDialogueText("selfDialogue", "Firstmeeting", 1);
      document.querySelector('video').playbackRate = 1;
    }, 3500);
    setTimeout(function() {
      characterChoice(2);
    }, 18000);
  }
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
