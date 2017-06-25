//If we execute this Javascript, 
//what will the browser's console show?

var text = 'outside';

function logIt(){
  console.log(text);
  var text = 'inside';
};

logIt();

// Answer: undefined, the declaration
//but not the assignment of text gets hoisted to the top
// of logIt()... so our code gets interpreted as:

var text = "outside";
function logIt(){
  var text;
  console.log(text);
  text = 'inside';
};

logIt();
