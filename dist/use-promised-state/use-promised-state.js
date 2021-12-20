"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromisedState = void 0;
const react_1 = __importDefault(require("react"));
const state_controller_1 = require("../state-controller/state-controller");
const forceRenderReducer = (i) => i + 1;
const usePromisedState = (initialValue) => {
    const [_, forceRender] = react_1.default.useReducer(forceRenderReducer, 0);
    const [state] = react_1.default.useState(() => {
        const s = new state_controller_1.StateController(initialValue);
        s.addChangeListener(() => forceRender());
        return s;
    });
    return [state.getState(), state.dispatch];
};
exports.usePromisedState = usePromisedState;
