const fs = require('fs');
const AnkiExport = require('anki-apkg-export').default;
 
const apkg = new AnkiExport('Japanese Vocab'); // Change this


var english = fs.readFileSync('English\ words.txt', 'utf8')
var englishWords = english.split('\n')

for(var i = 0; i < englishWords.length; i++){
  for(var j = 0; j < englishWords[i].length; j++){
    if(englishWords[i][j] == ' ' || englishWords[i][j] == '-' || englishWords[i][j] == '（'){
      englishWords[i] = englishWords[i].slice(0, j)
      break
    }
  }
}

function removeNonsense(file){
  var foreign = fs.readFileSync(file, 'utf8')
  var foreignWords = foreign.split('\r\n')
  for(var i = 0; i < foreignWords.length; i++){
    for(var j = 0; j < foreignWords[i].length; j++){
      if(foreignWords[i][j] == ' ' || foreignWords[i][j] == '-' || foreignWords[i][j] == '（'){
        foreignWords[i] = foreignWords[i].slice(0, j-1)
        break
      }
    }
  }
  return foreignWords
}

foreignWords = removeNonsense('Japanese\ words.txt') // Change this

for(var i = 0; i < foreignWords.length; i++){
  if(fs.existsSync('Japanese/pronunciation_ja_' + foreignWords[i] + '.mp3')){ // Change this
    apkg.addCard(foreignWords[i], englishWords[i]+'<p><audio controls><source src="' + 'pronunciation_ja_' + foreignWords[i] + '.mp3' + '" type="audio/mpeg"></audio><p>'); // Change this
  }
}

/* 
apkg.addCard('card #1 front', 'card #1 back<audio controls><source src="pronunciation_sv_äktenskap.mp3" type="audio/mpeg"></audio>');
apkg.addCard('card #3 with image', 'card #3 back<audio controls><source src="pronunciation_sv_ägg.mp3" type="audio/mpeg"></audio>');
*/


apkg
  .save()
  .then(zip => {
    fs.writeFileSync('./output.apkg', zip, 'binary');
    console.log(`Package has been generated: output.pkg`);
  })
  .catch(err => console.log(err.stack || err));

