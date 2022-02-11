

function scoreDifficulty(w){
  let letters = [];
  for (let i = 0; i < w.length; i++){
    if (letters.indexOf(w.charAt(i)) == -1){
      letters.push(w.charAt(i));
    }
  }
  return (letters.length + w.length);
}

class hangRigger{
  constructor(){
    this.chosenLength = allWords[Math.floor(Math.random() * allWords.length)].length;
    this.possibilities = wordLengths[this.chosenLength];
  }

  addGuess(g){
    g = g.toLowerCase();
    let newList = [];
    for (let i = 0; i < this.possibilities.length; i++){
      if (!this.possibilities[i].includes(g)){
        newList.push(this.possibilities[i]);
      }
    }
    if (newList.length >= 1){
      this.possibilities = newList;
    } else {
      let bestWord = "";
      let bestScore = 0;
      for (let i = 0; i < this.possibilities.length; i++){
        let curScore = scoreDifficulty(this.possibilities[i]);
        if (curScore > bestScore){
          bestScore = curScore;
          bestWord = this.possibilities[i];
        }
      }
      this.possibilities = [bestWord];
    }
  }

  getWord(){
    let out = this.possibilities[Math.floor(Math.random() * this.possibilities.length)];
    return out;
  }
}
