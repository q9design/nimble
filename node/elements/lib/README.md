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

	npm i live-server
	live-server --wait=350 _build


------------------------------------------
# About Nimble Elements

Nimble Elements is fortified with

	- babelify
	- browserify
	- custom element directories


Bringing to your browser based application

	- new javascript features
	- npm libraries
	- <custom-tags></custom-tags>


Bundled into two files

	- index.html
	- bundle.js


From a set of element files and objects (files and folders)

	+ [myproject]

		+ [display-box]
			| body.html
			| left.html
			| right.html
			| created.js

		+ [hello-widget]
			| body.html
			| created.js

		+ [x-main]
			| body.html
			| created.js

		- index.html
	

Each sub-directory of your project generates a custom html tag.  e.g. the **hello-widget** directory becomes **\<hello-widget\>\</hello-widget\>**

	directory contents
		- created.js -- called when your <custom-tag></custom-tag> is created.
			- 'this' is the instance of the created element.
			- this['body'] = body.html contents (also the shadow dom default content.)
			- this['anyname'] = anyname.html contents.
			- var dom = your custom tag's shadow dom object.

		- *.html files are provided to created.js as this['filename'] properties.


Standard npm packages may be added to your application

	npm i --save package-name

	
And included using require

	var p = require('package-name')


