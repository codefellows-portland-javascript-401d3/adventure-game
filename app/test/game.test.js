const assert = chai.assert;

describe('game controller', () => {

  beforeEach(angular.mock.module('controllers'));

  let $controller, $scope;
  beforeEach(angular.mock.inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('game', {$scope});
  }));

  it('sets initial using imported modules', () => {
    assert.equal($scope.user.location, $scope.rooms.hallway);
    assert.deepEqual($scope.gameSettings, {completed: false, won: false} );
  });

  it('outputs correct status when game is in progress', () => {
    assert.equal($scope.getStatus(), 'In Progress...');
  });

  it('properly dictates user location based on user input', () => {
    $scope.setCurrent('forward');
    assert.equal($scope.user.location, $scope.rooms.living);
  });

  it('outputs correct user status when game is in progress', () => {
    assert.equal($scope.getPlayerStatus(), 'Alive and Well.');
  });

});
