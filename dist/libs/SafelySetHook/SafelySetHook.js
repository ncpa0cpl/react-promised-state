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
exports.useSafelySet = void 0;
var React = __importStar(require("react"));
/**
 * Provides a method for safely updating components state asynchronously.
 * This hook tracks the state of the component and prevents the setter method
 * passed to the `safeSet` from executing if the component is no longer mounted.
 */
var useSafelySet = function () {
    var isMounted = React.useRef(true);
    var safelySet = React.useCallback(function (setter) {
        if (isMounted.current === true) {
            setter();
        }
    }, []);
    React.useEffect(function () { return function () {
        isMounted.current = false;
    }; }, []);
    return {
        safelySet: safelySet,
    };
};
exports.useSafelySet = useSafelySet;
