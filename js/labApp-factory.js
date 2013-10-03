labApp.factory('sibling_factory', function(){
  //private variable scope to define variables
  var sibs = ['John','Sue','Sam','Bob','Jim'];
  //'return' provides the public vars and functions
  return {
	get: function(){
	    return sibs;
	}
  }
});
/* Alertatly a '.service' would allow you to just declare variables and functions that would all be globally available */

labApp.service('sibling_service', function(){
   //Everything must start with 'this'
   this.get = function(){
	return ['John','Sue','Sam','Bob','Jim'];
   }
});

