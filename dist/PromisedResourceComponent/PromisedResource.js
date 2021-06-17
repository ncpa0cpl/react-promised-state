"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromisedResource = void 0;
var React = __importStar(require("react"));
var libs_1 = require("../libs");
function isPromisedStateResourceArray(p) {
    return Array.isArray(p);
}
function PromisedResource(props) {
    var _a;
    var resource = props.resource, component = props.component, _b = props.errorComponent, ErrorComponent = _b === void 0 ? libs_1.EmptyComponent : _b, _c = props.fallback, Fallback = _c === void 0 ? libs_1.EmptyComponent : _c;
    var Component = component;
    if (isPromisedStateResourceArray(resource)) {
        var err = (_a = resource.find(function (r) { return r.error; })) === null || _a === void 0 ? void 0 : _a.error;
        if (err) {
            return React.createElement(ErrorComponent, { error: err });
        }
        if (resource.every(function (r) { return r.isReady; })) {
            var unpackedResourceData = resource.map(function (r) { return r.data; });
            return React.createElement(Component, { resource: unpackedResourceData });
        }
    }
    else {
        var _resource = resource;
        if (_resource.error) {
            return React.createElement(ErrorComponent, { error: _resource.error });
        }
        if (_resource.isReady) {
            return React.createElement(Component, { resource: _resource.data });
        }
    }
    return React.createElement(Fallback, null);
}
exports.PromisedResource = PromisedResource;
