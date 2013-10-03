/*
labApp.value('sib_list', [
							"Brett hudson"
							,"Andy Mejias"
							,"Jose L Pimienta"
							,"Nelson Milian"
							,"Patrick Noel"
							,"Jason Ford"
							,"David Notik"
							,"Joe Smoe"
							,"Catalina Ayubi"
							,"Roberto Ruvalcaba"
							,"Michael Laas"
							,"Michael McCord"
							,"Stonly Baptiste"
							,"Camila Souza"
							,"Pabla Ayala"
							,"Alejandro Bustos"
							,"Pablo Ruiz"
							,"Peter Marinez"
							,"Brian Breslin"
							,"Richard Grundy"
							,"Lu Martinez"

						] );
*/
var controllers = {};
controllers.Home = function($scope, angularFire){
  $scope.labList = [];
  var ref = new Firebase("https://lbd.firebaseIO.com/list");

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
  	$scope.labrats[name]="btn-info";
  	$scope.labrat = "";
  	if($scope.labList.indexOf(name) === -1){
  		$scope.labList.push(name);
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
  	if($scope.labrats[name] == "btn-info" ||
  						 $scope.labrats[name] == "btn-success"){
  		$scope.labrats[name] = "btn-default";
  	} else {
  		$scope.labrats[name] = "btn-info";

  	}
  }
  $scope.pickRandom = function(){
  	var availableRats = [];
  	angular.forEach($scope.labrats, function(value, key){
  		if($scope.labrats[key] != 'btn-default' ){
  			availableRats.push(key);
  		}
  	})
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
