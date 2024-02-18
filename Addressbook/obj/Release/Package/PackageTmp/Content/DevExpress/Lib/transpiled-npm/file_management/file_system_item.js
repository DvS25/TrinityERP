"use strict";

exports.default = void 0;

var _type = require("../core/utils/type");

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileSystemItem = /*#__PURE__*/function () {
  function FileSystemItem() {
    _classCallCheck(this, FileSystemItem);

    var ctor = (0, _type.isString)(arguments[0]) ? this._publicCtor : this._internalCtor;
    ctor.apply(this, arguments);
  }

  _createClass(FileSystemItem, [{
    key: "_internalCtor",
    value: function _internalCtor(pathInfo, name, isDirectory) {
      this.name = name || '';
      this.pathInfo = pathInfo && _toConsumableArray(pathInfo) || [];
      this.parentPath = this._getPathByPathInfo(this.pathInfo);
      this.relativeName = (0, _utils.pathCombine)(this.parentPath, name);
      this.key = this._getPathByPathInfo(this.getFullPathInfo(), true);
      this.path = (0, _utils.pathCombine)(this.parentPath, name);
      this.pathKeys = this.pathInfo.map(function (_ref) {
        var key = _ref.key;
        return key;
      });

      if (!this.isRoot()) {
        this.pathKeys.push(this.key);
      }

      this._initialize(isDirectory);
    }
  }, {
    key: "_publicCtor",
    value: function _publicCtor(path, isDirectory, pathKeys) {
      this.path = path || '';
      this.pathKeys = pathKeys || [];
      var pathInfo = [];
      var parts = (0, _utils.getPathParts)(path, true);

      for (var i = 0; i < parts.length - 1; i++) {
        var part = parts[i];
        var pathInfoPart = {
          key: this.pathKeys[i] || part,
          name: (0, _utils.getName)(part)
        };
        pathInfo.push(pathInfoPart);
      }

      this.pathInfo = pathInfo;
      this.relativeName = path;
      this.name = (0, _utils.getName)(path);
      this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : path;
      this.parentPath = parts.length > 1 ? parts[parts.length - 2] : '';

      this._initialize(isDirectory);
    }
  }, {
    key: "_initialize",
    value: function _initialize(isDirectory) {
      this.isDirectory = !!isDirectory;
      this.size = 0;
      this.dateModified = new Date();
      this.thumbnail = '';
      this.tooltipText = '';
    }
  }, {
    key: "getFullPathInfo",
    value: function getFullPathInfo() {
      var pathInfo = _toConsumableArray(this.pathInfo);

      if (!this.isRoot()) {
        pathInfo.push({
          key: this.key,
          name: this.name
        });
      }

      return pathInfo;
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      return this.path === '';
    }
  }, {
    key: "getFileExtension",
    value: function getFileExtension() {
      return this.isDirectory ? '' : (0, _utils.getFileExtension)(this.name);
    }
  }, {
    key: "equals",
    value: function equals(item) {
      return item && this.key === item.key;
    }
  }, {
    key: "createClone",
    value: function createClone() {
      var result = new FileSystemItem(this.pathInfo, this.name, this.isDirectory);
      result.key = this.key;
      result.size = this.size;
      result.dateModified = this.dateModified;
      result.thumbnail = this.thumbnail;
      result.tooltipText = this.tooltipText;
      result.hasSubDirectories = this.hasSubDirectories;
      result.dataItem = this.dataItem;
      return result;
    }
  }, {
    key: "_getPathByPathInfo",
    value: function _getPathByPathInfo(pathInfo, escape) {
      return pathInfo.map(function (info) {
        return escape ? (0, _utils.getEscapedFileName)(info.name) : info.name;
      }).join(_utils.PATH_SEPARATOR);
    }
  }]);

  return FileSystemItem;
}();

var _default = FileSystemItem;
exports.default = _default;
module.exports = exports.default;