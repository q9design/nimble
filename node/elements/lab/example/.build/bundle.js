(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//
// 2015.10.16
//

// upg: auto models
'use strict';

var p = Object.create(HTMLElement.prototype);

p.createdCallback = function () {
	var _this = this;

	var here = this;
	var dom = this.createShadowRoot(); // upg: this._dom = dom  (or allow dom direct access?)

	var name = 'hello-world'; // or map values in files?

	this._name = name;
	this._shadow = dom;

	this.attributeChangedCallback = function () {};
	this.attachedCallback = function () {};
	this.detachedCallback = function () {};

	// datas
	this['body'] = '<style>\n\th1 {text-align: center; cursor: pointer;}\n</style>\n<h1>Hello world</h1>\n';

	//upg: set dom to body.html
	dom.innerHTML = this.body || 'empty';

	console.log('hello!', this, dom);

	this.onclick = function (e) {
		return console.log('click', _this);
	};
};

p.attributeChangedCallback = function (name, oldVal, newVal) {
	//console.log('attr change hello-world',name,oldVal,newVal)
	this.attributeChangedCallback(name, oldVal, newVal);
};

p.attachedCallback = function () {
	//console.log('attached hello-world')
	this.attachedCallback();
};

p.detachedCallback = function () {
	//console.log('detached hello-world')
	this.detachedCallback();
};

document.registerElement('hello-world', { prototype: p });

},{}],2:[function(require,module,exports){
'use strict';

require('./hello-world.js');

},{"./hello-world.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL25pbWJsZS1lbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvdXNlci9jbG9uZXMvcTkvaW5jdWJhdG9yL3Byb2plY3RzL25pbWJsZS9ub2RlL2VsZW1lbnRzL2xhYi9leGFtcGxlLy5idWlsZC9oZWxsby13b3JsZC5qcyIsIi9ob21lL3VzZXIvY2xvbmVzL3E5L2luY3ViYXRvci9wcm9qZWN0cy9uaW1ibGUvbm9kZS9lbGVtZW50cy9sYWIvZXhhbXBsZS8uYnVpbGQvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNLQSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQTs7QUFHNUMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxZQUFVOzs7QUFDN0IsS0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2YsS0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7O0FBRWpDLEtBQUksSUFBSSxnQkFBZ0IsQ0FBQTs7QUFFeEIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7QUFDakIsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7O0FBRWxCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxZQUFVLEVBQUUsQ0FBQTtBQUM1QyxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsWUFBVSxFQUFFLENBQUE7QUFDcEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVUsRUFBRSxDQUFBOzs7QUFHcEMsS0FBSSxDQUFDLE1BQU0sQ0FBQywyRkFJWixDQUFBOzs7QUFJQSxJQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFBOztBQUVwQyxRQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7O0FBRS9CLEtBQUksQ0FBQyxPQUFPLEdBQUksVUFBQSxDQUFDO1NBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFFBQU07RUFBQSxDQUFBO0NBRzFDLENBQUE7O0FBRUYsQ0FBQyxDQUFDLHdCQUF3QixHQUFHLFVBQVMsSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUM7O0FBRXhELEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFBO0NBQ2hELENBQUE7O0FBR0YsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLFlBQVU7O0FBRTlCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0NBQ3RCLENBQUE7O0FBR0YsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLFlBQVU7O0FBRTlCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0NBQ3RCLENBQUE7O0FBR0YsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUMsRUFBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQTs7Ozs7QUN6RHRELE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vXG4vLyAyMDE1LjEwLjE2XG4vLyBcblxuLy8gdXBnOiBhdXRvIG1vZGVsc1xudmFyIHAgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSlcblxuXG5wLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7XG5cdHZhciBoZXJlID0gdGhpc1xuXHR2YXIgZG9tID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCkgLy8gdXBnOiB0aGlzLl9kb20gPSBkb20gIChvciBhbGxvdyBkb20gZGlyZWN0IGFjY2Vzcz8pXG5cblx0dmFyIG5hbWUgPSBgaGVsbG8td29ybGRgIC8vIG9yIG1hcCB2YWx1ZXMgaW4gZmlsZXM/XG5cdFxuXHR0aGlzLl9uYW1lID0gbmFtZVxuXHR0aGlzLl9zaGFkb3cgPSBkb21cblxuXHR0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7fVxuXHR0aGlzLmF0dGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbigpe31cblx0dGhpcy5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24oKXt9XG5cblx0Ly8gZGF0YXNcblx0dGhpc1snYm9keSddID0gYDxzdHlsZT5cblx0aDEge3RleHQtYWxpZ246IGNlbnRlcjsgY3Vyc29yOiBwb2ludGVyO31cbjwvc3R5bGU+XG48aDE+SGVsbG8gd29ybGQ8L2gxPlxuYFxuXG5cblx0Ly91cGc6IHNldCBkb20gdG8gYm9keS5odG1sXG5cdGRvbS5pbm5lckhUTUwgPSB0aGlzLmJvZHkgfHwgJ2VtcHR5J1xuXG5cdGNvbnNvbGUubG9nKCdoZWxsbyEnLHRoaXMsZG9tKVxuXG50aGlzLm9uY2xpY2sgID0gZT0+Y29uc29sZS5sb2coJ2NsaWNrJyx0aGlzKVxuXG5cblx0fVxuXG5wLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKG5hbWUsb2xkVmFsLG5ld1ZhbCl7XG5cdC8vY29uc29sZS5sb2coJ2F0dHIgY2hhbmdlIGhlbGxvLXdvcmxkJyxuYW1lLG9sZFZhbCxuZXdWYWwpXG5cdHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsb2xkVmFsLG5ld1ZhbClcblx0fVxuXG5cbnAuYXR0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7XG5cdC8vY29uc29sZS5sb2coJ2F0dGFjaGVkIGhlbGxvLXdvcmxkJylcblx0dGhpcy5hdHRhY2hlZENhbGxiYWNrKClcblx0fVxuXG5cbnAuZGV0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCl7XG5cdC8vY29uc29sZS5sb2coJ2RldGFjaGVkIGhlbGxvLXdvcmxkJylcblx0dGhpcy5kZXRhY2hlZENhbGxiYWNrKClcblx0fVxuXG5cbmRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnaGVsbG8td29ybGQnLHtwcm90b3R5cGU6IHB9KVxuXG4iLCJyZXF1aXJlKCcuL2hlbGxvLXdvcmxkLmpzJylcbiJdfQ==
