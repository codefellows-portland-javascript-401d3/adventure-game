const assert = chai.assert;

describe('player controller', () => {

  beforeEach(angular.mock.module('controllers'));

  let $controller, $scope;
  beforeEach(angular.mock.inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $controller('player', {$scope});
  }));

  //maybe should be tested in user.test.js
  it('adds an item to user items if item exits in room', () => {
    // $controller('game', {$scope});

  });

});
