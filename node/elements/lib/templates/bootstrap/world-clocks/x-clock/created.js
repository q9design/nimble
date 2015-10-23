//
// 2015.10.23 -- x-clock / created.js
//

//upg: stop ticking when removed.

//upg: know world codes (where find a list of them)

//upg: support property change offsetHours, offset

//upg: support attribute change offsetHours, offset

//upg: support offset in seconds

var MSPERHOUR = 60*60*1000

this.attributeChangedCallback = function(name,oldVal,newVal){
	console.log('cc',name,oldVal,newVal)
	//upg: support
	}


if(this.hasAttribute('offset-hours')){
	let o = parseInt(this.getAttribute('offset-hours'))
	this.offset = o*MSPERHOUR
	}//if
else
	this.offset = 0


var tick = n=>{
	console.log('tick',this.offset/MSPERHOUR)

	// draw
	var d = Date.now()
	
	var dd = new Date(d+this.offset)

	var h = dd.getUTCHours()
	var m = dd.getUTCMinutes()
	var s = dd.getUTCSeconds()

	var fH = h
	var fM = m<10?'0'+m:m
	var  fS = s<10?'0'+s:s

	dom.innerHTML  = `${fH}:${fM}:${fS}`

	setTimeout(tick,1000)
	}//func


tick()


////////////////////////
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//
