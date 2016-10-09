angular.module('teamform-login-app', ['teamform-db', 'firebase'])
.controller('LoginCtrl', ['teamformDb', LoginCtrl]);

function LoginCtrl(teamformDb) {
    var vm = this;
    vm.login = login;
    
    function login() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log('=====success ', token , user);
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log('=====failed ', errorCode , errorMessage);
          // ...
        });
        // return;
        // window.location.href= "index.html";
    }
}