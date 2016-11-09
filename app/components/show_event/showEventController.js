angular.module('teamform-app')
.controller('ShowEventCtrl', ['$scope', 'currentUser', 'teamformDb', ShowEventCtrl]);

function ShowEventCtrl($scope, currentUser, teamformDb) {
    var vm = this;

    vm.eventName = getURLParameter("id");
    vm.event = teamformDb.getEvent(vm.eventName);
    vm.currentUser = currentUser.getCurrentUser();

    vm.teams = teamformDb.getAllTeams(vm.eventName);
    vm.members = teamformDb.getAllMembers(vm.eventName);

    vm.displaySkills = displaySkills;
    vm.isMyTeam = isMyTeam;

    function displaySkills(skills) {
    	if (!skills) {
    		return '';
    	}
    	return skills.join(', ');
    }

    function isMyTeam(team) {
    	return team.teamOwner === vm.currentUser.$id;
    }
}
