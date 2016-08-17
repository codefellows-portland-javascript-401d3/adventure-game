export default function player ($scope) {
  $scope.act = function(action) {
    //this one is tough, need to make a bunch of checks in order to determine what to return
    if (asdf) {};
  };

  $scope.addWeapon = function (weapon) {
    if ($scope.playerSettings.weapons === 0) {
      $scope.playerSettings.weapons++;
      $scope.playerSettings.type = weapon;
    } else {
      return 'Sorry but you already have a weapon.';
    }
  };

  $scope.subtractWeapon = function () {
    if ($scope.playerSettings.weapons === 0) {
      return 'You have no weapons to drop.';
    } else {
      $scope.playerSettings.weapons--;
      $scope.playerSettings.type = null;
    }
  };

  $scope.getPlayerStatus = function () {
    return $scope.playerSettings.alive? 'Alive and Well.' : 'Not Looking Good.';
  };

}
