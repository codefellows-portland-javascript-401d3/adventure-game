export default function game ($scope) {
  $scope.init = 'Enter Commands Here.';

  $scope.gameSettings = {
    completed: false,
    won: false,
  };

  $scope.getStatus = function() {
    return $scope.gameSettings.completed ? 'Game Complete.' : 'In Progress...';
  };

  $scope.playerSettings = {
    weapons: 0,
    type: null,
    max: 1,
    alive: true
  };

  $scope.locationSettings = {
    room: 'living room',
    visited: 0,
  };

  $scope.gameCommands = ['Go East', 'Go West', 'Pick Up', 'Put Down', 'Use Weapon', 'Make Sandwich'];
}

//just in here temporarily to see all controllers in one place
// function player () {
//   $scope.act = function(action) {
//     //this one is tough, need to make a bunch of checks in order to determine what to return
//     //
//   };
//
//   $scope.addWeapon = function (weapon) {
//     if ($scope.playerSettings.weapons === 0) {
//       $scope.playerSettings.weapons++;
//       $scope.playerSettings.type = weapon;
//     } else {
//       return 'Sorry but you already have a weapon.';
//     }
//   };
//
//   $scope.subtractWeapon = function () {
//     if ($scope.playerSettings.weapons === 0) {
//       return 'You have no weapons to drop.';
//     } else {
//       $scope.playerSettings.weapons--;
//       $scope.playerSettings.type = null;
//     }
//   };
//
//   $scope.getPlayerStatus = function () {
//     return $scope.playerSettings.alive? 'Alive and Well.' : 'Not Looking Good.';
//   };
// }
//
// function location () {
//   $scope.current = 'living room';
//
//   $scope.livingRoom = {
//     weapons: 'pouch',
//     next: 'kitchen',
//     enemies: false,
//     initial: 'You are in the living room. There is a door to the west and a pouch on the floor. What would you like to do?',
//     pickup: 'You pick up the pouch and stash for use later. Now what?',
//     commands: ['Go West', 'Pick Up', 'Put Down']
//
//   };
//
//   $scope.kitchen = {
//     weapons: 'steak knife',
//     next: 'living room',
//     enemies: true,
//     enemy: 'Lion',
//     initial: 'You are now in the kitchen. It appears as though there is a cat at the other end of the room. What would you like to do?',
//     pouch: 'You open the pouch and pour out a large amount of catnip. The lion is very happy and no longer seems interested in you. Now what?',
//     knife: 'You attempt to fight off the lion with the steak knife, but, come on it\'s a lion! You are devoured. You lose.',
//     early: 'You make a sandwich and the cat that was sleeping on the other side of the room comes over. It\'s actually a lion. It eats you and your sandwich.',
//     win: 'You make a sandwich and head out for some beach time. Nice Work!',
//     commands: ['Go East', 'Make Sandwich', 'Pick Up', 'Put Down', 'Use Weapon']
//
//   };
// }
