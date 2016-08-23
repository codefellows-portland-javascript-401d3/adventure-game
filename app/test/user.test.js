const assert = chai.assert;

describe('player controller', () => {

  beforeEach(angular.mock.module('controllers'));

  let $controller, $scope;
  beforeEach(angular.mock.inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('game', {$scope});
    $controller('player', {$scope});
  }));

  it('adds an item to user items if item exists in room and user selects grab', () => {
    $scope.setCurrent('forward');
    $scope.playerAction('grab');
    assert.equal($scope.user.items.length, 1);
  });

  it('allows user to use item in correct room', () => {
    $scope.user.location = $scope.rooms.dining;
    assert.ok($scope.user.location.enemy);
    $scope.playerAction('grab');
    $scope.playerAction('use');
    assert.ok(!$scope.user.location.enemy);
  });

  it('errors on unsupported command', () => {
    $scope.playerAction('wrong');
    assert.equal($scope.message, 'That action is not supported here.');
  });

  it('subtracts item from user items if user selects drop', () => {
    $scope.user.items[0] = 'item';
    assert.equal($scope.user.items.length, 1);
    $scope.playerAction('drop');
    assert.equal($scope.user.items.length, 0);

  });

  it('allows user to make sandwich in kitchen when no enemy exists', () => {
    $scope.user.location = $scope.rooms.kitchen;
    $scope.user.location.enemy = null;
    $scope.makeSandwich();
    assert.equal($scope.gameSettings.won, true);
    assert.equal($scope.message, $scope.user.location.win);
  });

});
