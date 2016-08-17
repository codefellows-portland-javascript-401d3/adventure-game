export default function counter ($scope, $timeout) {
  $scope.count = 1;

  $scope.num = 0;

  $scope.checkEvent = function($event) {
    if ($event.key === 'Enter') console.log($event);

    else console.log('You must hit the return button.');
  };

  $scope.add = function () {
    $scope.count ++;
  };

  $scope.half = function (num) {
    return num / 2;
  };

  $timeout(function () {
    $scope.add();
  }, 1000);

}
