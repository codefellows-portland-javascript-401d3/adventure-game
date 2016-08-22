/* globals angular, chai */

const { assert } = chai;

describe('counter controller', () => {

  beforeEach( angular.mock.module('controllers') );

  let $controller, $scope;
  beforeEach(angular.mock.inject( function( $rootScope, _$controller_ ) {
    $scope = $rootScope.$new();
    $controller = _$controller_;

    // if we don't need to vary the $scope per test,
    // we can just create component in beforeEach        
    // $controller( 'counter', { $scope } );

  }));

  it( 'default count is 1', () => {
    $controller( 'counter', { $scope } );
    assert.equal( $scope.count, 1 );  
  });

  it( 'adds and substracts', () => {
    $controller( 'counter', { $scope } );
    $scope.add();
    assert.equal( $scope.count, 2 );
    $scope.subtract();
    assert.equal( $scope.count, 1 );  
  });

  it( 'halves', () => {
    $controller( 'counter', { $scope } );
    assert.equal( $scope.half(4), 2 );
  });
});