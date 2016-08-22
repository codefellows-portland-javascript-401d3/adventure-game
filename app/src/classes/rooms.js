const rooms = {};

rooms.hallway = {
  name: 'hallway',
  visited: 0,
  items: [],
  initial: 'You are in a hallway in a house. It\'s dark. There is a door to the living room next to you. Really, your only option is to go forward, so just do that.',
  beenHere: 'Back in the hallway? Come on, it\'s a hallway. Get over it already.'
};

rooms.living = {
  name: 'living room',
  visited: 0,
  items: ['pouch'],
  initial: 'You are in the living room. There is a door to the west and a pouch on the floor. What would you like to do?',
  beenHere: 'Back in the living room. Anything interesting in here?',
  pickup: 'You pick up the pouch and stash for use later. Now what?'
};

rooms.dining = {
  name: 'dining room',
  visited: 0,
  items: ['deli meat'],
  enemy: 'Panther',
  initial: 'You enter the dining room. A panther rests in a doorway that leads to the kitchen. Some delicious looking deli meat sits on the table. What now?',
  noEnemy: 'Back in the dining room. Panther still seems satiated. Where to? Maybe to the kitchen?',
  leaveEarly: 'You attempt to walk past the panther into the kitchen. The panther gets angry and eats you and the delicious deli meat that was on the table. Too bad!',
  feed: 'You offer the deli meat to the panther, and it seems content. But too bad, now no lunch meat for you. What next?'
};

rooms.kitchen = {
  name: 'kitchen',
  visited: 0,
  items: ['steak knife'],
  enemy: 'Lion',
  initial: 'You are now in the kitchen. It appears as though there is a lion at the other end of the room. There is a steak knife on the counter. There is fresh bread and sandwich fixings on the island, including more lunch meat! What would you like to do?',
  noEnemy: 'You are back in the kitchen. The lion is still enjoying the catnip. How \'bout that sandwich?',
  pouch: 'You open the pouch and pour out a large amount of catnip. The lion is very happy and no longer seems interested in you. Now what?',
  knife: 'You attempt to fight the lion with the steak knife, but come on, it\'s a lion! You are devoured. You lose.',
  leaveEarly: 'You make a sandwich and the lion that was sleeping on the other side of the room comes over. It eats you and your sandwich.',
  win: 'You make a sandwich and head out to the beach. Nice Work!'
};

rooms.hallway.forward = rooms.living;
rooms.hallway.back = null;
rooms.living.forward = rooms.dining;
rooms.living.back = rooms.hallway;
rooms.dining.forward = rooms.kitchen;
rooms.dining.back = rooms.living;
rooms.kitchen.forward = null;
rooms.kitchen.back = rooms.dining;

export {rooms};
