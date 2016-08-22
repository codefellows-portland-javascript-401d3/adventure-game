// import controllers and define a module.controller for each below

import angular from 'angular';
import main from './main';

const module = angular.module('controllers', []);

module.controller('main', main);

export default module.name;
