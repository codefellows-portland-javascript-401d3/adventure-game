// this file bootstraps the app separately

import angular from 'angular';
import app from './app.js';
import template from './app.html';

document.body.innerHTML = template;
angular.bootstrap(document, [app]);
