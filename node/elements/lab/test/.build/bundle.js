(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./x-widget.js');

},{"./x-widget.js":2}],2:[function(require,module,exports){
//
// 2015.10.16
//

// upg: auto models
'use strict';

var p = Object.create(HTMLElement.prototype);

p.createdCallback = function () {
	var here = this;
	var dom = this.createShadowRoot(); // upg: this._dom = dom  (or allow dom direct access?)

	var name = 'x-widget'; // or map values in files?

	this._name = name;
	this._shadow = dom;

	this.attributeChangedCallback = function () {};
	this.attachedCallback = function () {};
	this.detachedCallback = function () {};

	// datas
	this['body'] = 'hello.\n';

	//upg: set dom to body.html
	dom.innerHTML = this.body || 'empty';
};

p.attributeChangedCallback = function (name, oldVal, newVal) {
	//console.log('attr change x-widget',name,oldVal,newVal)
	this.attributeChangedCallback(name, oldVal, newVal);
};

p.attachedCallback = function () {
	//console.log('attached x-widget')
	this.attachedCallback();
};

p.detachedCallback = function () {
	//console.log('detached x-widget')
	this.detachedCallback();
};

document.registerElement('x-widget', { prototype: p });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL25pbWJsZS1lbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvdXNlci9jbG9uZXMvcTkvaW5jdWJhdG9yL3Byb2plY3RzL25pbWJsZS9ub2RlL2VsZW1lbnRzL2xhYi90ZXN0Ly5idWlsZC9tYWluLmpzIiwiL2hvbWUvdXNlci9jbG9uZXMvcTkvaW5jdWJhdG9yL3Byb2plY3RzL25pbWJsZS9ub2RlL2VsZW1lbnRzL2xhYi90ZXN0Ly5idWlsZC94LXdpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBOzs7Ozs7Ozs7O0FDS3hCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBOztBQUc1QyxDQUFDLENBQUMsZUFBZSxHQUFHLFlBQVU7QUFDN0IsS0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2YsS0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7O0FBRWpDLEtBQUksSUFBSSxhQUFhLENBQUE7O0FBRXJCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0FBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBOztBQUVsQixLQUFJLENBQUMsd0JBQXdCLEdBQUcsWUFBVSxFQUFFLENBQUE7QUFDNUMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVUsRUFBRSxDQUFBO0FBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFVLEVBQUUsQ0FBQTs7O0FBR3BDLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFDWixDQUFBOzs7QUFJQSxJQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFBO0NBSW5DLENBQUE7O0FBRUYsQ0FBQyxDQUFDLHdCQUF3QixHQUFHLFVBQVMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUM7O0FBRXhELEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0NBQ2hELENBQUE7O0FBR0YsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLFlBQVU7O0FBRTlCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0NBQ3RCLENBQUE7O0FBR0YsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLFlBQVU7O0FBRTlCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0NBQ3RCLENBQUE7O0FBR0YsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUMsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3gtd2lkZ2V0LmpzJylcbiIsIi8vXG4vLyAyMDE1LjEwLjE2XG4vLyBcblxuLy8gdXBnOiBhdXRvIG1vZGVsc1xudmFyIHAgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSlcblxuXG5wLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7XG5cdHZhciBoZXJlID0gdGhpc1xuXHR2YXIgZG9tID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCkgLy8gdXBnOiB0aGlzLl9kb20gPSBkb20gIChvciBhbGxvdyBkb20gZGlyZWN0IGFjY2Vzcz8pXG5cblx0dmFyIG5hbWUgPSBgeC13aWRnZXRgIC8vIG9yIG1hcCB2YWx1ZXMgaW4gZmlsZXM/XG5cdFxuXHR0aGlzLl9uYW1lID0gbmFtZVxuXHR0aGlzLl9zaGFkb3cgPSBkb21cblxuXHR0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7fVxuXHR0aGlzLmF0dGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbigpe31cblx0dGhpcy5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24oKXt9XG5cblx0Ly8gZGF0YXNcblx0dGhpc1snYm9keSddID0gYGhlbGxvLlxuYFxuXG5cblx0Ly91cGc6IHNldCBkb20gdG8gYm9keS5odG1sXG5cdGRvbS5pbm5lckhUTUwgPSB0aGlzLmJvZHkgfHwgJ2VtcHR5J1xuXG5cdFxuXG5cdH1cblxucC5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihuYW1lLG9sZFZhbCxuZXdWYWwpe1xuXHQvL2NvbnNvbGUubG9nKCdhdHRyIGNoYW5nZSB4LXdpZGdldCcsbmFtZSxvbGRWYWwsbmV3VmFsKVxuXHR0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLG9sZFZhbCxuZXdWYWwpXG5cdH1cblxuXG5wLmF0dGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbigpe1xuXHQvL2NvbnNvbGUubG9nKCdhdHRhY2hlZCB4LXdpZGdldCcpXG5cdHRoaXMuYXR0YWNoZWRDYWxsYmFjaygpXG5cdH1cblxuXG5wLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbigpe1xuXHQvL2NvbnNvbGUubG9nKCdkZXRhY2hlZCB4LXdpZGdldCcpXG5cdHRoaXMuZGV0YWNoZWRDYWxsYmFjaygpXG5cdH1cblxuXG5kb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ3gtd2lkZ2V0Jyx7cHJvdG90eXBlOiBwfSlcblxuIl19
