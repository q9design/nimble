//
// 2015.10.16 -- nimble.js
//


var browserify = require('browserify')
var babelify = require('babelify')
var Promise = require('bluebird')
var path = require('path')
var chalk = require('chalk')
var mkdirp = Promise.promisify(require('mkdirp'));
var fs = Promise.promisifyAll(require('fs'))
var glob = Promise.promisify(require('glob'))
var del = require('del')
var copyfiles = Promise.promisify(require('copyfiles'))

var exports = module.exports = {}

var err = function(e){console.log(chalk.white.bold.bgRed(' err ')+chalk.red.bold.bgWhite(" "+e+" "),e.stack)}
var log = v=>console.log('log',v)


// ----------------------------------------
exports.build = function(opts){
	console.log('build opts',opts)

	if(!opts) opts = {}

	var source_path = path.resolve(opts.source_path || process.cwd())
	var dest_name = '.build'
	var dest_path = path.resolve(source_path+"/"+dest_name)  // !! CONTENTS OF THIS PATH ARE DELETED EVERY RUN !!

	var template_path = path.resolve(__dirname+'/../templates') // upg: overridable templates (by string or path etc)

	var templates = {}
	
	console.log('nimble process >>> ',chalk.green(source_path),'to',chalk.red(dest_path),'using',chalk.yellow(template_path))

	// ----------
	mkdirp(dest_path).
		then(function(r){
			//load templates
			return glob(template_path+"/*.js").each(function(item,index,value){
				var b = path.parse(item).base

				return fs.readFileAsync(item).then(function(r){
					templates[b] = r.toString()
					})//each

				})//func
			}).
		then(function(r){
			console.log('loaded templates',r)//templates,r)		

			var d = [dest_path+"/*.js",dest_path+"/*.html"]
			return del(d)
			}).
		then(function(r){
			console.log('deleted old build files',r)
			return copyfiles(['*.js',dest_path])
			}).
		then(function(r){
			return fs.readdirAsync(source_path)
			}).
		then(function(r){
			console.log('source objects',r)
			return new Promise(function(res,rej){

				var out = ''
				var mods = []

				// ----------
				var next = function(){
					if(r.length > 0){
						var v = r.pop()
						fs.statAsync(v).then(function(r){
							if(r.isDirectory() && v != dest_name && v != 'node_modules'){  // upg: smarter
								console.log(v)
								mods.push(v)
								return buildObject(source_path+'/'+v)
								}
							}).catch(rej).then(next)
						}
					else{	// finalize
						//console.log('oo',out)

						var m = ''
						mods.forEach(function(v){
							m += "require('./"+v+".js')\n"
							})


						var head = //"<!-- upg: bring this local -->\n"+
							//"<base href='../'>"+
							"<script src='bundle.js'></script>\n"

						out = out.replace("</head>",head+"</head>")
						fs.writeFileAsync(dest_path+"/index.html",out).then(function(){
							return fs.writeFileAsync(dest_path+"/main.js",m)						
							}).
							then(function(){
								browserify(dest_path+'/main.js',{debug:true}).
								transform(babelify).
								bundle().
								on('error',rej).
								pipe(fs.createWriteStream(dest_path+'/bundle.js')).
								on('finish',res)
								})
						}//else
					}//func


				// ----------
				fs.readFileAsync(source_path+"/index.html").then(function(r){
						out = r.toString()
						}).
					catch(function(){}). // it's ok if we didn't find it.
					then(next)



				})//func
			}).
			then(v=>{
				console.log(chalk.green.bold('READY.'))
				}).
		catch(err)




	// -----------------------------------
	function buildObject(v){
		return new Promise(function(res,rej){

			var out = templates['element.js']
			var pp = path.parse(v)

			console.log('pp',pp)

			var fn = dest_path+"/"+pp.base+".js"
			console.log('build',v,'->',fn)

			var tagname = pp.name
			if(tagname.indexOf('-') == -1)
					tagname = 'x-'+tagname


			out = out.replace(new RegExp('{{tagname}}','g'),tagname)


			// datas
			return glob(v+"/*.html").reduce(function(acc,vv,i,len){
				var p = path.parse(vv)
				var name = p.name

				return fs.readFileAsync(vv).then(function(r){
					r = r.toString()
					r = r.replace('{{here}}',tagname) //upg: full path? // other replacements too? .. where can make hook to things like sass?
					return(acc+"this['"+name+"'] = `"+r.toString()+"`\n")
					})

				},"").
			then(function(r){
				out = out.replace('{{filedata}}',r)
				var createdjs = ''

				// created.js
				fs.readFileAsync(v+"/created.js").then(function(r){
					createdjs = r.toString()
					}).
				catch(function(){}). // it's ok if we didn't find it.
				then(function(){
					out = out.replace('{{created.js}}',createdjs)

					//write obj.js to build folder
					return fs.writeFileAsync(fn,out)
					}).
				catch(rej).
				then(res)

				}).
			catch(rej)
			})//func
		}//func
	// -----------------------------------





	}//func
