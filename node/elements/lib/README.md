# install

	sudo npm i -g nimble-elements


# setup

	> mkdir myproject
	> cd myproject

	> nimble --bootstrap


# compile/run

	> nimble 

	view your application by browsing to _build/index.html


**tip:** 

	npm i -g live-server
	live-server --wait=350 _build


---

# About Nimble Elements

Nimble Elements is fortified with

	- babelify
	- browserify
	- custom element directories


Bringing to your browser based application

	- new javascript features
	- npm packages
	- <custom-tags></custom-tags>


Bundled into two files

	- index.html
	- bundle.js


From a collection of element files and objects (files and folders)

	+ [myproject]

		+ [display-box]
			| body.html
			| created.js
			| left.html
			| right.html

		+ [hello-widget]
			| body.html
			| created.js

		+ [x-main]
			| body.html
			| created.js

		- index.html
	

Each sub-directory generates a custom html tag which can be used anywhere in your project

     hello-widget directory generates a <hello-widget></hello-widget> element

**directory contents:**

		- created.js -- called when an instance of your <custom-tag></custom-tag> is created.
			'this' is the instance of the created element.
			 this['body'] = body.html contents (also the shadow dom default content.)
			 this.anyname = anyname.html contents.
			 var dom = your custom tag's shadow dom object.

  	  - *.html file content is provided to created.js as a this[*] / this.* property.  (e.g. bob.html > this['bob'])



## npm packages

Many standard npm packages can be added to your application

	npm i --save package-name

	
And included using require

	var p = require('package-name')


## application requirements
Applications use relatively new html features

   * [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/) - [can i use]( http://caniuse.com/#feat=custom-elements)
   * [Shadow Dom](http://www.w3.org/TR/shadow-dom/) - [can i use](http://caniuse.com/#feat=shadowdom)

And will run in supporting browsers  (as of Oct 2015)

   * Chrome
   * Opera
   * (Firefox - with a flag setting)



## try it out! - sample code (run from an empty directory)

    nimble --bootstrap myproject


## final words, notes & suggestions

Nimble elements goes well with [electron](http://electron.atom.io/)

Currently under early development... questions, comments, requests welcome.

Thanks for using nimble-elements!
