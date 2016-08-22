// this file now just contains the required pieces, but doesn't bootstrap the app

import angular from 'angular';
import controllers from './controllers';
import './css/main.css';

export default angular.module('myApp', [controllers]).name;
