var myAppModule = angular.module('myApp',[]);
console.log("script js kicks")
myAppModule.factory('tasksFactory',function(){
	var now = Date.now()
	var tasks = [
	{
		name:'laundry',
		priority: 'High',
		deadline: now,
		created_at: now
	},
	{
		name:'study',
		priority: 'High',
		deadline: now,
		created_at: now
	},
	{
		name:'coding',
		priority: 'Highest',
		deadline: now,
		created_at: now
	}];
	var _this=this;
	var factory= {};
	factory.getTasks = function(callback){
		callback(tasks);
	}
	factory.addTask = function(data,callback){
		console.log('task factory add task data', data, callback)
		data.created_at = Date.now();
		tasks.push(data);
		console.log('addtaskfactory tasks', tasks);
		callback()
	}
	factory.remove = function(taskName, callback){
		console.log("inside of factory remove ", taskName)
		tasks.splice(tasks.indexOf(taskName),1);
	}
	return factory;
});
myAppModule.controller('tasksController',function(tasksFactory){
	var _this=this;
	function getTasks(){
		tasksFactory.getTasks(function(data){
			_this.tasks=data;
		})
	}
	getTasks();
	this.addTask = function(data){
		console.log("addtask controller logging data  :", data, this.newTask)
		tasksFactory.addTask(data, getTasks);
		this.newTask = {};
	}
	this.remove = function(taskName){
		tasksFactory.remove(taskName, getTasks);
	}
})