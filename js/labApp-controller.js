var controllers = {};
controllers.Home = function($scope, angularFire){
  $scope.labList = [];
  var ref = new Firebase("https://lbd.firebaseIO.com/list2");

  $scope.labrats = {}

  $scope.Search = function(items,name){
    var result = {};
    angular.forEach(items, function(value, key) {

        if (!name || key.toLowerCase().indexOf(name.toLowerCase()) > -1) {
            result[key] = value;
        }
    });
    return result;
  };
  $scope.addLabRat = function(name){
  	if(name){
  		$scope.labrats[name]="btn-info";
  		$scope.labrat = "";
  		if($scope.labList.indexOf(name) === -1){
  			console.log('new name')
  			$scope.labList.push(name);
  		}
  	}
  }
  var promise = angularFire(ref, $scope, "labList");
  promise.then(function(todos) {
	loadLab();
  });

  function loadLab(){
  	for (var i = $scope.labList.length - 1; i >= 0; i--) {
  		$scope.addLabRat($scope.labList[i]);
  	};
  };

  $scope.resetLab = function() {
  	$scope.labrat = "";
  	angular.forEach($scope.labrats, function(value, key){
  		$scope.labrats[key] = "btn-info";
  	});
  }

  $scope.toggleLabRat = function(name){
  	if($scope.labrats[name] == "btn-info" || $scope.labrats[name] == "btn-success"){
  		$scope.labrats[name] = "btn-default";
  	} else {
  		$scope.labrats[name] = "btn-info";
  	}
  }
  $scope.pickRandom = function(){
  	var availableRats = [];
  	var cleanList = []
  	angular.forEach($scope.labrats, function(value, key){
  		cleanList.push(key)
  		if($scope.labrats[key] != 'btn-default' ){
  			availableRats.push(key);
  		}
  	})
  	$scope.labList= cleanList;

  	var chosen = _.sample(_.values(availableRats), 2);
  	console.log(chosen)
  	angular.forEach(availableRats, function(value, key){
  		if(chosen.indexOf(value) > -1){
  			$scope.labrats[value] = "btn-success";
  		} else {
  			$scope.labrats[value] = "btn-info";
  		}
  		
  	});
  }
}

labApp.controller(controllers);
