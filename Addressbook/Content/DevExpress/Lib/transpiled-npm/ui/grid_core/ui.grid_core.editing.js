"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _window = require("../../core/utils/window");

var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

var _guid = _interopRequireDefault(require("../../core/guid"));

var _type = require("../../core/utils/type");

var _iterator = require("../../core/utils/iterator");

var _extend = require("../../core/utils/extend");

var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));

var _click = require("../../events/click");

var _double_click = require("../../events/double_click");

var _pointer = _interopRequireDefault(require("../../events/pointer"));

var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));

var _array_utils = require("../../data/array_utils");

var _index = require("../../events/utils/index");

var _dialog = require("../dialog");

var _message = _interopRequireDefault(require("../../localization/message"));

var _button = _interopRequireDefault(require("../button"));

var _popup = _interopRequireDefault(require("../popup"));

var _devices = _interopRequireDefault(require("../../core/devices"));

var _form = _interopRequireDefault(require("../form"));

var _hold = _interopRequireDefault(require("../../events/hold"));

var _deferred = require("../../core/utils/deferred");

var _common = require("../../core/utils/common");

var iconUtils = _interopRequireWildcard(require("../../core/utils/icon"));

var _ui = _interopRequireDefault(require("../scroll_view/ui.scrollable"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var EDIT_FORM_CLASS = 'edit-form';
var EDIT_FORM_ITEM_CLASS = 'edit-form-item';
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
var READONLY_CLASS = 'readonly';
var EDIT_POPUP_CLASS = 'edit-popup';
var FORM_BUTTONS_CONTAINER_CLASS = 'form-buttons-container';
var ADD_ROW_BUTTON_CLASS = 'addrow-button';
var DROPDOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
var LINK_CLASS = 'dx-link';
var EDITOR_CELL_CLASS = 'dx-editor-cell';
var ROW_SELECTED = 'dx-selection';
var EDIT_ROW = 'dx-edit-row';
var EDIT_BUTTON_CLASS = 'dx-edit-button';
var COMMAND_EDIT_CLASS = 'dx-command-edit';
var COMMAND_EDIT_WITH_ICONS_CLASS = COMMAND_EDIT_CLASS + '-with-icons';
var SCROLLABLE_CONTAINER_CLASS = 'dx-scrollable-container';
var BUTTON_CLASS = 'dx-button';
var INSERT_INDEX = '__DX_INSERT_INDEX__';
var ROW_CLASS = 'dx-row';
var ROW_REMOVED = 'dx-row-removed';
var ROW_INSERTED = 'dx-row-inserted';
var ROW_MODIFIED = 'dx-row-modified';
var CELL_MODIFIED = 'dx-cell-modified';
var EDITING_NAMESPACE = 'dxDataGridEditing';
var DATA_ROW_CLASS = 'dx-data-row';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var EDITORS_INPUT_SELECTOR = 'input:not([type=\'hidden\'])';
var FOCUSABLE_ELEMENT_SELECTOR = '[tabindex], ' + EDITORS_INPUT_SELECTOR;
var EDIT_MODE_BATCH = 'batch';
var EDIT_MODE_ROW = 'row';
var EDIT_MODE_CELL = 'cell';
var EDIT_MODE_FORM = 'form';
var EDIT_MODE_POPUP = 'popup';
var DATA_EDIT_DATA_INSERT_TYPE = 'insert';
var DATA_EDIT_DATA_UPDATE_TYPE = 'update';
var DATA_EDIT_DATA_REMOVE_TYPE = 'remove';
var DEFAULT_START_EDIT_ACTION = 'click';
var EDIT_MODES = [EDIT_MODE_BATCH, EDIT_MODE_ROW, EDIT_MODE_CELL, EDIT_MODE_FORM, EDIT_MODE_POPUP];
var ROW_BASED_MODES = [EDIT_MODE_ROW, EDIT_MODE_FORM, EDIT_MODE_POPUP];
var CELL_BASED_MODES = [EDIT_MODE_BATCH, EDIT_MODE_CELL];
var FORM_BASED_MODES = [EDIT_MODE_FORM, EDIT_MODE_POPUP];
var MODES_WITH_DELAYED_FOCUS = [EDIT_MODE_ROW, EDIT_MODE_FORM];
var TARGET_COMPONENT_NAME = 'targetComponent';
var EDIT_LINK_CLASS = {
  save: 'dx-link-save',
  cancel: 'dx-link-cancel',
  edit: 'dx-link-edit',
  undelete: 'dx-link-undelete',
  delete: 'dx-link-delete',
  add: 'dx-link-add'
};
var EDIT_ICON_CLASS = {
  save: 'save',
  cancel: 'revert',
  edit: 'edit',
  undelete: 'revert',
  delete: 'trash',
  add: 'add'
};
var METHOD_NAMES = {
  edit: 'editRow',
  delete: 'deleteRow',
  undelete: 'undeleteRow',
  save: 'saveEditData',
  cancel: 'cancelEditData',
  add: 'addRowByRowIndex'
};
var ACTION_OPTION_NAMES = {
  add: 'allowAdding',
  edit: 'allowUpdating',
  delete: 'allowDeleting'
};
var BUTTON_NAMES = ['edit', 'save', 'cancel', 'delete', 'undelete'];
var EDITING_POPUP_OPTION_NAME = 'editing.popup';

var createFailureHandler = function createFailureHandler(deferred) {
  return function (arg) {
    var error = arg instanceof Error ? arg : new Error(arg && String(arg) || 'Unknown error');
    deferred.reject(error);
  };
};

var _getEditMode = function getEditMode(that) {
  var editMode = that.option('editing.mode');

  if (EDIT_MODES.indexOf(editMode) !== -1) {
    return editMode;
  }

  return EDIT_MODE_ROW;
};

var _isRowEditMode = function isRowEditMode(that) {
  var editMode = _getEditMode(that);

  return ROW_BASED_MODES.indexOf(editMode) !== -1;
};

var isEditingCell = function isEditingCell(isEditRow, cellOptions) {
  return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing;
};

var isEditingOrShowEditorAlwaysDataCell = function isEditingOrShowEditorAlwaysDataCell(isEditRow, cellOptions) {
  var isCommandCell = !!cellOptions.column.command;
  var isEditing = isEditingCell(isEditRow, cellOptions);
  var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
  return cellOptions.rowType === 'data' && isEditorCell;
};

var EditingController = _uiGrid_core.default.ViewController.inherit(function () {
  var getDefaultEditorTemplate = function getDefaultEditorTemplate(that) {
    return function (container, options) {
      var $editor = (0, _renderer.default)('<div>').appendTo(container);
      that.getController('editorFactory').createEditor($editor, (0, _extend.extend)({}, options.column, {
        value: options.value,
        setValue: options.setValue,
        row: options.row,
        parentType: 'dataRow',
        width: null,
        readOnly: !options.setValue,
        isOnForm: options.isOnForm,
        id: options.id
      }));
    };
  };

  var getEditingTexts = function getEditingTexts(options) {
    var editingTexts = options.component.option('editing.texts') || {};
    return {
      save: editingTexts.saveRowChanges,
      cancel: editingTexts.cancelRowChanges,
      edit: editingTexts.editRow,
      undelete: editingTexts.undeleteRow,
      delete: editingTexts.deleteRow,
      add: editingTexts.addRowToNode
    };
  };

  var getButtonIndex = function getButtonIndex(buttons, name) {
    var result = -1;
    buttons.some(function (button, index) {
      if (getButtonName(button) === name) {
        result = index;
        return true;
      }
    });
    return result;
  };

  function getButtonName(button) {
    return (0, _type.isObject)(button) ? button.name : button;
  }

  var getEditorType = function getEditorType(item) {
    var column = item.column;
    return item.isCustomEditorType ? item.editorType : column.formItem && column.formItem.editorType;
  };

  var forEachFormItems = function forEachFormItems(items, callBack) {
    items.forEach(function (item) {
      if (item.items || item.tabs) {
        forEachFormItems(item.items || item.tabs, callBack);
      } else {
        callBack(item);
      }
    });
  };

  return {
    init: function init() {
      var that = this;
      that._columnsController = that.getController('columns');
      that._dataController = that.getController('data');
      that._rowsView = that.getView('rowsView');
      that._editForm = null;
      that._updateEditFormDeferred = null;
      that._lastOperation = null;

      if (that._deferreds) {
        that._deferreds.forEach(function (d) {
          return d.reject('cancel');
        });
      }

      that._deferreds = [];

      if (!that._dataChangedHandler) {
        that._dataChangedHandler = that._handleDataChanged.bind(that);

        that._dataController.changed.add(that._dataChangedHandler);
      }

      if (!that._saveEditorHandler) {
        that.createAction('onInitNewRow', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowInserting', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowInserted', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onEditingStart', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowUpdating', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowUpdated', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowRemoving', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onRowRemoved', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onSaved', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onSaving', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onEditCanceling', {
          excludeValidators: ['disabled', 'readOnly']
        });
        that.createAction('onEditCanceled', {
          excludeValidators: ['disabled', 'readOnly']
        }); // chrome 73+

        var $pointerDownTarget;
        var isResizing;

        that._pointerUpEditorHandler = function () {
          var _that$getController;

          isResizing = (_that$getController = that.getController('columnsResizer')) === null || _that$getController === void 0 ? void 0 : _that$getController.isResizing();
        };

        that._pointerDownEditorHandler = function (e) {
          return $pointerDownTarget = (0, _renderer.default)(e.target);
        };

        that._saveEditorHandler = that.createAction(function (e) {
          var event = e.event;
          var $target = (0, _renderer.default)(event.target);
          var targetComponent = event[TARGET_COMPONENT_NAME];

          if ($pointerDownTarget && $pointerDownTarget.is('input') && !$pointerDownTarget.is($target)) {
            return;
          }

          function checkEditorPopup($element) {
            return $element && !!$element.closest(".".concat(DROPDOWN_EDITOR_OVERLAY_CLASS)).length;
          }

          if (!_isRowEditMode(that) && !that._editCellInProgress) {
            var isEditorPopup = checkEditorPopup($target) || checkEditorPopup(targetComponent === null || targetComponent === void 0 ? void 0 : targetComponent.$element());
            var isDomElement = !!$target.closest((0, _window.getWindow)().document).length;
            var isAnotherComponent = targetComponent && !targetComponent._disposed && targetComponent !== that.component;
            var isAddRowButton = !!$target.closest(".".concat(that.addWidgetPrefix(ADD_ROW_BUTTON_CLASS))).length;
            var isFocusOverlay = $target.hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
            var isCellEditMode = _getEditMode(that) === EDIT_MODE_CELL;

            if (!isResizing && !isEditorPopup && !isFocusOverlay && !(isAddRowButton && isCellEditMode && that.isEditing()) && (isDomElement || isAnotherComponent)) {
              that._closeEditItem.bind(that)($target);
            }
          }
        });

        _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.up, that._pointerUpEditorHandler);

        _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.down, that._pointerDownEditorHandler);

        _events_engine.default.on(_dom_adapter.default.getDocument(), _click.name, that._saveEditorHandler);
      }

      that._updateEditColumn();

      that._updateEditButtons();

      if (!this._internalState) {
        this._internalState = [];
      }

      this.component._optionsByReference['editing.editRowKey'] = true;
      this.component._optionsByReference['editing.changes'] = true;
    },
    getChanges: function getChanges() {
      return this.option('editing.changes');
    },
    resetChanges: function resetChanges() {
      var changes = this.getChanges();
      var needReset = changes === null || changes === void 0 ? void 0 : changes.length;

      if (needReset) {
        this._internalState = [];

        this._silentOption('editing.changes', []);
      }
    },
    _getInternalData: function _getInternalData(key) {
      return this._internalState.filter(function (item) {
        return item.key === key;
      })[0];
    },
    _addInternalData: function _addInternalData(params) {
      var internalData = this._getInternalData(params.key);

      if (internalData) {
        return (0, _extend.extend)(internalData, params);
      }

      this._internalState.push(params);

      return params;
    },
    _getOldData: function _getOldData(key) {
      var _this$_getInternalDat;

      return (_this$_getInternalDat = this._getInternalData(key)) === null || _this$_getInternalDat === void 0 ? void 0 : _this$_getInternalDat.oldData;
    },
    getUpdatedData: function getUpdatedData(data) {
      var key = this._dataController.keyOf(data);

      var changes = this.getChanges();

      var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);

      if (changes[editIndex]) {
        return (0, _array_utils.createObjectWithChanges)(data, changes[editIndex].data);
      }

      return data;
    },
    getInsertedData: function getInsertedData() {
      return this.getChanges().filter(function (change) {
        return change.data && change.type === DATA_EDIT_DATA_INSERT_TYPE;
      }).map(function (change) {
        return change.data;
      });
    },
    getRemovedData: function getRemovedData() {
      var _this = this;

      return this.getChanges().filter(function (change) {
        return _this._getOldData(change.key) && change.type === DATA_EDIT_DATA_REMOVE_TYPE;
      }).map(function (change) {
        return _this._getOldData(change.key);
      });
    },
    _fireDataErrorOccurred: function _fireDataErrorOccurred(arg) {
      if (arg === 'cancel') return;
      var $popupContent = this.getPopupContent();

      this._dataController.dataErrorOccurred.fire(arg, $popupContent);
    },
    _needToCloseEditableCell: function _needToCloseEditableCell($targetElement) {
      var $element = this.component.$element();
      var result = this.isEditing();
      var isCurrentComponentElement = !$element || !!$targetElement.closest($element).length;

      if (isCurrentComponentElement) {
        var isDataRow = $targetElement.closest('.' + DATA_ROW_CLASS).length;

        if (isDataRow) {
          var rowsView = this.getView('rowsView');
          var $targetCell = $targetElement.closest('.' + ROW_CLASS + '> td');
          var rowIndex = rowsView.getRowIndex($targetCell.parent());
          var columnIndex = rowsView.getCellElements(rowIndex).index($targetCell);

          var visibleColumns = this._columnsController.getVisibleColumns(); // TODO jsdmitry: Move this code to _rowClick method of rowsView


          var allowEditing = visibleColumns[columnIndex] && visibleColumns[columnIndex].allowEditing;
          result = result && !allowEditing && !this.isEditCell(rowIndex, columnIndex);
        }
      }

      return result;
    },
    _closeEditItem: function _closeEditItem($targetElement) {
      if (this._needToCloseEditableCell($targetElement)) {
        this.closeEditCell();
      }
    },
    _handleDataChanged: function _handleDataChanged(args) {
      var editForm = this._editForm;

      if (args.changeType === 'refresh' && _getEditMode(this) === EDIT_MODE_POPUP && editForm && editForm.option('visible')) {
        this._repaintEditPopup();
      }
    },
    _isDefaultButtonVisible: function _isDefaultButtonVisible(button, options) {
      var result = true;

      var isRowMode = _isRowEditMode(this);

      var isBatchMode = _getEditMode(this) === EDIT_MODE_BATCH;
      var isEditRow = options.row && options.row.rowIndex === this._getVisibleEditRowIndex() && isRowMode;

      switch (button.name) {
        case 'edit':
          result = !isEditRow && this.allowUpdating(options) && isRowMode;
          break;

        case 'save':
        case 'cancel':
          result = isEditRow;
          break;

        case 'delete':
          result = !isEditRow && this.allowDeleting(options) && (!isBatchMode || !options.row.removed);
          break;

        case 'undelete':
          result = isBatchMode && this.allowDeleting(options) && options.row.removed;
          break;
      }

      return result;
    },
    _isButtonVisible: function _isButtonVisible(button, options) {
      var visible = button.visible;

      if (!(0, _type.isDefined)(visible)) {
        return this._isDefaultButtonVisible(button, options);
      }

      return (0, _type.isFunction)(visible) ? visible.call(button, {
        component: options.component,
        row: options.row,
        column: options.column
      }) : visible;
    },
    _getButtonConfig: function _getButtonConfig(button, options) {
      var _this2 = this;

      var config = (0, _type.isObject)(button) ? button : {};
      var buttonName = getButtonName(button);
      var editingTexts = getEditingTexts(options);
      var methodName = METHOD_NAMES[buttonName];
      var editingOptions = this.option('editing');
      var actionName = ACTION_OPTION_NAMES[buttonName];
      var allowAction = actionName ? editingOptions[actionName] : true;
      return (0, _extend.extend)({
        name: buttonName,
        text: editingTexts[buttonName],
        cssClass: EDIT_LINK_CLASS[buttonName],
        onClick: function onClick(e) {
          var event = e.event;
          event.stopPropagation();
          event.preventDefault();
          setTimeout(function () {
            options.row && allowAction && _this2[methodName] && _this2[methodName](options.row.rowIndex);
          });
        }
      }, config);
    },
    _getEditingButtons: function _getEditingButtons(options) {
      var _this3 = this;

      var buttonIndex;
      var haveCustomButtons = !!options.column.buttons;
      var buttons = (options.column.buttons || []).slice();

      if (haveCustomButtons) {
        buttonIndex = getButtonIndex(buttons, 'edit');

        if (buttonIndex >= 0) {
          if (getButtonIndex(buttons, 'save') < 0) {
            buttons.splice(buttonIndex + 1, 0, 'save');
          }

          if (getButtonIndex(buttons, 'cancel') < 0) {
            buttons.splice(getButtonIndex(buttons, 'save') + 1, 0, 'cancel');
          }
        }

        buttonIndex = getButtonIndex(buttons, 'delete');

        if (buttonIndex >= 0 && getButtonIndex(buttons, 'undelete') < 0) {
          buttons.splice(buttonIndex + 1, 0, 'undelete');
        }
      } else {
        buttons = BUTTON_NAMES.slice();
      }

      return buttons.map(function (button) {
        return _this3._getButtonConfig(button, options);
      });
    },
    _renderEditingButtons: function _renderEditingButtons($container, buttons, options) {
      var _this4 = this;

      buttons.forEach(function (button) {
        if (_this4._isButtonVisible(button, options)) {
          _this4._createButton($container, button, options);
        }
      });
    },
    _getEditCommandCellTemplate: function _getEditCommandCellTemplate() {
      var _this5 = this;

      return function (container, options) {
        var $container = (0, _renderer.default)(container);

        if (options.rowType === 'data') {
          var buttons = _this5._getEditingButtons(options);

          _this5._renderEditingButtons($container, buttons, options);

          options.watch && options.watch(function () {
            return buttons.map(function (button) {
              return _this5._isButtonVisible(button, options);
            });
          }, function () {
            $container.empty();

            _this5._renderEditingButtons($container, buttons, options);
          });
        } else {
          _uiGrid_core2.default.setEmptyText($container);
        }
      };
    },
    isRowEditMode: function isRowEditMode() {
      return _isRowEditMode(this);
    },
    isFormEditMode: function isFormEditMode() {
      var editMode = _getEditMode(this);

      return FORM_BASED_MODES.indexOf(editMode) !== -1;
    },
    isCellOrBatchEditMode: function isCellOrBatchEditMode() {
      var editMode = this.getEditMode();
      return CELL_BASED_MODES.indexOf(editMode) !== -1;
    },
    getEditMode: function getEditMode() {
      return _getEditMode(this);
    },
    getFirstEditableColumnIndex: function getFirstEditableColumnIndex() {
      var columnsController = this.getController('columns');
      var firstFormItem = this._firstFormItem;
      var columnIndex;

      if (_getEditMode(this) === EDIT_MODE_FORM && firstFormItem) {
        var editRowKey = this.option('editing.editRowKey');

        var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);

        var $editFormElements = this._rowsView.getCellElements(editRowIndex);

        columnIndex = this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column);
      } else {
        var visibleColumns = columnsController.getVisibleColumns();
        (0, _iterator.each)(visibleColumns, function (index, column) {
          if (column.allowEditing) {
            columnIndex = index;
            return false;
          }
        });
      }

      return columnIndex;
    },
    getFirstEditableCellInRow: function getFirstEditableCellInRow(rowIndex) {
      var rowsView = this.getView('rowsView');
      return rowsView && rowsView._getCellElement(rowIndex ? rowIndex : 0, this.getFirstEditableColumnIndex());
    },
    getFocusedCellInRow: function getFocusedCellInRow(rowIndex) {
      return this.getFirstEditableCellInRow(rowIndex);
    },
    getIndexByKey: function getIndexByKey(key, items) {
      return _uiGrid_core2.default.getIndexByKey(key, items);
    },
    hasChanges: function hasChanges(rowIndex) {
      var changes = this.getChanges();
      var result = false;

      for (var i = 0; i < (changes === null || changes === void 0 ? void 0 : changes.length); i++) {
        if (changes[i].type && (!(0, _type.isDefined)(rowIndex) || this._dataController.getRowIndexByKey(changes[i].key) === rowIndex)) {
          result = true;
          break;
        }
      }

      return result;
    },
    dispose: function dispose() {
      this.callBase();
      clearTimeout(this._inputFocusTimeoutID);

      _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);

      _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);

      _events_engine.default.off(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler);
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'editing') {
        var fullName = args.fullName;
        var editPopup = this._editPopup;

        if (fullName && fullName.indexOf(EDITING_POPUP_OPTION_NAME) === 0) {
          if (editPopup) {
            var popupOptionName = fullName.slice(EDITING_POPUP_OPTION_NAME.length + 1);

            if (popupOptionName) {
              editPopup.option(popupOptionName, args.value);
            } else {
              editPopup.option(args.value);
            }
          }
        } else if (editPopup && editPopup.option('visible') && fullName.indexOf('editing.form') === 0) {
          this._repaintEditPopup();
        } else if (fullName === 'editing.editRowKey') {
          this._handleEditRowKeyChange(args);
        } else if (fullName === 'editing.editColumnName') {
          this._handleEditColumnNameChange(args);
        } else if (fullName === 'editing.changes') {
          this._handleChangesChange(args);
        } else {
          this.init();
          this.resetChanges();

          this._resetEditColumnName();

          this._resetEditRowKey();
        }

        args.handled = true;
      } else {
        this.callBase(args);
      }
    },
    _handleEditRowKeyChange: function _handleEditRowKeyChange(args) {
      var rowIndex = this._dataController.getRowIndexByKey(args.value);

      var oldRowIndexCorrection = this._getEditRowIndexCorrection();

      var oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;

      var columnIndex = this._getVisibleEditColumnIndex();

      if (!this.isCellOrBatchEditMode()) {
        if ((0, _type.isDefined)(args.value)) {
          if (args.value !== args.previousValue) {
            this._editRowFromOptionChanged(rowIndex, oldRowIndex);
          }
        } else {
          this.cancelEditData();
        }
      } else {
        if ((0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
          this._editCellFromOptionChanged(columnIndex, columnIndex, oldRowIndex);
        }
      }
    },
    _handleEditColumnNameChange: function _handleEditColumnNameChange(args) {
      var oldRowIndex = this._getVisibleEditRowIndex(args.previousValue);

      if (this.isCellOrBatchEditMode() && oldRowIndex !== -1 && (0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
        var columnIndex = this._columnsController.getVisibleColumnIndex(args.value);

        var oldColumnIndex = this._columnsController.getVisibleColumnIndex(args.previousValue);

        this._editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex);
      }
    },
    _handleChangesChange: function _handleChangesChange(args) {
      var dataController = this._dataController;

      if (!args.value.length && !args.previousValue.length) {
        return;
      }

      dataController.updateItems({
        repaintChangesOnly: true
      });
    },
    _editCellFromOptionChanged: function _editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex) {
      var _this6 = this;

      var columns = this._columnsController.getVisibleColumns();

      if (columnIndex > -1) {
        (0, _common.deferRender)(function () {
          _this6._repaintEditCell(columns[columnIndex], columns[oldColumnIndex], oldRowIndex);
        });
      }
    },
    publicMethods: function publicMethods() {
      return ['addRow', 'deleteRow', 'undeleteRow', 'editRow', 'editCell', 'closeEditCell', 'saveEditData', 'cancelEditData', 'hasEditData'];
    },
    refresh: function refresh(isPageChanged) {
      var editMode = _getEditMode(this);

      var needResetIndexes = editMode === EDIT_MODE_BATCH || isPageChanged && this.option('scrolling.mode') !== 'virtual';

      if (!(0, _type.isDefined)(this._pageIndex)) {
        return;
      }

      if (!this.isCellOrBatchEditMode()) {
        this.resetChanges();
        this.init(); // TODO this condition is for T733748

        if ((0, _type.isDefined)(this.option('editing.editRowKey'))) {
          this._resetEditRowKey();
        }
      } else if (needResetIndexes) {
        this._resetEditColumnName();

        this._resetEditRowKey();
      }
    },
    isEditing: function isEditing() {
      var isEditRowKeyDefined = (0, _type.isDefined)(this.option('editing.editRowKey'));
      var isEditColumnNameDefined = (0, _type.isDefined)(this.option('editing.editColumnName'));

      if (this.isCellOrBatchEditMode()) {
        return isEditRowKeyDefined && isEditColumnNameDefined;
      }

      return isEditRowKeyDefined;
    },
    isEditRow: function isEditRow(rowIndex) {
      var editMode = _getEditMode(this);

      return this._getVisibleEditRowIndex() === rowIndex && ROW_BASED_MODES.indexOf(editMode) !== -1;
    },
    _setEditRowKey: function _setEditRowKey(value, silent) {
      if (silent) {
        this._silentOption('editing.editRowKey', value);
      } else {
        this.option('editing.editRowKey', value);
      }
    },
    _setEditRowKeyByIndex: function _setEditRowKeyByIndex(rowIndex, silent) {
      var key = this._dataController.getKeyByRowIndex(rowIndex);

      if (key === undefined) {
        this._dataController.fireError('E1043');

        return;
      }

      this._setEditRowKey(key, silent);
    },
    getEditRowIndex: function getEditRowIndex() {
      return this._getVisibleEditRowIndex();
    },
    getEditFormRowIndex: function getEditFormRowIndex() {
      var editMode = _getEditMode(this);

      return editMode === EDIT_MODE_FORM || editMode === EDIT_MODE_POPUP ? this._getVisibleEditRowIndex() : -1;
    },
    isEditCell: function isEditCell(visibleRowIndex, columnIndex) {
      return this._getVisibleEditRowIndex() === visibleRowIndex && this._getVisibleEditColumnIndex() === columnIndex;
    },
    getPopupContent: function getPopupContent() {
      var editMode = _getEditMode(this);

      var popupVisible = this._editPopup && this._editPopup.option('visible');

      if (editMode === EDIT_MODE_POPUP && popupVisible) {
        return this._$popupContent;
      }
    },
    getEditForm: function getEditForm() {
      return this._editForm;
    },
    _needInsertItem: function _needInsertItem(editData, changeType) {
      var that = this;

      var dataSource = that._dataController.dataSource();

      var scrollingMode = that.option('scrolling.mode');
      var pageIndex = dataSource.pageIndex();
      var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : pageIndex;
      var endPageIndex = dataSource.endPageIndex ? dataSource.endPageIndex() : pageIndex;

      if (scrollingMode !== 'standard') {
        switch (changeType) {
          case 'append':
            return editData.key.pageIndex === endPageIndex;

          case 'prepend':
            return editData.key.pageIndex === beginPageIndex;

          case 'refresh':
            editData.key.rowIndex = 0;
            editData.key.dataRowIndex = 0;
            editData.key.pageIndex = 0;
            break;

          default:
            return editData.key.pageIndex >= beginPageIndex && editData.key.pageIndex <= endPageIndex;
        }
      }

      return editData.key.pageIndex === pageIndex;
    },
    _generateNewItem: function _generateNewItem(key) {
      var item = {
        key: key
      };

      if (key && key[INSERT_INDEX]) {
        item[INSERT_INDEX] = key[INSERT_INDEX];
      }

      return item;
    },
    processItems: function processItems(items, change) {
      var _this7 = this;

      var changeType = change.changeType;
      var dataController = this._dataController;
      var dataRowIndex = -1;
      this.update(changeType);
      var changes = this.getChanges();
      changes.forEach(function (editData) {
        var key = editData.key;

        if (key) {
          var rowIndexOffset = dataController.getRowIndexOffset();
          dataRowIndex = key.dataRowIndex - rowIndexOffset + dataController.getRowIndexDelta();

          if (changeType === 'append') {
            dataRowIndex -= dataController.items(true).length;

            if (change.removeCount) {
              dataRowIndex += change.removeCount;
            }
          }

          var item = _this7._generateNewItem(key);

          if (dataRowIndex >= 0 && editData.type === DATA_EDIT_DATA_INSERT_TYPE && _this7._needInsertItem(editData, changeType, items, item)) {
            items.splice(key.dataRowIndex ? dataRowIndex : 0, 0, item);
          }
        }
      });
      return items;
    },
    processDataItem: function processDataItem(item, options, generateDataValues) {
      var that = this;
      var data;
      var columns = options.visibleColumns;
      var key = item.data[INSERT_INDEX] ? item.data.key : item.key;
      var changes = this.getChanges();

      var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);

      item.isEditing = false;

      if (editIndex >= 0) {
        var editMode = _getEditMode(that);

        var editData = changes[editIndex];
        data = editData.data;

        switch (editData.type) {
          case DATA_EDIT_DATA_INSERT_TYPE:
            if (editMode === EDIT_MODE_POPUP) {
              item.visible = false;
            }

            item.isNewRow = true;
            item.key = key;
            item.data = data;
            break;

          case DATA_EDIT_DATA_UPDATE_TYPE:
            item.modified = true;
            item.oldData = item.data;
            item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
            item.modifiedValues = generateDataValues(data, columns, true);
            break;

          case DATA_EDIT_DATA_REMOVE_TYPE:
            if (editMode === EDIT_MODE_BATCH) {
              item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
            }

            item.removed = true;
            break;
        }
      }
    },
    _initNewRow: function _initNewRow(options) {
      var _this8 = this;

      this.executeAction('onInitNewRow', options);

      if (options.promise) {
        var deferred = new _deferred.Deferred();
        (0, _deferred.when)((0, _deferred.fromPromise)(options.promise)).done(deferred.resolve).fail(createFailureHandler(deferred)).fail(function (arg) {
          return _this8._fireDataErrorOccurred(arg);
        });
        return deferred;
      }
    },
    _getInsertKey: function _getInsertKey(parentKey) {
      var that = this;
      var dataController = that._dataController;
      var rows = dataController.items();

      var editMode = _getEditMode(that);

      var insertKey = {
        parentKey: parentKey,
        pageIndex: dataController.pageIndex(),
        rowIndex: that._getInsertRowIndex(parentKey)
      };
      var row = rows[insertKey.rowIndex];

      if (row && (!row.isEditing && row.rowType === 'detail' || row.rowType === 'detailAdaptive')) {
        insertKey.rowIndex++;
      }

      insertKey.dataRowIndex = dataController.getRowIndexOffset() + rows.filter(function (row, index) {
        return index < insertKey.rowIndex && (row.rowType === 'data' || row.rowType === 'group' || row.isNewRow);
      }).length;

      if (editMode !== EDIT_MODE_BATCH) {
        this._setEditRowKey(insertKey, true);
      }

      insertKey[INSERT_INDEX] = that._getInsertIndex();
      return insertKey;
    },
    _getInsertRowIndex: function _getInsertRowIndex(parentKey) {
      var that = this;
      var rowsView = that.getView('rowsView');

      var parentRowIndex = that._dataController.getRowIndexByKey(parentKey);

      if (parentRowIndex >= 0) {
        return parentRowIndex + 1;
      }

      if (rowsView) {
        return rowsView.getTopVisibleItemIndex(true);
      }

      return 0;
    },
    _getInsertIndex: function _getInsertIndex() {
      var maxInsertIndex = 0;
      this.getChanges().forEach(function (editItem) {
        if (editItem.type === DATA_EDIT_DATA_INSERT_TYPE && editItem.key[INSERT_INDEX] > maxInsertIndex) {
          maxInsertIndex = editItem.key[INSERT_INDEX];
        }
      });
      return maxInsertIndex + 1;
    },
    addRow: function addRow(parentKey) {
      var that = this;
      var dataController = that._dataController;
      var store = dataController.store();
      var key = store && store.key();
      var param = {
        data: {}
      };

      var editMode = _getEditMode(that);

      var oldEditRowIndex = that._getVisibleEditRowIndex();

      var deferred = new _deferred.Deferred();

      if (!store) {
        dataController.fireError('E1052', this.component.NAME);
        return deferred.reject();
      }

      if (editMode === EDIT_MODE_CELL && that.hasChanges()) {
        that.saveEditData().done(function () {
          // T804894
          if (!that.hasChanges()) {
            that.addRow(parentKey).done(deferred.resolve).fail(deferred.reject);
          } else {
            deferred.reject('cancel');
          }
        });
        return deferred.promise();
      }

      that.refresh();

      if (!that._allowRowAdding()) {
        return deferred.reject('cancel');
      }

      if (!key) {
        param.data.__KEY__ = String(new _guid.default());
      }

      (0, _deferred.when)(that._initNewRow(param, parentKey)).done(function () {
        if (that._allowRowAdding()) {
          that._addRowCore(param.data, parentKey, oldEditRowIndex);

          deferred.resolve();
        } else {
          deferred.reject('cancel');
        }
      }).fail(deferred.reject);
      return deferred.promise();
    },
    _allowRowAdding: function _allowRowAdding() {
      var that = this;

      var editMode = _getEditMode(that);

      var insertIndex = that._getInsertIndex();

      if (editMode !== EDIT_MODE_BATCH && insertIndex > 1) {
        return false;
      }

      return true;
    },
    _addRowCore: function _addRowCore(data, parentKey, initialOldEditRowIndex) {
      var that = this;

      var oldEditRowIndex = that._getVisibleEditRowIndex();

      var insertKey = that._getInsertKey(parentKey);

      var editMode = _getEditMode(that);

      that._addEditData({
        key: insertKey,
        data: data,
        type: DATA_EDIT_DATA_INSERT_TYPE
      });

      that._dataController.updateItems({
        changeType: 'update',
        rowIndices: [initialOldEditRowIndex, oldEditRowIndex, insertKey.rowIndex]
      });

      if (editMode === EDIT_MODE_POPUP) {
        that._showEditPopup(insertKey.rowIndex);
      } else {
        that._focusFirstEditableCellInRow(insertKey.rowIndex);
      }

      that._afterInsertRow({
        key: insertKey,
        data: data
      });
    },
    _focusFirstEditableCellInRow: function _focusFirstEditableCellInRow(rowIndex) {
      var that = this;
      var $firstCell = that.getFirstEditableCellInRow(rowIndex);
      that._editCellInProgress = true;

      that._delayedInputFocus($firstCell, function () {
        that._editCellInProgress = false;
        var $cell = that.getFirstEditableCellInRow(rowIndex);
        var eventToTrigger = that.option('editing.startEditAction') === 'dblClick' ? _double_click.name : _click.name;
        $cell && _events_engine.default.trigger($cell, eventToTrigger);
      });
    },
    _isEditingStart: function _isEditingStart(options) {
      this.executeAction('onEditingStart', options);
      return options.cancel;
    },
    _beforeEditCell: function _beforeEditCell(rowIndex, columnIndex, item) {
      var that = this;

      if (_getEditMode(that) === EDIT_MODE_CELL && !item.isNewRow && that.hasChanges()) {
        var d = new _deferred.Deferred();
        that.saveEditData().always(function () {
          d.resolve(that.hasChanges());
        });
        return d;
      }
    },
    _beforeUpdateItems: function _beforeUpdateItems() {},
    _getVisibleEditColumnIndex: function _getVisibleEditColumnIndex() {
      var editColumnName = this.option('editing.editColumnName');

      if (!(0, _type.isDefined)(editColumnName)) {
        return -1;
      }

      return this._columnsController.getVisibleColumnIndex(editColumnName);
    },
    _setEditColumnNameByIndex: function _setEditColumnNameByIndex(index, silent) {
      var _visibleColumns$index;

      var visibleColumns = this._columnsController.getVisibleColumns();

      this._setEditColumnName((_visibleColumns$index = visibleColumns[index]) === null || _visibleColumns$index === void 0 ? void 0 : _visibleColumns$index.name, silent);
    },
    _setEditColumnName: function _setEditColumnName(name, silent) {
      if (silent) {
        this._silentOption('editing.editColumnName', name);
      } else {
        this.option('editing.editColumnName', name);
      }
    },
    _resetEditColumnName: function _resetEditColumnName() {
      this._setEditColumnName(null, true);
    },
    _getEditColumn: function _getEditColumn() {
      var editColumnName = this.option('editing.editColumnName');
      return this._getColumnByName(editColumnName);
    },
    _getColumnByName: function _getColumnByName(name) {
      var visibleColumns = this._columnsController.getVisibleColumns();

      var editColumn;
      (0, _type.isDefined)(name) && visibleColumns.some(function (column) {
        if (column.name === name) {
          editColumn = column;
          return true;
        }
      });
      return editColumn;
    },
    _getVisibleEditRowIndex: function _getVisibleEditRowIndex(columnName) {
      var dataController = this._dataController;
      var editRowKey = this.option('editing.editRowKey');
      var rowIndex = dataController.getRowIndexByKey(editRowKey);

      if (rowIndex === -1) {
        return rowIndex;
      }

      return rowIndex + this._getEditRowIndexCorrection(columnName);
    },
    _getEditRowIndexCorrection: function _getEditRowIndexCorrection(columnName) {
      var editColumn = columnName ? this._getColumnByName(columnName) : this._getEditColumn();
      var isColumnHidden = (editColumn === null || editColumn === void 0 ? void 0 : editColumn.visibleWidth) === 'adaptiveHidden';
      return isColumnHidden ? 1 : 0;
    },
    _resetEditRowKey: function _resetEditRowKey() {
      this._setEditRowKey(null, true);
    },
    _resetEditIndices: function _resetEditIndices() {
      this._resetEditColumnName();

      this._resetEditRowKey();
    },
    editRow: function editRow(rowIndex) {
      var that = this;
      var dataController = that._dataController;
      var items = dataController.items();
      var item = items[rowIndex];
      var params = {
        data: item && item.data,
        cancel: false
      };

      var oldRowIndex = this._getVisibleEditRowIndex();

      if (!item) {
        return;
      }

      if (rowIndex === oldRowIndex) {
        return true;
      }

      if (item.key === undefined) {
        this._dataController.fireError('E1043');

        return;
      }

      if (!item.isNewRow) {
        params.key = item.key;
      }

      if (that._isEditingStart(params)) {
        return;
      }

      this.resetChanges();
      that.init();

      that._resetEditColumnName();

      that._pageIndex = dataController.pageIndex();

      this._setEditRowKey(item.key);
    },
    _editRowFromOptionChanged: function _editRowFromOptionChanged(rowIndex, oldRowIndex) {
      var rowIndices = [oldRowIndex, rowIndex];

      var editMode = _getEditMode(this);

      this._beforeUpdateItems(rowIndices, rowIndex, oldRowIndex);

      if (editMode === EDIT_MODE_POPUP) {
        this._showEditPopup(rowIndex);
      } else {
        this._needFocusEditor = true;

        this._dataController.updateItems({
          changeType: 'update',
          rowIndices: rowIndices
        });
      }
    },
    _focusEditorIfNeed: function _focusEditorIfNeed() {
      var _this9 = this;

      var editMode = _getEditMode(this);

      if (this._needFocusEditor) {
        if (MODES_WITH_DELAYED_FOCUS.indexOf(editMode) !== -1) {
          var $editingCell = this.getFocusedCellInRow(this._getVisibleEditRowIndex());

          this._delayedInputFocus($editingCell, function () {
            $editingCell && _this9.component.focus($editingCell);
          });
        } else if (CELL_BASED_MODES.indexOf(editMode) !== -1) {
          var _this$_rowsView;

          var editColumnIndex = this._getVisibleEditColumnIndex();

          var $cell = (_this$_rowsView = this._rowsView) === null || _this$_rowsView === void 0 ? void 0 : _this$_rowsView._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex); // T319885

          if ($cell && !$cell.find(':focus').length) {
            this._focusEditingCell(function () {
              _this9._editCellInProgress = false;
            }, $cell, true);
          } else {
            this._editCellInProgress = false;
          }
        }

        this._needFocusEditor = false;
      }
    },
    _showEditPopup: function _showEditPopup(rowIndex, repaintForm) {
      var that = this;
      var isMobileDevice = _devices.default.current().deviceType !== 'desktop';
      var popupOptions = (0, _extend.extend)({
        showTitle: false,
        fullScreen: isMobileDevice,
        toolbarItems: [{
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: that._getSaveButtonConfig()
        }, {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: that._getCancelButtonConfig()
        }],
        contentTemplate: that._getPopupEditFormTemplate(rowIndex)
      }, that.option(EDITING_POPUP_OPTION_NAME));

      if (!that._editPopup) {
        var $popupContainer = (0, _renderer.default)('<div>').appendTo(that.component.$element()).addClass(that.addWidgetPrefix(EDIT_POPUP_CLASS));
        that._editPopup = that._createComponent($popupContainer, _popup.default, {});

        that._editPopup.on('hiding', that._getEditPopupHiddenHandler());

        that._editPopup.on('shown', function (e) {
          _events_engine.default.trigger(e.component.$content().find(FOCUSABLE_ELEMENT_SELECTOR).not('.' + SCROLLABLE_CONTAINER_CLASS).first(), 'focus');

          if (repaintForm) {
            that._editForm && that._editForm.repaint();
          }
        });
      }

      that._editPopup.option(popupOptions);

      that._editPopup.show();
    },
    _repaintEditPopup: function _repaintEditPopup() {
      var rowIndex = this._getVisibleEditRowIndex();

      if (this._editPopup && this._editPopup.option('visible') && rowIndex >= 0) {
        var defaultAnimation = this._editPopup.option('animation');

        this._editPopup.option('animation', null);

        this._showEditPopup(rowIndex, true);

        this._editPopup.option('animation', defaultAnimation);
      }
    },
    _getEditPopupHiddenHandler: function _getEditPopupHiddenHandler() {
      var that = this;
      return function (e) {
        if (that.isEditing()) {
          that.cancelEditData();
        }
      };
    },
    _getPopupEditFormTemplate: function _getPopupEditFormTemplate(rowIndex) {
      var that = this;
      var row = that.component.getVisibleRows()[rowIndex];
      var templateOptions = {
        row: row,
        rowType: row.rowType,
        key: row.key
      };
      return function (container) {
        var formTemplate = that.getEditFormTemplate();

        var scrollable = that._createComponent((0, _renderer.default)('<div>').appendTo(container), _ui.default);

        that._$popupContent = scrollable.$content();
        formTemplate(that._$popupContent, templateOptions, true);
      };
    },
    _getSaveButtonConfig: function _getSaveButtonConfig() {
      return {
        text: this.option('editing.texts.saveRowChanges'),
        onClick: this.saveEditData.bind(this)
      };
    },
    _getCancelButtonConfig: function _getCancelButtonConfig() {
      return {
        text: this.option('editing.texts.cancelRowChanges'),
        onClick: this.cancelEditData.bind(this)
      };
    },
    _removeInternalData: function _removeInternalData(key) {
      var internalData = this._getInternalData(key);

      var index = this._internalState.indexOf(internalData);

      if (index > -1) {
        this._internalState.splice(index, 1);
      }
    },
    _removeEditDataItem: function _removeEditDataItem(index) {
      if (index >= 0) {
        var changes = _toConsumableArray(this.getChanges());

        this._removeInternalData(changes[index].key);

        changes.splice(index, 1);

        this._silentOption('editing.changes', changes);
      }
    },
    executeOperation: function executeOperation(deferred, func) {
      var _this10 = this;

      this._lastOperation && this._lastOperation.reject();
      this._lastOperation = deferred;
      this.waitForDeferredOperations().done(function () {
        if (deferred.state() === 'rejected') {
          return;
        }

        func();
        _this10._lastOperation = null;
      }).fail(function () {
        deferred.reject();
        _this10._lastOperation = null;
      });
    },
    waitForDeferredOperations: function waitForDeferredOperations() {
      return _deferred.when.apply(void 0, _toConsumableArray(this._deferreds));
    },
    editCell: function editCell(rowIndex, columnIndex) {
      return this._editCell({
        rowIndex: rowIndex,
        columnIndex: columnIndex
      });
    },
    _editCell: function _editCell(options) {
      var _this11 = this;

      var d = new _deferred.Deferred();
      var coreResult;
      this.executeOperation(d, function () {
        coreResult = _this11._editCellCore(options);
        (0, _deferred.when)(coreResult).done(d.resolve).fail(d.reject);
      });
      return coreResult !== undefined ? coreResult : d.promise();
    },
    _getNormalizedEditCellOptions: function _getNormalizedEditCellOptions(_ref) {
      var oldColumnIndex = _ref.oldColumnIndex,
          oldRowIndex = _ref.oldRowIndex,
          columnIndex = _ref.columnIndex,
          rowIndex = _ref.rowIndex;
      var columnsController = this._columnsController;
      var visibleColumns = columnsController.getVisibleColumns();

      var items = this._dataController.items();

      var item = items[rowIndex];
      var oldColumn;

      if ((0, _type.isDefined)(oldColumnIndex)) {
        oldColumn = visibleColumns[oldColumnIndex];
      } else {
        oldColumn = this._getEditColumn();
      }

      if (!(0, _type.isDefined)(oldRowIndex)) {
        oldRowIndex = this._getVisibleEditRowIndex();
      }

      if ((0, _type.isString)(columnIndex)) {
        columnIndex = columnsController.columnOption(columnIndex, 'index');
        columnIndex = columnsController.getVisibleIndex(columnIndex);
      }

      var column = visibleColumns[columnIndex];
      return {
        oldColumn: oldColumn,
        columnIndex: columnIndex,
        oldRowIndex: oldRowIndex,
        rowIndex: rowIndex,
        column: column,
        item: item
      };
    },
    _editCellCore: function _editCellCore(options) {
      var _this12 = this;

      var dataController = this._dataController;
      var isEditByOptionChanged = (0, _type.isDefined)(options.oldColumnIndex) || (0, _type.isDefined)(options.oldRowIndex);

      var _this$_getNormalizedE = this._getNormalizedEditCellOptions(options),
          columnIndex = _this$_getNormalizedE.columnIndex,
          rowIndex = _this$_getNormalizedE.rowIndex,
          column = _this$_getNormalizedE.column,
          item = _this$_getNormalizedE.item;

      var params = {
        data: item === null || item === void 0 ? void 0 : item.data,
        cancel: false,
        column: column
      };

      if (item.key === undefined) {
        this._dataController.fireError('E1043');

        return;
      }

      if (column && item && (item.rowType === 'data' || item.rowType === 'detailAdaptive') && !item.removed && !_isRowEditMode(this)) {
        if (!isEditByOptionChanged && this.isEditCell(rowIndex, columnIndex)) {
          return true;
        }

        var editRowIndex = rowIndex + dataController.getRowIndexOffset();
        return (0, _deferred.when)(this._beforeEditCell(rowIndex, columnIndex, item)).done(function (cancel) {
          if (cancel) {
            return;
          }

          if (!_this12._prepareEditCell(params, item, columnIndex, editRowIndex)) {
            _this12._processCanceledEditingCell();
          }
        });
      }

      return false;
    },
    _processCanceledEditingCell: function _processCanceledEditingCell() {},
    _prepareEditCell: function _prepareEditCell(params, item, editColumnIndex, editRowIndex) {
      var that = this;

      if (!item.isNewRow) {
        params.key = item.key;
      }

      if (that._isEditingStart(params)) {
        return false;
      }

      that._pageIndex = that._dataController.pageIndex();

      that._setEditRowKey(item.key);

      that._setEditColumnNameByIndex(editColumnIndex);

      return true;
    },
    _repaintEditCell: function _repaintEditCell(column, oldColumn, oldEditRowIndex) {
      var that = this;
      this._needFocusEditor = true;

      if (!column || !column.showEditorAlways || oldColumn && !oldColumn.showEditorAlways) {
        that._editCellInProgress = true; // T316439

        that.getController('editorFactory').loseFocus();

        that._dataController.updateItems({
          changeType: 'update',
          rowIndices: [oldEditRowIndex, that._getVisibleEditRowIndex()]
        });
      } else {
        // TODO check this necessity T816039
        that._dataController.updateItems({
          changeType: 'update',
          rowIndices: []
        });
      }
    },
    _delayedInputFocus: function _delayedInputFocus($cell, beforeFocusCallback, callBeforeFocusCallbackAlways) {
      var that = this;

      function inputFocus() {
        if (beforeFocusCallback) {
          beforeFocusCallback();
        }

        if ($cell) {
          var $focusableElement = $cell.find(FOCUSABLE_ELEMENT_SELECTOR).first();

          _uiGrid_core2.default.focusAndSelectElement(that, $focusableElement);
        }

        that._beforeFocusCallback = null;
      }

      if (_devices.default.real().ios || _devices.default.real().android) {
        inputFocus();
      } else {
        if (that._beforeFocusCallback) that._beforeFocusCallback();
        clearTimeout(that._inputFocusTimeoutID);

        if (callBeforeFocusCallbackAlways) {
          that._beforeFocusCallback = beforeFocusCallback;
        }

        that._inputFocusTimeoutID = setTimeout(inputFocus);
      }
    },
    _focusEditingCell: function _focusEditingCell(beforeFocusCallback, $editCell, callBeforeFocusCallbackAlways) {
      var that = this;
      var rowsView = that.getView('rowsView');

      var editColumnIndex = this._getVisibleEditColumnIndex();

      $editCell = $editCell || rowsView && rowsView._getCellElement(that._getVisibleEditRowIndex(), editColumnIndex);

      that._delayedInputFocus($editCell, beforeFocusCallback, callBeforeFocusCallbackAlways);
    },
    deleteRow: function deleteRow(rowIndex) {
      var _this13 = this;

      if (this.option('editing.mode') === 'cell' && this.isEditing()) {
        var isNewRow = this._dataController.items()[rowIndex].isNewRow; // T850905


        this.closeEditCell(null, isNewRow).always(function () {
          _this13._checkAndDeleteRow(rowIndex);
        });
      } else {
        this._checkAndDeleteRow(rowIndex);
      }
    },
    _checkAndDeleteRow: function _checkAndDeleteRow(rowIndex) {
      var that = this;
      var editingOptions = that.option('editing');
      var editingTexts = editingOptions && editingOptions.texts;
      var isBatchMode = editingOptions && editingOptions.mode === EDIT_MODE_BATCH;
      var confirmDelete = editingOptions && editingOptions.confirmDelete;
      var confirmDeleteMessage = editingTexts && editingTexts.confirmDeleteMessage;

      var item = that._dataController.items()[rowIndex];

      var allowDeleting = isBatchMode || !that.isEditing() || item.isNewRow; // T741746

      if (item && allowDeleting) {
        if (isBatchMode || !confirmDelete || !confirmDeleteMessage) {
          that._deleteRowCore(rowIndex);
        } else {
          var confirmDeleteTitle = editingTexts && editingTexts.confirmDeleteTitle;
          var showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
          (0, _dialog.confirm)(confirmDeleteMessage, confirmDeleteTitle, showDialogTitle).done(function (confirmResult) {
            if (confirmResult) {
              that._deleteRowCore(rowIndex);
            }
          });
        }
      }
    },
    _deleteRowCore: function _deleteRowCore(rowIndex) {
      var dataController = this._dataController;
      var item = dataController.items()[rowIndex];
      var key = item && item.key;

      var oldEditRowIndex = this._getVisibleEditRowIndex();

      var isBatchMode = this.option('editing.mode') === EDIT_MODE_BATCH;
      this.refresh();
      var changes = this.getChanges();

      var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);

      if (editIndex >= 0) {
        if (changes[editIndex].type === DATA_EDIT_DATA_INSERT_TYPE) {
          this._removeEditDataItem(editIndex);
        } else {
          this._addEditData({
            key: key,
            type: DATA_EDIT_DATA_REMOVE_TYPE
          });
        }
      } else {
        this._addEditData({
          key: key,
          oldData: item.data,
          type: DATA_EDIT_DATA_REMOVE_TYPE
        });
      }

      if (isBatchMode) {
        dataController.updateItems({
          changeType: 'update',
          rowIndices: [oldEditRowIndex, rowIndex]
        });
      } else {
        this.saveEditData();
      }
    },
    undeleteRow: function undeleteRow(rowIndex) {
      var that = this;
      var dataController = that._dataController;
      var item = dataController.items()[rowIndex];

      var oldEditRowIndex = that._getVisibleEditRowIndex();

      var key = item && item.key;
      var changes = this.getChanges();

      if (item) {
        var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);

        if (editIndex >= 0) {
          var editData = changes[editIndex];

          if ((0, _type.isEmptyObject)(editData.data)) {
            that._removeEditDataItem(editIndex);
          } else {
            that._addEditData({
              key: key,
              type: DATA_EDIT_DATA_UPDATE_TYPE
            });
          }

          dataController.updateItems({
            changeType: 'update',
            rowIndices: [oldEditRowIndex, rowIndex]
          });
        }
      }
    },
    _fireOnSaving: function _fireOnSaving() {
      var _this14 = this;

      var onSavingParams = {
        cancel: false,
        promise: null,
        changes: _toConsumableArray(this.getChanges())
      };
      this.executeAction('onSaving', onSavingParams);
      var d = new _deferred.Deferred();
      (0, _deferred.when)((0, _deferred.fromPromise)(onSavingParams.promise)).done(function () {
        d.resolve(onSavingParams);
      }).fail(function (arg) {
        createFailureHandler(d);

        _this14._fireDataErrorOccurred(arg);

        d.resolve({
          cancel: true
        });
      });
      return d;
    },
    _executeEditingAction: function _executeEditingAction(actionName, params, func) {
      if (this.component._disposed) {
        return null;
      }

      var deferred = new _deferred.Deferred();
      this.executeAction(actionName, params);
      (0, _deferred.when)((0, _deferred.fromPromise)(params.cancel)).done(function (cancel) {
        if (cancel) {
          setTimeout(function () {
            deferred.resolve('cancel');
          });
        } else {
          func(params).done(deferred.resolve).fail(createFailureHandler(deferred));
        }
      }).fail(createFailureHandler(deferred));
      return deferred;
    },
    _processEditData: function _processEditData(deferreds, results, dataChanges, changes) {
      var _this15 = this;

      var store = this._dataController.store();

      (0, _iterator.each)(changes, function (index, editData) {
        var data = editData.data;

        var oldData = _this15._getOldData(editData.key);

        var type = editData.type;
        var deferred;
        var params;

        if (_this15._beforeSaveEditData(editData, index)) {
          return;
        }

        switch (type) {
          case DATA_EDIT_DATA_REMOVE_TYPE:
            params = {
              data: oldData,
              key: editData.key,
              cancel: false
            };
            deferred = _this15._executeEditingAction('onRowRemoving', params, function () {
              return store.remove(editData.key).done(function (key) {
                dataChanges.push({
                  type: 'remove',
                  key: key
                });
              });
            });
            break;

          case DATA_EDIT_DATA_INSERT_TYPE:
            params = {
              data: data,
              cancel: false
            };
            deferred = _this15._executeEditingAction('onRowInserting', params, function () {
              return store.insert(params.data).done(function (data, key) {
                if ((0, _type.isDefined)(key)) {
                  editData.key = key;
                }

                if (data && (0, _type.isObject)(data) && data !== params.data) {
                  editData.data = data;
                }

                dataChanges.push({
                  type: 'insert',
                  data: data,
                  index: 0
                });
              });
            });
            break;

          case DATA_EDIT_DATA_UPDATE_TYPE:
            params = {
              newData: data,
              oldData: oldData,
              key: editData.key,
              cancel: false
            };
            deferred = _this15._executeEditingAction('onRowUpdating', params, function () {
              return store.update(editData.key, params.newData).done(function (data, key) {
                if (data && (0, _type.isObject)(data) && data !== params.newData) {
                  editData.data = data;
                }

                dataChanges.push({
                  type: 'update',
                  key: key,
                  data: data
                });
              });
            });
            break;
        }

        if (deferred) {
          var doneDeferred = new _deferred.Deferred();
          deferred.always(function (data) {
            results.push({
              key: editData.key,
              result: data
            });
          }).always(doneDeferred.resolve);
          deferreds.push(doneDeferred.promise());
        }
      });
    },
    _processSaveEditDataResult: function _processSaveEditDataResult(results) {
      var that = this;
      var hasSavedData = false;

      var editMode = _getEditMode(that);

      var changes = _toConsumableArray(this.getChanges());

      var changesLength = changes.length;

      for (var i = 0; i < results.length; i++) {
        var arg = results[i].result;
        var cancel = arg === 'cancel';

        var editIndex = _uiGrid_core2.default.getIndexByKey(results[i].key, changes);

        var editData = changes[editIndex];
        var isError = arg && arg instanceof Error;

        if (isError) {
          if (editData) {
            this._addInternalData({
              key: editData.key,
              error: arg
            });
          }

          that._fireDataErrorOccurred(arg);

          if (editMode !== EDIT_MODE_BATCH) {
            if (editData && editData.type === DATA_EDIT_DATA_REMOVE_TYPE) {
              if (editIndex >= 0) {
                changes.splice(editIndex, 1);
              }
            }

            break;
          }
        } else if (!cancel || !editData || editMode !== EDIT_MODE_BATCH && editData.type === DATA_EDIT_DATA_REMOVE_TYPE) {
          if (editIndex >= 0) {
            changes.splice(editIndex, 1);
          }

          hasSavedData = !cancel;
        }
      }

      if (changes.length < changesLength) {
        this._silentOption('editing.changes', changes);
      }

      return hasSavedData;
    },
    _fireSaveEditDataEvents: function _fireSaveEditDataEvents(editData) {
      var that = this;
      (0, _iterator.each)(editData, function (_, itemData) {
        var data = itemData.data;
        var key = itemData.key;
        var type = itemData.type;

        var internalData = that._addInternalData({
          key: key
        });

        var params = {
          key: key,
          data: data
        };

        if (internalData.error) {
          params.error = internalData.error;
        }

        switch (type) {
          case DATA_EDIT_DATA_REMOVE_TYPE:
            that.executeAction('onRowRemoved', (0, _extend.extend)({}, params, {
              data: internalData.oldData
            }));
            break;

          case DATA_EDIT_DATA_INSERT_TYPE:
            that.executeAction('onRowInserted', params);
            break;

          case DATA_EDIT_DATA_UPDATE_TYPE:
            that.executeAction('onRowUpdated', params);
            break;
        }
      });
      this.executeAction('onSaved', {
        changes: editData
      });
    },
    saveEditData: function saveEditData() {
      var _this16 = this;

      var deferred = new _deferred.Deferred();
      this.waitForDeferredOperations().done(function () {
        if (_this16.isSaving()) {
          _this16._resolveAfterSave(deferred);

          return;
        }

        (0, _deferred.when)(_this16._beforeSaveEditData()).done(function (cancel) {
          if (cancel) {
            _this16._resolveAfterSave(deferred, {
              cancel: cancel
            });

            return;
          }

          _this16._saving = true;

          _this16._saveEditDataInner().done(deferred.resolve).fail(deferred.reject).always(function () {
            _this16._saving = false;
          });
        }).fail(deferred.reject);
      }).fail(deferred.reject);
      return deferred.promise();
    },
    _resolveAfterSave: function _resolveAfterSave(deferred) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          cancel = _ref2.cancel,
          error = _ref2.error;

      (0, _deferred.when)(this._afterSaveEditData(cancel)).done(function () {
        deferred.resolve(error);
      }).fail(deferred.reject);
    },
    _saveEditDataInner: function _saveEditDataInner() {
      var _this17 = this;

      var results = [];
      var deferreds = [];
      var dataChanges = [];
      var dataController = this._dataController;
      var dataSource = dataController.dataSource();
      var result = new _deferred.Deferred();
      (0, _deferred.when)(this._fireOnSaving()).done(function (_ref3) {
        var cancel = _ref3.cancel,
            changes = _ref3.changes;

        if (cancel) {
          return result.resolve().promise();
        }

        _this17._processEditData(deferreds, results, dataChanges, changes);

        if (deferreds.length) {
          dataSource === null || dataSource === void 0 ? void 0 : dataSource.beginLoading();

          _deferred.when.apply(void 0, deferreds).done(function () {
            if (_this17._processSaveEditDataResult(results)) {
              _this17._endSaving(dataChanges, changes, result);
            } else {
              dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
              result.resolve();
            }
          }).fail(function (error) {
            dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();
            result.resolve(error);
          });

          return result.always(function () {
            _this17._focusEditingCell();
          }).promise();
        }

        _this17._cancelSaving(result);
      }).fail(result.reject);
      return result.promise();
    },
    _resetModifiedClassCells: function _resetModifiedClassCells(editData) {
      var _this18 = this;

      var editMode = _getEditMode(this);

      if (editMode === EDIT_MODE_BATCH) {
        var columnsCount = this._columnsController.getVisibleColumns().length;

        editData.forEach(function (_ref4) {
          var key = _ref4.key;

          var rowIndex = _this18._dataController.getRowIndexByKey(key);

          if (rowIndex !== -1) {
            for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
              _this18._rowsView._getCellElement(rowIndex, columnIndex).removeClass(CELL_MODIFIED);
            }
          }
        });
      }
    },
    _endSaving: function _endSaving(dataChanges, changes, deferred) {
      var editMode = _getEditMode(this);

      var dataSource = this._dataController.dataSource();

      if (editMode !== EDIT_MODE_CELL) {
        this._resetModifiedClassCells(changes);

        this._resetEditIndices();
      }

      if (editMode === EDIT_MODE_POPUP && this._editPopup) {
        this._editPopup.hide();
      }

      dataSource === null || dataSource === void 0 ? void 0 : dataSource.endLoading();

      this._refreshDataAfterSave(dataChanges, changes, deferred);
    },
    _cancelSaving: function _cancelSaving(result) {
      var editMode = _getEditMode(this);

      var dataController = this._dataController;

      if (_isRowEditMode(this)) {
        if (!this.hasChanges()) {
          this._cancelEditDataCore();
        }
      } else if (this.isCellOrBatchEditMode()) {
        if (editMode !== EDIT_MODE_CELL) {
          this._resetEditIndices();
        }

        dataController.updateItems();
      } else {
        this._focusEditingCell();
      }

      this.executeAction('onSaved', {
        changes: []
      });

      this._resolveAfterSave(result);
    },
    _refreshDataAfterSave: function _refreshDataAfterSave(dataChanges, changes, deferred) {
      var _this19 = this;

      var dataController = this._dataController;
      var refreshMode = this.option('editing.refreshMode');
      var isFullRefresh = refreshMode !== 'reshape' && refreshMode !== 'repaint';

      if (!isFullRefresh) {
        dataController.push(dataChanges);
      }

      (0, _deferred.when)(dataController.refresh({
        selection: isFullRefresh,
        reload: isFullRefresh,
        load: refreshMode === 'reshape',
        changesOnly: this.option('repaintChangesOnly')
      })).always(function () {
        _this19._fireSaveEditDataEvents(changes);

        _this19._internalState = [];
      }).done(function () {
        _this19._resolveAfterSave(deferred);
      }).fail(function (error) {
        _this19._resolveAfterSave(deferred, {
          error: error
        });
      });
    },
    isSaving: function isSaving() {
      return this._saving;
    },
    _updateEditColumn: function _updateEditColumn() {
      var that = this;

      var isEditColumnVisible = that._isEditColumnVisible();

      var useIcons = that.option('editing.useIcons');
      var cssClass = COMMAND_EDIT_CLASS + (useIcons ? ' ' + COMMAND_EDIT_WITH_ICONS_CLASS : '');

      that._columnsController.addCommandColumn({
        type: 'buttons',
        command: 'edit',
        visible: isEditColumnVisible,
        cssClass: cssClass,
        width: 'auto',
        alignment: 'center',
        cellTemplate: that._getEditCommandCellTemplate(),
        fixedPosition: 'right'
      });

      that._columnsController.columnOption('command:edit', {
        visible: isEditColumnVisible,
        cssClass: cssClass
      });
    },
    _isEditColumnVisible: function _isEditColumnVisible() {
      var that = this;
      var editingOptions = that.option('editing');

      if (editingOptions) {
        var editMode = _getEditMode(that);

        var isVisibleWithCurrentEditMode = false;

        switch (editMode) {
          case EDIT_MODE_ROW:
            isVisibleWithCurrentEditMode = editingOptions.allowUpdating || editingOptions.allowAdding;
            break;

          case EDIT_MODE_FORM:
          case EDIT_MODE_POPUP:
            isVisibleWithCurrentEditMode = editingOptions.allowUpdating;
            break;
        }

        return editingOptions.allowDeleting || isVisibleWithCurrentEditMode;
      }
    },
    _updateEditButtons: function _updateEditButtons() {
      var that = this;
      var headerPanel = that.getView('headerPanel');
      var hasChanges = that.hasChanges();

      if (headerPanel) {
        headerPanel.setToolbarItemDisabled('saveButton', !hasChanges);
        headerPanel.setToolbarItemDisabled('revertButton', !hasChanges);
      }
    },
    _applyModified: function _applyModified($element) {
      $element && $element.addClass(CELL_MODIFIED);
    },
    _beforeCloseEditCellInBatchMode: function _beforeCloseEditCellInBatchMode() {},
    cancelEditData: function cancelEditData() {
      var changes = this.getChanges();
      var params = {
        cancel: false,
        changes: changes
      };
      this.executeAction('onEditCanceling', params);

      if (!params.cancel) {
        this._cancelEditDataCore();

        this.executeAction('onEditCanceled', {
          changes: changes
        });
      }
    },
    _cancelEditDataCore: function _cancelEditDataCore() {
      var editMode = _getEditMode(this);

      var rowIndex = this._getVisibleEditRowIndex();

      var dataController = this._dataController;

      this._beforeCancelEditData();

      this.init();
      this.resetChanges();

      this._resetEditColumnName();

      this._resetEditRowKey();

      if (ROW_BASED_MODES.indexOf(editMode) !== -1 && rowIndex >= 0) {
        dataController.updateItems({
          changeType: 'update',
          rowIndices: [rowIndex, rowIndex + 1]
        });
      } else {
        dataController.updateItems({
          repaintChangesOnly: this.option('repaintChangesOnly')
        });
      }

      if (editMode === EDIT_MODE_POPUP) {
        this._hideEditPopup();
      }
    },
    _hideEditPopup: function _hideEditPopup() {
      this._editPopup && this._editPopup.option('visible', false);
    },
    hasEditData: function hasEditData() {
      return this.hasChanges();
    },
    closeEditCell: function closeEditCell(isError, withoutSaveEditData) {
      var _this20 = this;

      var that = this;
      var result = (0, _deferred.when)();

      var oldEditRowIndex = that._getVisibleEditRowIndex();

      if (!_isRowEditMode(that)) {
        result = (0, _deferred.Deferred)();
        this.executeOperation(result, function () {
          _this20._closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData);

          result.resolve();
        });
      }

      return result.promise();
    },
    _closeEditCellCore: function _closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData) {
      var that = this;

      var editMode = _getEditMode(that);

      var dataController = that._dataController;

      if (editMode === EDIT_MODE_CELL && that.hasChanges()) {
        if (!withoutSaveEditData) {
          that.saveEditData().done(function (error) {
            if (!that.hasChanges()) {
              that.closeEditCell(!!error);
            }
          });
        }
      } else if (oldEditRowIndex >= 0) {
        var rowIndices = [oldEditRowIndex];

        this._resetEditRowKey();

        that._resetEditColumnName();

        that._beforeCloseEditCellInBatchMode(rowIndices);

        if (!isError) {
          dataController.updateItems({
            changeType: 'update',
            rowIndices: rowIndices
          });
        }
      }
    },
    update: function update(changeType) {
      var that = this;
      var dataController = that._dataController;

      if (dataController && that._pageIndex !== dataController.pageIndex()) {
        if (changeType === 'refresh') {
          that.refresh(true);
        }

        that._pageIndex = dataController.pageIndex();
      }

      that._updateEditButtons();
    },
    _getRowIndicesForCascadeUpdating: function _getRowIndicesForCascadeUpdating(row, skipCurrentRow) {
      return skipCurrentRow ? [] : [row.rowIndex];
    },
    addDeferred: function addDeferred(deferred) {
      var _this21 = this;

      if (this._deferreds.indexOf(deferred) < 0) {
        this._deferreds.push(deferred);

        deferred.always(function () {
          var index = _this21._deferreds.indexOf(deferred);

          if (index >= 0) {
            _this21._deferreds.splice(index, 1);
          }
        });
      }
    },
    _prepareEditDataParams: function _prepareEditDataParams(options, value, text) {
      var _options$row;

      var that = this;
      var newData = {};
      var oldData = (_options$row = options.row) === null || _options$row === void 0 ? void 0 : _options$row.data;
      var rowKey = options.key;
      var $cellElement = (0, _renderer.default)(options.cellElement);

      var editMode = _getEditMode(that);

      var deferred = new _deferred.Deferred();

      if (rowKey !== undefined) {
        if (editMode === EDIT_MODE_BATCH) {
          that._applyModified($cellElement, options);
        }

        options.value = value;
        var setCellValueResult = (0, _deferred.fromPromise)(options.column.setCellValue(newData, value, (0, _extend.extend)(true, {}, oldData), text));
        setCellValueResult.done(function () {
          deferred.resolve({
            data: newData,
            key: rowKey,
            oldData: oldData,
            type: DATA_EDIT_DATA_UPDATE_TYPE
          });
        }).fail(createFailureHandler(deferred)).fail(function (arg) {
          return that._fireDataErrorOccurred(arg);
        });

        if ((0, _type.isDefined)(text) && options.column.displayValueMap) {
          options.column.displayValueMap[value] = text;
        }

        if (options.values) {
          options.values[options.columnIndex] = value;
        }

        that.addDeferred(deferred);
      }

      return deferred;
    },
    updateFieldValue: function updateFieldValue(options, value, text, forceUpdateRow) {
      var _this22 = this;

      var rowKey = options.key;
      var deferred = new _deferred.Deferred();

      if (rowKey === undefined) {
        this._dataController.fireError('E1043');
      }

      if (options.column.setCellValue) {
        this._prepareEditDataParams(options, value, text).done(function (params) {
          (0, _deferred.when)(_this22._applyEditDataParams(options, params, forceUpdateRow)).always(function () {
            deferred.resolve();
          });
        });
      } else {
        deferred.resolve();
      }

      return deferred.promise();
    },
    _focusPreviousEditingCellIfNeed: function _focusPreviousEditingCellIfNeed(options) {
      var that = this;

      if (that.hasEditData() && !that.isEditCell(options.rowIndex, options.columnIndex)) {
        that._focusEditingCell();

        that._updateEditRow(options.row, true);

        return true;
      }
    },
    _needUpdateRow: function _needUpdateRow(column) {
      var visibleColumns = this._columnsController.getVisibleColumns();

      if (!column) {
        column = this._getEditColumn();
      }

      var isCustomSetCellValue = column && column.setCellValue !== column.defaultSetCellValue;
      var isCustomCalculateCellValue = visibleColumns.some(function (visibleColumn) {
        return visibleColumn.calculateCellValue !== visibleColumn.defaultCalculateCellValue;
      });
      return isCustomSetCellValue || isCustomCalculateCellValue;
    },
    _applyEditDataParams: function _applyEditDataParams(options, params, forceUpdateRow) {
      var that = this;

      var editMode = _getEditMode(that);

      var isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
      var showEditorAlways = options.column.showEditorAlways;
      var isUpdateInCellMode = editMode === EDIT_MODE_CELL && options.row && !options.row.isNewRow;
      var focusPreviousEditingCell = showEditorAlways && !forceUpdateRow && isUpdateInCellMode && that.hasEditData() && !that.isEditCell(options.rowIndex, options.columnIndex);

      if (focusPreviousEditingCell) {
        that._focusEditingCell();

        that._updateEditRow(options.row, true, isCustomSetCellValue);

        return;
      }

      that._addEditData(params, options.row);

      that._updateEditButtons();

      if (showEditorAlways && !forceUpdateRow) {
        if (isUpdateInCellMode) {
          that._setEditRowKey(options.row.key, true);

          that._setEditColumnNameByIndex(options.columnIndex, true);

          return that.saveEditData();
        } else if (editMode === EDIT_MODE_BATCH) {
          forceUpdateRow = that._needUpdateRow(options.column);
        }
      }

      var row = options.row;

      if (row) {
        if (forceUpdateRow || isCustomSetCellValue) {
          that._updateEditRow(row, forceUpdateRow, isCustomSetCellValue);
        } else if (row.update) {
          row.update();
        }
      }
    },
    _updateEditRowCore: function _updateEditRowCore(row, skipCurrentRow, isCustomSetCellValue) {
      var that = this;
      var editForm = that._editForm;

      var editMode = _getEditMode(that);

      if (editMode === EDIT_MODE_POPUP) {
        if (that.option('repaintChangesOnly')) {
          row.update && row.update(row);
        } else if (editForm) {
          that._updateEditFormDeferred = new _deferred.Deferred().done(function () {
            return editForm.repaint();
          });

          if (!that._updateLockCount) {
            that._updateEditFormDeferred.resolve();
          }
        }
      } else {
        that._dataController.updateItems({
          changeType: 'update',
          rowIndices: that._getRowIndicesForCascadeUpdating(row, skipCurrentRow)
        });
      }
    },
    _endUpdateCore: function _endUpdateCore() {
      this._updateEditFormDeferred && this._updateEditFormDeferred.resolve();
    },
    _updateEditRow: function _updateEditRow(row, forceUpdateRow, isCustomSetCellValue) {
      var that = this;

      if (forceUpdateRow || !_isRowEditMode(that)) {
        that._updateEditRowCore(row, !forceUpdateRow, isCustomSetCellValue);

        if (!forceUpdateRow) {
          that._focusEditingCell();
        }
      } else {
        var deferred = new _deferred.Deferred();
        that.addDeferred(deferred);
        setTimeout(function () {
          var $focusedElement = (0, _renderer.default)(_dom_adapter.default.getActiveElement());

          var columnIndex = that._rowsView.getCellIndex($focusedElement, row.rowIndex);

          var focusedElement = $focusedElement.get(0);

          var selectionRange = _uiGrid_core2.default.getSelectionRange(focusedElement);

          that._updateEditRowCore(row, false, isCustomSetCellValue);

          if (columnIndex >= 0) {
            var $focusedItem = that._rowsView._getCellElement(row.rowIndex, columnIndex);

            that._delayedInputFocus($focusedItem, function () {
              setTimeout(function () {
                focusedElement = _dom_adapter.default.getActiveElement();

                if (selectionRange.selectionStart >= 0) {
                  _uiGrid_core2.default.setSelectionRange(focusedElement, selectionRange);
                }
              });
            });
          }

          deferred.resolve();
        });
      }
    },
    _addEditData: function _addEditData(options, row) {
      var changes = _toConsumableArray(this.getChanges());

      var editDataIndex = _uiGrid_core2.default.getIndexByKey(options.key, changes);

      if (editDataIndex < 0) {
        editDataIndex = changes.length;

        this._addInternalData({
          key: options.key,
          oldData: options.oldData
        });

        delete options.oldData;
        changes.push(options);
      }

      var change = _objectSpread({}, changes[editDataIndex]);

      if (change) {
        if (options.data) {
          change.data = (0, _array_utils.createObjectWithChanges)(change.data, options.data);
        }

        if ((!change.type || !options.data) && options.type) {
          change.type = options.type;
        }

        if (row) {
          row.oldData = this._getOldData(row.key);
          row.data = (0, _array_utils.createObjectWithChanges)(row.data, options.data);
        }
      }

      changes[editDataIndex] = change;

      this._silentOption('editing.changes', changes);

      return editDataIndex;
    },
    _getFormEditItemTemplate: function _getFormEditItemTemplate(cellOptions, column) {
      return column.editCellTemplate || getDefaultEditorTemplate(this);
    },
    renderFormEditTemplate: function renderFormEditTemplate(detailCellOptions, item, form, container, isReadOnly) {
      var that = this;
      var $container = (0, _renderer.default)(container);
      var column = item.column;
      var editorType = getEditorType(item);
      var rowData = detailCellOptions === null || detailCellOptions === void 0 ? void 0 : detailCellOptions.row.data;
      var cellOptions = (0, _extend.extend)({}, detailCellOptions, {
        data: rowData,
        cellElement: null,
        isOnForm: true,
        item: item,
        column: (0, _extend.extend)({}, column, {
          editorType: editorType,
          editorOptions: item.editorOptions
        }),
        id: form.getItemID(item.name || item.dataField),
        columnIndex: column.index,
        setValue: !isReadOnly && column.allowEditing && function (value) {
          that.updateFieldValue(cellOptions, value);
        }
      });
      cellOptions.value = column.calculateCellValue(rowData);

      var template = that._getFormEditItemTemplate.bind(that)(cellOptions, column);

      that._rowsView.renderTemplate($container, template, cellOptions, !!$container.closest((0, _window.getWindow)().document).length).done(function () {
        that._rowsView._updateCell($container, cellOptions);
      });

      return cellOptions;
    },
    getFormEditorTemplate: function getFormEditorTemplate(cellOptions, item) {
      var that = this;
      var column = this.component.columnOption(item.dataField);
      return function (options, container) {
        var $container = (0, _renderer.default)(container);
        cellOptions.row.watch && cellOptions.row.watch(function () {
          return column.selector(cellOptions.row.data);
        }, function () {
          var _validator;

          var $editorElement = $container.find('.dx-widget').first();
          var validator = $editorElement.data('dxValidator');
          var validatorOptions = (_validator = validator) === null || _validator === void 0 ? void 0 : _validator.option();
          $container.contents().remove();
          cellOptions = that.renderFormEditTemplate.bind(that)(cellOptions, item, options.component, $container);
          $editorElement = $container.find('.dx-widget').first();
          validator = $editorElement.data('dxValidator');

          if (validatorOptions && !validator) {
            $editorElement.dxValidator({
              validationRules: validatorOptions.validationRules,
              validationGroup: validatorOptions.validationGroup,
              dataGetter: validatorOptions.dataGetter
            });
          }
        });
        cellOptions = that.renderFormEditTemplate.bind(that)(cellOptions, item, options.component, $container);
      };
    },
    getEditFormOptions: function getEditFormOptions(detailOptions) {
      var userCustomizeItem = this.option('editing.form.customizeItem');
      var editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
      var items = this.option('editing.form.items');
      var isCustomEditorType = {};
      var that = this;

      if (!items) {
        var columns = this.getController('columns').getColumns();
        items = [];
        (0, _iterator.each)(columns, function (_, column) {
          if (!column.isBand && !column.type) {
            items.push({
              column: column,
              name: column.name,
              dataField: column.dataField
            });
          }
        });
      } else {
        forEachFormItems(items, function (item) {
          var itemId = (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.dataField);

          if (itemId) {
            isCustomEditorType[itemId] = !!item.editorType;
          }
        });
      }

      return {
        items: items,
        formID: 'dx-' + new _guid.default(),
        customizeItem: function customizeItem(item) {
          var column;
          var itemId = item.name || item.dataField;

          if (item.column || itemId) {
            column = item.column || that._columnsController.columnOption(item.name ? 'name:' + item.name : 'dataField:' + item.dataField);
          }

          if (column) {
            item.label = item.label || {};
            item.label.text = item.label.text || column.caption;
            item.template = item.template || that.getFormEditorTemplate(detailOptions, item);
            item.column = column;
            item.isCustomEditorType = isCustomEditorType[itemId];

            if (column.formItem) {
              (0, _extend.extend)(item, column.formItem);
            }

            if (item.isRequired === undefined && column.validationRules) {
              item.isRequired = column.validationRules.some(function (rule) {
                return rule.type === 'required';
              });
              item.validationRules = [];
            }

            var itemVisible = (0, _type.isDefined)(item.visible) ? item.visible : true;

            if (!that._firstFormItem && itemVisible) {
              that._firstFormItem = item;
            }
          }

          userCustomizeItem && userCustomizeItem.call(this, item);
          item.cssClass = (0, _type.isString)(item.cssClass) ? item.cssClass + ' ' + editFormItemClass : editFormItemClass;
        }
      };
    },
    getEditFormTemplate: function getEditFormTemplate() {
      var that = this;
      return function ($container, detailOptions, renderFormOnly) {
        var editFormOptions = that.option('editing.form');
        var baseEditFormOptions = that.getEditFormOptions(detailOptions);
        that._firstFormItem = undefined;
        that._editForm = that._createComponent((0, _renderer.default)('<div>').appendTo($container), _form.default, (0, _extend.extend)({}, editFormOptions, baseEditFormOptions));

        if (!renderFormOnly) {
          var $buttonsContainer = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);

          that._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, that._getSaveButtonConfig());

          that._createComponent((0, _renderer.default)('<div>').appendTo($buttonsContainer), _button.default, that._getCancelButtonConfig());
        }

        that._editForm.on('contentReady', function () {
          that._editPopup && that._editPopup.repaint();
        });
      };
    },
    getColumnTemplate: function getColumnTemplate(options) {
      var that = this;
      var column = options.column;
      var rowIndex = options.row && options.row.rowIndex;
      var template;

      var isRowMode = _isRowEditMode(that);

      var isRowEditing = that.isEditRow(rowIndex);
      var isCellEditing = that.isEditCell(rowIndex, options.columnIndex);
      var editingStartOptions;

      if ((column.showEditorAlways || column.setCellValue && (isRowEditing && column.allowEditing || isCellEditing)) && (options.rowType === 'data' || options.rowType === 'detailAdaptive') && !column.command) {
        var allowUpdating = that.allowUpdating(options);

        if (((allowUpdating || isRowEditing) && column.allowEditing || isCellEditing) && (isRowMode && isRowEditing || !isRowMode)) {
          if (column.showEditorAlways && !isRowMode) {
            editingStartOptions = {
              cancel: false,
              key: options.row.isNewRow ? undefined : options.row.key,
              data: options.row.data,
              column: column
            };

            that._isEditingStart(editingStartOptions);
          }

          if (!editingStartOptions || !editingStartOptions.cancel) {
            options.setValue = function (value, text) {
              that.updateFieldValue(options, value, text);
            };
          }
        }

        template = column.editCellTemplate || getDefaultEditorTemplate(that);
      } else if (column.command === 'detail' && options.rowType === 'detail' && isRowEditing) {
        template = that.getEditFormTemplate(options);
      }

      return template;
    },
    _createButton: function _createButton($container, button, options) {
      var that = this;
      var icon = EDIT_ICON_CLASS[button.name];
      var useIcons = that.option('editing.useIcons');
      var $button = (0, _renderer.default)('<a>').attr('href', '#').addClass(LINK_CLASS).addClass(button.cssClass);

      if (button.template) {
        that._rowsView.renderTemplate($container, button.template, options, true);
      } else {
        if (useIcons && icon || button.icon) {
          icon = button.icon || icon;
          var iconType = iconUtils.getImageSourceType(icon);

          if (iconType === 'image' || iconType === 'svg') {
            $button = iconUtils.getImageContainer(icon).addClass(button.cssClass);
          } else {
            $button.addClass('dx-icon' + (iconType === 'dxIcon' ? '-' : ' ') + icon).attr('title', button.text);
          }

          $button.addClass('dx-link-icon');
          $container.addClass(COMMAND_EDIT_WITH_ICONS_CLASS);
          var localizationName = this.getButtonLocalizationNames()[button.name];
          localizationName && $button.attr('aria-label', _message.default.format(localizationName));
        } else {
          $button.text(button.text);
        }

        if ((0, _type.isDefined)(button.hint)) {
          $button.attr('title', button.hint);
        }

        _events_engine.default.on($button, (0, _index.addNamespace)('click', EDITING_NAMESPACE), that.createAction(function (e) {
          button.onClick.call(button, (0, _extend.extend)({}, e, {
            row: options.row,
            column: options.column
          }));
          e.event.preventDefault();
          e.event.stopPropagation();
        }));

        $container.append($button, '&nbsp;');
      }
    },
    getButtonLocalizationNames: function getButtonLocalizationNames() {
      return {
        edit: 'dxDataGrid-editingEditRow',
        save: 'dxDataGrid-editingSaveRowChanges',
        delete: 'dxDataGrid-editingDeleteRow',
        undelete: 'dxDataGrid-editingUndeleteRow',
        cancel: 'dxDataGrid-editingCancelRowChanges'
      };
    },
    prepareEditButtons: function prepareEditButtons(headerPanel) {
      var that = this;
      var editingOptions = that.option('editing') || {};
      var editingTexts = that.option('editing.texts') || {};
      var titleButtonTextByClassNames = {
        'revert': editingTexts.cancelAllChanges,
        'save': editingTexts.saveAllChanges,
        'addRow': editingTexts.addRow
      };
      var classNameButtonByNames = {
        'revert': 'cancel',
        'save': 'save',
        'addRow': 'addrow'
      };
      var buttonItems = [];

      var prepareButtonItem = function prepareButtonItem(name, methodName, sortIndex) {
        var className = classNameButtonByNames[name];

        var onInitialized = function onInitialized(e) {
          (0, _renderer.default)(e.element).addClass(headerPanel._getToolbarButtonClass(EDIT_BUTTON_CLASS + ' ' + that.addWidgetPrefix(className) + '-button'));
        };

        var hintText = titleButtonTextByClassNames[name];
        var isButtonDisabled = (className === 'save' || className === 'cancel') && !that.hasChanges();
        return {
          widget: 'dxButton',
          options: {
            onInitialized: onInitialized,
            icon: 'edit-button-' + className,
            disabled: isButtonDisabled,
            onClick: function onClick() {
              setTimeout(function () {
                that[methodName]();
              });
            },
            text: hintText,
            hint: hintText
          },
          showText: 'inMenu',
          name: name + 'Button',
          location: 'after',
          locateInMenu: 'auto',
          sortIndex: sortIndex
        };
      };

      if (editingOptions.allowAdding) {
        buttonItems.push(prepareButtonItem('addRow', 'addRow', 20));
      }

      if ((editingOptions.allowUpdating || editingOptions.allowAdding || editingOptions.allowDeleting) && _getEditMode(that) === EDIT_MODE_BATCH) {
        buttonItems.push(prepareButtonItem('save', 'saveEditData', 21));
        buttonItems.push(prepareButtonItem('revert', 'cancelEditData', 22));
      }

      return buttonItems;
    },
    highlightDataCell: function highlightDataCell($cell, parameters) {
      var cellModified = this.isCellModified(parameters);
      cellModified && parameters.column.setCellValue && $cell.addClass(CELL_MODIFIED);
    },
    _afterInsertRow: function _afterInsertRow() {},
    _beforeSaveEditData: function _beforeSaveEditData(editData) {
      if (editData && !(0, _type.isDefined)(editData.key) && (0, _type.isDefined)(editData.type)) {
        return true;
      }
    },
    _afterSaveEditData: function _afterSaveEditData() {},
    _beforeCancelEditData: function _beforeCancelEditData() {},
    _allowEditAction: function _allowEditAction(actionName, options) {
      var allowEditAction = this.option('editing.' + actionName);

      if ((0, _type.isFunction)(allowEditAction)) {
        allowEditAction = allowEditAction({
          component: this.component,
          row: options.row
        });
      }

      return allowEditAction;
    },
    allowUpdating: function allowUpdating(options, eventName) {
      var startEditAction = this.option('editing.startEditAction') || DEFAULT_START_EDIT_ACTION;
      var needCallback = arguments.length > 1 ? startEditAction === eventName || eventName === 'down' : true;
      return needCallback && this._allowEditAction('allowUpdating', options);
    },
    allowDeleting: function allowDeleting(options) {
      return this._allowEditAction('allowDeleting', options);
    },
    isCellModified: function isCellModified(parameters) {
      var columnIndex = parameters.columnIndex;
      var modifiedValues = parameters.row && (parameters.row.isNewRow ? parameters.row.values : parameters.row.modifiedValues);
      return !!modifiedValues && modifiedValues[columnIndex] !== undefined;
    }
  };
}());

var _default = {
  defaultOptions: function defaultOptions() {
    return {
      editing: {
        mode: 'row',
        // "batch"
        refreshMode: 'full',
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        useIcons: false,
        selectTextOnEditStart: false,
        confirmDelete: true,
        texts: {
          editRow: _message.default.format('dxDataGrid-editingEditRow'),
          saveAllChanges: _message.default.format('dxDataGrid-editingSaveAllChanges'),
          saveRowChanges: _message.default.format('dxDataGrid-editingSaveRowChanges'),
          cancelAllChanges: _message.default.format('dxDataGrid-editingCancelAllChanges'),
          cancelRowChanges: _message.default.format('dxDataGrid-editingCancelRowChanges'),
          addRow: _message.default.format('dxDataGrid-editingAddRow'),
          deleteRow: _message.default.format('dxDataGrid-editingDeleteRow'),
          undeleteRow: _message.default.format('dxDataGrid-editingUndeleteRow'),
          confirmDeleteMessage: _message.default.format('dxDataGrid-editingConfirmDeleteMessage'),
          confirmDeleteTitle: ''
        },
        form: {
          colCount: 2
        },
        popup: {},
        startEditAction: 'click',
        editRowKey: null,
        editColumnName: null,
        changes: []
      }
    };
  },
  controllers: {
    editing: EditingController
  },
  extenders: {
    controllers: {
      data: {
        init: function init() {
          this._editingController = this.getController('editing');
          this.callBase();
        },
        reload: function reload(full, repaintChangesOnly) {
          !repaintChangesOnly && this._editingController.refresh();
          return this.callBase.apply(this, arguments);
        },
        repaintRows: function repaintRows() {
          if (this.getController('editing').isSaving()) return;
          return this.callBase.apply(this, arguments);
        },
        _updateEditRow: function _updateEditRow(items) {
          var editingController = this._editingController;
          var editRowKey = this.option('editing.editRowKey');

          var editRowIndex = _uiGrid_core2.default.getIndexByKey(editRowKey, items);

          var editItem = items[editRowIndex];

          if (editItem) {
            editItem.isEditing = true;

            if (editingController.getEditMode() === EDIT_MODE_FORM) {
              editItem.rowType = 'detail';
            }
          }
        },
        _updateItemsCore: function _updateItemsCore(change) {
          this.callBase(change);

          this._updateEditRow(this.items());
        },
        _applyChangeUpdate: function _applyChangeUpdate(change) {
          this._updateEditRow(change.items);

          this.callBase(change);
        },
        _applyChangesOnly: function _applyChangesOnly(change) {
          this._updateEditRow(change.items);

          this.callBase(change);
        },
        _processItems: function _processItems(items, change) {
          items = this._editingController.processItems(items, change);
          return this.callBase(items, change);
        },
        _processDataItem: function _processDataItem(dataItem, options) {
          this._editingController.processDataItem(dataItem, options, this.generateDataValues);

          return this.callBase(dataItem, options);
        },
        _processItem: function _processItem(item, options) {
          item = this.callBase(item, options);

          if (item.isNewRow) {
            options.dataIndex--;
            delete item.dataIndex;
          }

          return item;
        },
        _getChangedColumnIndices: function _getChangedColumnIndices(oldItem, newItem, rowIndex, isLiveUpdate) {
          var editingController = this.getController('editing');
          var isRowEditMode = editingController.isRowEditMode();

          if (oldItem.isNewRow !== newItem.isNewRow || oldItem.removed !== newItem.removed || isRowEditMode && oldItem.isEditing !== newItem.isEditing) {
            return;
          }

          if (oldItem.rowType === newItem.rowType && isRowEditMode && editingController.isEditRow(rowIndex) && isLiveUpdate) {
            return [];
          }

          return this.callBase.apply(this, arguments);
        },
        _isCellChanged: function _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
          var editingController = this.getController('editing');
          var cell = oldRow.cells && oldRow.cells[columnIndex];
          var isEditing = editingController && editingController.isEditCell(visibleRowIndex, columnIndex);

          if (isLiveUpdate && isEditing) {
            return false;
          }

          if (cell && cell.column && !cell.column.showEditorAlways && cell.isEditing !== isEditing) {
            return true;
          }

          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        init: function init() {
          this.callBase();
          this._editingController = this.getController('editing');
        },
        getCellElements: function getCellElements(rowIndex) {
          var $cellElements = this.callBase(rowIndex);
          var editingController = this._editingController;
          var editForm = editingController.getEditForm();
          var editFormRowIndex = editingController.getEditFormRowIndex();

          if (editFormRowIndex === rowIndex && $cellElements && editForm) {
            return editForm.$element().find('.' + this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS) + ', .' + BUTTON_CLASS);
          }

          return $cellElements;
        },
        getCellIndex: function getCellIndex($cell, rowIndex) {
          if (!$cell.is('td') && rowIndex >= 0) {
            var $cellElements = this.getCellElements(rowIndex);
            var cellIndex = -1;
            (0, _iterator.each)($cellElements, function (index, cellElement) {
              if ((0, _renderer.default)(cellElement).find($cell).length) {
                cellIndex = index;
              }
            });
            return cellIndex;
          }

          return this.callBase.apply(this, arguments);
        },
        _getVisibleColumnIndex: function _getVisibleColumnIndex($cells, rowIndex, columnIdentifier) {
          var editFormRowIndex = this._editingController.getEditFormRowIndex();

          if (editFormRowIndex === rowIndex && (0, _type.isString)(columnIdentifier)) {
            var column = this._columnsController.columnOption(columnIdentifier);

            return this._getEditFormEditorVisibleIndex($cells, column);
          }

          return this.callBase.apply(this, arguments);
        },
        _getEditFormEditorVisibleIndex: function _getEditFormEditorVisibleIndex($cells, column) {
          var visibleIndex = -1;
          (0, _iterator.each)($cells, function (index, cellElement) {
            var item = (0, _renderer.default)(cellElement).find('.dx-field-item-content').data('dx-form-item');

            if (item && item.column && column && item.column.index === column.index) {
              visibleIndex = index;
              return false;
            }
          });
          return visibleIndex;
        },
        publicMethods: function publicMethods() {
          return this.callBase().concat(['cellValue']);
        },
        _getCellTemplate: function _getCellTemplate(options) {
          var that = this;

          var template = that._editingController.getColumnTemplate(options);

          return template || that.callBase(options);
        },
        _isNativeClick: function _isNativeClick() {
          return (_devices.default.real().ios || _devices.default.real().android) && this.option('editing.allowUpdating');
        },
        _createTable: function _createTable() {
          var that = this;
          var $table = that.callBase.apply(that, arguments);

          if (!_isRowEditMode(that) && that.option('editing.allowUpdating')) {
            _events_engine.default.on($table, (0, _index.addNamespace)(_hold.default.name, 'dxDataGridRowsView'), 'td:not(.' + EDITOR_CELL_CLASS + ')', that.createAction(function () {
              var editingController = that._editingController;

              if (editingController.isEditing()) {
                editingController.closeEditCell();
              }
            }));
          }

          return $table;
        },
        _createRow: function _createRow(row) {
          var $row = this.callBase(row);

          if (row) {
            var editingController = this._editingController;
            var isEditRow = editingController.isEditRow(row.rowIndex);
            var isRowRemoved = !!row.removed;
            var isRowInserted = !!row.isNewRow;
            var isRowModified = !!row.modified;

            if (_getEditMode(this) === EDIT_MODE_BATCH) {
              isRowRemoved && $row.addClass(ROW_REMOVED);
            } else {
              isEditRow && $row.addClass(EDIT_ROW);
            }

            isRowInserted && $row.addClass(ROW_INSERTED);
            isRowModified && $row.addClass(ROW_MODIFIED);

            if (isEditRow || isRowInserted || isRowRemoved) {
              $row.removeClass(ROW_SELECTED);
            }

            if (isEditRow && row.rowType === 'detail') {
              $row.addClass(this.addWidgetPrefix(EDIT_FORM_CLASS));
            }
          }

          return $row;
        },
        _getColumnIndexByElement: function _getColumnIndexByElement($element) {
          var $tableElement = $element.closest('table');
          var $tableElements = this.getTableElements();

          while ($tableElement.length && !$tableElements.filter($tableElement).length) {
            $element = $tableElement.closest('td');
            $tableElement = $element.closest('table');
          }

          return this._getColumnIndexByElementCore($element);
        },
        _getColumnIndexByElementCore: function _getColumnIndexByElementCore($element) {
          var $targetElement = $element.closest('.' + ROW_CLASS + '> td:not(.dx-master-detail-cell)');
          return this.getCellIndex($targetElement);
        },
        _editCellByClick: function _editCellByClick(e, eventName) {
          var that = this;
          var editingController = that._editingController;
          var $targetElement = (0, _renderer.default)(e.event.target);

          var columnIndex = that._getColumnIndexByElement($targetElement);

          var row = that._dataController.items()[e.rowIndex];

          var allowUpdating = editingController.allowUpdating({
            row: row
          }, eventName) || row && row.isNewRow;

          var column = that._columnsController.getVisibleColumns()[columnIndex];

          var allowEditing = allowUpdating && column && (column.allowEditing || editingController.isEditCell(e.rowIndex, columnIndex));
          var startEditAction = that.option('editing.startEditAction') || 'click';

          if (eventName === 'down') {
            return column && column.showEditorAlways && allowEditing && editingController.editCell(e.rowIndex, columnIndex);
          }

          if (eventName === 'click' && startEditAction === 'dblClick' && !editingController.isEditCell(e.rowIndex, columnIndex)) {
            editingController.closeEditCell();
          }

          if (allowEditing && eventName === startEditAction) {
            return editingController.editCell(e.rowIndex, columnIndex) || editingController.isEditRow(e.rowIndex);
          }
        },
        _rowPointerDown: function _rowPointerDown(e) {
          var _this23 = this;

          this._pointerDownTimeout = setTimeout(function () {
            _this23._editCellByClick(e, 'down');
          });
        },
        _rowClick: function _rowClick(e) {
          var isEditForm = (0, _renderer.default)(e.rowElement).hasClass(this.addWidgetPrefix(EDIT_FORM_CLASS));
          e.event[TARGET_COMPONENT_NAME] = this.component;

          if (!this._editCellByClick(e, 'click') && !isEditForm) {
            this.callBase.apply(this, arguments);
          }
        },
        _rowDblClick: function _rowDblClick(e) {
          if (!this._editCellByClick(e, 'dblClick')) {
            this.callBase.apply(this, arguments);
          }
        },
        _cellPrepared: function _cellPrepared($cell, parameters) {
          var editingController = this._editingController;
          var isCommandCell = !!parameters.column.command;
          var isEditableCell = parameters.setValue;
          var isEditRow = editingController.isEditRow(parameters.rowIndex);
          var isEditing = isEditingCell(isEditRow, parameters);

          if (isEditingOrShowEditorAlwaysDataCell(isEditRow, parameters)) {
            var alignment = parameters.column.alignment;
            $cell.toggleClass(this.addWidgetPrefix(READONLY_CLASS), !isEditableCell).toggleClass(CELL_FOCUS_DISABLED_CLASS, !isEditableCell);

            if (alignment) {
              $cell.find(EDITORS_INPUT_SELECTOR).first().css('textAlign', alignment);
            }
          }

          if (isEditing) {
            this._editCellPrepared($cell);
          }

          if (parameters.column && !isCommandCell) {
            editingController.highlightDataCell($cell, parameters);
          }

          this.callBase.apply(this, arguments);
        },
        _editCellPrepared: function _editCellPrepared($cell) {},
        _formItemPrepared: function _formItemPrepared() {},
        _isFormItem: function _isFormItem(parameters) {
          var isDetailRow = parameters.rowType === 'detail' || parameters.rowType === 'detailAdaptive';
          var isPopupEditing = parameters.rowType === 'data' && _getEditMode(this) === 'popup';
          return (isDetailRow || isPopupEditing) && parameters.item;
        },
        _updateCell: function _updateCell($cell, parameters) {
          if (this._isFormItem(parameters)) {
            this._formItemPrepared(parameters, $cell);
          } else {
            this.callBase($cell, parameters);
          }
        },
        _update: function _update(change) {
          this.callBase(change);

          if (change.changeType === 'updateSelection') {
            this.getTableElements().children('tbody').children('.' + EDIT_ROW).removeClass(ROW_SELECTED);
          }
        },
        _getCellOptions: function _getCellOptions(options) {
          var cellOptions = this.callBase(options);
          cellOptions.isEditing = this._editingController.isEditCell(cellOptions.rowIndex, cellOptions.columnIndex);
          return cellOptions;
        },
        _createCell: function _createCell(options) {
          var $cell = this.callBase(options);

          var isEditRow = this._editingController.isEditRow(options.rowIndex);

          isEditingOrShowEditorAlwaysDataCell(isEditRow, options) && $cell.addClass(EDITOR_CELL_CLASS);
          return $cell;
        },
        _renderCellContent: function _renderCellContent($cell, options) {
          if (options.rowType === 'data' && _getEditMode(this) === EDIT_MODE_POPUP && options.row.visible === false) {
            return;
          }

          this.callBase.apply(this, arguments);
        },
        cellValue: function cellValue(rowIndex, columnIdentifier, value, text) {
          var cellOptions = this.getCellOptions(rowIndex, columnIdentifier);

          if (cellOptions) {
            if (value === undefined) {
              return cellOptions.value;
            } else {
              this._editingController.updateFieldValue(cellOptions, value, text, true);
            }
          }
        },
        dispose: function dispose() {
          this.callBase.apply(this, arguments);
          clearTimeout(this._pointerDownTimeout);
        },
        _renderCore: function _renderCore() {
          this.callBase.apply(this, arguments);

          this._editingController._focusEditorIfNeed();
        }
      },
      headerPanel: {
        _getToolbarItems: function _getToolbarItems() {
          var items = this.callBase();
          var editButtonItems = this.getController('editing').prepareEditButtons(this);
          return editButtonItems.concat(items);
        },
        optionChanged: function optionChanged(args) {
          var fullName = args.fullName;

          switch (args.name) {
            case 'editing':
              {
                var isEditingPopupOption = fullName && fullName.indexOf(EDITING_POPUP_OPTION_NAME) === 0;

                if (!isEditingPopupOption) {
                  this._invalidate();
                }

                this.callBase(args);
                break;
              }

            default:
              this.callBase(args);
          }
        },
        isVisible: function isVisible() {
          var that = this;
          var editingOptions = that.getController('editing').option('editing');
          return that.callBase() || editingOptions && (editingOptions.allowAdding || (editingOptions.allowUpdating || editingOptions.allowDeleting) && editingOptions.mode === EDIT_MODE_BATCH);
        }
      }
    }
  }
};
exports.default = _default;
module.exports = exports.default;