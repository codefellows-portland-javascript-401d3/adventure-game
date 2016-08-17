export default function input($scope){
  $scope.keycheck = function(event) {
    let action = {};
    action.command = $scope.command || '';
    if(event.keyCode === 13) {
      parse(action);
      $scope.command = '';
    }
  };

  function parse(action) {
    switch (action.command.toLowerCase()) {
      case 'hello':
        action.response = 'Hi.';
        break;
      case 'hi':
        action.response = 'Hello.';
        break;
      default:
        action.response = 'I don\'t know how to respond to that.';
    }
    $scope.actions.push(action);
  }
}
