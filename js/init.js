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
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = (d + Math.random()*16)%16 | 0;
       d = Math.floor(d/16);
       return (c=='x' ? r : (r&0x3|0x8)).toString(16);
   });
   return uuid;
};

function dataParser() {
var data = $("#reporte").serialize();
var parseado = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
writeUserData(parseado,generateUUID());
 
}


function writeUserData(data, generateUUID) {
  firebase.database().ref('report/' + generateUUID).set(data);
}


