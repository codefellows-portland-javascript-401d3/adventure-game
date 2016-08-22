import {User} from '../classes/user';

export default function game ($scope) {

  $scope.init = 'Enter Commands Here.';
  $scope.message = null;
  $scope.gameState = null;
  $scope.gameCommands = ['forward', 'back', 'drop', 'grab', 'use', 'grab: item', 'make sandwich'];

  $scope.rooms = {};

  $scope.rooms.hallway = {
    name: 'hallway',
    visited: 0,
    items: [],
    initial: 'You are in a hallway in a house. It\'s dark. There is a door to the living room next to you. Really, your only option is to go forward, so just do that.',
    beenHere: 'Back in the hallway? Come on, it\'s a hallway. Get over it already.'
  };

  $scope.rooms.living = {
    name: 'living room',
    visited: 0,
    items: ['pouch'],
    initial: 'You are in the living room. There is a door to the west and a pouch on the floor. What would you like to do?',
    beenHere: 'Back in the living room. Anything interesting in here?',
    pickup: 'You pick up the pouch and stash for use later. Now what?'
  };

  $scope.rooms.dining = {
    name: 'dining room',
    visited: 0,
    items: ['deli meat'],
    enemy: 'Panther',
    initial: 'You enter the dining room. A panther rests in a doorway that leads to the kitchen. Some delicious looking deli meat sits on the table. What now?',
    noEnemy: 'Back in the dining room. Panther still seems satiated. Where to? Maybe to the kitchen?',
    leaveEarly: 'You attempt to walk past the panther into the kitchen. The panther gets angry and eats you and the delicious deli meat that was on the table. Too bad!',
    feed: 'You offer the deli meat to the panther, and it seems content. But too bad, now no lunch meat for you. What next?'
  };

  $scope.rooms.kitchen = {
    name: 'kitchen',
    visited: 0,
    items: ['steak knife'],
    enemy: 'Lion',
    initial: 'You are now in the kitchen. It appears as though there is a lion at the other end of the room. There is a steak knife on the counter. There is fresh bread and sandwich fixings on the island, including more lunch meat! What would you like to do?',
    noEnemy: 'You are back in the kitchen. The lion is still enjoying the catnip. How \'bout that sandwich?',
    pouch: 'You open the pouch and pour out a large amount of catnip. The lion is very happy and no longer seems interested in you. Now what?',
    knife: 'You attempt to fight the lion with the steak knife, but come on, it\'s a lion! You are devoured. You lose.',
    leaveEarly: 'You make a sandwich and the lion that was sleeping on the other side of the room comes over. It eats you and your sandwich.',
    win: 'You make a sandwich and head out to the beach. Nice Work!'
  };

  $scope.rooms.hallway.forward = $scope.rooms.living;
  $scope.rooms.hallway.back = null;
  $scope.rooms.living.forward = $scope.rooms.dining;
  $scope.rooms.living.back = $scope.rooms.hallway;
  $scope.rooms.dining.forward = $scope.rooms.kitchen;
  $scope.rooms.dining.back = $scope.rooms.living;
  $scope.rooms.kitchen.forward = null;
  $scope.rooms.kitchen.back = $scope.rooms.dining;

  $scope.user = new User({
    location: $scope.rooms.hallway,
    items: [],
    alive: true
  });

  $scope.gameState = $scope.user.location.initial;
  $scope.current = $scope.user.location.name;
  $scope.user.location.visited++;

  $scope.gameSettings = {
    completed: false,
    won: false
  };

  $scope.checkEvent = function($event, callback) {
    if ($event.key === 'Enter') {
      callback($event.target.value);
      $event.target.value = null;
    }
  };

  $scope.getStatus = function() {
    return $scope.gameSettings.completed ? 'Game Completed.' : 'In Progress...';
  };

  $scope.getEnd = function () {
    $scope.gameState = null;
    return $scope.gameSettings.won ? 'You win!' : 'You lost emphatically.';
  };

  $scope.getPlayerStatus = function () {
    return $scope.user.alive? 'Alive and Well.' : 'Not Looking Good.';
  };

  $scope.setCurrent = function (dir) {
    const room = $scope.user.location;
    if (room.enemy && dir === 'forward') {
      $scope.gameSettings.completed = true;
      $scope.user.alive = false;
      return room.leaveEarly;
    } else { return $scope.user.travel(dir); }
  };

  $scope.showEnemies = function () {
    const room = $scope.user.location;
    return room.enemy ? room.enemy : 'No enemies in this room.';
  };

  $scope.showItems = function () {
    const room = $scope.user.location;
    return room.items.length > 0 ? room.items : 'No items in this room.';
  };

}
