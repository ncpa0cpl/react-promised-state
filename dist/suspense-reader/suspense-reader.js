"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspenseReader = void 0;
const UNDEFINED = Symbol();
class SuspenseReader {
    constructor() {
        this.value = UNDEFINED;
        this.error = UNDEFINED;
        this.isPending = false;
        this.resolve = () => { };
        this.reject = (_) => { };
        this.reset();
    }
    reset() {
        if (this.isPending)
            return;
        this.promise = new Promise((onSuccess, onFailure) => {
            this.value = UNDEFINED;
            this.error = UNDEFINED;
            this.isPending = true;
            this.resolve = onSuccess;
            this.reject = onFailure;
        });
    }
    read() {
        if (this.isPending)
            throw this.promise;
        if (this.error === UNDEFINED) {
            return this.value;
        }
        throw this.error;
    }
    success(v) {
        if (!this.isPending)
            throw Error("Suspense Reader de-sync.");
        this.value = v;
        this.error = UNDEFINED;
        this.isPending = false;
        this.resolve();
    }
    fail(e) {
        if (!this.isPending)
            throw Error("Suspense Reader de-sync.");
        this.value = UNDEFINED;
        this.error = e;
        this.isPending = false;
        this.reject(e);
    }
}
exports.SuspenseReader = SuspenseReader;
