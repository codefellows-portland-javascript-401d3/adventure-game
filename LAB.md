![cf](http://i.imgur.com/7v5ASc8.png) Angular "Fun Greeting" App with Webpack
====

Build a client side fun greeting application. Your index.html pulls in your bundle in the context an angular app. Make sure to style your app using some css.

Your app should be usable in both:
* Development mode
  * running webpack dev server
* "Production" mode - 
  * Project assets, bundled js file, html file(s) and css file(s), served 
  via Express (you don't need to actually run in express)

Webpack should: 
* including linting of js files
* be runnable via dev server
* create a bundle.js for "production" build
* inject the bundle.js script into your index.html

Angular should run and load properly in both modes.

Bonus:
* Webpack:
  * ES6 FTW! Babel your js files and use ES6 module loading **1pts**
* Angular:
  * Two-way binding: As a bonus make your app capable of changing the cow image to something else. **1pts**
