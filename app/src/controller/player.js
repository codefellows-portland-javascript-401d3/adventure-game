export default function player ($scope) {

  $scope.playerAction = function(action) {
    let doIt = action;
    let item;
    $scope.message = null;
    if (action.indexOf(':') > -1) {
      doIt = action.split(':')[0].trim();
      item = action.split(':')[1].trim();
    }

    const room = $scope.user.location;
    const numItems = room.items.length;

    if (doIt === 'forward' || doIt === 'back') {
      room[doIt] ? (
        $scope.gameState = $scope.setCurrent(doIt)
      ) : (
        $scope.message = 'You cannot go that way.'
      );
    } else if (doIt === 'drop') {
      $scope.subtractItem();
    } else if (doIt === 'grab' && !item) {
      $scope.addItem(room.items[numItems - 1]);
    } else if (doIt === 'grab' && item) {
      $scope.addItem(item);
    } else if (doIt === 'use' && $scope.user.items.length > 0) {
      $scope.useItem($scope.user.items[0]);
    } else if (doIt === 'make sandwich') {
      $scope.makeSandwich();
    } else {
      $scope.message = 'That action is not supported here.';
    }
  };

  $scope.addItem = function (item) {
    const room = $scope.user.location;
    if (room.items.length === 0) {
      $scope.message = 'No items here.';
    } else if ($scope.user.items.length === 0) {
      let ind;
      const addIt = room.items.find((e, i) => {
        ind = i;
        return e === item;
      });

      $scope.user.items.push(addIt);

      room.items.splice(ind, 1);
      $scope.message = 'Item added';
    } else {
      $scope.message = 'Sorry but you already have an item.';
    }
  };

  $scope.subtractItem = function () {
    const room = $scope.user.location;
    if ($scope.user.items.length === 0) {
      $scope.message = 'You have no items to drop.';
    } else {
      room.items.push($scope.user.items[0]);
      $scope.user.items.splice(0,1);
      $scope.message = 'Item dropped.';
    }
  };

  $scope.useItem = function () {
    const item = $scope.user.items[0];
    const room = $scope.user.location;
    if (!item) {
      $scope.message = 'You have no items to use.';
    } else if (item === 'pouch' && room.name === 'kitchen') {

      room.enemy ? (
        $scope.gameState = room.pouch,
        $scope.user.items.splice(0,1),
        room.enemy = null
      ) : (
        $scope.message = 'You have no enemies in this room.'
      );

    } else if (item === 'steak knife' && room.name === 'kitchen') {

      room.enemy ? (
        $scope.gameState = room.knife,
        $scope.gameSettings.completed = true,
        $scope.user.alive = false
      ) : (
        $scope.message = 'You have no enemies in this room.'
      );

    } else if (item === 'deli meat' && room.name === 'dining room') {

      room.enemy ? (
        $scope.gameState = room.feed,
        $scope.user.items.splice(0,1),
        room.enemy = null
      ) : (
        $scope.message = 'You have no enemies in this room.'
        );

    } else {$scope.message = 'Can\'t use that here.';}
  };

  $scope.makeSandwich = function () {
    const room = $scope.user.location;
    if (room.enemy && room.name === 'kitchen') {

      $scope.gameSettings.completed = true;
      $scope.user.alive = false;
      $scope.message = room.leaveEarly;
      $scope.gameState = null;

    } else if (!room.enemy && room.name === 'kitchen') {

      $scope.gameSettings.won = true;
      $scope.gameSettings.completed = true;
      $scope.message = room.win;
      $scope.gameState = null;

    } else { $scope.message = 'You cannot make a sandwich here.'; }
  };

}
