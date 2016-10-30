describe('teamform-app module', function() {

  beforeEach(module('teamform-app'));

  var $controller;

  beforeAll(function() {
    window.onbeforeunload = () => 'Oh no!';
  });

  beforeEach(inject(function(_$controller_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('ShowEventCtrl', function() {
    var controller;

    beforeEach(function() {
      var isEventExist = function(eventName) { 
        return {
          'then': function() {},
        };
      };
      var getEvent = function(eventName) {
        return {
          event: 'event1',
        };
      }
      var getAllTeams = function(eventName) {
        return {
          teams: 'team1'
        };
      };
      var getAllMembers = function(eventName) {
        return {
          members: 'member1'
        };
      };
      var saveNewEvent = function() {};
      var teamformDb = {
        isEventExist: isEventExist,
        getEvent: getEvent,
        getAllTeams: getAllTeams,
        getAllMembers: getAllMembers,
        saveNewEvent: saveNewEvent,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
          };
        },
      };

      controller = $controller('ShowEventCtrl', {
        $scope: {},
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
    });

    it('should initialize with correct default values', function() {
      expect(controller.eventName).toEqual(null);
      expect(controller.event).toEqual({
        event: 'event1',
      });
      expect(controller.currentUser).toEqual({
        user: 'user1',
      });
      expect(controller.teams).toEqual({
        teams: 'team1'
      });
      expect(controller.members).toEqual({
        members: 'member1'
      });
    });

    it('should format team required skills correctly', function() {
      expect(controller.displaySkills(['a', 'b', 'c'])).toEqual('a, b, c');
    });
  });
});