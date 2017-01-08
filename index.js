'use strict';

/**
 * 将带有inbottom属性的script标签放到body结束标签之前
 * @param  {Object}   options  插件配置
 * @param  {Object}   modified 修改了的文件列表（对应watch功能）
 * @param  {Object}   total    所有文件列表
 * @param  {Function} next     调用下一个插件
 * @return {undefined}
 */
module.exports = function(options, modified, total, next) {
    //inbottom script标签的正则表达式
    var inbottomScriptTagRegExp = /<script[^>]*(\s?inbottom)[^>]*>((?!<\s*\/script\s*>)[\s\S])*<\s*\/script\s*>/gi;

    modified.forEach(function(file) {
        if (file.isText() || typeof(file.getContent()) === 'string') {
            var content = file.getContent();


            //包含html基本结构的入口文件
            var isEntryFile = (~content.indexOf('/html') || ~content.indexOf('/HTML')) && (~content.indexOf('/head') || ~content.indexOf('/HEAD')) && (~content.indexOf('/body') || ~content.indexOf('/BODY'));

            //html入口文件
            if (/\.(html|ftl)/.test(file.rExt) && isEntryFile) {
                //inbottom script标签数组
                var inbottomScriptTagArray = [];

                //将inbottom script标签缓存到数组中，并将其替换为空串
                content = content.replace(inbottomScriptTagRegExp, function(inbottomScriptTag, inbottom) {
                    inbottomScriptTag = inbottomScriptTag.replace(inbottom, ''); //去除inbottom属性
                    inbottomScriptTagArray.push(inbottomScriptTag);
                    return '';
                });
                //将inbottom script标签放到body之前
                content = content.replace(/(<\/body>\s*<\/html>)/gi, inbottomScriptTagArray.join('\r\n') + '\r\n$1');

                file.setContent(content);
            }

        }
    });

    next();
};
