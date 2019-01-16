// Shamelessly copied from "Replacing text in the DOM... it' not that simple!"
// https://j11y.io/javascript/replacing-text-in-the-dom-its-not-that-simple/

function regexList(matchList){
    var list = [];
    for (var i = 0; i < matchList.length; i++) {
        regex = new RegExp("\\b" + matchList[i][0]);
        list[i] = [regex, matchList[i][1]];
    }
    return list;
}

function _matchAny(str, list){
    var found = false;
    for (var i = 0; i < list.length; i++) {
        if (str.match(list[i][0])) {
            found = true;
        }
    }
    return found;
}

function _replaceAny(str, list){
    var tempStr = str;
    for (var i = 0; i < list.length; i++) {
        tempStr = tempStr.replace(list[i][0], list[i][1]);
    }
    return tempStr;
}

function traverseChildNodes(node, matchList) {
    // var matchList = regexList();
    var next;
    if (node.nodeType === 1) {
        // (Element node)
        if (node = node.firstChild) {
            do {
                // Recursively call traverseChildNodes
                // on each child node
                next = node.nextSibling;
                traverseChildNodes(node, matchList);
            } while(node = next);
        }
 
    } else if (node.nodeType === 3) {
        // (Text node)
        if(_matchAny(node.textContent, matchList))
        {
            wrapMatchesInNode(node, matchList);
        }
    }
}

function wrapMatchesInNode(textNode, matchList) {
    var temp = document.createElement('div');
    // temp.innerHTML = textNode.textContent.replace(/Gilad/, '<a href="gilad">Gilad Asharov</a>');
    temp.innerHTML = _replaceAny(textNode.textContent, matchList);

    // temp.innerHTML = textNode.textContent.replace(/\bGilad Asharov/, '<a href="gilad">Gilad Asharov</a>');
    // temp.innerHTML is now:
    // "n    This order's reference number is <a href="/order/RF83297">RF83297</a>.n"
    // |_______________________________________|__________________________________|___|
    //                     |                                      |                 |
    //                 TEXT NODE                             ELEMENT NODE       TEXT NODE
 
    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
        // console.log(temp.firstChild.nodeType);
        textNode.parentNode.insertBefore(temp.firstChild, textNode);
    }
    // Logged: 3,1,3
    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);
}