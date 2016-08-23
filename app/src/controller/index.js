import angular from 'angular';
import game from './game';
import player from './player';

const module = angular.module('controllers', []);

module.controller('game', game);
module.controller('player', player);

export default module.name;
