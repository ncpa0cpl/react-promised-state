"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspenseReader = void 0;
const UNDEFINED = Symbol();
class SuspenseReader {
    constructor() {
        this.value = UNDEFINED;
        this.error = UNDEFINED;
        this.isPending = true;
        this.resolve = () => { };
        this.reject = (_) => { };
        this.reset();
    }
    reset() {
        this.value = UNDEFINED;
        this.error = UNDEFINED;
        this.isPending = true;
        this.promise = new Promise((onSuccess, onFailure) => {
            this.resolve = onSuccess;
            this.reject = onFailure;
        });
    }
    read() {
        if (this.isPending)
            throw this.promise;
        if (this.error !== UNDEFINED) {
            return this.value;
        }
        throw this.error;
    }
    update(v) {
        this.value = v;
        this.error = UNDEFINED;
        this.isPending = false;
        this.resolve();
    }
    fail(e) {
        this.value = UNDEFINED;
        this.error = e;
        this.isPending = false;
        this.reject(e);
    }
}
exports.SuspenseReader = SuspenseReader;
