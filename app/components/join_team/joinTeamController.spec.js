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

  describe('JoinTeamCtrl', function() {
    var controller;

    beforeEach(function() {
      var getMember = function(eventName, userID, callback) {
        var returnVal = [1, 2, 3];
        if (eventName === 'a') {
          returnVal = null;
        }
        callback({
          child: function() {
            return {
              val: function() {
                return returnVal;
              }
            }
          }
        });
      };
      var getAllTeams = function(eventName) {
        return {};
      };
      var setMemberData = function() {};
      var teamformDb = {
        getMember: getMember,
        getAllTeams: getAllTeams,
        setMemberData: setMemberData,
      };

      var currentUser = {
        getCurrentUser: function() {
          return {
            user: 'user1',
            $id: '123',
            display_name: 'display_name',
          };
        },
      };

      controller = $controller('JoinTeamCtrl', {
        currentUser: currentUser,
        teamformDb: teamformDb,
       });
      controller.eventName = 'eventName';
      controller.teamformDb = teamformDb;
    });

    it('should initialize with correct default values', function() {
      expect(controller.selection).toEqual([]);
      expect(controller.teams).toEqual({});
      expect(controller.eventName).toEqual('eventName');
    });

    it('should get memeber selection correctly', function() {
      controller.getMember('b', controller.currentUser.$id);
      expect(controller.selection).toEqual([1, 2, 3]);
      controller.getMember('a', controller.currentUser.$id);
      expect(controller.selection).toEqual([]);
    });

    it('should toggle selection correctly', function() {
      controller.selection = [];
      controller.toggleSelection(1);
      expect(controller.selection).toEqual([1]);
      controller.toggleSelection(2);
      expect(controller.selection).toEqual([1, 2]);
      controller.toggleSelection(1);
      expect(controller.selection).toEqual([2]);
    });

    it('should save users selection', function() {
      spyOn(controller.teamformDb, 'setMemberData');
      controller.saveFunc();
      expect(controller.teamformDb.setMemberData).toHaveBeenCalled();
      controller.currentUser = {
        user: '',
        $id: '123',
        display_name: '',
      };
      controller.saveFunc();
      expect(controller.teamformDb.setMemberData).toHaveBeenCalled();
    });
  });
});