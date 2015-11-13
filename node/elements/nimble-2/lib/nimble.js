//
// 2015.11.09 - nimble.js
//

//
// upg: better to use plugins/standard? and/or supply a default if not otherwise.. like babel and uglify.
//

// next:
//	- index.html (from root)
//	- root.js libs (global libs)

// upg: pattern match exlude (like zold)
// upg: support for sub folders.

var NimbleCore = require('./nimble-core.js')

var Mustache = require('mustache')

var path = require('path')
var walk = require('walk')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var mime = require('mime')

//var babelCore = require('babel-core')

//var UglifyJS = require('uglify-js')


var nimble = new NimbleCore()

var opts = {}

var source_path = path.resolve(opts.source_path || process.cwd())
var dest_name = '_build'
var dest_path = path.resolve(source_path+"/"+dest_name)  // !! CONTENTS OF THIS PATH ARE DELETED EVERY RUN !!
var temp_path = dest_path+"/temp"

var err = function(e){console.log('err',e)}

var w = walk.walk(source_path,{
	filters: ["_build","node_modules","data"] //upg: allow optional filters
	})

var libdata = ''

var index = `<!doctype html>
<html>
	<head>
	</head>
	<body>
		<x-main></x-main>
	</body>
</html>
`

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


	;(function(){
		var libs = {}
		var ready_libs = {}
		var _count = 0

		var _debug = false


		var require = function(s){ // upg: are there more than one params?
			"use strict"

			_count++
			let id = 'require #'+_count

			if(_debug) console.log(id+" rrrreeeqqqquuuuire',s",s)

			{{{libdata}}}


			if(!ready_libs[s] && libs[s]){
				ready_libs[s] = libs[s]()
				if(_debug) console.log(id+' ... new require!',s)
				}

			if(ready_libs[s]){
				if(_debug) console.log(id+' ... ready libs',s)
				return ready_libs[s]
				}
			else {
				if(_debug) console.log(id+' ... defer to parent',s)
				return _require(s)
				}

			}//func


		{{{code}}}
		})()
})();
`
//////////////////////////////////////////////
//////////////////////////////////////////////






// -------------------------------------------------
w.on('files',(root,files,next)=>{
"use strict"
	

	if(root == source_path){
		console.log('process root')
	
		var p = path.parse(root)
		var o = nimble.newObject(p.name)
	
		var todo = []


		files.forEach(v=>{
			let oO =  o
			var ffn = `${root}/${v.name}` //  /home/user/clones/q9/nimble-elements/test/test2/c/body.html

			var pp = path.parse(ffn)
			todo.push(new Promise((res,rej)=>{
				fs.readFileAsync(ffn).then(vv=>{
							res({pp,o:oO, data:vv, ffn})
							}).catch(rej)
				}))
			
			})//files


		Promise.all(todo).then(v=>{

			var libs = []
			v.forEach(v=>{
				var pp = v.pp
				var o = v.o
				var data = v.data
				var ffn = v.ffn

				var name = pp.name // body
				var base = pp.base // body.html
				var ext = pp.ext.toLowerCase() // .html

				if(base == 'index.html')
					index = data.toString()
				else
				if(ext == '.js')
					libs.push({name,data:data.toString()})
				})

			var o = []
			libs.forEach(v=>{
				var m = {
					'libname': v.name,
					'libcode': v.data,
					}//var

				var code = Mustache.render(libs_template,m)
				o.push(code)
				})
			libdata = o.join('\n\n')

			}).catch(err).finally(next)






		//next()
		}
	else{

		var p = path.parse(root)
		var o = nimble.newObject(p.name)
	
		var todo = []


		files.forEach(v=>{
			let oO =  o
			var ffn = `${root}/${v.name}` //  /home/user/clones/q9/nimble-elements/test/test2/c/body.html

			var pp = path.parse(ffn)
			todo.push(new Promise((res,rej)=>{
				fs.readFileAsync(ffn).then(vv=>{
							res({pp,o:oO, data:vv, ffn})
							}).catch(rej)
				}))
			
			})//files


		Promise.all(todo).then(v=>{
			v.forEach(v=>{
				var pp = v.pp
				var o = v.o
				var data = v.data
				var ffn = v.ffn

				var name = pp.name // body
				var base = pp.base // body.html
				var ext = pp.ext.toLowerCase() // .html

				if(base == 'created.js')
					o.addCreated(data.toString())
				else
				if(ext == '.js')
					o.addLib(name,data.toString())
				else
				if(ext == '.html')
					o.addHTML(name,data.toString())
				else {
					var m = mime.lookup(ffn)
					o.addData(base,data,m)
					}
				})
			}).catch(err).finally(next)

		}//else
	
	})//func




// -------------------------------------------------
w.on('end',n=>{
	var l = nimble.compile()

	var o = []
	l.objects.forEach(v=>{
		var oo = `\n;(function(){

			//
			// DATE		: ${(new Date())}
			// EID		: ${v.eid}
			// NAME		: ${v.name}
			// TAGNAME	: ${v.tagname}
			//

			${v.code}
	
			})();\n`

		o.push(oo)
		})

	var code = o.join('\n\n\n// ------------------------------------------------\n\n\n')

	

	//console.log(babelCore.transform('var x = `hi`',{presets:['es2015']}))return

	// upg: need source maps for orignal files.

	//upg: babelify

	/*
	// want to use ... why this not do that.
	// electrion does pretty well natively without babelify
	var r = babelCore.transform(code,{
		//presets:['es2015'], // npm i --save babel-preset-es2015  // upg: for electrion just what needs it (... for example)
		plugins: ['transform-es2015-parameters'],
		code:true,
		sourceMaps: false,//'inline',//,'both',true,
		comments: true,//false, // shouldPrintComment callback also
		//compact:'auto'
		})

	code = r.code
	*/


	//console.log(r.options,r.code)

	//upg: uglifiy
	//var rr = UglifyJS.minify(r.code,{fromString: true})

	//console.log('all all done',rr.code)//r.code,r.map,r.ast)

	//console.log(rr.code)

	//upg: use index.html as source pattern (else this pattern if none found)

	//upg: if </body> exists... otherwise simply append script code.

	var m = {
		libdata,
		code
		}//var


	var code = Mustache.render(template,m)

	var out = index.replace("</body>",n=>`<script>${code}</script></body>`)

	var ofn = dest_path+"/index.html"
	fs.writeFileAsync(ofn,out).
		then(v=>{
			console.log('compiled to:',ofn)
			}).
		catch(err)
	})

w.on('errors',err)




/*



 { dev: 2050,
    mode: 33204,
    nlink: 1,
    uid: 1000,
    gid: 1000,
    rdev: 0,
    blksize: 4096,
    ino: 162931,
    size: 12030,
    blocks: 0,
    atime: Mon Nov 09 2015 13:50:47 GMT-0500 (EST),
    mtime: Mon Nov 09 2015 13:50:47 GMT-0500 (EST),
    ctime: Mon Nov 09 2015 13:50:51 GMT-0500 (EST),
    birthtime: Mon Nov 09 2015 13:50:51 GMT-0500 (EST),
    name: 'body.html',
    type: 'file' }

*/
