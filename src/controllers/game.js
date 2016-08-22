export default function game($scope, $timeout){
  $scope.location = 'cave';
  $scope.inventory = [];
  $scope.wearing = ['loincloth'];
  $scope.near = ['spider','a club'];
  $scope.actions = [
    {
      command: 'start game',
      response: 'A giant spider is crawling toward you.'
    }
  ];

  $scope.$watch('actions', function () {
    $timeout(function () {
      window.scrollTo(0,document.body.scrollHeight);
    });
  }, true);
}
