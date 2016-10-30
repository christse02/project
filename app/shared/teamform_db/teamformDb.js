angular.module('teamform-db', ['firebase'])
.factory('teamformDb', ['$firebaseObject', '$firebaseArray', TeamformDb]);

function TeamformDb($firebaseObject, $firebaseArray) {
	initalizeFirebase();

  var eventScope = 'events/';

  var service = {
    loginWithFacebook: loginWithFacebook,
    saveNewFBUser: saveNewFBUser,
    getUser: getUser,
    saveNewEvent: saveNewEvent,
    getEvent: getEvent,
    isEventExist: isEventExist,
    getAllEvents: getAllEvents,
    getEventAdminData: getEventAdminData,
    getAllTeams: getAllTeams,
    getTeam: getTeam,
    setTeamData: setTeamData,
    getAllMembers: getAllMembers,
    getMember: getMember,
    setMemberData: setMemberData,
  };
  return service;

  function loginWithFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signOut();
    return firebase.auth().signInWithPopup(provider);
  }

  function saveNewFBUser(
    fbID,
    name,
    email,
    profilePicUrl,
    token,
    refreshToken,
    callback) {
    var refPath = "user/" + fbID;
    var ref = firebase.database().ref(refPath);
    var data = {             
        'fb_id': fbID,
        'fb_name': name,
        'display_name': name,
        'email': email,
        'profile_pic_url': profilePicUrl,
        'token': token,
        'refresh_token': refreshToken,
        'created_at': Date.now(),
    };
    ref.set(data, callback);
  }

  function getUser(userID) {
    var refPath =  'user/' + userID;
    ref = firebase.database().ref(refPath);
    var param = $firebaseObject(ref);
    return param;
  }

  function saveNewEvent(eventName, payload, callback) {
    var refPath = _getEventParamsPath(eventName);
    var ref = firebase.database().ref(refPath);
    ref.set(payload, callback);
  }

  function isEventExist(eventName) {
    var refPath = _getEventParamsPath(eventName);
    var arr = $firebaseArray(firebase.database().ref(refPath));
    return new Promise(function (resolve, reject) {
        arr.$loaded().then(function(data) {
          if (data.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, function(error) {
          resolve(false);
        });
    });
  }

  function getEvent(eventName) {
  	var refPath = _getEventParamsPath(eventName);
  	ref = firebase.database().ref(refPath);
  	var param = $firebaseObject(ref);
  	return param;
  }

  function getAllEvents() {
    var refPath = eventScope;
    return $firebaseArray(firebase.database().ref(refPath));
  }

  function getEventAdminData(eventName, callback) {
  	var refPath =  eventScope + eventName + "/admin";
  	retrieveOnceFirebase(firebase, refPath, callback);
  }

  function getAllTeams(eventName) {
  	var refPath = eventScope + eventName + '/team';
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getTeam(eventName, teamID) {
		var refPath = eventScope + eventName + "/team/" + teamID;
    ref = firebase.database().ref(refPath);
    var param = $firebaseObject(ref);
    return param;
		// retrieveOnceFirebase(firebase, refPath, callback);
  };

  function setTeamData(eventName, teamID, data, callback) {
    var refPath = eventScope + eventName + "/team/" + teamID; 
    var ref = firebase.database().ref(refPath);
    ref.set(data, callback);
  };

  function getAllMembers(eventName) {
  	var refPath = eventScope + eventName + "/member";
    return $firebaseArray(firebase.database().ref(refPath));
  };

  function getMember(eventName, userID, callback) {
  	var refPath = eventScope + eventName + "/member/" + userID;
    retrieveOnceFirebase(firebase, refPath, callback);
  }

  function setMemberData(eventName, userID, data, callback) {
  	var refPath = eventScope + eventName + "/member/" + userID;   
    var ref = firebase.database().ref(refPath);
    ref.set(data, callback);
  }

  function _getEventParamsPath(eventName) {
    return eventScope + eventName + "/admin/param";
  }
}