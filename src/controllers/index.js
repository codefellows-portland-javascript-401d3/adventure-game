import angular from 'angular';
import game from './game';
import input from './input';

const module = angular.module('controllers', []);

module.controller('game', game);
module.controller('input', input);

export default module.name;
