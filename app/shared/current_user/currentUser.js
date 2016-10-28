angular.module('current-user', ['ngStorage'])
.factory('currentUser', CurrentUser);

function CurrentUser($localStorage) {
  var service = {
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    deleteCurrentUser: deleteCurrentUser,
  };
  return service;

  function getCurrentUser() {
    return $localStorage.user || {};
  }

  function setCurrentUser(user) {
    console.log('====update current user: ', user);
    $localStorage.user = user;
  }

  function deleteCurrentUser() {
    setCurrentUser({});
  }
}