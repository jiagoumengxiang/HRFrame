$f("df","map.layers.light",function(){
    return new ol.layer.Image({
        source:new ol.source.ImageWMS({
            ratio:1,
            url:$f("get","geoserveraddr")+'/wms',
            params:{
                'FORMAT':'image/png',
                'VERSION':'1.1.1',
                STYLES:'',
                LAYERS:'zibo_road:路灯'
            }
        }),
        text:"路灯"
    });
});
