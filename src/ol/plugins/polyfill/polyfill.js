/* Disable minification (remove `.min` from URL path) for more info */
/**
 * 浏览器兼容性问题解决
 */
(function(arr) {
    const elementNodes = [Element.prototype, CharacterData.prototype, DocumentType.prototype];
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    elementNodes.forEach(function(item) {
        //remove IE
        if (item.hasOwnProperty('remove')) {
            return;
        }
        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                this.parentNode.removeChild(this);
            }
        });

        //append IE 
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(function(argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
}).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});