// TODO money mechanic, costs to drive between locations
// TODO energy mechanic, energy is used with interactions, driving need for coffee/beer
// TODO money mechanic, lose game when broke not enough money to buy any more "upgrades"
// TODO car/transit mechanic, pay to move between locations
// TODO reconnect use attachment functionality instead of auto reading once getting
// TODO restyle prompt to show all but most recent prompt prints as a faded grey
// TODO enter key = submit()
// TODO add a "you already have it" message if inventory state is already true.
// TODO move all prompt text to obj.prompts and use the ++obj.promptsIndex to cycle through them more consistently

export default function main ($scope) {

  // -------------------- global --------------------

  let start = {
    string : 'start',
    output : 'the start',
    current : true,
    promptIndex : -1,
    prompts : [
      'you are a creative freelancer with a diligent work ethic, but every once in a while you come across an impossible client and all bets are off. Type "Go to my office" to begin playing Freelancer\'s Fury...'
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
      'You are hard at work when you hear the little **ding** from your email program. Clicking over to look at it you find a message from a prospective client wanting to hire you for some web design work, they\'ve attached a pdf with the outline of the project they have in mind. Knowing your bank account is dwindling, you ARE in a bit of a pinch financially and could use some new work -- if only you had your own copy of that attachment...', // get attachment
      'After reading over the file from the client you see that most everything they want is within your capability, but there is one small step you forsee needing to learn -- if only you had a book you could reference...', // use book
      'Excellent! That looks easy enough to learn ! You write back to the client and express interest in the project but the next step is to bring some ideas to the table to convince them that you\'re the freelancer for them! You\'ve got a few hours work ahead of you before you can meet up with them for happy hour to go over your ideas but you\'re incredibly distractable today -- if only you had something to drown out the world full of distractions...', // use music
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
      'You arrived a few minutes early and got a text from the client that they\'re running late. No worries, go ahead and buy a coffee while you wait...',
      'The client arrives before too long. After a bit of talking they\'ve decided that they want to go with one of the designs you mocked up to show as an example! What\'s more, the client has already approved your design spec! What luck! Better snag that before it gets lost...',
      'Money is always a sticky topic to approach. The client originaly wanted to pay your full rate, but because they chose one of your "pre-made" designs they want to renegotiate! You sip your coffee slowly and wait for the pulse pounding in your temples to calm. You stick to your guns and carefully explain that while the design was complete prior to the meeting, the reason you were able to do so was that you are a highly trained designer and have spent quite a lot of money on your education and your tools. The client sighs and apologizes. They never wanted to devalue your work. They agree to pay your originally quoted fee and they sign the contract. Better file that away too...',
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
      'Oh no! Immediate disaster upon walking into the client\'s office. Their partners didn\'t know that decisions were being made at the coffee shop before they were involved. Several of them ask if there is any room left for negotiation or not--Now would be a good time to show them the agreed-upon design spec and the signed contract...',
      'Alright, now that they\'ve seen the materials you presented in the coffee shop they\'ve calmed down quite a bit. Several of them have repeatedly mentioned that your design absolutely nailed the idea they had in their head! Now to present the contract...',
      '"These terms are quite agreeable!" exclaims the CFO. Holy cow, he\'s already got a pen out and is signing your check. Don\'t forget to snag that before you go...',
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
    check : false,
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
    return 'Bank Balance : $' + $scope.balance;
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

    function buySuccess (item, cost, next) {
      $scope.balance -= cost;
      $scope.prompt = `Success! You bought a small ${item} for $${cost}, you\'re now down to a balance of $${$scope.balance}. ${next}.\n\n${$scope.prompt}`;
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

    function notUseful() {
      $scope.prompt = `I don't think that's going to be terribly useful. Let's just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
    }

    function nothingToGet() {
      $scope.prompt = `There's nothing to get at this point in the game. We'll just ignore this minor transgression and keep going...\n\n${$scope.prompt}`;
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
        let next = `Ahhh, that coffee really hits the spot. ${coffee.prompts[++coffee.promptIndex]}\n\n${$scope.prompt}`;
        if (input.includes(item)) {
          if ($scope.balance < cost) return buyFail(item, cost);
          else return buySuccess(item, cost, next);
        }
        else return buyWrong(item, cost);
      }
      else if ($scope.currentLoc == bar.output) {
        let item = 'beer';
        let cost = 5;
        let next = `Ahhh, that beer really hits the spot.\n\n${$scope.prompt}`;
        if (input.includes(item)) {
          if ($scope.balance < cost) return buyFail(item, cost);
          else return buySuccess(item, cost, next);
        }
        else return buyWrong(item, cost);
      }
      else return nothingToBuy();
    }
    else if (input.includes('get')) {
      if ($scope.currentLoc == office.output) {
        if (office.promptIndex === 0) {
          if (input.includes('attachment')) {
            $scope.inventory.attachment = true;
            $scope.prompt = `Success! You've snagged the email attachment and added it to your inventory. Now would be as good a time to read it as any...\n\n${$scope.prompt}`;
          }
          else return notUseful();
        }
        else return nothingToGet();
      }
      else if ($scope.currentLoc == coffee.output) {
        if (coffee.promptIndex === 1) {
          if (input.includes('spec')) {
            $scope.inventory.spec = true;
            $scope.prompt = `Success! You've managed to get an approved design spec and added it to your inventory. Now comes the hard part...${coffee.prompts[++coffee.promptIndex]}\n\n${$scope.prompt}`;
          }
          else return notUseful();
        }
        if (coffee.promptIndex === 2) {
          if (input.includes('contract')) {
            $scope.inventory.contract = true;
            $scope.prompt = `Success! You've managed to get a signed contract and added it to your inventory. That concludes our meeting, the client miraculously agreed to one of your mocked up examples so now you just export and meet the rest of their team to deliver the finals. Off to their office you go...\n\n${$scope.prompt}`;
          }
        }
        else return nothingToGet();
      }
      else if ($scope.currentLoc == client.output) {
        // can get money at prompts[1]
        if (coffee.promptIndex === 1) {
          if (input.includes('check')) {
            $scope.inventory.check = true;
            $scope.prompt = `Success! You've turned over the final work and received your check! Check out all those zeroes! Sure feels good to have that hit your account, eh? How about we head out to the bar to celebrate...\n\n${$scope.prompt}`;
          }
        }
      }
      else {
        return nothingToGet();
      }
    }
    else if (input.includes('use')) {
      if (input.includes('book')) {
        $scope.inventory.book = false;
        $scope.prompt = `${office.prompts[++office.promptIndex]}\n\n${$scope.prompt}`;
      }
      if (input.includes('music')) {
        $scope.inventory.music = false;
        $scope.prompt = `${office.prompts[++office.promptIndex]}\n\n${$scope.prompt}`;
      }
      if (input.includes('attachment')) {
        $scope.inventory.attachment = false;
        $scope.prompt = `${office.prompts[++office.promptIndex]}\n\n${$scope.prompt}`;
      }
      if (input.includes('spec')) {
        $scope.inventory.spec = false;
        $scope.prompt = `${client.prompts[++client.promptIndex]}\n\n${$scope.prompt}`;
      }
      if (input.includes('contract')) {
        $scope.inventory.contract = false;
        $scope.prompt = `${client.prompts[++client.promptIndex]}\n\n${$scope.prompt}`;
      }
      if (input.includes('check')) {
        $scope.prompt = `Using the check!\n\n${$scope.prompt}`;
      }
    }

    // $scope.prompt = `SOMETHING GOES HERE\n\n${$scope.prompt}`;
  };
}
