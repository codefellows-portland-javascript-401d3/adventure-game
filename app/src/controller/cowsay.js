import animal from 'cowsay-browser';

export default function cowsay ($scope) {

  animal.list((err, types) => {
    $scope.types = types;
  });

  $scope.type = 'default';
  $scope.text = 'test text.';
  $scope.method = 'think';

  $scope.say = function (type, method, text) {
    return animal[method]({
      text: text || 'MOOOOOOO',
      f: type
    });
  };
  
}
