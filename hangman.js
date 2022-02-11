
var winScreen = popup(`<h1 style="display: inline-block; vertical-align: middle;">You Won</h1>
<img src="./banner.png" style="margin: auto; display: inline-block"></img>`, playHangman);

function playHangman(){

  let rigger = new hangRigger();

  for (let i = 0; i < drawSteps.length; i++){
    drawSteps[i].visible = false;
  }
  
  let guesses = 0;

  let input = document.getElementById("inputBox");
  let remainingLetters = document.getElementById("abc");
  let blanks = document.getElementById("word");


  let word = rigger.getWord();
  let wordLetters = word.toUpperCase().split("");

  let incorrect = [];
  let allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  let blankList = [];
  for (let i = 0; i < wordLetters.length; i++){
    blankList.push("_");
  }
  updateBlanks();



  remainingLetters.innerHTML = "";
  for (let i = 0; i < allLetters.length; i++){
    let span = document.createElement("span");
    span.innerText = allLetters[i];
    span.className += " alphabetLetter"

    if (incorrect.indexOf(allLetters[i]) != -1){
      span.className += " incorrect"
    }

    remainingLetters.appendChild(span);
  }


  function updateBlanks(){
    let blankStr = "";
    for (let i = 0; i < blankList.length; i++){
      blankStr += blankList[i] + " ";
    }
    blanks.innerText = blankStr;
  }


  function guessLogic(g){
    rigger.addGuess(g);
    word = rigger.getWord();
    wordLetters = word.toUpperCase().split("");
    g = g.toUpperCase();
    if (wordLetters.indexOf(g) == -1){ // incorrect guess
      sounds.draw.play();
      drawSteps[guesses].visible = true;
      guesses++;
      if (guesses == 7){
        let loseScreen = popup(`<h1 style="display: inline-block; vertical-align: middle; margin: 0px; margin-bottom: 10px;">You Lose</h1> <p style="margin: 5px;">The word was: ${word}</p> <img src="./graveyard.png" style="margin: auto; display: inline-block;"></img>`, playHangman);
        loseScreen.open();

        incorrect.push(g);

        remainingLetters.innerHTML = "";
        for (let i = 0; i < allLetters.length; i++){
          let span = document.createElement("span");
          span.innerText = allLetters[i];
          span.className += " alphabetLetter"

          if (incorrect.indexOf(allLetters[i]) != -1){
            span.className += " incorrect"
          }

          remainingLetters.appendChild(span);
        }
      }

      


    } else {
      sounds.correct.play();
      let unGuessed = 0;
      for (let i = 0; i < blankList.length; i++){
        if (blankList[i] == "_"){
          if (g == wordLetters[i]){
            blankList[i] = wordLetters[i];
          } else {
            unGuessed++;
          }
        }
      }
      if (unGuessed == 0){
        let winScreen = popup(`<h1 style="display: inline-block; vertical-align: middle; margin: 0px; margin-bottom: 10px;">You Win</h1> <p style="margin: 5px;">The word was: ${word}</p> <img src="./banner.png" style="margin: auto; display: inline-block;"></img>`, playHangman);
        winScreen.open();
      }

      updateBlanks();
    }

    incorrect.push(g);

    // remainingLetters.innerHTML = "";
    // for (let i = 0; i < allLetters.length; i++){
    //   let span = document.createElement("span");
    //   span.innerText = allLetters[i];
    //   span.className += " alphabetLetter"

    //   if (incorrect.indexOf(allLetters[i]) != -1){
    //     span.className += " incorrect"
    //   }

    //   remainingLetters.appendChild(span);
    // }

    for (let i = 0; i < remainingLetters.children.length; i++){
      let span = remainingLetters.children[i];
      if (span.className == " alphabetLetter"){
        if (incorrect.indexOf(span.innerText) != -1){
          span.className += " incorrect";
        }
      }
    }
  }


  input.onkeydown = (e) => {
    if (e.keyCode == 13){
      if (input.value.length != 0){
        let guess = input.value;
        input.value = "";
        guessLogic(guess);
      }
    }

    if (e.keyCode == 8){ // 8
      e.preventDefault();
      input.value = "";
    }
  };

  input.addEventListener("input", (e) => {
    input.value = input.value[input.value.length - 1];
  });
}





playHangman();