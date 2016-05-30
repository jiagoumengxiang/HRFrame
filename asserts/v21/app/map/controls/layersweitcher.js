
$f("df","map.controls.layersweitcher",function(layers){
  var layersweitcher=function(opt_options){

    var options = opt_options || {};
    //拼接样式
    var ul = document.createElement('ul');
    //var layers = opt_options.getLayers().getArray();

    for(var i =0;i<layers.length;i++){

      if(layers[i].get('text')=="base"){
        continue;
      }

      var li = document.createElement('li');
      var checkbox = document.createElement('input');
      checkbox.setAttribute("type","checkbox");
      checkbox.setAttribute("checked",true);
      checkbox.setAttribute("name","chk_map_layerswitcher");
      checkbox.setAttribute("data",layers[i].get('text'));
      checkbox.addEventListener('change',function(e){
        var la = $f("get","map").getLayers().getArray();
        for(var i=0;i<la.length;i++){
          if(this.getAttribute("data")===la[i].get("text")){
            la[i].setVisible(this.checked);
          }
        }
      },false);
      var title = document.createElement('span');
      title.innerHTML=layers[i].get("text");
      li.appendChild(checkbox);
      li.appendChild(title);
      ul.appendChild(li);
    }

    //渲染
    var this_ = this;
    var element = document.createElement('div');
    element.className = 'rotate-north ol-unselectable ol-control';
    element.appendChild(ul);

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });
  };
  ol.inherits(layersweitcher,ol.control.Control);
  return new layersweitcher();
});
