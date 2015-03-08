/**
 * SetStoreValueRequestHandler
 * @constructor
 * @param {yak.YakServer} yakServer
 * @implements {yak.RequestHandler}
 */
yak.SetStoreValueRequestHandler = function SetStoreValueRequestHandler(yakServer) {
    'use strict';

    /**
     * @type {yak.Store}
     */
    var store = yak.require('store');

    /**
     * @param {yak.api.SetStoreValueRequest} request
     * @returns {yak.api.SetStoreValueResponse} response
     */
    this.handle = function handle(request) {
        var logger = yakServer.getLogger();
        logger.debug('SetStoreValueRequestHandler', {request: request});

        var response = new yak.api.SetStoreValueResponse(request.id);
        response.requestId = request.id;

        store.setValue(request.key,  request.value);

        return response;
    };
};