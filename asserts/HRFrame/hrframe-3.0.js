/**
* 1.基本元素
*   数据，函数
*   数据：基本数据类型数据，对象，数组
*   函数：拥有入口，出口的完整代码段。
*   ××注意，本框架要求所有函数都使用纯函数。不要使用函数嵌套结构。
* 形态1：$f(json) 配置库
* 形态2：$f("")   加载一个函数
* 形态3：$f("",data...) 执行一个函数
*/
(function(window){
  var HRFrame = function(){
    var FNStore={};
    var STStore={};

    FNStore["df"]=function(_fnName,_fn){
      FNStore[_fnName]=_fn;
      // var argumentsLength=_fn.length;
      // var argumentsArray=[];
      // var rtnFn = function(){
      //   var argu = Array.prototype.slice.call(arguments);
      //   if(argumentsArray.length+argu.length<argumentsLength){
      //     argumentsArray = argumentsArray.concat(argu);
      //   }else{
      //     var param =argumentsArray.concat(argu);
      //     var rtn = FNStore[_fnName].apply(STStore,param);
      //     return rtn;
      //   }
      // };
      //FNStore[_fnName]=rtnFn;
      //return rtnFn;
    };

    STStore.HRFrameConfig = {
      frontmode:false,
      extension:".html",
      async:true,
      splitchar:/\./g,
      path:"app"
    };


    //调用函数
    function CallFunction(){
      var argus=Array.prototype.slice.call(arguments);
      var _fn =FNStore[argus[0]];
      if(typeof(_fn)=="undefined"){
        var success = $f("LoadFN",argus[0],false);
      }
      _fn=FNStore[argus[0]];
      if(_fn==undefined){
        console.log(argus[0]+"看起来加载失败了呢。");
        return undefined;
      }else{

        var argumentsLength=_fn.length;
        var argumentsArray=[];
        var rtnFn = function(){
          var argu = Array.prototype.slice.call(arguments);
          if(argumentsArray.length+argu.length<argumentsLength){
            argumentsArray = argumentsArray.concat(argu);
          }else{
            var param =argumentsArray.concat(argu);
            var rtn = FNStore[_fnName].apply(STStore,param);
            return rtn;
          }
        };
        //FNStore[_fnName]=rtnFn;
        return rtnFn;

//        return _fn.apply(STStore, argus.splice(1));
      }
    }

    var HRFn = function() {
      var argus = Array.prototype.slice.call(arguments);
      if (argus.length == 0) {
        console.log("error: 你没有传参数，HR无法调用任何有用的函数。")
        return null;
      }
      if (argus.length == 1) {
        var argument = argus[0];
        if (typeof(argument) == "string") {
          // 异步加载函数
          $f("LoadFN", argument, true);
          return true;
        } else if (typeof(argument) == "object") {
          //配置框架
          if (argument.async != undefined && argument.async != null) {
            STStore.HRFrameConfig.async = argument.async;
          }
          if (argument.splitchar != undefined && argument.splitchar != null) {
            STStore.HRFrameConfig.splitchar = argument.splitchar;
          }
          if (argument.path != undefined && argument.path != null) {
            STStore.HRFrameConfig.path = argument.path;
          }
          if (argument.extension != undefined && argument.extension != null) {
            STStore.HRFrameConfig.extension= argument.extension;
          }
          if (argument.frontmode!= undefined && argument.frontmode!= null) {
            STStore.HRFrameConfig.frontmode= argument.frontmode;
          }
          return true;
        } else if (typeof(argument) == "function") {

          return true;
        }
      } else {
        //执行函数
        return CallFunction.apply(STStore, argus);
      }
    };
    HRFn.data=STStore;
    HRFn.fn=FNStore;

    return HRFn;
  };

  window.$F = window.$f = window.HRFrame = HRFrame();
  //从远端读取库文件

  $f("df","LoadFN",function(_fileName,_async){
    var httpReq = new XMLHttpRequest();
    httpReq.open("GET",this.HRFrameConfig.path+"/"+_fileName.replace(this.HRFrameConfig.splitchar,"/")+".js?time="+new Date().getMilliseconds(),_async);
    if(!_async){
      httpReq.send();
      eval(httpReq.responseText + "\n\n //# sourceURL=" + _fileName + ".js");
    }else{
      httpReq.onreadystatechange=function(){
        if (httpReq.readyState==4 && httpReq.status==200){
          eval(httpReq.responseText + "\n\n //# sourceURL=" + _fileName + ".js");
        }
      };
      httpReq.send();
    }
    return true;
  });

  $f("df","RendPage",function(_data,_pageurl,_paramHandler,_responseHandler,_combineHandler){

    var HRFrameConfig = this.HRFrameConfig;
    $.ajax({
      url:this.HRFrameConfig.path+"/"+_pageurl.replace(this.HRFrameConfig.splitchar,"/")+this.HRFrameConfig.extension+"?time="+new Date().getMilliseconds(),
      data:null,
      datatype:"text",
      success:function(page){
        var param = $f(_paramHandler,_data);
        if(param==undefined){
          return;
        }

        if(HRFrameConfig.frontmode){
          var responseData=$f(_responseHandler+"_json",{},param);
          $f(_combineHandler,page,responseData,param);
        }else{
          $.ajax({
            url:param.url,
            data:param.data,
            success:function(data2){
              if(data2==undefined){
                return;
              }
              var responseData=$f(_responseHandler,data2,param);
              $f(_combineHandler,page,responseData,param);
            }
          });
        }
      }
    });
  });

  $f("df","Render",function(_data,_dir){
    $f("RendPage",_data,_dir+".page",_dir+".request",_dir+".response",_dir+".combine");
  });



  $f("df","Refresher",function(_data,_dir){
    $f("RendPage",_data,_dir+".page",_dir+".request",_dir+".response",_dir+".refresh");
  });

  $f("df","SendData",function(_data,_reqFn,_respFn){
    var HRFrameConfig = this.HRFrameConfig;
    var param = $f(_reqFn,_data);
    if(param==undefined){
      return;
    }

    if(HRFrameConfig.frontmode){
      $f(_respFn,{},param);
    }else{
      $.ajax({
        url:param.url,
        data:param.data,
        success:function(data2){
          if(data2==undefined){
            return;
          }
          $f(_respFn,data2,param);
        }
      });
    }
  });

  $f("df","TPPL",function(tpl,data){
    /**
    * tppl.js 极致性能的 JS 模板引擎
    * Github：https://github.com/jojoin/tppl
    * 作者：杨捷
    * 邮箱：yangjie@jojoin.com
    *
    * @param tpl {String}    模板字符串
    * @param data {Object}   模板数据（不传或为null时返回渲染方法）
    *
    * @return  {String}    渲染结果
    * @return  {Function}  渲染方法
    *
    * 增加undefined判断
    *
    */
    var fn =  function(d) {
      var i, k = [], v = [];
      for (i in d) {
        k.push(i);
        v.push(d[i]);
      };
      return (new Function(k, fn.$)).apply(d, v);
    };
    if(!fn.$){
      var tpls = tpl.split('[:');
      fn.$ = "var $empty=''; var $reg = RegExp(/object|undefined|function/i); console.log($reg.test(typeof(type))?'111':type); var $=''";
      for(var t in tpls){
        var p = tpls[t].split(':]');
        if(t!=0){
          fn.$ += '='==p[0].charAt(0)
          ? "+($reg.test(typeof("+p[0].substr(1)+"))?$empty:"+p[0].substr(1)+")"
          : ";"+p[0].replace(/\r\n/g, '')+"$=$"
        }
        // 支持 <pre> 和 [::] 包裹的 js 代码
        fn.$ += "+'"+p[p.length-1].replace(/\'/g,"\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n')+"'";
      }
      fn.$ += ";return $;";
      // log(fn.$);
    }

    return data ? fn(data) : fn;

  });

  $f("df","set",function(_key,_data){
    this[_key]=_data;
  });

  $f("df","get",function(_key){
    return this[_key];
  });

})(window);
