import angular from 'angular';
import app from './app';
import template from './game.html';
import './main.css';

document.body.innerHTML = template;
angular.bootstrap(document, [app]);
