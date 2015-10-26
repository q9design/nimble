//
// 2015.10.26
// 

// upg: auto models
var p = Object.create(HTMLElement.prototype)


p.createdCallback = function(){
	var dom = this.createShadowRoot() // upg: this._dom = dom  (or allow dom direct access?)

	var name = `{{tagname}}` // or map values in files?
	
	this._name = name
	this._shadow = dom

	this.attributeChangedCallback = function(){}
	this.attachedCallback = function(){}
	this.detachedCallback = function(){}

	// datas
	{{filedata}}

	//upg: set dom to body.html
	dom.innerHTML = this.body || 'empty'

	{{created.js}}

	}

p.attributeChangedCallback = function(name,oldVal,newVal){
	//console.log('attr change {{tagname}}',name,oldVal,newVal)
	this.attributeChangedCallback(name,oldVal,newVal)
	}


p.attachedCallback = function(){
	//console.log('attached {{tagname}}')
	this.attachedCallback()
	}


p.detachedCallback = function(){
	//console.log('detached {{tagname}}')
	this.detachedCallback()
	}


document.registerElement('{{tagname}}',{prototype: p})

