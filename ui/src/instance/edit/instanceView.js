/**
 * InstanceView
 * @constructor
 * @param {yak.ui.ViewContext} context
 * @param {jQuery} parent
 * @param {yak.ui.InstanceViewModel} viewModel
 */
yak.ui.InstanceView = function InstanceView(parent, context, viewModel) {
    'use strict';

    /**
     *  @type {yak.ui.InstanceView}
     */
    var self = this;

    /**
     * @type {yak.ui.Template}
     */
    var template = context.template.load('instanceEdit');

    /**
     * @type {yak.ui.Template}
     */
    var selectPluginTemplate = context.template.load('selectPluginItem');

    this.name = context.ko.observable('');
    this.port = context.ko.observable('');
    this.description = context.ko.observable('');

    /**
     * Constructor
     */
    function constructor() {
        console.log('yak.ui.InstanceView.constructor', self);
        parent.html(template.build());

        viewModel.onInstanceInfoChanged = handleInstanceInfoChanged;
        viewModel.onSelectPluginItemsChanged = updatePluginList;
        viewModel.onErrorResponse = handleErrorResponse;

        context.ko.applyBindings(self, parent[0]);

        $('.plugin-list', parent).click(handleSelectPluginClick);

        parent.find('[data-command=save]').click(handleSaveCommand);
        parent.find('[data-command=delete]').click(handleDeleteCommand);
        parent.find('[data-command=cancel]').click(handleCancelCommand);

        parent.find('[data-item-command-visible]').attr('data-item-command-visible', false);
    }

    /**
     * View is being activated.
     * @param {?} [data]
     */
    this.activate = function activate(data) {
        parent.find('.error-line').hide();
        viewModel.activate(data);
    };

    /**
     * @param {?} event
     */
    function handleSelectPluginClick(event) {
        var plugin = $(event.target).closest('.select-plugin-item');
        var pluginName = plugin.attr('data-plugin-name');

        viewModel.togglePluginSelection(pluginName);
    }

    /**
     * @param {string} message
     */
    function handleErrorResponse(message) {
        parent.find('.error-line').show();
        parent.find('.error-line-text').html(message);
    }

    /**
     * Handle Instance Info Changed event.
     */
    function handleInstanceInfoChanged() {
        console.log('InstanceView.handleInstanceInfoChanged', viewModel.instanceItem);

        if (viewModel.instanceItem) {
            self.name(viewModel.instanceItem.name);
            self.description(viewModel.instanceItem.description);
            self.port(viewModel.instanceItem.port);
            parent.find('[data-item-command-visible]').attr('data-item-command-visible', true);
        } else {
            self.name('');
            self.description('');
            self.port('');
            parent.find('[data-item-command-visible]').attr('data-item-command-visible', false);
        }

        updatePluginList();
    }

    /**
     * Update the DOM plugin list.
     */
    function updatePluginList() {
        var html = '';

        _.each(viewModel.selectPluginItems, function toHTML(plugin) {
            html += selectPluginTemplate.build(plugin);
        });

        $('.plugin-list', parent).html(html);
    }

    /**
     * Handle Save Button Click
     */
    function handleSaveCommand() {
        parent.find('.error-line').hide();

        var instanceItem = new yak.ui.InstanceItem(self.name());
        instanceItem.name = self.name();
        instanceItem.description = self.description();
        instanceItem.port = self.port();

        viewModel.createOrUpdate(instanceItem);
    }

    /**
     * Handle cancel button click
     */
    function handleCancelCommand() {
        viewModel.cancel();
    }

    /**
     * Handle delete button click
     */
    function handleDeleteCommand() {
        viewModel.deleteInstance();
    }

    constructor();
};
