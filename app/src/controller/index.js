import angular from 'angular';
import counter from './counter';
import cowsay from './cowsay';
import game from './game';
import location from './location';
import player from './player';

const module = angular.module('controllers', []);

module.controller('counter', counter);
module.controller('cowsay', cowsay);
module.controller('game', game);
module.controller('location', location);
module.controller('player', player);

export default module.name;
