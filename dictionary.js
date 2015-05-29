var Trie = require('./trie.js')   
var fs = require('fs');  
var readline = require('readline');
var stream = require('stream');

//========= Dictionary Implementation =========
/*
 * Object: Dictionary(dictionaryFile)
 * This is the constructor for the Dictionary object. 
 * It expects a text file with words seperated by newlines.
 * 
 * @param dictionaryFile: The path to the text file to be used as the dictionary
 */
var Dictionary = function(dictionaryFile){  
  this.root = new Trie('$');
  var self = this;

  // Preprocess file
  console.time("Preprocess execution time");
  console.log('Preprocessing dictionary...');

  var instream = fs.createReadStream(dictionaryFile);
  var outstream = new stream;
  var rl = readline.createInterface(instream, outstream);

  rl.on('line', function(line) {
    self.addWord(line);
  });

  rl.on('close', function() {
      //self.printDictionary(); // Comment in to display trie
      console.log('Finished processing dictionary...');
      console.timeEnd("Preprocess execution time");
      console.log('Input some words!');
  });
};

/*
 * Function: Dictionary.addWord(word)
 * This function will add a word to the dictionary
 * 
 * @param word: The word to add to the dictionary
 */
Dictionary.prototype.addWord = function(word){  
  var wordWithEndingChar = word + '#';
  var nextNode = this.root;

  for(var i = 0; i < wordWithEndingChar.length; i++){
    nextNode = nextNode.addChild(wordWithEndingChar[i]);
  }
}

/*
 * Function: Dictionary.findWord(word)
 * This function will find a word in the dictionary
 * 
 * @param word: The word to find
 * @return: True if the word could be found, false otherwise.
 */
Dictionary.prototype.findWord = function(word){  
  return this.root.find(word + '#');
};

/*
 * Function: Dictionary.printDictionary()
 * This function will print the dictionary out using DFS. It looks like:
 * (This tree contains 'dog', 'doe', and 'dad')
 * $ (Root)
 * +-d
 * | +-o
 * |   +-g
 * |   +-e
 * | +-a
 * |   +-d
 *
 * @param word: The word to add to the dictionary
 */
Dictionary.prototype.printDictionary = function(){  
  this.root.printTree(this.root, 0);
}

//========= End Dictionary Implementation =========

// Create the dictionary
var _dictionary = new Dictionary('words.txt');

// Return it
module.exports = _dictionary;