var Dictionary = require('./dictionary.js')
var util = require('util');
// //////////////////////////////////////

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
  var inputText = text.replace(/(\r\n|\n|\r)/gm,"");
  var inputArray = inputText.toLowerCase().split(' ');
  var spellingErrors = false;

  if (text === 'quit\n') {
    done();
  }
  inputArray.forEach(function(word){
    if(!Dictionary.findWord(word)){
      console.log(word, 'is spelled incorrectly!');
      spellingErrors = true;
    }
  })
  
  if(!spellingErrors){
    console.log('No spelling errors found!');
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}








