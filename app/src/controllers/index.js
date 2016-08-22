import angular from 'angular';
import desk from './desk';
import bossDesk from './bossDesk';
import breakroom from './breakroom';
import end from './end';
import main from './main';

const module = angular.module('controllers', []);

module.controller('desk', desk);
module.controller('bossDesk', bossDesk);
module.controller('breakroom', breakroom);
module.controller('main', main);
module.controller('end', end);

export default module.name;