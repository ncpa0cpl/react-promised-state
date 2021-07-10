"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
exports.Resource = {
    init: function () {
        return {
            data: null,
            error: null,
            isReady: false,
        };
    },
    success: function (data) {
        return {
            data: data,
            error: null,
            isReady: true,
        };
    },
    failure: function (error) {
        return {
            data: null,
            error: error,
            isReady: false,
        };
    },
};
//# sourceMappingURL=PromisedStateResource.js.map