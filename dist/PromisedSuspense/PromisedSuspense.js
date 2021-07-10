"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSuspensePromise = void 0;
var react_1 = require("react");
function useSuspensePromise() {
    var resourceRef = react_1.useRef();
    var originRef = react_1.useRef(new Promise(function () { }));
    var readerRef = react_1.useRef({
        read: function () {
            var _a, _b;
            if ((_a = resourceRef.current) === null || _a === void 0 ? void 0 : _a.isReady) {
                return resourceRef.current.data;
            }
            else if ((_b = resourceRef.current) === null || _b === void 0 ? void 0 : _b.error) {
                throw resourceRef.current.error;
            }
            throw originRef.current;
        },
    });
    var updatePromiseResource = function (res, origin) {
        resourceRef.current = res;
        originRef.current = origin;
    };
    return {
        originRef: originRef,
        readerRef: readerRef,
        updatePromiseResource: updatePromiseResource,
    };
}
exports.useSuspensePromise = useSuspensePromise;
//# sourceMappingURL=PromisedSuspense.js.map