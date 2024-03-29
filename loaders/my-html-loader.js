const htmlparser2 = require('htmlparser2');
const domUtils = htmlparser2.DomUtils;

module.exports = function(source) {
  const DOM = htmlparser2.parseDOM(source);
  
  // 遍历 DOM，找到资源引用
  const nodes = [];
  domUtils.findAll(node => {
    if(node.attribs && node.attribs.src) {
      nodes.push(node);
    }
  }, DOM);

  nodes.forEach(node => {
    const oldPath = node.attribs.src;
    // 用 require 替换资源引用路径
    node.attribs.src = "` + require(" + JSON.stringify(oldPath) + ") + `";
  });

  const resultHTML = domUtils.getOuterHTML(DOM);
  
  // 返回处理后的 HTML 字符串
  return `module.exports = \`${resultHTML}\``
};
