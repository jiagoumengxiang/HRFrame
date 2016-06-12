$f("df","map.layers.meatures",function(){
    var source = new ol.source.Vector({wrapX: false});
    $f("set","meaturesource",source);
    var vector = new ol.layer.Vector({
        source: source,
        text:"base",
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    $f("set","meatureslayer",vector);
    return vector;
});
