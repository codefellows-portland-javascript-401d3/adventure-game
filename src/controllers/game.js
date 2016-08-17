// import action from './action';

export default function game($scope, $timeout){
  $scope.location = 'dark';
  $scope.inventory = [];
  $scope.hunger = 'high';
  $scope.actions = [
    {
      command: 'Text Game',
      response: 'It is dark.'
    }
  ];

  $scope.$watch('actions', function () {
    $timeout(function () {
      window.scrollTo(0,document.body.scrollHeight);
    });
  }, true);
}
