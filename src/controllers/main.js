// TODO money mechanic, costs to drive between locations
// TODO energy mechanic, energy is used with interactions, driving need for coffee/beer
// TODO money mechanic, lose game when broke not enough money to buy any more "upgrades"
// TODO car/transit mechanic, pay to move between locations

export default function main ($scope) {

  // -------------------- global --------------------

  let start = {
    string : 'start',
    output : 'the start',
    current : true,
    promptIndex : -1,
    prompts : [
      'you are a creative freelancer with a diligent work ethic, but every once in a while you come across an impossible client and all bets are off. Type "Go to my office" to begin playing Clients from Hell...'
    ],
    gets : [],
    uses : [],
  };
  let office = {
    string : 'my office',
    output : 'your office',
    current : false,
    promptIndex : -1,
    prompts : [
      'You are hard at work when you hear the little **ding** from your email program. Clicking over to look at it you find a message from a prospective client wanting to hire you for some web design work, they\'ve attached a pdf with the outline of the project they have in mind. Knowing your bank account is dwindling, you ARE in a bit of a pinch financially and could use some new work -- if only you could read that attachment...', // get attachment
      'After reading over the file from the client you see that most everything they want is within your capability, but there is one small step you forsee needing to learn -- if only you had a book you could reference...', // use book
      'You\'ve written back to the client and expressed interest in the project but the next step is to bring some ideas to the table to convince them that you\'re the freelancer for them! You\'ve got a few hours work ahead of you before you can meet up with them for happy hour to go over your ideas but you\'re incredibly distractable today -- if only you had something to drown out the world full of distractions...', // use music
      'Alright the work is done and you\'re ready to meet up with the client to go over your ideas -- if only you were at the coffee shop already...', // go to coffee shop
    ],
    gets : [
      'email attachment'
    ],
    uses : [
      'book'
    ],
  };
  let coffee = {
    string : 'coffee shop',
    output : 'the coffee shop',
    current : false,
    promptIndex : -1,
    prompts : [
      'client late',
      'client changes mind',
      'client negotiate price',
    ],
    gets : [
      'approved design spec',
      'signed contract',
    ],
    uses : [],
  };
  let client = {
    string : 'client\'s office',
    output : 'the client\'s office',
    current : false,
    promptIndex : -1,
    prompts : [
      'cust wants to start over',
      'deliver final work',
    ],
    gets : [
      'money'
    ],
    uses : [
      'signed contract',
      'approved design spec',
    ],
  };
  let bar = {
    string : 'bar',
    output : 'the bar',
    current : false,
    promptIndex : -1,
    prompts : [
      '',
      '',
      '',
    ],
    gets : [],
    uses : [],
  };
  let end = {
    string : 'end',
    output : 'the end',
    current : false,
    promptIndex : -1,
    prompts : [
      'In the immortal words of Ferris Bueller: "You\'re still here? It\'s over. Go home. Go."',
    ],
    gets : [],
    uses : [],
  };

  start.tos = [office];
  office.tos = [coffee];
  coffee.tos = [client, office];
  client.tos = [bar];
  bar.tos = [end];
  end.tos = [];

  let locationStringArray = [start, office, coffee, client, bar, end];

  // -------------------- scoped --------------------

  $scope.input = '';
  $scope.name = '';
  $scope.prompt = '';
  $scope.currentLoc = start.output;
  $scope.hasName = false;
  $scope.balance = 20;
  $scope.inventory = {
    book : true,
    music : true,
    attachment : false,
    spec : false,
    contract : false,
  };
  $scope.reset = function () {
    this.input = '';
    this.name = '';
    this.prompt = '';
    this.currentLoc = 'the start';
    this.hasName = false;
    $scope.balance = 20;
    this.inventory = {
      book : true,
      music : true,
      spec : false,
      contract : false,
      attachment : false,
    };
  };
  $scope.submitName = function () {
    $scope.hasName = true;
    $scope.prompt = `Hello ${$scope.name}, ${start.prompts[0]}`;
  };
  $scope.displayInv = function () {
    const invArray = [];
    for (var item in $scope.inventory) {
      if ($scope.inventory.hasOwnProperty(item) && $scope.inventory[item]) {
        invArray.push(item);
      }
    }
    return 'Inventory : ' + invArray.join(', ');
  };
  $scope.displayBal = function () {
    return 'Balance : $' + $scope.balance;
  };
  $scope.locationOutput = function (location) {
    $scope.prompt = `You have arrived at ${location.output}\n\n${$scope.prompt}`;
  };
  $scope.resetLoc = function (currentLoc) {
    // reset all by setting to false
    for (var a = 0; a < locationStringArray.length; a++) {
      locationStringArray[a].current = false;
    }
    // set new location to true
    currentLoc.current = true;
    $scope.currentLoc = currentLoc.output;
    $scope.locationOutput(currentLoc);
  };
  $scope.submit = function() {
    let input = $scope.input.toLowerCase();
    $scope.input = '';

    function cantGoThere () {
      $scope.prompt = `You can't go there. The locations you can choose from are "my office", "the coffee shop", "the client's office", and "the bar" — though, depending on where you are located currently, some of those options may not be accessible.\n\n${$scope.prompt}`;
    }

    function buySuccess (item, cost) {
      $scope.balance -= cost;
      $scope.prompt = `Success! You bought a small ${item} for $${cost}, you\'re now down to a balance of $${$scope.balance}.\n\n${$scope.prompt}`;
    }

    function buyFail (item, cost) {
      $scope.prompt = `Bummer! You don't have enough money for a $${cost} ${item}, you\'re currently down to a balance of $${$scope.balance}.\n\n${$scope.prompt}`;
    }

    function buyWrong(item, cost) {
      $scope.prompt = `That isn't available here, but I do imagine they'll have ${item}! You've got a balance of $${$scope.balance} and each ${item} costs $${cost}, spend wisely...\n\n${$scope.prompt}`;
    }

    function nothingToBuy() {
      $scope.prompt = `This isn't a location where you can really buy things. Save your money and get on with the tasks at hand...\n\n${$scope.prompt}`;
    }

    if (input.includes('go')) {
      // find current location
      for (var b = 0; b < locationStringArray.length; b++) {
        if (locationStringArray[b].current == true) {
          for (var c = 0; c < locationStringArray[b].tos.length; c++) {
            const newLocation = locationStringArray[b].tos[c];
            if (input.includes(newLocation.string)) {
              $scope.resetLoc(newLocation);
              $scope.prompt = `${newLocation.prompts[++newLocation.promptIndex]}\n\n${$scope.prompt}`;
              return;
            }
          }
          return cantGoThere();
        }
        else {
          console.error();('there isn\'t a current location...');
        }
      }
    }
    else if (input.includes('buy')) {
      if ($scope.currentLoc == coffee.output) {
        let item = 'coffee';
        let cost = 3;
        if (input.includes(item)) {
          if ($scope.balance < cost) {
            return buyFail(item, cost);
          }
          else {
            return buySuccess(item, cost);
          }
        }
        else {
          return buyWrong(item, cost);
        }
      }
      else if ($scope.currentLoc == bar.output) {
        let item = 'beer';
        let cost = 5;
        if (input.includes(item)) {
          if ($scope.balance < cost) {
            return buyFail(item, cost);
          }
          else {
            return buySuccess(item, cost);
          }
        }
        else {
          return buyWrong(item, cost);
        }
      }
      else {
        return nothingToBuy();
      }
    }
    else if (input.includes('get')) {

      if ($scope.currentLoc == office.output) {
        if (office.promptIndex === 0) {
          if (input.includes('attachment')) {
            // can get attachment at promptIndex = 0
            $scope.inventory.attachment = true;
            $scope.prompt = `Success! You've snagged the email attachment and added it to your inventory. Now you can read through it and see exactly what the client wants...${office.prompts[++office.promptIndex]}\n\n${$scope.prompt}`;
          }
          else {
            // what they asked for isn't available in the game
            $scope.prompt = `I don't think that's going to be terribly useful. Let's just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
          }
        }
        // nothing else to get at this promptIndex
        else {
          $scope.prompt = `There's nothing to get at this point in the game. We'll just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
        }
      }
      else if ($scope.currentLoc == coffee.output) {
        if (coffee.promptIndex === 1) {
          if (input.includes('spec')) {
            // can get spec at promptIndex = 1
            $scope.inventory.spec = true;
            $scope.prompt = `Success! You've managed to get an approved design spec and added it to your inventory. Now comes the hard part...${coffee.prompts[++coffee.promptIndex]}\n\n${$scope.prompt}`;
          }
          else {
            // what they asked for isn't available in the game
            $scope.prompt = `I don't think that's going to be terribly useful. Let's just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
          }
        }
        // nothing else to get at this promptIndex
        else {
          $scope.prompt = `There's nothing to get at this point in the game. We'll just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
        }

        // can get approved design spec at prompts[1]
        // can get signed contract at prompts[2]
      }
      else if ($scope.currentLoc == client.output) {
        // can get money at prompts[1]
      }
      else {
        // nothing to get in this room
        $scope.prompt = `There's nothing to get at this point in the game. We'll just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
      }
    }


    // $scope.prompt = `SOMETHING GOES HERE\n\n${$scope.prompt}`;
  };
}
