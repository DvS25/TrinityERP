"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _common = require("../core/utils/common");

var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));

var _extend = require("../core/utils/extend");

var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_list"));

var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// STYLE autocomplete
var AUTOCOMPLETE_CLASS = 'dx-autocomplete';
var AUTOCOMPLETE_POPUP_WRAPPER_CLASS = 'dx-autocomplete-popup-wrapper';

var Autocomplete = _ui.default.inherit({
  _supportedKeys: function _supportedKeys() {
    var item = this._list ? this._list.option('focusedElement') : null;
    var parent = this.callBase();
    item = item && (0, _renderer.default)(item);
    return (0, _extend.extend)({}, parent, {
      upArrow: function upArrow(e) {
        e.preventDefault();
        e.stopPropagation();

        if (item && !this._calcNextItem(-1)) {
          this._clearFocusedItem();

          return false;
        }

        return true;
      },
      downArrow: function downArrow(e) {
        e.preventDefault();
        e.stopPropagation();

        if (item && !this._calcNextItem(1)) {
          this._clearFocusedItem();

          return false;
        }

        return true;
      },
      enter: function enter() {
        if (!item) {
          this.close();
        }

        parent.enter.apply(this, arguments);
        return this.option('opened');
      }
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      minSearchLength: 1,
      maxItemCount: 10,

      /**
      * @name dxAutocompleteOptions.noDataText
      * @type string
      * @default ""
      * @hidden
      */
      noDataText: '',
      showDropDownButton: false,
      searchEnabled: true
      /**
      * @name dxAutocompleteOptions.displayExpr
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.acceptCustomValue
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.searchEnabled
      * @hidden
      */

      /**
      * @name dxAutocompleteOptions.showDataBeforeSearch
      * @hidden
      */

    });
  },

  /**
  * @name dxAutocompletemethods.open
  * @publicName open()
  * @hidden
  */

  /**
  * @name dxAutocompletemethods.close
  * @publicName close()
  * @hidden
  */
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(AUTOCOMPLETE_CLASS);
    this.setAria('autocomplete', 'inline');
  },
  _displayGetterExpr: function _displayGetterExpr() {
    return this.option('valueExpr');
  },
  _popupConfig: function _popupConfig() {
    return (0, _extend.extend)(this.callBase(), {
      closeOnOutsideClick: function (e) {
        return !(0, _renderer.default)(e.target).closest(this.$element()).length;
      }.bind(this)
    });
  },
  _renderDimensions: function _renderDimensions() {
    this.callBase();

    this._dimensionChanged();
  },
  _popupWrapperClass: function _popupWrapperClass() {
    return this.callBase() + ' ' + AUTOCOMPLETE_POPUP_WRAPPER_CLASS;
  },
  _listConfig: function _listConfig() {
    return (0, _extend.extend)(this.callBase(), {
      pageLoadMode: 'none'
    });
  },
  _listItemClickHandler: function _listItemClickHandler(e) {
    var value = this._displayGetter(e.itemData);

    this.option('value', value);
    this.close();
  },
  _setListDataSource: function _setListDataSource() {
    if (!this._list) {
      return;
    }

    this._list.option('selectedItems', []);

    this.callBase();
  },
  _refreshSelected: _common.noop,
  _searchCanceled: function _searchCanceled() {
    this.callBase();
    this.close();
  },
  _loadItem: function _loadItem(value, cache) {
    var selectedItem = this._getItemFromPlain(value, cache);

    return new _deferred.Deferred().resolve(selectedItem).promise();
  },
  _dataSourceOptions: function _dataSourceOptions() {
    return {
      paginate: true,
      pageSize: this.option('maxItemCount')
    };
  },
  _searchDataSource: function _searchDataSource() {
    this._dataSource.pageSize(this.option('maxItemCount'));

    this.callBase();

    this._clearFocusedItem();
  },
  _clearFocusedItem: function _clearFocusedItem() {
    if (this._list) {
      this._list.option('focusedElement', null);

      this._list.option('selectedIndex', -1);
    }
  },
  _renderValueEventName: function _renderValueEventName() {
    return 'input keyup';
  },
  _valueChangeEventHandler: function _valueChangeEventHandler(e) {
    var value = this._input().val() || null;
    return this.callBase(e, value);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'maxItemCount':
        this._searchDataSource();

        break;

      case 'valueExpr':
        this._compileDisplayGetter();

        this._setListOption('displayExpr', this._displayGetterExpr());

        this.callBase(args);
        break;

      default:
        this.callBase(args);
    }
  },
  reset: function reset() {
    this.callBase();
    this.close();
  }
});

(0, _component_registrator.default)('dxAutocomplete', Autocomplete);
var _default = Autocomplete;
exports.default = _default;
module.exports = exports.default;