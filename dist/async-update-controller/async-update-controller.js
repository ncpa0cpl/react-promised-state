"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncUpdateController = void 0;
class AsyncUpdateController {
    constructor() {
        this.onResolveCallback = (_) => { };
        this.onRejectCallback = (_) => { };
        this.onDispatchCallback = () => { };
    }
    cancelLastDispatch() {
        this.currentToken = undefined;
    }
    addResolveListener(callback) {
        this.onResolveCallback = callback;
    }
    addRejectListener(callback) {
        this.onRejectCallback = callback;
    }
    addDispatchListener(callback) {
        this.onDispatchCallback = callback;
    }
    dispatch(p) {
        this.onDispatchCallback();
        const token = Symbol();
        this.currentToken = token;
        p.then((v) => {
            if (this.currentToken !== token)
                return;
            this.onResolveCallback(v);
        }).catch((e) => {
            if (this.currentToken !== token)
                return;
            this.onRejectCallback(e);
        });
    }
}
exports.AsyncUpdateController = AsyncUpdateController;
