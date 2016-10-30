angular.module('teamform-admin-app')
.controller('CreateEventCtrl', ['$scope', 'currentUser', 'teamformDb', CreateEventCtrl]);

function CreateEventCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.eventName = '';
    vm.eventNameError = '';
    vm.currentUser = currentUser.getCurrentUser();
    vm.eventValid = false;
    vm.event = {
        maxTeamSize: 10,
        minTeamSize: 1,
        eventOwner: vm.currentUser.$id || 'dummy',
    };
    
    vm._checkIfEventExist = _checkIfEventExist;

    vm.onEventNameChanged = onEventNameChanged;
    vm.changeMinTeamSize = changeMinTeamSize;
    vm.changeMaxTeamSize = changeMaxTeamSize;
    vm.saveFunc = saveFunc;

    function onEventNameChanged() {
        vm._checkIfEventExist();
    }

    function _checkIfEventExist() {
      teamformDb.isEventExist(vm.eventName).then(function(isExist) {
        vm.eventValid = !isExist;
        if (isExist) {
          vm.eventNameError = 'Event name already exist';
          $scope.$apply();
        } else {
          vm.eventNameError = '';
          $scope.$apply();
        }
      });
    }

    function changeMinTeamSize(delta) {
        var newVal = vm.event.minTeamSize + delta;
        if (newVal >=1 && newVal <= vm.event.maxTeamSize ) {
            vm.event.minTeamSize = newVal;
        }
    }

    function changeMaxTeamSize(delta) {
        var newVal = vm.event.maxTeamSize + delta;
        if (newVal >=1 && newVal >= vm.event.minTeamSize ) {
            vm.event.maxTeamSize = newVal;
        }
    }
    
    function saveFunc() {
        // vm.event.$save();
        // Finally, go back to the front-end
        // window.location.href= "index.html";
        var callback = function() {
            window.location.href= "index.html";
        };
        teamformDb.saveNewEvent(vm.eventName, vm.event, callback);
    }
}