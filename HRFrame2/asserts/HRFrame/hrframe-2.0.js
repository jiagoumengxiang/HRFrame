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
        };

        STStore.HRFrameConfig = {

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
            if(_fn==undefined){
                console.log(argus[0]+"看起来加载失败了呢。");
                return undefined;
            }else{
                return _fn.apply(STStore, argus.splice(1));
            }
        }


        return function() {
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
                        STStore.HRFrameConfig.async == argument.async;
                    }
                    if (argument.splitchar != undefined && argument.splitchar != null) {
                        STStore.HRFrameConfig.splitchar == argument.splitchar;
                    }
                    if (argument.path != undefined && argument.path != null) {
                        STStore.HRFrameConfig.path == argument.path;
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








    };
    window.$F = window.$f = window.HRFrame = HRFrame();

    //从远端读取库文件
    $f("df","LoadFN",function LoadFile(_fileName,_async){
        var httpReq = new XMLHttpRequest();
        httpReq.open("GET",this.HRFrameConfig.path+"/"+_fileName.replace(this.HRFrameConfig.splitchar,"/")+".js?time="+new Date().getMilliseconds(),_async);
        eval(httpReq.responseText + "\n\n //# sourceURL=" + _fileName + ".js");
        return true;
    });
})(window); 
