//========= Trie Implementation =========
/*
 * Object: Trie(value)
 * This is the constructor for the Trie object. 
 * 
 * @param value: The value of the node
 */
var Trie = function(value){
  this.value = value;
  this.children = {};
};

Trie.prototype.addChild = function(child){
  if (!child || !(child instanceof Trie)){
    child = new Trie(child);
  }

  if(!this.children.hasOwnProperty(child.value))
    this.children[child.value] = child;

  return this.children[child.value];
};

Trie.prototype.find = function(word){
  // If the word is empty, we have hit the end. 
  // Look for the '#' denoting an existing word and return. 
  if(word.length === 0 && this.value === '#'){
      return true;
  }
  
  // If it does not, obviously there is no word. Return false
  // Otherwise, continue our search
  var charToFind = word[0];
  if(!this.children.hasOwnProperty(charToFind))
      return false;
  else {
      return this.children[charToFind].find(word.substring(1));
  }
};

Trie.prototype.printTree = function(tree, depth){
    var spacing = '';
    if(Object.keys(tree.children).length === 0){
        return;
    }
    if(depth > 1){
      spacing += '|';
      spacing += addSpaces(depth);
    }
    if(depth === 0){
      console.log(tree.value);
    }
    else{
      console.log(spacing + '+-' + tree.value);
    }

    for(var key in tree.children){
        this.printTree(tree.children[key], depth + 1);
    }
}

function addSpaces(depth){
  if(depth < 2){
    return ''
  }
  else{
    var spaces = '';
    var amount = 1 + (depth-2)*2;

    for(var i = 0; i < amount; i++){
      spaces += ' ';
    }
    return spaces;
  }
}

//========= End Trie Implementation =========

module.exports = Trie;