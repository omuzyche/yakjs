/**
 * GetStoreValueRequest
 * @constructor
 * @implements {yak.api.Request}
 */
yak.api.GetStoreValueRequest = function GetStoreValueRequest() {
    /**
     * Command for the service API.
     * @type {string}
     */
    this.type = 'request.getStoreValue';

    /**
     * Create unique request id.
     * @type {string}
     */
    this.id = yak.api.guid();

    /**
     * Store key
     * @type {?string}
     */
    this.key = null;
};