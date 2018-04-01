var Template = require('./template');

/**
 * @constructor
 * @struct
 * @param {Mustache} mustache
 */
function TemplateLoader(mustache) {
    'use strict';

    /**
     * Load a template by Name
     * @param {string} templateName
     * @returns {!Template}
     */
    this.load = function load(templateName) {
        var templateId = 'mustache-' + templateName.toLowerCase();
        var templateElement = $('#' + templateId);

        if (!templateElement.length) {
            throw new Error('TemplateLoader: Can not find template [' + templateName + '] width id [' + templateId + ']');
        }

        var templateRaw = templateElement.html();
        Mustache.parse(templateRaw);

        return new Template(templateRaw);
    };
}

module.exports = TemplateLoader;


