var _ = require('underscore');

(function main() {
    'use strict';

    var log = new yak.Logger('STARTUP');

    /**
     * @type {yak.Store}
     */
    var store = yak.require('store');

    log.info('Start YAK server');

    var configManager = new yak.ConfigManager();
    configManager.load();
    store.load();

    var yakServer = new yak.YakServer(configManager);
    var serviceInstance = new yak.ServiceInstance('service', configManager.config.servicePort, yakServer);

    yakServer.start(serviceInstance);

    log.info('........................................');
    log.info('. YAKjs server initialized and running .');
    log.info('........................................');
}());




