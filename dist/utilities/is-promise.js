"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
function isPromise(action) {
    return action instanceof Promise;
}
exports.isPromise = isPromise;
