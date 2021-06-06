import {
  selfDialogue,
  characterDialogue,
  wrongSelfDialogue,
  wrongCharacterDialogue,
  startingSelfDialogue,
  startingCharacterDialogue
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
    textAppear("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae ipsum malesuada, laoreet nisl et, maximus ligula. Proin accumsan arcu sem, eget tempor turpis tristique sit amet. In aliquam bibendum mauris, sit amet congue erat. Aliquam quis turpis convallis, porttitor felis sit amet, hendrerit enim. Etiam massa orci, tristique id arcu et, pulvinar tincidunt urna.", true, "center");
  } else if (progress == 1) {
    $(".button, p").css({
      "opacity": "0"
    });
    setTimeout(function() {
      $(".button, p").remove();
      videoAppear("Video.mp4", true);
      setTimeout(function() {
        $("#appearingVideo").css({
          "opacity": "0"
        });
        setTimeout(function() {
          $("#appearingVideo, #videobackground, .button").remove();
          $("body").css({
            "background-color": "black",
            "background-image": "none"
          });

          gameBeginning();
        }, 1000);
      }, 3000);
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
      showDialogueText("Introduction", 1)
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
  let characterDiv = $("<div></div>");
  characterDiv.attr({
    "id": "choosecharacter",
    "class": n,
    "onclick": `startDialogue("${character}", 'visual', 1, "${n}")`
  });
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
  $("#choosecharacter." + n + ", #characterTag." + n).css({"opacity": "1"});
  let tagPath = `./Assets/Buttons/"${character}".png`.replace(/['"]+/g, '');

  $("#choosecharacter." + n + ", .QR" + n).hover(function() {
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
  $("#characterTag.one").css({"opacity": "0"});
  $("#characterTag.two").css({"opacity": "0"});
  if(n == "one"){
    $("#choosecharacter.two").remove();
    if($("#choosecharacter.three")){
      $("#choosecharacter.three").remove();
    }
  } else if(n == "two"){
    $("#choosecharacter.one").remove();
    if($("#choosecharacter.three")){
      $("#choosecharacter.three").remove();
    }
  } else if(n == "three"){
    $("#choosecharacter.one").remove();
    $("#choosecharacter.two").remove();
  }

  $("." + n).css({"left": "20%"});
  setTimeout(function(){
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
    await new Promise(r => setTimeout(r, 35 * startingSelfDialogue[character][0][i].length));
  }
  //Character Dialogue
  for (i = 0; i < startingCharacterDialogue[character][0].length; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    let optionsCharacter = {
      strings: [startingCharacterDialogue[character][0][i]],
      typeSpeed: 40,
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
    await new Promise(r => setTimeout(r, 35 * startingCharacterDialogue[character][0].length));
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

window.progressDialogue = async function(character, communication, progress) {
  startvideo();
  //Remove old dialogues and buttons
  $(".button").remove();
  progress++;
  //Prototyping help
  //prototyping(progress);
  //Self Dialogue

  for (var i = 0; i < selfDialogue[character][progress - 1].length; i++) {
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
  $(".button").css({"opacity": "0"});
  setTimeout(function(){
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
    strings: ["Which monument do you want to choose?"],
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
  if(character == "Neutrum"){
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
  } else if(character == "Eo"){
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
  $(".visual, .text, .sound").css({"opacity": ".8"});

  $("#characterAnimation, #QR").hover(function() {
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
      "left": "5%",
      "top": "5%",
      "transform": "translate(-50%,-50%)",
      "width": "20%",
      "height": "20%",
      "z-index": "5a"
    });
    $("#pLoading").css({
      "opacity": "0",
    });
    $("#loading1").css({'cursor': 'auto'})
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
  let appearingvideo = $("<div></div>").text("QUESTO È DOVE SARÀ IL VIDEO, DURA TRE SECONDI");
  appearingvideo.attr({
    "id": "appearingVideo"
  });
  let videobackground = $("<div></div>").text("");
  videobackground.attr({
    "id": "videobackground"
  });
  $("body").append(appearingvideo, videobackground);
}

window.showDialogueText = async function(character, progress) {
  $(".button").remove();
  for (var i = 0; i < selfDialogue[character][progress - 1].length; i++) {
    $("#textHolder").animate({
      scrollTop: $('#textHolder').prop("scrollHeight")
    }, 1000);
    //typed
    let optionsSelf = {
      strings: [selfDialogue[character][progress - 1][i]],
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
    await new Promise(r => setTimeout(r, 70 * selfDialogue[character][progress - 1][i].length));
  }
  $("#textHolder").animate({
    scrollTop: $('#textHolder').prop("scrollHeight")
  }, 1000);
  let continueButton = $("<button></button>").text("Continue");
  if (progress == 1 && character == "Introduction") {
    continueButton.attr({
      "id": "continueButton",
      "class": "button",
      'onclick': `showDialogueText("Introduction", 2)`
    });
    $("body").append(continueButton);
  } else if(progress == 2 && character == "Introduction"){
    startvideo();
    setTimeout(function(){
      showDialogueText("Firstmeeting", 1);
    }, 3500);
    setTimeout(function(){
      characterChoice(2);
    }, 5000);
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
