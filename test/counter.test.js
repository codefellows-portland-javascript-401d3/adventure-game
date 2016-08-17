//globals: angular, chai
const assert = chai.assert;

describe('counter controller', () => {

  beforeEach(angular.mock.module('controllers'));

  let $controller, $scope;
  beforeEach(angular.mock.inject(function($rootScope, _$controller_){
    $scope = $rootScope.$new();
    $controller = _$controller_;
  }));

  it('defaults to initial count 1', () => {
    $controller('counter', {$scope});
    assert.equal($scope.count, 1);
  });
});
