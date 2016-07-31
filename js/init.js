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
  var jsonfy = {};
  data = data.split('&');
  $.each(data, function(index, value){
    var v = value.split('=');
    jsonfy[v[0]] = v[1];
  });

  //var parseado = JSON.parse('{"' + decodeURI(data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  writeUserData(jsonfy,generateUUID());

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
    console.log(snap);
    $('#nombre').html(clean_string(snap.nombre));
    if( snap.imagen != null && snap.imagen != '' ) {
      $('#foto').html('<img class="col s12" src="' + snap.imagen + '" alt="">');
    }
    if( snap.edad != null && snap.edad != '' ) {
      $('#datos-principales').append('<tr><td><strong>Edad</strong></td><td>' + snap.edad + '</td></tr>');
    }
    if( snap.sexo != null && snap.sexo != '' ) {
      $('#datos-principales').append('<tr><td><strong>Sexo</strong></td><td>' + snap.sexo + '</td></tr>');
    }
    if( snap.estatura != null && snap.estatura != '' ) {
      $('#datos-principales').append('<tr><td><strong>Estatura</strong></td><td>' + snap.estatura + '</td></tr>');
    }
    if( snap.cabello != null && snap.cabello != '' ) {
      $('#datos-principales').append('<tr><td><strong>Cabello</strong></td><td>' + clean_string(snap.cabello) + '</td></tr>');
    }
    if( snap.cejas != null && snap.cejas != '' ) {
      $('#datos-principales').append('<tr><td><strong>Cejas</strong></td><td>' + clean_string(snap.cejas) + '</td></tr>');
    }
    if( snap.ojos != null && snap.ojos != '' ) {
      $('#datos-principales').append('<tr><td><strong>Ojos</strong></td><td>' + clean_string(snap.ojos) + '</td></tr>');
    }
    if( snap.naris != null && snap.naris != '' ) {
      $('#datos-principales').append('<tr><td><strong>Naris</strong></td><td>' + clean_string(snap.naris) + '</td></tr>');
    }
    if( snap.boca != null && snap.boca != '' ) {
      $('#datos-principales').append('<tr><td><strong>Boca</strong></td><td>' + clean_string(snap.boca) + '</td></tr>');
    }
    if( snap.tez != null && snap.tez != '') {
      $('#datos-principales').append('<tr><td><strong>Tez</strong></td><td>' + clean_string(snap.tez) + '</td></tr>');
    }
    if( snap.senas != null && snap.senas != '') {
      $('#datos-hechos').append('<tr><td><strong>Señas particulares</strong></td><td>' + clean_string(snap.senas) + '</td></tr>');
    }
    if( snap.lugar != null && snap.lugar != '') {
      $('#datos-hechos').append('<tr><td><strong>Lugar de los hechos</strong></td><td>' + clean_string(snap.lugar) + '</td></tr>');
    }
    if( snap.hechos != null && snap.hechos != '') {
      $('#datos-hechos').append('<tr><td><strong>Descripción de los hechos</strong></td><td>' + clean_string(snap.hechos) + '</td></tr>');
    }
  });
}

function getReport() {

  firebase.database().ref('report/').on('value', function(snapshot) {
    var snap = snapshot.val();
    var card = '';
    var i = 0;

    $.each(snap, function(index, value){
      if(i == 0){
        card += '<div class="row">';
      }
      card += '<div class="col s4">';
      card += '<div class="card horizontal">';
      card += '<div class="card-image">';
      if( value.imagen != 'null' && value.imagen != '' ){
        card += '<img src="' + value.imagen + '">';
      } else {
        card += '<img src="assets/no-photo.png">';
      }
      card += '</div>';
      card += '<div class="card-stacked">';
      card += '<div class="card-content">';
      card += '<p><strong>Nombre:</strong> ' + clean_string(value.nombre) + '</p>';
      if( value.fecha ) {
        card += '<p><strong>Fecha:</strong> ' + clean_string(value.fecha)+ '</p>';
      }
      if( value.lugar ) {
        card += '<p><strong>Lugar:</strong>' + clean_string(value.lugar)+ '</p>';
      }
      card += "<p><a href=\"javascript:void(0);\" onclick=\"save_report('" + index + "')\">Ver detalles</a></p>";
      card += '<div class="fb-share-button" data-href="http://shannonbit.dev/encuentrame/listado.html" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fshannonbit.dev%2Fencuentrame%2Flistado.html&amp;src=sdkpreparse"><img src="assets/fb.png" alt=""></a></div>';
      card += '</div>';
      card += '</div>';
      card += '</div>';
      card += '</div>';
      if(i == 2){
        card += '</div>';
        i = 0;
      } else {
        i++;
      }
    });
    $('#list-container').html(card);
  });

}

function clean_string(s) {
  var r = s.replace(/\+/g, ' ');
  return r;
}

function save_report(id) {
  localStorage.setItem("reporte", id);
  window.location = 'reporte.html';
}
