// Get data from php
$(document).ready(function(){           
    $('#button').click(function() {
        getdata();
    });
});

//Get Value from datePicker
$(function() {
    $("#datetimepicker7").datetimepicker();
    $("#datetimepicker8").datetimepicker({
      useCurrent: false
    });
    $("#datetimepicker7").on("change.datetimepicker", function(e) {
      $("#datetimepicker8").datetimepicker("minDate", e.date);
      let d1 = e.date._d;
      d1 = d1.getFullYear()+"-"+(d1.getMonth()+1)+"-"+d1.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+"0";
      $("#d1").val(d1);
    });
    $("#datetimepicker8").on("change.datetimepicker", function(e) {
      $("#datetimepicker7").datetimepicker("maxDate", e.date);
      let d2 = e.date._d;
      d2 = d2.getFullYear()+"-"+(d2.getMonth()+1)+"-"+d2.getDate()+" "+d2.getHours()+":"+d2.getMinutes()+":"+"0";
      $("#d2").val(d2);
    });
  });

  //map init
var mymap = L.map('mapid').setView([-74.85676288604736, 11.017236142211214], 13);
var latlngs = [];
cent=0;
latlngs[cent]=[lat, lng];
var plyline = L.polyline(latlngs, {color: 'blue'}).addTo(mymap);
mymap.fitBounds(plyline.getBounds());

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

//Get data from inputs, make query & get data from DB and set vector to polyline
function getdata(){
    var latlngs = new Array();
    var val1 = $('#d1').val();
      var val2 = $('#d2').val();
      console.log(val1);
      console.log(val2);
      
      $.ajax({
          type: 'POST',
          url: 'get_gps.php',
          data: { text1: val1, text2: val2},
          success: function (data) {
              var duos = data.split(" ");
              let cont = 0;
              let j=0;
              for (let i = 0; i < duos.length-1; i+=2) {
                j=i+1;  
                latlngs[cont] = [parseFloat(duos[j]),parseFloat(duos[i])];
                cont++; 
              }                      
              plyline.setLatLngs(latlngs);
              mymap.fitBounds(plyline.getBounds());

          }
      });
      
}