/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Glimpse = require('./glimpse.js');
var glimpseCode = require('./glimpseVisualCode.js');

var main = new UI.Card({
  title: 'Glimpse',
  icon: 'images/menu_icon.png',
  subtitle: 'Cube Rotator',
  body: 'Rotate the watch and be amazed.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {
  console.log("UP BUTTON");
});


main.on('click', 'select', function(e) {
  console.log("SELECT BUTTON");
});

main.on('click', 'down', function(e) {
  console.log("DOWN BUTTON");
});

var glimpseOptions = {
  persistEvents: {
    "update" : ["x", "y", "z"]
  }
};

var myGlimpse = new Glimpse('watch', glimpseCode, glimpseOptions);

myGlimpse.connect(function(err, socket) {
  Accel.on('data', function(e) {
    if(e.accel) {
      socket.emit('update',e.accel)      
    }
  });
});
