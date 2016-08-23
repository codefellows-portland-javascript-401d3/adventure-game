env:
  - TEST_DIR=app

script: cd $TEST_DIR && npm install && npm test
