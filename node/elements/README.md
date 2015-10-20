-------------------------------------------------------------
 
 TL;DR;

	install:  sudo npm i -g nimble-elements

	  build:  nimble (from your development folder)

	 deploy:  copy ./build index.html & bundle.js

-------------------------------------------------------------


Nimble Node Elements ...

	> babelify
	> browserify
	> custom web elements from folders

	> generates bundled application.



##############
1. SETUP

sudo npm i -g nimble-elements
sudo npm i -g live-server (helpful if developing locally)

##############



##############
2. CREATE PROJECT

mkdir myproject
cd myproject

* create your custom elements
mkdir main
mkdir menu
mkdir footer

nimble
##############



##############
3. DEVELOP AND RUN

live-server --wait=500 .build

[root]
	- index.html 
	- *.js
	[my-element]  (a directory is a nimble/html custom element )
		- created.js	 (includes dom as the shadow dom eg dom.innerHTML = 'hi')
		- body.html      (will map to this['body'])

	<my-element></my-element>

* use npm packages
	npm init
	npm i --save jquery

	var $ = require('jquery')

* reference your custom elements (note: single word elements will be prefixed with "x-")
	<x-main></x-main>

> nimble ... to recompile to build folder >> .build

	creates
	------------
	- ./build/index.html
	- ./build/bundles.js
	
##############



##############
4. DEPLOY

copy
	- ./build/index.html
	- ./build/bundles.js

to your runtime location

##############



##############
5. RUN

	browse to index.html

##############


------------------------------------------

WE MAKE NO GUARANTEES OR WARRANTIES FOR THIS SOFTWARE .. however we hope it works great for you! :)


