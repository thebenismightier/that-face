function walkText(node) {
  if (node.nodeType == 3) {

    var find = "face";
    var replacement = " ( ͡° ͜ʖ ͡°) "
    var flags = "ig";
    var regex = new RegExp('\\s' + find + '\\s', flags);
    // node.data = node.data.replace(/face/ig, "");
    node.data = node.data.replace(regex, replacement);
  }
  if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
    for (var i = 0; i < node.childNodes.length; i++) {
      walkText(node.childNodes[i]);
    }
  }
}

// select body as target node
// var target = $("body");
var target = document; // .querySelector('body');

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    var nodes = mutation.addedNodes;
    nodes.forEach(function(node) {
      walkText(node)
    });
  })
})

var config = { attributes: false, childList: true, subtree: true, characterData: false }

observer.observe(target, config);
// walkText(document.body);

$(document).ready(walkText($(document)));
