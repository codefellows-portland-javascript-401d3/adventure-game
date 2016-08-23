import {User} from '../classes/user';
import {rooms} from '../classes/rooms';

export default function game ($scope) {

  $scope.init = 'Enter Commands Here.';
  $scope.message = null;
  $scope.gameState = null;
  $scope.gameCommands = ['forward', 'back', 'drop', 'grab', 'use', 'grab: item', 'make sandwich'];

  $scope.rooms = rooms;

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
