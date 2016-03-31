angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['$scope', 'HomeService', '$sessionStorage', function ($scope, HomeService, $sessionStorage) {
    	$scope.title = "Tabla de Trabajo."
      $scope.trabajos = [];
      $scope.trabajo = {};


      $scope.getTrabajos = function(){
        HomeService.GetTrabajos().then(function(response){
          $scope.trabajos = response.data;
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message)
        });
      }

      $scope.postTrabajos = function(){
        var trabajo = {titulo: $scope.trabajo.titulo,
                    descripcion: $scope.trabajo.descripcion,
                    cargo:  $scope.trabajo.cargo,
                    contacto:  $scope.trabajo.contacto,
                    salario : $scope.trabajo.salario,
                    estado: $scope.trabajo.estado};
        HomeService.PostTrabajos(trabajo).then(function(response){
          alert("Posted to /trabajos");
          $scope.getTrabajos();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.UpdateTrabajo = function(item){
        $scope.trabajo=item;
        HomeService.UpdateTrabajo($scope.trabajo,item._id).then(function(response){
          alert("Update from /trabajos");
          $scope.getTrabajos();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.deleteTrabajo = function(item){
        $scope.trabajo=item;
        HomeService.DeleteTrabajo($scope.trabajo,item._id).then(function(response){
          alert("Delete from /trabajos");
          $scope.getTrabajos();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.isAdmin = function(){
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope == "admin";
      }

      $scope.isRegular = function(){
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope == "regular";
      }
  }]);
