//
// 2015.10.16
// 

// upg: auto models
var p = Object.create(HTMLElement.prototype)


p.createdCallback = function(){
	var here = this
	var dom = this.createShadowRoot() // upg: this._dom = dom  (or allow dom direct access?)

	var name = `hello-world` // or map values in files?
	
	this._name = name
	this._shadow = dom

	this.attributeChangedCallback = function(){}
	this.attachedCallback = function(){}
	this.detachedCallback = function(){}

	// datas
	this['body'] = `<style>
	h1 {text-align: center; cursor: pointer;}
</style>
<h1>Hello world</h1>
`


	//upg: set dom to body.html
	dom.innerHTML = this.body || 'empty'

	console.log('hello!',this,dom)

this.onclick  = e=>console.log('click',this)


	}

p.attributeChangedCallback = function(name,oldVal,newVal){
	//console.log('attr change hello-world',name,oldVal,newVal)
	this.attributeChangedCallback(name,oldVal,newVal)
	}


p.attachedCallback = function(){
	//console.log('attached hello-world')
	this.attachedCallback()
	}


p.detachedCallback = function(){
	//console.log('detached hello-world')
	this.detachedCallback()
	}


document.registerElement('hello-world',{prototype: p})

