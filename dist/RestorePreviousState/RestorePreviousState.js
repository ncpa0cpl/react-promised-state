"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestorePreviousState = void 0;
var RestorePreviousState = /** @class */ (function (_super) {
    __extends(RestorePreviousState, _super);
    function RestorePreviousState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isRestorePreviousState = true;
        return _this;
    }
    RestorePreviousState.isInstance = function (e) {
        return "_isRestorePreviousState" in e ? e._isRestorePreviousState : false;
    };
    return RestorePreviousState;
}(Error));
exports.RestorePreviousState = RestorePreviousState;
//# sourceMappingURL=RestorePreviousState.js.map