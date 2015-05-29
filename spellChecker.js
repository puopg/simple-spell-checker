var Dictionary = require('./dictionary.js')
var util = require('util');
// //////////////////////////////////////

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
  var punctuationless = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
  var finalString = punctuationless.replace(/\s{2,}/g," ");
  var inputText = finalString.replace(/(\r\n|\n|\r)/gm,"");
  var inputArray = inputText.toLowerCase().split(' ');
  var spellingErrors = false;

  if (text === 'quit\n') {
    done();
  }
  console.time('Spell Check Execution Time');
  console.log('----- Errors -----');

  inputArray.forEach(function(word){
    if(!Dictionary.findWord(word)){
      console.log(word, 'is spelled incorrectly!');
      spellingErrors = true;
    }
  })
  if(!spellingErrors){
    console.log('No spelling errors found!');
  }

  console.log('--- Statistics ---');
  console.timeEnd('Spell Check Execution Time');
  console.log('Words checked:', inputArray.length)
  console.log('----- Done ------\n');
  console.log('----- Input -----');
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}









