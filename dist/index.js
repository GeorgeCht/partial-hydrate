import {jsx as $8FHVn$jsx} from "react/jsx-runtime";
import {useRef as $8FHVn$useRef, useId as $8FHVn$useId} from "react";



function $d0364e2b86aeee55$var$useIsFirstRender() {
    var isFirst = $8FHVn$useRef(true);
    return !!isFirst.current && (isFirst.current = false, true);
}
var $d0364e2b86aeee55$var$isDefined = function(v) {
    return typeof v !== "undefined" && v !== null;
};
var $d0364e2b86aeee55$export$c5c33552843c1224 = function(param) {
    var children = param.children, minWidth = param.minWidth, maxWidth = param.maxWidth, when = param.when;
    var id = "partial:" + $8FHVn$useId();
    var isClient = $d0364e2b86aeee55$var$isDefined(window);
    var isFirstRender = $d0364e2b86aeee55$var$useIsFirstRender();
    var innerWidth = window.innerWidth;
    var removeChildren = function(id) {
        if (isClient && isFirstRender) {
            var el = document.getElementById(id);
            el && (el.innerHTML = "");
        }
        return !0;
    };
    var render = $d0364e2b86aeee55$var$isDefined(when) ? (isClient ? when() : true) && removeChildren(id) : $d0364e2b86aeee55$var$isDefined(minWidth) && $d0364e2b86aeee55$var$isDefined(maxWidth) ? (isClient ? innerWidth <= minWidth && innerWidth >= maxWidth : true) && removeChildren(id) : $d0364e2b86aeee55$var$isDefined(minWidth) ? (isClient ? innerWidth <= minWidth : true) && removeChildren(id) : (isClient ? innerWidth >= maxWidth : true) && removeChildren(id);
    return /*#__PURE__*/ (0, $8FHVn$jsx)("div", {
        id: id,
        style: {
            display: render ? "contents" : "none"
        },
        children: render && children
    });
};


export {$d0364e2b86aeee55$export$c5c33552843c1224 as PartialHydrate};
//# sourceMappingURL=index.js.map
