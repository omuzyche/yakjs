var compareName = require('../../core/compare/compareName');

/**
 * @constructor
 * @struct
 * @param {jQuery} parent
 * @param {ViewContext} context
 * @param {PluginListViewModel} viewModel
 */
function PluginListView(parent, context, viewModel) {
    'use strict';

    /**
     * @type {!Template}
     */
    var template = context.template.load('pluginList');

    /**
     * @type {!Template}
     */
    var itemTemplate = context.template.load('pluginItem');

    /**
     * Activate the view.
     */
    this.activate = function activate() { viewModel.activate(); };

    /**
     * Constructor
     */
    function constructor() {
        console.log('PluginListView.constructor');
        parent.html(template.build());


        parent.find('[data-element=create]').click(viewModel.activatePluginEditPanel);
        parent.find('[data-element=refresh]').click(viewModel.reload);
        parent.find('.plugin-items').click(handleListClick);

        viewModel.onItemsChanged = function onItemsChanged() { createList(); };

        createList();
    }

    /**
     * @param {jQuery.Event} event
     */
    function handleListClick(event) {
        var listItem = $(event.target).closest('[data-id]');
        var pluginId = listItem.attr('data-id');

        if (pluginId) {
            viewModel.activatePluginEditPanel(pluginId);
        }
    }

    /**
     * Update panel list
     */
    function createList() {
        var html = '';
        var itemContainer = parent.find('.plugin-items');

        viewModel.items.sort(compareName);

        _.each(viewModel.items, function createListItem(item) {
            html += itemTemplate.build(item);
        });

        itemContainer.html(html);
    }

    constructor();
}

module.exports = PluginListView;
