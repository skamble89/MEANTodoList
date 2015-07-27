var fs = require('fs');

exports.getSettings = function(){
  var data = fs.readFileSync('./settings.json'),
      myObj;

  try {
    return JSON.parse(data);
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }
}