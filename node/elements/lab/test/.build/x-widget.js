//
// 2015.10.16
// 

// upg: auto models
var p = Object.create(HTMLElement.prototype)


p.createdCallback = function(){
	var here = this
	var dom = this.createShadowRoot() // upg: this._dom = dom  (or allow dom direct access?)

	var name = `x-widget` // or map values in files?
	
	this._name = name
	this._shadow = dom

	this.attributeChangedCallback = function(){}
	this.attachedCallback = function(){}
	this.detachedCallback = function(){}

	// datas
	this['body'] = `hello.
`


	//upg: set dom to body.html
	dom.innerHTML = this.body || 'empty'

	

	}

p.attributeChangedCallback = function(name,oldVal,newVal){
	//console.log('attr change x-widget',name,oldVal,newVal)
	this.attributeChangedCallback(name,oldVal,newVal)
	}


p.attachedCallback = function(){
	//console.log('attached x-widget')
	this.attachedCallback()
	}


p.detachedCallback = function(){
	//console.log('detached x-widget')
	this.detachedCallback()
	}


document.registerElement('x-widget',{prototype: p})

