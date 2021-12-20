"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateController = void 0;
const async_update_controller_1 = require("../async-update-controller/async-update-controller");
const suspense_reader_1 = require("../suspense-reader/suspense-reader");
const is_generator_1 = require("../utilities/is-generator");
const is_promise_1 = require("../utilities/is-promise");
class StateController {
    constructor(initialValue) {
        this.data = null;
        this.isPending = true;
        this.onChangeCallback = () => { };
        this.asyncUpdates = new async_update_controller_1.AsyncUpdateController();
        this.suspenseReader = new suspense_reader_1.SuspenseReader();
        this.asyncUpdates.addResolveListener((v) => this.handleSuccessfulSetStateAction(v));
        this.asyncUpdates.addRejectListener((e) => this.handleFailedSetStateAction(e));
        this.asyncUpdates.addDispatchListener(() => this.suspenseReader.reset());
        if (initialValue) {
            this.dispatch(initialValue);
        }
        this.dispatch = this.dispatch.bind(this);
    }
    triggerChangeCallback() {
        try {
            this.onChangeCallback();
        }
        catch (e) {
            //
        }
    }
    handleSuccessfulSetStateAction(v) {
        this.data = v;
        this.error = null;
        this.isPending = false;
        this.suspenseReader.update(v);
        this.triggerChangeCallback();
    }
    handleFailedSetStateAction(e) {
        this.data = null;
        this.error = e;
        this.isPending = false;
        this.suspenseReader.fail(e);
        this.triggerChangeCallback();
    }
    getState() {
        const self = this;
        return {
            get data() {
                return self.data;
            },
            get error() {
                if (self.error instanceof Error)
                    return self.error;
                if (typeof self.error === "string")
                    return new Error(self.error);
                return new Error("Last Set State Action has rejected.");
            },
            get isPending() {
                return self.isPending;
            },
            read() {
                return self.suspenseReader.read();
            },
        };
    }
    addChangeListener(callback) {
        this.onChangeCallback = callback;
    }
    dispatch(action) {
        if (is_generator_1.isGenerator(action)) {
            try {
                const generatorResult = action(this.getState());
                this.dispatch(generatorResult);
            }
            catch (e) {
                this.asyncUpdates.cancelLastDispatch();
                this.handleFailedSetStateAction(e);
            }
            return;
        }
        if (is_promise_1.isPromise(action)) {
            this.asyncUpdates.dispatch(action);
            return;
        }
        this.asyncUpdates.cancelLastDispatch();
        this.handleSuccessfulSetStateAction(action);
    }
}
exports.StateController = StateController;
