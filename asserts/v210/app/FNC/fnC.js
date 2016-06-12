$f("df","FNC.fnC",function(){

  var bounds = [103039.458,73039.668,123704.97850784527,85886.492];

  var projection = new ol.proj.Projection({
    code: 'EPSG:404000',
    units: 'degrees',
    axisOrientation: 'neu'
  });

  $f("set","maplayers",[
    $f("map.layers.base", {}),
    $f("map.layers.light", {}),
    $f("map.layers.meatures", {})
  ]);

  var popup = $f("map.controls.popup",map);
  $f("set","popup",popup);
  var map = new ol.Map({
    controls: ol.control.defaults({
      attribution: false
    }),
    target: 'main-content',
    layers: $f("get","maplayers"),
    overlays:[popup],
    view: new ol.View({
      projection: projection,
      resolutions: [11.25,5.625,2.8125,1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125]
    })
  });
  map.getView().fit(bounds, map.getSize());
  map.addControl($f("map.controls.layersweitcher",$f("get","maplayers")));
  $f("set","map",map);
  $f("map.controls.meature",map);
  // map.on('singleclick',function(evt){
  //   var coordinate = evt.coordinate;
  //   document.getElementById("popup-content").innerHTML = '<p>You clicked here:</p><code>' + coordinate +
  //   '</code>';
  //   $f("get","popup").setPosition(coordinate);
  // });
});
