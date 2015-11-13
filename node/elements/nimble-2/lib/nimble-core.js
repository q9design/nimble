//
// 2015.11.09 -- nimble-core.js
//

// doesn't do any babel or browserify in itself here .. simply compile nimble.

// next: learn grunt, gulp, broccollii and other such tools for programatic compelation... see how nimble-elements-core could fit in.

// upg:
//	- make node based
//	- nodes with subnodes
//	- var n  = new node()
//	- var sn = n.newNode()
//

// upg:
//	- up tree resolves (data, html, libs) .. in the long run? .. upg: virtual trees, any match rules.

// upg: how do globals
//		- data
//		- libs
//		- htmls

// upg: provide 'nimble' module nativlly .. var nimble = require('nimble')
//		- util:? nimble.dataify(dom) .. fixes sources.

// upg: auto code .. search dom values for src='' for data ? .. or var 

// upg: don't create the html main here... just compile.

// upg: source maps.

// upg: support specific require requests like ./abi.js  or ../abi.js or even ../xyz/code.js


// upg: object name replacments <my.tag.here></my.tag.here> // note the use of dots instead of dash <and.with/sub.tags></and.with/sub.tags>

// upg: images / and other datas

// upg: should this be file aware? maybe no.

// upg: should we bundle? or should another lib?

// upg: reorders? (perhpas make all datas in seperate table at end of list (optionally?)


var Mustache = require('mustache')
var data_uri = require('data-uri')



module.exports = function(){
	// ---------------------
	var _eo = 0
	var ElementObject = function(opts){  // upg: subnodes are instantces of self.. fun!
		var name = opts // common symbol name
		_eo++
		var eid = 'tag'+_eo //symbol

		if(!name){
			name = eid
			}//if

		var tagname = name
	
		if(tagname.indexOf('-') == -1)
			tagname = 'x-'+tagname

		// console.log('created element object',eid,name,tagname)

		var ll = []
		var hl = []
		var dl = []

		var created = false

		this.addHTML = (name,html)=>{
			hl.push({name,html})
			}  // upg: all types with mime?

		this.addData = (name,data,mime)=>{
			dl.push({name,data,mime})
			}

		this.addCreated = (data)=>{
			created = data
			}


		this.addLib = function(name,data){
			ll.push({name:name,data:data})
			}


		this.compile = function(){
			var filedata = ''
			var filedatavar = ''
			var htmldata = ''

			//lib data
			var o = []
			ll.forEach(v=>{
				var m = {
					'libname': v.name,
					'libcode': v.data,
					}//var

				var code = Mustache.render(libs_template,m)
				o.push(code)
				})
			var libdata = o.join('\n\n')

			//file data
			var o = []
			var oo = []
			dl.forEach(v=>{
				var u = data_uri.render(v.mime,v.data)
				o.push("this['"+v.name+"'] = `"+u+"`")
				oo.push("dataurl['"+v.name+"'] = this['"+v.name+"']")
				})//foreach

			filedata = o.join('\n')
			filedatavar = oo.join('\n')


			//html data
			htmldata = hl.map(v=>"this['"+v.name+"'] = `"+v.html+"`").join('\n')

			var m = {
				'created': this.created,
				tagname: this.tagname,
				'extend-name': '',
				libdata,
				filedata,
				filedatavar,
				htmldata,
				'register-options': '{prototype: p}',
				}//var


			var code = Mustache.render(template,m)

			return {eid,name,tagname,code}

			}//func

		Object.defineProperty(this,'data',{get: n=>dl})
		Object.defineProperty(this,'created',{get: n=>created})
		Object.defineProperty(this,'tagname',{get: n=>tagname})
		Object.defineProperty(this,'name',{get: n=>name})
		Object.defineProperty(this,'eid',{get: n=>eid})

		//this.addImage
		}//func
	
	// ==========================================================


	var ol = []

	//this.global = new ElementObject('')


	this.newObject = n=>{
		var o = new ElementObject(n)
		ol.push(o)
		return o
		}


	this.compile = opts=>{
	
		if(!opts)
			opts = {}

//		var html = opts.html || '<!doctype html><html><head></head><body></body></html>'

		var cl = []

//		console.log('compiling item count:',ol.length)

		ol.forEach(v=>{
			var c = v.compile()
			cl.push(c)			
			})

///		var rc = r.compile()

		return {
			objects:cl,
			//index:index,
			//libs:libs
			}
		//upg: async
		//return new Promise((res,rej)=>{res(true)})//func
		}//func



	}//func


//////////////////////////////////////////////
//////////////////////////////////////////////

// upg: might it be beter to use a __libs or such for memory? or does it work like that? .. how does it work?

var libs_template =
`
	libs['{{{libname}}}'] = function(){
		var module = {}


		{{{libcode}}}


		return module.exports
		}
`

// -------------------------------

var template = 
`
;(function(){
	//
	// 2015.11.10
	// 
	var _require = typeof(require) == 'function'?require:function(){}

	var libs = {}
	var ready_libs = {}


	;(function(){
		var require = function(s){ // upg: are there more than one params?

			{{{libdata}}}


			if(!ready_libs[s] && libs[s])
				ready_libs[s] = libs[s]()

			if(ready_libs[s])
				return ready_libs[s]
			else
				return _require(s)

			}//func


		// upg: auto models
		var p = Object.create(HTML{{extend-name}}Element.prototype)


		p.createdCallback = function(){

			// console.log('created.'); console.log(this)

			var dom = this.createShadowRoot() // upg: this._dom = dom  (or allow dom direct access?)

			var name = \`{{tagname}}\` // or map values in files?

			this._name = name
			this._shadow = dom

			this.attributeChanged = function(){}
			this.attached = function(){}
			this.detached = function(){}


			// datas
			// this.name = 'data:image/png;base64,DUhuiasdhuiasdopijsadfo'
			{{{filedata}}}

			var dataurl = {} //dataurl.name = this.name
			{{{filedatavar}}}


			// htmls
			// this.name = 'content'
			{{{htmldata}}}



			//upg: set dom to default index.html // upg: phase out this.body option to keep things simple?
			dom.innerHTML = this.index || this.body || 'empty'

			{{{created}}}

			}

		//attributechanged
		p.attributeChangedCallback = function(name,oldVal,newVal){
			//console.log('attr change {{tagname}}',name,oldVal,newVal)
			this.attributeChanged(name,oldVal,newVal)
			}

		//attached
		p.attachedCallback = function(){
			//console.log('attached {{tagname}}')
			this.attached()
			}

		//detached
		p.detachedCallback = function(){
			//console.log('detached {{tagname}}')
			this.detached()
			}


		document.registerElement('{{tagname}}',{{register-options}})
		})()
})();
`
//////////////////////////////////////////////
//////////////////////////////////////////////





/*
//////////////////////////////////////////////////
// node ../../lib/nimble-core.js > temp.html

var n = new module.exports()


//var r = n.global
//r.addHTML('index','<head><title>test</test></head>')
//r.addLib('api','console.log(5)') // api.js


var o = n.newObject('lab')
o.addHTML('index','hi')
o.addHTML('header','yo')
o.addData('icon.png','binarydatahere','image/png')
o.addLib('lib','module.exports = 5')
o.addLib('lib2','module.exports = 7')
o.addCreated(`
	var x = require('lib')
	var y = require('lib2')
	var z = require('lib-nill')
	console.log(this,x,y,z)
	`)


var c = n.compile()

console.log('compiled to','<x-lab></x-lab><script>'+c.objects[0].code+'</script>')
*/


