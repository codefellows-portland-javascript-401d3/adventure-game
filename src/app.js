import angular from 'angular';
import game from './templates/game.html';
import controllers from './controllers';
import './main.css';

const app = angular.module('myApp',[controllers]);

document.body.innerHTML = game;
angular.bootstrap(document, [app.name]);
