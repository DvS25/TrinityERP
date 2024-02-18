"use strict";

exports.default = void 0;

var _data = require("../core/utils/data");

var _common = require("../core/utils/common");

var _date_serialization = _interopRequireDefault(require("../core/utils/date_serialization"));

var _iterator = require("../core/utils/iterator");

var _type = require("../core/utils/type");

var _deferred = require("../core/utils/deferred");

var _file_system_item = _interopRequireDefault(require("./file_system_item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_FILE_UPLOAD_CHUNK_SIZE = 200000;

var FileSystemProviderBase = /*#__PURE__*/function () {
  function FileSystemProviderBase(options) {
    _classCallCheck(this, FileSystemProviderBase);

    options = (0, _common.ensureDefined)(options, {});
    this._keyGetter = (0, _data.compileGetter)(this._getKeyExpr(options));
    this._nameGetter = (0, _data.compileGetter)(this._getNameExpr(options));
    this._isDirGetter = (0, _data.compileGetter)(this._getIsDirExpr(options));
    this._sizeGetter = (0, _data.compileGetter)(this._getSizeExpr(options));
    this._dateModifiedGetter = (0, _data.compileGetter)(this._getDateModifiedExpr(options));
    this._thumbnailGetter = (0, _data.compileGetter)(options.thumbnailExpr || 'thumbnail');
  }

  _createClass(FileSystemProviderBase, [{
    key: "getItems",
    value: function getItems(parentDirectory) {
      return [];
    }
  }, {
    key: "renameItem",
    value: function renameItem(item, name) {}
  }, {
    key: "createDirectory",
    value: function createDirectory(parentDirectory, name) {}
  }, {
    key: "deleteItems",
    value: function deleteItems(items) {}
  }, {
    key: "moveItems",
    value: function moveItems(items, destinationDirectory) {}
  }, {
    key: "copyItems",
    value: function copyItems(items, destinationDirectory) {}
  }, {
    key: "uploadFileChunk",
    value: function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {}
  }, {
    key: "abortFileUpload",
    value: function abortFileUpload(fileData, chunksInfo, destinationDirectory) {}
  }, {
    key: "downloadItems",
    value: function downloadItems(items) {}
  }, {
    key: "getItemsContent",
    value: function getItemsContent(items) {}
  }, {
    key: "getFileUploadChunkSize",
    value: function getFileUploadChunkSize() {
      return DEFAULT_FILE_UPLOAD_CHUNK_SIZE;
    }
  }, {
    key: "_getItemsByType",
    value: function _getItemsByType(path, folders) {
      return this.getItems(path).filter(function (item) {
        return item.isDirectory === folders;
      });
    }
  }, {
    key: "_convertDataObjectsToFileItems",
    value: function _convertDataObjectsToFileItems(entries, pathInfo) {
      var _this = this;

      var result = [];
      (0, _iterator.each)(entries, function (_, entry) {
        var fileItem = _this._createFileItem(entry, pathInfo);

        result.push(fileItem);
      });
      return result;
    }
  }, {
    key: "_createFileItem",
    value: function _createFileItem(dataObj, pathInfo) {
      var fileItem = new _file_system_item.default(pathInfo, this._nameGetter(dataObj), !!this._isDirGetter(dataObj));
      fileItem.size = this._sizeGetter(dataObj);

      if (fileItem.size === undefined) {
        fileItem.size = 0;
      }

      fileItem.dateModified = _date_serialization.default.deserializeDate(this._dateModifiedGetter(dataObj));

      if (fileItem.dateModified === undefined) {
        fileItem.dateModified = new Date();
      }

      if (fileItem.isDirectory) {
        fileItem.hasSubDirectories = this._hasSubDirs(dataObj);
      }

      fileItem.key = this._keyGetter(dataObj);

      if (!fileItem.key) {
        fileItem.key = fileItem.relativeName;
      }

      fileItem.thumbnail = this._thumbnailGetter(dataObj) || '';
      fileItem.dataItem = dataObj;
      return fileItem;
    }
  }, {
    key: "_hasSubDirs",
    value: function _hasSubDirs(dataObj) {
      return true;
    }
  }, {
    key: "_getKeyExpr",
    value: function _getKeyExpr(options) {
      return options.keyExpr || this._defaultKeyExpr;
    }
  }, {
    key: "_defaultKeyExpr",
    value: function _defaultKeyExpr(fileItem) {
      if (arguments.length === 2) {
        fileItem.__KEY__ = arguments[1];
        return;
      }

      return Object.prototype.hasOwnProperty.call(fileItem, '__KEY__') ? fileItem.__KEY__ : null;
    }
  }, {
    key: "_getNameExpr",
    value: function _getNameExpr(options) {
      return options.nameExpr || 'name';
    }
  }, {
    key: "_getIsDirExpr",
    value: function _getIsDirExpr(options) {
      return options.isDirectoryExpr || 'isDirectory';
    }
  }, {
    key: "_getSizeExpr",
    value: function _getSizeExpr(options) {
      return options.sizeExpr || 'size';
    }
  }, {
    key: "_getDateModifiedExpr",
    value: function _getDateModifiedExpr(options) {
      return options.dateModifiedExpr || 'dateModified';
    }
  }, {
    key: "_executeActionAsDeferred",
    value: function _executeActionAsDeferred(action, keepResult) {
      var deferred = new _deferred.Deferred();

      try {
        var result = action();

        if ((0, _type.isPromise)(result)) {
          (0, _deferred.fromPromise)(result).done(function (userResult) {
            return deferred.resolve(keepResult && userResult || undefined);
          }).fail(function (error) {
            return deferred.reject(error);
          });
        } else {
          deferred.resolve(keepResult && result || undefined);
        }
      } catch (error) {
        return deferred.reject(error);
      }

      return deferred.promise();
    }
  }]);

  return FileSystemProviderBase;
}();

var _default = FileSystemProviderBase;
exports.default = _default;
module.exports = exports.default;