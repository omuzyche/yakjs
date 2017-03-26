/**
 * @constructor
 * @struct
 * @param {yak.ui.ViewModelContext} context
 */
yak.ui.PluginViewModel = function PluginViewModel(context) {
    'use strict';

    /**
     * @type {!yak.ui.PluginViewModel}
     */
    var self = this;

    /**
     * @type {yak.ui.PluginItem}
     */
    this.pluginItem = null;

    /**
     * @type {Function}
     */
    this.onPluginItemChanged = _.noop;

    /**
     * Callback for received error response.
     * @type {function(string)}
     */
    this.onErrorResponse = _.noop;

    /**
     * @type {boolean}
     */
    this.isNewItem = false;

    /**
     * @param {string|object} data
     */
    this.activate = function activate(data) {
        console.log('PluginViewModel.activate', data);

        if (data !== null) {
            self.pluginItem = new yak.ui.PluginItem();
            _.extend(self.pluginItem, data);
        } else {
            self.isNewItem = true;
            self.pluginItem = new yak.ui.PluginItem();
            self.pluginItem.version = '0.1.0';
            self.pluginItem.code = yak.ui.EmptyPluginTemplate.toString();
        }

        Object.freeze(self.pluginItem);

        self.onPluginItemChanged();
    };

    /**
     * Create or update a plugin
     * @param {yak.ui.PluginItem} pluginItem
     */
    this.createOrUpdate = function createOrUpdate(pluginItem) {
        console.log('PluginViewModel.createOrUpdate', {pluginItem: pluginItem});
        var request = new yak.api.CreateOrUpdatePluginRequest();

        // Set the original plugin id so the the name(=id) can be updated.
        if (!self.isNewItem) {
            request.pluginId = self.pluginItem.id;
        }

        request.plugin = new yak.api.PluginConfig();
        $.extend(request.plugin, pluginItem);
        request.plugin.id = pluginItem.id;

        if (self.isNewItem) {
            context.adapter
                .post('/plugins', request)
                .then(showPluginPanel)
                .catch(showErrorMessage);
        } else {
            context.adapter
                .put('/plugins/' + self.pluginItem.id, request)
                .then(showPluginPanel)
                .catch(showErrorMessage);
        }

    };

    this.cancel = function cancel() {
        context.eventBus.post(new yak.ui.ShowViewCommand(yak.ui.PluginListView));
    };

    this.deletePlugin = function deletePlugin() {
        if (self.pluginItem) {
            context.adapter
                .deleteResource('/plugins/' + self.pluginItem.id)
                .then(showPluginPanel)
                .catch(showErrorMessage);
        }
    };

    function showPluginPanel() {
        context.eventBus.post(new yak.ui.ShowViewCommand(yak.ui.PluginListView));
    }

    function showErrorMessage(error) {
        self.onErrorResponse(error.message);
    }
};
