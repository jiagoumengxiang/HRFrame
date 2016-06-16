$f("df","map.layers.base",function(){
    return new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            url: $f("get","geoserveraddr")+'/wms',
            params: {'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                STYLES: '',
                LAYERS: 'zibo_road:zibo_base',
            }
        }),
        text:"base"
    });
});
