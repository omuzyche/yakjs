/**
 * StopInstanceRequestHandler
 * @constructor
 * @param {yak.YakServer} yakServer
 * @implements {yakServiceMessageHandler}
 */
yak.StopInstanceRequestHandler = function StopInstanceRequestHandler(yakServer) {
    'use strict';

    /**
     * @type {yak.StartInstanceRequestHandler}
     */
    var self = this;

    /**
    * @param {yak.WebSocketMessage} message
    * @param {yak.WebSocketConnection} connection
    */
    this.handle = function handle(message, connection) {
        try {
            yakServer.instanceManager.stop(message.instanceName);
            connection.send(new yak.api.StartInstanceResponse());
        } catch (ex) {
            yakServer.serviceInstance.log.error(ex.message);
        }
    };
};
