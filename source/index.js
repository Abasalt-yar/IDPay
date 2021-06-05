"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.IDPay = void 0;
var axios_1 = require("axios");
var Codes_1 = require("./Codes");
var IDPay = /** @class */ (function () {
    /**
     * Creates an IDPay Transaction
     * @param apiKey Your IDPay WebService API-Key
     * @param debugMode Debug Mode Status
     * @returns new IDPay Class
    */
    function IDPay(apiKey, debugMode) {
        if (debugMode === void 0) { debugMode = false; }
        this.debug_mode = false;
        this._apiKey = apiKey;
        this.debug_mode = debugMode;
    }
    /**
     * Creates an IDPay Transaction
     * @param options Options | amount In **Tomans**
     * @returns ITransaction
    */
    IDPay.prototype.createTransaction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var result_1, error_1, er;
                        var _this = this;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, axios_1["default"]({
                                            method: "POST",
                                            url: "https://api.idpay.ir/v1.1/payment",
                                            responseType: "json",
                                            data: options,
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'X-API-KEY': this._apiKey,
                                                'X-SANDBOX': this.debug_mode == true ? 1 : 0
                                            }
                                        })];
                                case 1:
                                    result_1 = _c.sent();
                                    res({ status_code: result_1.status, id: result_1.data.id, link: result_1.data.link, info: options,
                                        verify: function () {
                                            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                var a, error_2;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 3]);
                                                            return [4 /*yield*/, this.verifyPayment({
                                                                    id: result_1.data.id,
                                                                    order_id: options.order_id
                                                                })];
                                                        case 1:
                                                            a = _a.sent();
                                                            resolve(a);
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            error_2 = _a.sent();
                                                            reject(error_2);
                                                            return [3 /*break*/, 3];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        },
                                        getStatus: function () {
                                            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                var a, error_3;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 2, , 3]);
                                                            return [4 /*yield*/, this.transactionStatus({
                                                                    id: result_1.data.id,
                                                                    order_id: options.order_id
                                                                })];
                                                        case 1:
                                                            a = _a.sent();
                                                            resolve(a);
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            error_3 = _a.sent();
                                                            reject(error_3);
                                                            return [3 /*break*/, 3];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        }
                                    });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _c.sent();
                                    if (((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_code) != undefined) {
                                        er = {
                                            status_code: error_1.response.status,
                                            error_code: error_1.response.data.error_code,
                                            error_message: Codes_1.Error_Codes[error_1.response.data.error_code] != undefined ? Codes_1.Error_Codes[error_1.response.data.error_code] : error_1.response.data.error_message
                                        };
                                        rej(er);
                                    }
                                    else
                                        rej(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * verifys a transaction
     * @param options Options
     * @returns Transaction verification Status
    */
    IDPay.prototype.verifyPayment = function (options) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var result, _, d, error_4, er;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]({
                                method: "POST",
                                url: "https://api.idpay.ir/v1.1/payment/verify",
                                responseType: "json",
                                data: options,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-API-KEY': this._apiKey,
                                    'X-SANDBOX': this.debug_mode == true ? 1 : 0
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        _ = result.data;
                        d = _;
                        if (d.status != undefined && Codes_1.Transaction_Status[d.status] != undefined) {
                            d.message = Codes_1.Transaction_Status[d.status];
                        }
                        res(d);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        if (((_a = error_4.response) === null || _a === void 0 ? void 0 : _a.status) != undefined) {
                            er = {
                                status_code: error_4.response.status,
                                error_code: error_4.response.data.error_code,
                                error_message: Codes_1.Transaction_Status[error_4.response.data.error_code] != undefined ? Codes_1.Transaction_Status[error_4.response.data.error_code] : Codes_1.Error_Codes[error_4.response.data.error_code]
                            };
                            rej(er);
                        }
                        else
                            rej(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * gets a transaction status
     * @param options Options
     * @returns Transaction Status
    */
    IDPay.prototype.transactionStatus = function (options) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var result, error_5, er;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"]({
                                method: "POST",
                                url: "https://api.idpay.ir/v1.1/payment/inquiry",
                                responseType: "json",
                                data: options,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-API-KEY': this._apiKey,
                                    'X-SANDBOX': this.debug_mode == true ? 1 : 0
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        res(result.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        if (((_a = error_5.response) === null || _a === void 0 ? void 0 : _a.status) != undefined) {
                            er = {
                                status_code: error_5.response.status,
                                error_code: error_5.response.data.error_code,
                                error_message: Codes_1.Transaction_Status[error_5.response.data.error_code] != undefined ? Codes_1.Transaction_Status[error_5.response.data.error_code] : Codes_1.Error_Codes[error_5.response.data.error_code]
                            };
                            rej(er);
                        }
                        else
                            rej(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * gets transaction list
     * @param options Options
     * @returns Attachments | Transactions
    */
    IDPay.prototype.transactions = function (options) {
        var _this = this;
        return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
            var params, result, attachments, Records, error_6, er;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        params = (options === null || options === void 0 ? void 0 : options.page) == undefined ? "page=0" : "page=" + (options === null || options === void 0 ? void 0 : options.page);
                        params += (options === null || options === void 0 ? void 0 : options.page_size) == undefined ? "&page_size=25" : "page_size=" + (options === null || options === void 0 ? void 0 : options.page_size);
                        return [4 /*yield*/, axios_1["default"]({
                                method: "POST",
                                url: "https://api.idpay.ir/v1.1/payment/transactions?" + params,
                                responseType: "json",
                                data: options,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-API-KEY': this._apiKey,
                                    'X-SANDBOX': this.debug_mode == true ? 1 : 0
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.status == 204) {
                            rej({
                                status_code: 204,
                                error_code: 204,
                                error_message: "No Transaction found"
                            });
                        }
                        attachments = result.data.attachment;
                        Records = result.data.records;
                        res({ attachments: attachments, transactions: Records });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        if (((_a = error_6.response) === null || _a === void 0 ? void 0 : _a.status) != undefined) {
                            er = {
                                status_code: error_6.response.status,
                                error_code: error_6.response.data.error_code,
                                error_message: Codes_1.Transaction_Status[error_6.response.data.error_code] != undefined ? Codes_1.Transaction_Status[error_6.response.data.error_code] : Codes_1.Error_Codes[error_6.response.data.error_code]
                            };
                            rej(er);
                        }
                        else
                            rej(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return IDPay;
}());
exports.IDPay = IDPay;
