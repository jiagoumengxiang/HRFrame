/**
 * Created by zhangchen on 2014/5/3.
 *
 * 框架层
 */

(function (window) {
    if (window.HRFrame != undefined) {

    }


    //全局静态域
    var StaticData = {};
    //函数储存域
    var functionData = {};
    var HRFrame = {};

    //配置库相关信息

    var autoLoad=false;
    var autoLoadSplitChar=".";
    var autoloadPath = "";

    HRFrame.config=function(_config){
       // alert("3");
        if(_config["autoLoad"]==true){
            autoLoad=true;
        }
        if(_config["splitChar"]!=undefined && _config["splitChar"]!=null){
            autoLoadSplitChar = _config["splitChar"];
        }
        if(_config["path"]){
            autoloadPath = _config["path"];
        }
    };

    //自动加载文件
    function AutoLoadFile(_fileName,_fn){
        //alert("1");
        var httpReq = new XMLHttpRequest();
        httpReq.open("GET",autoloadPath+"/"+_fileName.replace(autoLoadSplitChar,"/")+".js?time="+new Date().getMilliseconds(),false);
        httpReq.send();

        eval(httpReq.responseText+"\n\n //# sourceURL="+_fileName+".js");
    }

    //单个参数的函数
    function call() {
        //alert("2");
        var argu = Array.prototype.slice.call(arguments);
        if (argu.length == 0) {
            console.log("error arguments length");
            return null;
        }
        var _fn =functionData[argu[0]];
        if(typeof(_fn)=="function"){
            switch (argu.length) {
                case 1:
                    return _fn.call(StaticData);
                    break;
                default:
                    return _fn.apply(StaticData, argu.splice(1));
            }
        }else if(_fn==undefined){
            AutoLoadFile(argu[0]);

            return call.apply(this,argu);
        }else{
            console.log("error first argument type ; must function -> " + argu[0]);

            return null;
        }
    }

    HRFrame.call = call;

    /**
     * 挂起的代码---暂时不使用
     * 请求域
     * 树状的结构
     */
    function windowPath(_ns, _fn) {
        //alert("4");
        var pathArray = _ns.split('.');
        var windowPath = functionData;//注册到函数存储域当中
        for (var path in pathArray) {
            if (path == pathArray.length - 1) {
                windowPath[pathArray[path]] = _fn;
            } else {
                windowPath = windowPath[pathArray[path]] = windowPath[pathArray[path]] || {};
            }
        }
    }

    //注册函数
    HRFrame.regist = function (_ns, _fn) {
       // alert("5");
        delete functionData[_ns];
        functionData[_ns] = _fn;
    };

    //查找某函数
    HRFrame.find = function (_fnName) {
       // alert("6");
        return $f.filter(function (_key, _val, _fnName) {
            //正则表达式匹配
            return true;
        }, functionData, _fnName);
    };
    /**
     * 对数组中每一个元素执行_fn方法
     * 结果保存为新的数组
     * 返回新的数组
     * @param _array
     * @param _fn
     */
    HRFrame.map = function (_fn,_array) {
       // alert("7");
        var argu = Array.prototype.slice.call(arguments);
        if(!Array.isArray(_array)){
            console.log("error map type -> " + _fn);
            return [];
        }
        var rtnArray = [];
        for(var item in _array){
            rtnArray.push($f.call.apply(this,[_fn,_array[item]].concat(argu.splice(2))));
        }
        return rtnArray;
    };
    /**
     * 对对象的每一个属性执行_fn方法
     * 生成新的对象
     * @param _obj
     * @param _fn
     */
    HRFrame.mapAttr = function (_obj, _fn) {

    };
    /**
     * 对象作为函数的参数执行
     * @param _obj
     * @param _fn
     */
    HRFrame.handle = function (_obj, _fn) {

    };

    /**
     * 筛选
     * _fn返回值为真的元素被筛选出来
     */
    HRFrame.filter = function (_fn, _obj) {
        //alert("7");
        var arguments = Array.prototype.slice.call(arguments);
        var rtn = [];
        switch (typeof(_obj)) {
            case "array":
                for (var key in _obj) {
                    if (_fn(key, _obj[key], arguments.splice(2))) {
                        rtn.push(_obj[key]);
                    }
                }
                return rtn;
                break;
            case "object":
                for (var key in _obj) {
                    if (_fn(key, _obj[key], arguments.splice(2))) {
                        rtn.push({name: key, value: _obj[key]});
                    }
                }
                return rtn;
                break;
            default :
                console.log("filter error type");
                return [];
        }
    };

    /**
     * 对每一个元素执行一系列函数
     * @param _obj
     * @param _fnArray
     */
    HRFrame.pipelineObj = function (_obj, _fnArray) {
       // alert("8");
        var obj = _obj;
        for(var i = 0;i<_fnArray.length;i++){
            obj=HRFrame.call(_fnArray[i],obj);
        }
        return obj;
    };
    
    HRFrame.pipelineArr=function(_array,_fnArray){

    };

    HRFrame.pipelineAttr = function (_obj, _fnArray) {

    };

    HRFrame.set=function(_name,_data){
        //alert("9");
        StaticData[_name]=_data;
    };

    HRFrame.get=function(_name){
        return StaticData[_name];
    };

    HRFrame.eachJD = function(_array, _fn){
        //alert("10");
        for(var i=0; i<_array.length; i++){
//            _array[i].apply(_fn, i);
            _fn.apply(_array[i], [i]);
        }
    };

    window.$F = window.$f = window.HRFrame = HRFrame;

//    Ext.Ajax.request({
//        url:'',
//        type:'ajax',
//        success:function(response){
//
//        }
//    });

})(window);

