 function Person(name, work, age) {
 	// body...
 	this.name = name;
 	this.work = work;
 	this.age = age;
 }
 Person.prototype.say = function() {
 	console.log(this.name + ',' + this.work + ',' + this.age);
 }
 var person = new Person('jack', 'teacher', 30);
 person.say();