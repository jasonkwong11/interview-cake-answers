const fs = require('fs')

function findDuplicateFiles(startingDirectory) {
  var filesSeenAlready = {};
  var stack = [startingDirectory];

  var duplicates = [];

  while (stack.length) {
    var currentPath = stack.pop();
    var currentFile = fs.statSync(currentPath);

    // if its a directory,
    // put the contents in our stack

    if (currentFile.isDirectory()) {
      fs.readdirSync(currentPath).forEach((path) => {
        stack.push(currentPath + '/' + path);
      });
      // if it's a file
    } else {
      // get its contents
      var fileContents = fs.readFileSync(currentPath);
      //get its last edited time
      var currentLastEditedTime = currentFile.mtime;

      //if we've seen it before
      if(filesSeenAlready.hasOwnProperty(fileContents)){
        var existingFile = filesSeenAlready[fileContents];
        if (currentLastEditedTime > existingFile.lastEditedTime) {
          //current file is the dupe!
          duplicates.push([currentPath, existingFile.path]);
        } else {
          //old file is the dupe!
          duplicates.push([existingFile.path, currentPath]);
          //but also update filesSeenAlready to have the new file's info
          filesSeenAlready[fileContents] = {lastEditedTime: currentLastEditedTime, path: currentPath}
        }
      // if it's a new file, throw it in the filesSeenAlready
      // and record its path and last edited time,
      // so we can tell later if its a dupe
      } else {
        filesSeenAlready[fileContents] = {lastEditedTime: currentLastEditedTime, path: currentPath}
      }
    }
  }
  return duplicates;
}