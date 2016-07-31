var image = null;
var config = {
  apiKey: "AIzaSyCsMIcbhUR3H9PezGBEz1otPYh-tAAtlM0",
  authDomain: "regresapi.firebaseapp.com",
  databaseURL: "https://regresapi.firebaseio.com",
  storageBucket: "regresapi.appspot.com",
};
firebase.initializeApp(config);

(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('select').material_select();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// genera ID unico
function generateUUID() {
   var d = new Date().getTime();
   var uuid = 'xxshxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = (d + Math.random()*16)%16 | 0;
       d = Math.floor(d/16);
       return (c=='x' ? r : (r&0x3|0x8)).toString(16);
   });
   return uuid;
};

function dataParser() {
var data = $("#reporte").serialize();
data += '&imagen=' + image;
var parsed_data = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
writeUserData(parsed_data,generateUUID());

}

function readImage(inputElement) {
    var deferred = $.Deferred();

    var files = inputElement.get(0).files;
    if (files && files[0]) {
        var fr= new FileReader();
        fr.onload = function(e) {
            deferred.resolve(e.target.result);
        };
        fr.readAsDataURL( files[0] );
    } else {
        deferred.resolve(undefined);
    }

    return deferred.promise();
}

$('#inp').on('change',function(){
  readImage($(this)).done(function(base64Data){ image = base64Data; });
});


function writeUserData(data, generateUUID) {
  firebase.database().ref('report/' + generateUUID).set(data);
}

function getReportById(id){
  firebase.database().ref('report/' + id).on('value', function(snapshot) {
    var snap = snapshot.val();
    var nombre = snap.nombre;
    nombre = nombre.replace(/\+/g, ' ');
    alert(nombre);
    //$('#userName').html(nombre);
  });
}

function getReport(id) {
  firebase.database().ref('report/').on('value', function(snapshot) {
    var snap = snapshot.val();
    console.log(snap);
    getLocation();
  });
}
