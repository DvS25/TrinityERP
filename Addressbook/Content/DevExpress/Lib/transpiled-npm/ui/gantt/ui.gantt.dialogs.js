"use strict";

exports.GanttDialog = void 0;

var _popup = _interopRequireDefault(require("../popup"));

var _form = _interopRequireDefault(require("../form"));

require("../tag_box");

var _message = _interopRequireDefault(require("../../localization/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GanttDialog = /*#__PURE__*/function () {
  function GanttDialog(owner, $element) {
    _classCallCheck(this, GanttDialog);

    this._popupInstance = owner._createComponent($element, _popup.default);
    this.infoMap = {
      TaskEdit: TaskEditDialogInfo,
      Resources: ResourcesEditDialogInfo,
      Confirmation: ConfirmDialogInfo,
      ConstraintViolation: ConstraintViolationDialogInfo
    };
  }

  _createClass(GanttDialog, [{
    key: "_apply",
    value: function _apply() {
      var result = this._dialogInfo.getResult();

      this._callback(result);

      this.hide();
    }
  }, {
    key: "show",
    value: function show(name, parameters, callback, afterClosing, editingOptions) {
      this._callback = callback;
      this._afterClosing = afterClosing;

      if (!this.infoMap[name]) {
        return;
      }

      this._dialogInfo = new this.infoMap[name](parameters, this._apply.bind(this), this.hide.bind(this), editingOptions);

      this._popupInstance.option({
        showTitle: !!this._dialogInfo.getTitle(),
        title: this._dialogInfo.getTitle(),
        toolbarItems: this._dialogInfo.getToolbarItems(),
        maxWidth: this._dialogInfo.getMaxWidth(),
        height: this._dialogInfo.getHeight(),
        contentTemplate: this._dialogInfo.getContentTemplate()
      });

      this._popupInstance.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this._popupInstance.hide();

      if (this._afterClosing) {
        this._afterClosing();
      }
    }
  }]);

  return GanttDialog;
}();

exports.GanttDialog = GanttDialog;

var DialogInfoBase = /*#__PURE__*/function () {
  function DialogInfoBase(parameters, applyAction, hideAction, editingOptions) {
    _classCallCheck(this, DialogInfoBase);

    this._parameters = parameters;
    this._applyAction = applyAction;
    this._hideAction = hideAction;
    this._editingOptions = editingOptions;
  }

  _createClass(DialogInfoBase, [{
    key: "_getFormItems",
    value: function _getFormItems() {
      return {};
    }
  }, {
    key: "_getFormCssClass",
    value: function _getFormCssClass() {
      return '';
    }
  }, {
    key: "_getFormData",
    value: function _getFormData() {
      return this._parameters;
    }
  }, {
    key: "_updateParameters",
    value: function _updateParameters() {}
  }, {
    key: "_getOkToolbarItem",
    value: function _getOkToolbarItem() {
      return this._getToolbarItem('OK', this._applyAction);
    }
  }, {
    key: "_getCancelToolbarItem",
    value: function _getCancelToolbarItem() {
      return this._getToolbarItem('Cancel', this._hideAction);
    }
  }, {
    key: "_getYesToolbarItem",
    value: function _getYesToolbarItem() {
      return this._getToolbarItem('Yes', this._applyAction);
    }
  }, {
    key: "_getNoToolbarItem",
    value: function _getNoToolbarItem() {
      return this._getToolbarItem('No', this._hideAction);
    }
  }, {
    key: "_getToolbarItem",
    value: function _getToolbarItem(localizationText, action) {
      return {
        widget: 'dxButton',
        toolbar: 'bottom',
        options: {
          text: _message.default.format(localizationText),
          onClick: action
        }
      };
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return '';
    }
  }, {
    key: "getToolbarItems",
    value: function getToolbarItems() {
      return this._editingOptions.enabled ? [this._getOkToolbarItem(), this._getCancelToolbarItem()] : [this._getCancelToolbarItem()];
    }
  }, {
    key: "getMaxWidth",
    value: function getMaxWidth() {
      return 400;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return 'auto';
    }
  }, {
    key: "getContentTemplate",
    value: function getContentTemplate() {
      var _this = this;

      return function (content) {
        _this._form = new _form.default(content, {
          formData: _this._getFormData(),
          items: _this._getFormItems(),
          elementAttr: {
            class: _this._getFormCssClass()
          }
        });
        return content;
      };
    }
  }, {
    key: "getResult",
    value: function getResult() {
      var formData = this._form && this._form.option('formData');

      this._updateParameters(formData);

      return this._parameters;
    }
  }]);

  return DialogInfoBase;
}();

var TaskEditDialogInfo = /*#__PURE__*/function (_DialogInfoBase) {
  _inherits(TaskEditDialogInfo, _DialogInfoBase);

  var _super = _createSuper(TaskEditDialogInfo);

  function TaskEditDialogInfo() {
    _classCallCheck(this, TaskEditDialogInfo);

    return _super.apply(this, arguments);
  }

  _createClass(TaskEditDialogInfo, [{
    key: "getTitle",
    value: function getTitle() {
      return _message.default.format('dxGantt-dialogTaskDetailsTitle');
    }
  }, {
    key: "_getFormItems",
    value: function _getFormItems() {
      var _this2 = this;

      var readOnly = !this._editingOptions.enabled || !this._editingOptions.allowTaskUpdating;
      var readOnlyRange = readOnly || !this._parameters.enableRangeEdit;
      return [{
        dataField: 'title',
        editorType: 'dxTextBox',
        label: {
          text: _message.default.format('dxGantt-dialogTitle')
        },
        editorOptions: {
          readOnly: readOnly || this._isReadOnlyField('title')
        },
        visible: !this._isHiddenField('title')
      }, {
        dataField: 'start',
        editorType: 'dxDateBox',
        label: {
          text: _message.default.format('dxGantt-dialogStartTitle')
        },
        editorOptions: {
          type: 'datetime',
          width: '100%',
          readOnly: readOnlyRange || this._isReadOnlyField('start')
        },
        visible: !this._isHiddenField('start')
      }, {
        dataField: 'end',
        editorType: 'dxDateBox',
        label: {
          text: _message.default.format('dxGantt-dialogEndTitle')
        },
        editorOptions: {
          type: 'datetime',
          width: '100%',
          readOnly: readOnlyRange || this._isReadOnlyField('end')
        },
        visible: !this._isHiddenField('end')
      }, {
        dataField: 'progress',
        editorType: 'dxNumberBox',
        label: {
          text: _message.default.format('dxGantt-dialogProgressTitle')
        },
        editorOptions: {
          showSpinButtons: true,
          min: 0,
          max: 1,
          format: '#0%',
          step: 0.01,
          readOnly: readOnlyRange || this._isReadOnlyField('progress')
        },
        visible: !this._isHiddenField('progress')
      }, {
        dataField: 'assigned.items',
        editorType: 'dxTagBox',
        label: {
          text: _message.default.format('dxGantt-dialogResourcesTitle')
        },
        editorOptions: {
          readOnly: readOnly,
          dataSource: this._parameters.resources.items,
          displayExpr: 'text',
          buttons: [{
            name: 'editResources',
            location: 'after',
            options: {
              text: '...',
              hint: _message.default.format('dxGantt-dialogEditResourceListHint'),
              onClick: function onClick() {
                var showTaskEditDialogCallback = function showTaskEditDialogCallback() {
                  _this2._parameters.showTaskEditDialogCommand.execute();
                };

                _this2._parameters.showResourcesDialogCommand.execute(showTaskEditDialogCallback);
              }
            }
          }]
        }
      }];
    }
  }, {
    key: "_isReadOnlyField",
    value: function _isReadOnlyField(field) {
      return this._parameters.readOnlyFields.indexOf(field) > -1;
    }
  }, {
    key: "_isHiddenField",
    value: function _isHiddenField(field) {
      return this._parameters.hiddenFields.indexOf(field) > -1;
    }
  }, {
    key: "_getFormData",
    value: function _getFormData() {
      var data = {};

      for (var field in this._parameters) {
        data[field] = field === 'progress' ? this._parameters[field] / 100 : this._parameters[field];
      }

      return data;
    }
  }, {
    key: "_updateParameters",
    value: function _updateParameters(formData) {
      this._parameters.title = formData.title;
      this._parameters.start = formData.start;
      this._parameters.end = formData.end;
      this._parameters.progress = formData.progress * 100;
      this._parameters.assigned = formData.assigned;
    }
  }]);

  return TaskEditDialogInfo;
}(DialogInfoBase);

var ResourcesEditDialogInfo = /*#__PURE__*/function (_DialogInfoBase2) {
  _inherits(ResourcesEditDialogInfo, _DialogInfoBase2);

  var _super2 = _createSuper(ResourcesEditDialogInfo);

  function ResourcesEditDialogInfo() {
    _classCallCheck(this, ResourcesEditDialogInfo);

    return _super2.apply(this, arguments);
  }

  _createClass(ResourcesEditDialogInfo, [{
    key: "getTitle",
    value: function getTitle() {
      return _message.default.format('dxGantt-dialogResourceManagerTitle');
    }
  }, {
    key: "_getFormItems",
    value: function _getFormItems() {
      var _this3 = this;

      return [{
        label: {
          visible: false
        },
        dataField: 'resources.items',
        editorType: 'dxList',
        editorOptions: {
          allowItemDeleting: this._editingOptions.enabled && this._editingOptions.allowResourceDeleting,
          itemDeleteMode: 'static',
          selectionMode: 'none',
          items: this._parameters.resources.items,
          height: 250,
          noDataText: _message.default.format('dxGantt-dialogEditNoResources'),
          onInitialized: function onInitialized(e) {
            _this3.list = e.component;
          },
          onItemDeleted: function onItemDeleted(e) {
            _this3._parameters.resources.remove(e.itemData);
          }
        }
      }, {
        label: {
          visible: false
        },
        editorType: 'dxTextBox',
        editorOptions: {
          readOnly: !this._editingOptions.enabled || !this._editingOptions.allowResourceAdding,
          onInitialized: function onInitialized(e) {
            _this3.textBox = e.component;
          },
          onInput: function onInput(e) {
            var addButton = e.component.getButton('addResource');
            var resourceName = e.component.option('text');
            addButton.option('disabled', resourceName.length === 0);
          },
          buttons: [{
            name: 'addResource',
            location: 'after',
            options: {
              text: _message.default.format('dxGantt-dialogButtonAdd'),
              disabled: true,
              onClick: function onClick(e) {
                var newItem = _this3._parameters.resources.createItem();

                newItem.text = _this3.textBox.option('text');

                _this3._parameters.resources.add(newItem);

                _this3.list.option('items', _this3._parameters.resources.items);

                _this3.list.scrollToItem(newItem);

                _this3.textBox.reset();

                e.component.option('disabled', true);
              }
            }
          }]
        }
      }];
    }
  }]);

  return ResourcesEditDialogInfo;
}(DialogInfoBase);

var ConfirmDialogInfo = /*#__PURE__*/function (_DialogInfoBase3) {
  _inherits(ConfirmDialogInfo, _DialogInfoBase3);

  var _super3 = _createSuper(ConfirmDialogInfo);

  function ConfirmDialogInfo() {
    _classCallCheck(this, ConfirmDialogInfo);

    return _super3.apply(this, arguments);
  }

  _createClass(ConfirmDialogInfo, [{
    key: "getContentTemplate",
    value: function getContentTemplate() {
      var _this4 = this;

      return function (content) {
        return _this4._getConfirmMessage();
      };
    }
  }, {
    key: "_getConfirmMessage",
    value: function _getConfirmMessage() {
      switch (this._parameters.type) {
        case 0:
          return _message.default.format('dxGantt-dialogTaskDeleteConfirmation');

        case 1:
          return _message.default.format('dxGantt-dialogDependencyDeleteConfirmation');

        case 2:
          return _message.default.format('dxGantt-dialogResourcesDeleteConfirmation', this._parameters.message);

        default:
          return '';
      }
    }
  }, {
    key: "getToolbarItems",
    value: function getToolbarItems() {
      return [this._getYesToolbarItem(), this._getNoToolbarItem()];
    }
  }]);

  return ConfirmDialogInfo;
}(DialogInfoBase);

var ConstraintViolationDialogInfo = /*#__PURE__*/function (_DialogInfoBase4) {
  _inherits(ConstraintViolationDialogInfo, _DialogInfoBase4);

  var _super4 = _createSuper(ConstraintViolationDialogInfo);

  function ConstraintViolationDialogInfo() {
    _classCallCheck(this, ConstraintViolationDialogInfo);

    return _super4.apply(this, arguments);
  }

  _createClass(ConstraintViolationDialogInfo, [{
    key: "_getFormItems",
    value: function _getFormItems() {
      var items = [];
      items.push({
        text: _message.default.format('dxGantt-dialogCancelOperationMessage'),
        value: 0
      });
      items.push({
        text: _message.default.format('dxGantt-dialogDeleteDependencyMessage'),
        value: 1
      });

      if (!this._parameters.validationError.critical) {
        items.push({
          text: _message.default.format('dxGantt-dialogMoveTaskAndKeepDependencyMessage'),
          value: 2
        });
      }

      return [{
        template: this._parameters.validationError.critical ? _message.default.format('dxGantt-dialogConstraintCriticalViolationMessage') : _message.default.format('dxGantt-dialogConstraintViolationMessage')
      }, {
        cssClass: 'dx-cv-dialog-row',
        dataField: 'option',
        label: {
          visible: false
        },
        editorType: 'dxRadioGroup',
        editorOptions: {
          items: items,
          valueExpr: 'value',
          value: 0
        }
      }];
    }
  }, {
    key: "_getFormCssClass",
    value: function _getFormCssClass() {
      return 'dx-cv-dialog';
    }
  }, {
    key: "_updateParameters",
    value: function _updateParameters(formData) {
      this._parameters.option = formData.option;
    }
  }]);

  return ConstraintViolationDialogInfo;
}(DialogInfoBase);