var state = require('../state');
var cleanText = require('../cleanText');
var logger = require('./logger');

var getErrorMessage = function(dataDef, dataElementName, errorMessage, errorStack) {
  return 'Failed to execute data element module ' + dataDef.modulePath + ' for data element ' +
    dataElementName + '. ' + errorMessage + (errorStack ? '\n' + errorStack : '');
};

module.exports = function(name, suppressDefault) {
  var dataDef = state.getDataElementDefinition(name);

  if (!dataDef) {
    return state.getPropertySettings().undefinedVarsReturnEmpty ? '' : null;
  }

  var storeLength = dataDef.storeLength;
  var moduleExports;

  try {
    moduleExports = state.getModuleExports(dataDef.modulePath);
  } catch (e) {
    logger.error(getErrorMessage(dataDef, name, e.message, e.stack));
    return;
  }

  if (typeof moduleExports !== 'function') {
    logger.error(getErrorMessage(dataDef, name, 'Module did not export a function.'));
    return;
  }

  var value;

  try {
    value = moduleExports(dataDef.settings);
  } catch (e) {
    logger.error(getErrorMessage(dataDef, name, e.message, e.stack));
    return;
  }

  if (dataDef.cleanText) {
    value = cleanText(value);
  }

  if (value === undefined && storeLength) {
    value = state.getCachedDataElementValue(name, storeLength);
  } else if (value !== undefined && storeLength) {
    state.cacheDataElementValue(name, storeLength, value);
  }

  if (value === undefined && !suppressDefault) {
    // Have to wrap "default" in quotes since it is a keyword.
    /*eslint-disable dot-notation*/
    value = dataDef['default'] || '';
    /*eslint-enable dot-notation*/
  }

  if (dataDef.forceLowerCase && value.toLowerCase) {
    value = value.toLowerCase();
  }

  return value;
};