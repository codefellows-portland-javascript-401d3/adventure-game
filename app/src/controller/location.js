export default function location ($scope) {

  $scope.current = 'living room';

  $scope.getCurrent = function () {
    const room = $scope.rooms.filter(function(e) {
      return e.current;
    });
    $scope.current = room.name;
    return room[0].name;
  };

  $scope.showEnemies = function (name) {
    let enemy = null;
    $scope.rooms.forEach(function(e) {
      if (e.name === name && e.enemies) {
        enemy = e.enemy;
      }
    });
    return enemy ? enemy : 'No enemies in this room.';
  };

  $scope.showWeapons = function (name) {
    let weapon = null;
    $scope.rooms.forEach(function(e){
      if (e.name === name) {
        weapon = e.weapons;
      }
    });
    return weapon ? weapon : 'No Weapons Here.';
  };

  // probably should be set up like this instead:
  $scope.rooms = [
    {
      name: 'living room',
      weapons: 'pouch',
      next: 'kitchen',
      enemies: false,
      initial: 'You are in the living room. There is a door to the west and a pouch on the floor. What would you like to do?',
      pickup: 'You pick up the pouch and stash for use later. Now what?',
      commands: ['Go West', 'Pick Up', 'Put Down'],
      current: true
    },
    {
      name: 'kitchen',
      weapons: 'steak knife',
      next: 'living room',
      enemies: true,
      enemy: 'Lion',
      initial: 'You are now in the kitchen. It appears as though there is a cat at the other end of the room. What would you like to do?',
      pouch: 'You open the pouch and pour out a large amount of catnip. The lion is very happy and no longer seems interested in you. Now what?',
      knife: 'You attempt to fight off the lion with the steak knife, but, come on it\'s a lion! You are devoured. You lose.',
      early: 'You make a sandwich and the cat that was sleeping on the other side of the room comes over. It\'s actually a lion. It eats you and your sandwich.',
      win: 'You make a sandwich and head out for some beach time. Nice Work!',
      commands: ['Go East', 'Make Sandwich', 'Pick Up', 'Put Down', 'Use Weapon'],
      current: false
    }
  ];

  // $scope.livingRoom = {
  //   name: 'living room',
  //   weapons: 'pouch',
  //   next: 'kitchen',
  //   enemies: false,
  //   initial: 'You are in the living room. There is a door to the west and a pouch on the floor. What would you like to do?',
  //   pickup: 'You pick up the pouch and stash for use later. Now what?',
  //   commands: ['Go West', 'Pick Up', 'Put Down']
  // };
  //
  // $scope.kitchen = {
  //   name: 'kitchen',
  //   weapons: 'steak knife',
  //   next: 'living room',
  //   enemies: true,
  //   enemy: 'Lion',
  //   initial: 'You are now in the kitchen. It appears as though there is a cat at the other end of the room. What would you like to do?',
  //   pouch: 'You open the pouch and pour out a large amount of catnip. The lion is very happy and no longer seems interested in you. Now what?',
  //   knife: 'You attempt to fight off the lion with the steak knife, but, come on it\'s a lion! You are devoured. You lose.',
  //   early: 'You make a sandwich and the cat that was sleeping on the other side of the room comes over. It\'s actually a lion. It eats you and your sandwich.',
  //   win: 'You make a sandwich and head out for some beach time. Nice Work!',
  //   commands: ['Go East', 'Make Sandwich', 'Pick Up', 'Put Down', 'Use Weapon']
  // };

}
