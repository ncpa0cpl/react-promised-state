"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGenerator = void 0;
function isGenerator(action) {
    return typeof action === "function";
}
exports.isGenerator = isGenerator;
