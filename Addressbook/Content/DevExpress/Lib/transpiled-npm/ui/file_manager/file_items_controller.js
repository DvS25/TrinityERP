"use strict";

exports.default = void 0;

var _provider_base = _interopRequireDefault(require("../../file_management/provider_base"));

var _file_system_item = _interopRequireDefault(require("../../file_management/file_system_item"));

var _object_provider = _interopRequireDefault(require("../../file_management/object_provider"));

var _remote_provider = _interopRequireDefault(require("../../file_management/remote_provider"));

var _custom_provider = _interopRequireDefault(require("../../file_management/custom_provider"));

var _errors = _interopRequireDefault(require("../../file_management/errors"));

var _utils = require("../../file_management/utils");

var _uiFile_manager = require("./ui.file_manager.common");

var _deferred = require("../../core/utils/deferred");

var _array = require("../../core/utils/array");

var _extend = require("../../core/utils/extend");

var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME = 'Files';

var FileItemsController = /*#__PURE__*/function () {
  function FileItemsController(options) {
    _classCallCheck(this, FileItemsController);

    options = options || {};
    this._options = (0, _extend.extend)({}, options);
    this._isInitialized = false;
    this._dataLoading = false;
    this._dataLoadingDeferred = null;
    this._rootDirectoryInfo = this._createRootDirectoryInfo(options.rootText);
    this._currentDirectoryInfo = this._rootDirectoryInfo;
    this._defaultIconMap = this._createDefaultIconMap();
    this._securityController = new FileSecurityController({
      allowedFileExtensions: this._options.allowedFileExtensions,
      maxFileSize: this._options.uploadMaxFileSize
    });

    this._setProvider(options.fileProvider);

    this._initialize();
  }

  _createClass(FileItemsController, [{
    key: "_setProvider",
    value: function _setProvider(fileProvider) {
      this._fileProvider = this._createFileProvider(fileProvider);

      this._resetState();
    }
  }, {
    key: "_createFileProvider",
    value: function _createFileProvider(fileProvider) {
      if (!fileProvider) {
        fileProvider = [];
      }

      if (Array.isArray(fileProvider)) {
        return new _object_provider.default({
          data: fileProvider
        });
      }

      if (fileProvider instanceof _provider_base.default) {
        return fileProvider;
      }

      switch (fileProvider.type) {
        case 'remote':
          return new _remote_provider.default(fileProvider);

        case 'custom':
          return new _custom_provider.default(fileProvider);
      }

      return new _object_provider.default(fileProvider);
    }
  }, {
    key: "setCurrentPath",
    value: function setCurrentPath(path) {
      var pathParts = (0, _utils.getPathParts)(path);

      var rawPath = _utils.pathCombine.apply(void 0, _toConsumableArray(pathParts));

      if (this.getCurrentDirectory().fileItem.relativeName === rawPath) {
        return;
      }

      return this._setCurrentDirectoryByPathParts(pathParts);
    }
  }, {
    key: "setCurrentPathByKeys",
    value: function setCurrentPathByKeys(pathKeys) {
      if ((0, _common.equalByValue)(this.getCurrentDirectory().fileItem.pathKeys, pathKeys, 0, true)) {
        return;
      }

      return this._setCurrentDirectoryByPathParts(pathKeys, true);
    }
  }, {
    key: "getCurrentPath",
    value: function getCurrentPath() {
      var currentPath = '';
      var directory = this.getCurrentDirectory();

      while (directory && !directory.fileItem.isRoot()) {
        var escapedName = (0, _utils.getEscapedFileName)(directory.fileItem.name);
        currentPath = (0, _utils.pathCombine)(escapedName, currentPath);
        directory = directory.parentDirectory;
      }

      return currentPath;
    }
  }, {
    key: "getCurrentDirectory",
    value: function getCurrentDirectory() {
      return this._currentDirectoryInfo;
    }
  }, {
    key: "setCurrentDirectory",
    value: function setCurrentDirectory(directoryInfo) {
      if (!directoryInfo) {
        return;
      }

      if (this._currentDirectoryInfo && this._currentDirectoryInfo === directoryInfo) {
        return;
      }

      var requireRaiseSelectedDirectory = this._currentDirectoryInfo.fileItem.key !== directoryInfo.fileItem.key;
      this._currentDirectoryInfo = directoryInfo;

      if (requireRaiseSelectedDirectory && this._isInitialized) {
        if (!this._dataLoading) {
          this._raiseDataLoading('navigation');
        }

        this._raiseSelectedDirectoryChanged(directoryInfo);
      }
    }
  }, {
    key: "getCurrentItems",
    value: function getCurrentItems(onlyFiles) {
      var _this = this;

      return this._dataLoadingDeferred ? this._dataLoadingDeferred.then(function () {
        return _this._getCurrentItemsInternal(onlyFiles);
      }) : this._getCurrentItemsInternal(onlyFiles);
    }
  }, {
    key: "_getCurrentItemsInternal",
    value: function _getCurrentItemsInternal(onlyFiles) {
      var currentDirectory = this.getCurrentDirectory();
      return onlyFiles ? this.getFiles(currentDirectory) : this.getDirectoryContents(currentDirectory);
    }
  }, {
    key: "getDirectories",
    value: function getDirectories(parentDirectoryInfo, skipNavigationOnError) {
      return this.getDirectoryContents(parentDirectoryInfo, skipNavigationOnError).then(function (itemInfos) {
        return itemInfos.filter(function (info) {
          return info.fileItem.isDirectory;
        });
      });
    }
  }, {
    key: "getFiles",
    value: function getFiles(parentDirectoryInfo) {
      return this.getDirectoryContents(parentDirectoryInfo).then(function (itemInfos) {
        return itemInfos.filter(function (info) {
          return !info.fileItem.isDirectory;
        });
      });
    }
  }, {
    key: "getDirectoryContents",
    value: function getDirectoryContents(parentDirectoryInfo, skipNavigationOnError) {
      var _this2 = this;

      if (!parentDirectoryInfo) {
        return new _deferred.Deferred().resolve([this._rootDirectoryInfo]).promise();
      }

      if (parentDirectoryInfo.itemsLoaded) {
        return new _deferred.Deferred().resolve(parentDirectoryInfo.items).promise();
      }

      var dirKey = parentDirectoryInfo.getInternalKey();
      var loadItemsDeferred = this._loadedItems[dirKey];

      if (loadItemsDeferred) {
        return loadItemsDeferred;
      }

      loadItemsDeferred = this._getFileItems(parentDirectoryInfo, skipNavigationOnError).then(function (fileItems) {
        fileItems = fileItems || [];
        parentDirectoryInfo.items = fileItems.map(function (fileItem) {
          return fileItem.isDirectory && _this2._createDirectoryInfo(fileItem, parentDirectoryInfo) || _this2._createFileInfo(fileItem, parentDirectoryInfo);
        });
        parentDirectoryInfo.itemsLoaded = true;
        return parentDirectoryInfo.items;
      });
      this._loadedItems[dirKey] = loadItemsDeferred;
      loadItemsDeferred.always(function () {
        delete _this2._loadedItems[dirKey];
      });
      return loadItemsDeferred;
    }
  }, {
    key: "_getFileItems",
    value: function _getFileItems(parentDirectoryInfo, skipNavigationOnError) {
      var _this3 = this;

      var loadItemsDeferred = null;

      try {
        loadItemsDeferred = this._fileProvider.getItems(parentDirectoryInfo.fileItem);
      } catch (error) {
        return this._handleItemLoadError(parentDirectoryInfo, error, skipNavigationOnError);
      }

      return (0, _deferred.when)(loadItemsDeferred).then(function (fileItems) {
        return _this3._securityController.getAllowedItems(fileItems);
      }, function (errorInfo) {
        return _this3._handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError);
      });
    }
  }, {
    key: "createDirectory",
    value: function createDirectory(parentDirectoryInfo, name) {
      var _this4 = this;

      var tempDirInfo = this._createDirInfoByName(name, parentDirectoryInfo);

      var actionInfo = this._createEditActionInfo('create', tempDirInfo, parentDirectoryInfo);

      return this._processEditAction(actionInfo, function () {
        return _this4._fileProvider.createDirectory(parentDirectoryInfo.fileItem, name);
      }, function () {
        return _this4._resetDirectoryState(parentDirectoryInfo);
      });
    }
  }, {
    key: "renameItem",
    value: function renameItem(fileItemInfo, name) {
      var _this5 = this;

      var actionInfo = this._createEditActionInfo('rename', fileItemInfo, fileItemInfo.parentDirectory, {
        itemNewName: name
      });

      return this._processEditAction(actionInfo, function () {
        if (!fileItemInfo.fileItem.isDirectory) {
          _this5._securityController.validateExtension(name);
        }

        return _this5._fileProvider.renameItem(fileItemInfo.fileItem, name);
      }, function () {
        _this5._resetDirectoryState(fileItemInfo.parentDirectory);

        _this5.setCurrentDirectory(fileItemInfo.parentDirectory);
      });
    }
  }, {
    key: "moveItems",
    value: function moveItems(itemInfos, destinationDirectory) {
      var _this6 = this;

      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });

      var actionInfo = this._createEditActionInfo('move', itemInfos, destinationDirectory);

      return this._processEditAction(actionInfo, function () {
        return _this6._fileProvider.moveItems(items, destinationDirectory.fileItem);
      }, function () {
        itemInfos.forEach(function (itemInfo) {
          return _this6._resetDirectoryState(itemInfo.parentDirectory);
        });

        _this6._resetDirectoryState(destinationDirectory);

        _this6.setCurrentDirectory(destinationDirectory);
      });
    }
  }, {
    key: "copyItems",
    value: function copyItems(itemInfos, destinationDirectory) {
      var _this7 = this;

      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });

      var actionInfo = this._createEditActionInfo('copy', itemInfos, destinationDirectory);

      return this._processEditAction(actionInfo, function () {
        return _this7._fileProvider.copyItems(items, destinationDirectory.fileItem);
      }, function () {
        _this7._resetDirectoryState(destinationDirectory);

        _this7.setCurrentDirectory(destinationDirectory);

        destinationDirectory.expanded = true;
      });
    }
  }, {
    key: "deleteItems",
    value: function deleteItems(itemInfos) {
      var _this8 = this;

      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });
      var directory = itemInfos.length > 0 ? itemInfos[0].parentDirectory : null;

      var actionInfo = this._createEditActionInfo('delete', itemInfos, directory);

      return this._processEditAction(actionInfo, function () {
        return _this8._fileProvider.deleteItems(items);
      }, function () {
        itemInfos.forEach(function (itemInfo) {
          var parentDir = itemInfo.parentDirectory;

          _this8._resetDirectoryState(parentDir);

          _this8.setCurrentDirectory(parentDir);
        });
      });
    }
  }, {
    key: "processUploadSession",
    value: function processUploadSession(sessionInfo, uploadDirectoryInfo) {
      var _this9 = this;

      var itemInfos = this._getItemInfosForUploaderFiles(sessionInfo.files, uploadDirectoryInfo);

      var actionInfo = this._createEditActionInfo('upload', itemInfos, uploadDirectoryInfo, {
        sessionInfo: sessionInfo
      });

      return this._processEditAction(actionInfo, function () {
        return sessionInfo.deferreds;
      }, function () {
        return _this9._resetDirectoryState(uploadDirectoryInfo);
      });
    }
  }, {
    key: "uploadFileChunk",
    value: function uploadFileChunk(fileData, chunksInfo, destinationDirectory) {
      this._securityController.validateMaxFileSize(fileData.size);

      this._securityController.validateExtension(fileData.name);

      return (0, _deferred.when)(this._fileProvider.uploadFileChunk(fileData, chunksInfo, destinationDirectory));
    }
  }, {
    key: "abortFileUpload",
    value: function abortFileUpload(fileData, chunksInfo, destinationDirectory) {
      return (0, _deferred.when)(this._fileProvider.abortFileUpload(fileData, chunksInfo, destinationDirectory));
    }
  }, {
    key: "getFileUploadChunkSize",
    value: function getFileUploadChunkSize() {
      var chunkSize = this._options.uploadChunkSize;

      if (chunkSize && chunkSize > 0) {
        return chunkSize;
      }

      return this._fileProvider.getFileUploadChunkSize();
    }
  }, {
    key: "downloadItems",
    value: function downloadItems(itemInfos) {
      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });

      this._fileProvider.downloadItems(items);
    }
  }, {
    key: "getItemContent",
    value: function getItemContent(itemInfos) {
      var items = itemInfos.map(function (i) {
        return i.fileItem;
      });
      return (0, _deferred.when)(this._fileProvider.getItemsContent(items));
    }
  }, {
    key: "_handleItemLoadError",
    value: function _handleItemLoadError(parentDirectoryInfo, errorInfo, skipNavigationOnError) {
      var actionInfo = this._createEditActionInfo('getItems', parentDirectoryInfo, parentDirectoryInfo);

      this._raiseEditActionStarting(actionInfo);

      this._raiseEditActionResultAcquired(actionInfo);

      this._raiseEditActionError(actionInfo, {
        errorId: errorInfo.errorId,
        fileItem: parentDirectoryInfo.fileItem,
        index: 0
      });

      this._resetDirectoryState(parentDirectoryInfo);

      parentDirectoryInfo.expanded = false;

      if (!skipNavigationOnError) {
        this.setCurrentDirectory(parentDirectoryInfo.parentDirectory);
      }

      return new _deferred.Deferred().reject().promise();
    }
  }, {
    key: "_processEditAction",
    value: function _processEditAction(actionInfo, action, completeAction) {
      var _this10 = this;

      var actionResult = null;

      this._raiseEditActionStarting(actionInfo);

      try {
        actionResult = action();
      } catch (error) {
        this._raiseEditActionError(actionInfo, error);

        return new _deferred.Deferred().reject().promise();
      }

      if (!Array.isArray(actionResult)) {
        actionResult = [actionResult];
      } else if (actionResult.length > 1) {
        actionInfo.singleRequest = false;
      }

      this._raiseEditActionResultAcquired(actionInfo);

      return (0, _uiFile_manager.whenSome)(actionResult, function (info) {
        return _this10._raiseCompleteEditActionItem(actionInfo, info);
      }, function (info) {
        return _this10._raiseEditActionItemError(actionInfo, info);
      }).then(function () {
        completeAction();

        _this10._raiseCompleteEditAction(actionInfo);
      });
    }
  }, {
    key: "_createEditActionInfo",
    value: function _createEditActionInfo(name, targetItemInfos, directory, customData) {
      targetItemInfos = Array.isArray(targetItemInfos) ? targetItemInfos : [targetItemInfos];
      customData = customData || {};
      var items = targetItemInfos.map(function (itemInfo) {
        return itemInfo.fileItem;
      });
      return {
        name: name,
        itemInfos: targetItemInfos,
        items: items,
        directory: directory,
        customData: customData,
        singleRequest: true
      };
    }
  }, {
    key: "_getItemInfosForUploaderFiles",
    value: function _getItemInfosForUploaderFiles(files, parentDirectoryInfo) {
      var pathInfo = this._getPathInfo(parentDirectoryInfo);

      var result = [];

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var item = new _file_system_item.default(pathInfo, file.name, false);

        var itemInfo = this._createFileInfo(item, parentDirectoryInfo);

        result.push(itemInfo);
      }

      return result;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this11 = this;

      if (this._lockRefresh) {
        return this._refreshDeferred;
      }

      this._lockRefresh = true;
      return this._executeDataLoad(function () {
        return _this11._refreshDeferred = _this11._refreshInternal();
      }, 'refresh');
    }
  }, {
    key: "_refreshInternal",
    value: function _refreshInternal() {
      var _this12 = this;

      var cachedRootInfo = {
        items: this._rootDirectoryInfo.items
      };

      var selectedKeyParts = this._getDirectoryPathKeyParts(this.getCurrentDirectory());

      this._resetDirectoryState(this._rootDirectoryInfo);

      return this._loadItemsRecursive(this._rootDirectoryInfo, cachedRootInfo).then(function () {
        var dirInfo = _this12._findSelectedDirectoryByPathKeyParts(selectedKeyParts);

        _this12.setCurrentDirectory(dirInfo);

        delete _this12._lockRefresh;
      });
    }
  }, {
    key: "_loadItemsRecursive",
    value: function _loadItemsRecursive(directoryInfo, cachedDirectoryInfo) {
      var _this13 = this;

      return this.getDirectories(directoryInfo).then(function (dirInfos) {
        var itemDeferreds = [];

        var _loop = function _loop(i) {
          var cachedItem = (0, _array.find)(cachedDirectoryInfo.items, function (cache) {
            return dirInfos[i].fileItem.key === cache.fileItem.key;
          });
          if (!cachedItem) return "continue";
          dirInfos[i].expanded = cachedItem.expanded;

          if (dirInfos[i].expanded) {
            itemDeferreds.push(_this13._loadItemsRecursive(dirInfos[i], cachedItem));
          }
        };

        for (var i = 0; i < dirInfos.length; i++) {
          var _ret = _loop(i);

          if (_ret === "continue") continue;
        }

        return (0, _uiFile_manager.whenSome)(itemDeferreds);
      }, function () {
        return null;
      });
    }
  }, {
    key: "_initialize",
    value: function _initialize() {
      var _this14 = this;

      var result = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);

      var completeInitialization = function completeInitialization() {
        _this14._isInitialized = true;

        _this14._raiseInitialized();
      };

      if (result) {
        (0, _deferred.when)(result).always(completeInitialization);
      } else {
        completeInitialization();
      }
    }
  }, {
    key: "_setCurrentDirectoryByPathParts",
    value: function _setCurrentDirectoryByPathParts(pathParts, useKeys) {
      var _this15 = this;

      return this._executeDataLoad(function () {
        return _this15._setCurrentDirectoryByPathPartsInternal(pathParts, useKeys);
      }, 'navigation');
    }
  }, {
    key: "_setCurrentDirectoryByPathPartsInternal",
    value: function _setCurrentDirectoryByPathPartsInternal(pathParts, useKeys) {
      var _this16 = this;

      return this._getDirectoryByPathParts(this._rootDirectoryInfo, pathParts, useKeys).then(function (directoryInfo) {
        for (var info = directoryInfo.parentDirectory; info; info = info.parentDirectory) {
          info.expanded = true;
        }

        _this16.setCurrentDirectory(directoryInfo);
      });
    }
  }, {
    key: "_executeDataLoad",
    value: function _executeDataLoad(action, operation) {
      var _this17 = this;

      this._dataLoading = true;
      this._dataLoadingDeferred = new _deferred.Deferred();

      if (this._isInitialized) {
        this._raiseDataLoading(operation);
      }

      return action().always(function () {
        _this17._dataLoadingDeferred.resolve();

        _this17._dataLoadingDeferred = null;
        _this17._dataLoading = false;
      });
    }
  }, {
    key: "_getDirectoryByPathParts",
    value: function _getDirectoryByPathParts(parentDirectoryInfo, pathParts, useKeys) {
      var _this18 = this;

      if (pathParts.length < 1) {
        return new _deferred.Deferred().resolve(parentDirectoryInfo).promise();
      }

      var fieldName = useKeys ? 'key' : 'name';
      return this.getDirectories(parentDirectoryInfo).then(function (dirInfos) {
        var subDirInfo = (0, _array.find)(dirInfos, function (d) {
          return d.fileItem[fieldName] === pathParts[0];
        });

        if (!subDirInfo) {
          return new _deferred.Deferred().reject().promise();
        }

        var restPathParts = _toConsumableArray(pathParts).splice(1);

        return _this18._getDirectoryByPathParts(subDirInfo, restPathParts, useKeys);
      });
    }
  }, {
    key: "_getDirectoryPathKeyParts",
    value: function _getDirectoryPathKeyParts(directoryInfo) {
      var pathParts = [];

      while (directoryInfo && directoryInfo.parentDirectory) {
        pathParts.unshift(directoryInfo.fileItem.key);
        directoryInfo = directoryInfo.parentDirectory;
      }

      return pathParts;
    }
  }, {
    key: "_findSelectedDirectoryByPathKeyParts",
    value: function _findSelectedDirectoryByPathKeyParts(keyParts) {
      var selectedDirInfo = this._rootDirectoryInfo;

      if (keyParts.length === 0) {
        return selectedDirInfo;
      }

      var i = 0;
      var newSelectedDir = selectedDirInfo;

      while (newSelectedDir && i < keyParts.length) {
        newSelectedDir = (0, _array.find)(selectedDirInfo.items, function (info) {
          return info.fileItem.key === keyParts[i];
        });

        if (newSelectedDir) {
          selectedDirInfo = newSelectedDir;
        }

        i++;
      }

      return selectedDirInfo;
    }
  }, {
    key: "_createDirInfoByName",
    value: function _createDirInfoByName(name, parentDirectoryInfo) {
      var dirPathInfo = this._getPathInfo(parentDirectoryInfo);

      var fileItem = new _file_system_item.default(dirPathInfo, name, true);
      return this._createDirectoryInfo(fileItem, parentDirectoryInfo);
    }
  }, {
    key: "_createDirectoryInfo",
    value: function _createDirectoryInfo(fileItem, parentDirectoryInfo) {
      return (0, _extend.extend)(this._createFileInfo(fileItem, parentDirectoryInfo), {
        icon: 'folder',
        expanded: fileItem.isRoot(),
        items: []
      });
    }
  }, {
    key: "_createFileInfo",
    value: function _createFileInfo(fileItem, parentDirectoryInfo) {
      return {
        fileItem: fileItem,
        parentDirectory: parentDirectoryInfo,
        icon: this._getFileItemDefaultIcon(fileItem),
        getInternalKey: function getInternalKey() {
          return "FIK_".concat(this.fileItem.key);
        },
        getDisplayName: function getDisplayName() {
          return this.displayName || this.fileItem.name;
        }
      };
    }
  }, {
    key: "_resetDirectoryState",
    value: function _resetDirectoryState(directoryInfo) {
      directoryInfo.itemsLoaded = false;
      directoryInfo.items = [];
    }
  }, {
    key: "_getFileItemDefaultIcon",
    value: function _getFileItemDefaultIcon(fileItem) {
      if (fileItem.isDirectory) {
        return 'folder';
      }

      var extension = fileItem.getFileExtension();
      var icon = this._defaultIconMap[extension];
      return icon || 'doc';
    }
  }, {
    key: "_createDefaultIconMap",
    value: function _createDefaultIconMap() {
      var result = {
        '.txt': 'txtfile',
        '.rtf': 'rtffile',
        '.doc': 'docfile',
        '.docx': 'docxfile',
        '.xls': 'xlsfile',
        '.xlsx': 'xlsxfile',
        '.ppt': 'pptfile',
        '.pptx': 'pptxfile',
        '.pdf': 'pdffile'
      };
      ['.png', '.gif', '.jpg', '.jpeg', '.ico', '.bmp'].forEach(function (extension) {
        result[extension] = 'image';
      });
      return result;
    }
  }, {
    key: "_createRootDirectoryInfo",
    value: function _createRootDirectoryInfo(text) {
      var rootDirectory = new _file_system_item.default(null, '', true);

      var result = this._createDirectoryInfo(rootDirectory, null);

      result.displayName = text || DEFAULT_ROOT_FILE_SYSTEM_ITEM_NAME;
      return result;
    }
  }, {
    key: "_raiseInitialized",
    value: function _raiseInitialized() {
      var e = {
        controller: this
      };

      if (this._options.onInitialized) {
        this._options.onInitialized(e);
      }
    }
  }, {
    key: "_raiseDataLoading",
    value: function _raiseDataLoading(operation) {
      if (this._options.onDataLoading) {
        this._options.onDataLoading({
          operation: operation
        });
      }
    }
  }, {
    key: "_raiseSelectedDirectoryChanged",
    value: function _raiseSelectedDirectoryChanged(directoryInfo) {
      var e = {
        selectedDirectoryInfo: directoryInfo
      };

      if (this._options.onSelectedDirectoryChanged) {
        this._options.onSelectedDirectoryChanged(e);
      }
    }
  }, {
    key: "_raiseEditActionStarting",
    value: function _raiseEditActionStarting(actionInfo) {
      if (this._options.onEditActionStarting) {
        this._options.onEditActionStarting(actionInfo);
      }
    }
  }, {
    key: "_raiseEditActionResultAcquired",
    value: function _raiseEditActionResultAcquired(actionInfo) {
      if (this._options.onEditActionResultAcquired) {
        this._options.onEditActionResultAcquired(actionInfo);
      }
    }
  }, {
    key: "_raiseEditActionError",
    value: function _raiseEditActionError(actionInfo, error) {
      if (this._options.onEditActionError) {
        this._options.onEditActionError(actionInfo, error);
      }
    }
  }, {
    key: "_raiseEditActionItemError",
    value: function _raiseEditActionItemError(actionInfo, info) {
      if (this._options.onEditActionItemError) {
        this._options.onEditActionItemError(actionInfo, info);
      }
    }
  }, {
    key: "_raiseCompleteEditActionItem",
    value: function _raiseCompleteEditActionItem(actionInfo, info) {
      if (this._options.onCompleteEditActionItem) {
        this._options.onCompleteEditActionItem(actionInfo, info);
      }
    }
  }, {
    key: "_raiseCompleteEditAction",
    value: function _raiseCompleteEditAction(actionInfo) {
      if (this._options.onCompleteEditAction) {
        this._options.onCompleteEditAction(actionInfo);
      }
    }
  }, {
    key: "_resetState",
    value: function _resetState() {
      this._selectedDirectory = null;
      this._rootDirectoryInfo.items = [];
      this._loadedItems = {};
    }
  }, {
    key: "_getPathInfo",
    value: function _getPathInfo(directoryInfo) {
      var pathInfo = [];

      for (var dirInfo = directoryInfo; dirInfo && !dirInfo.fileItem.isRoot(); dirInfo = dirInfo.parentDirectory) {
        pathInfo.unshift({
          key: dirInfo.fileItem.key,
          name: dirInfo.fileItem.name
        });
      }

      return pathInfo;
    }
  }, {
    key: "on",
    value: function on(eventName, eventHandler) {
      var finalEventName = "on".concat(eventName);
      this._options[finalEventName] = eventHandler;
    }
  }]);

  return FileItemsController;
}();

exports.default = FileItemsController;

var FileSecurityController = /*#__PURE__*/function () {
  function FileSecurityController(options) {
    var _this19 = this;

    _classCallCheck(this, FileSecurityController);

    var defaultOptions = {
      allowedFileExtensions: [],
      maxFileSize: 0
    };
    this._options = (0, _extend.extend)(defaultOptions, options);
    this._extensionsMap = {};

    this._allowedFileExtensions.forEach(function (extension) {
      _this19._extensionsMap[extension.toUpperCase()] = true;
    });
  }

  _createClass(FileSecurityController, [{
    key: "getAllowedItems",
    value: function getAllowedItems(items) {
      var _this20 = this;

      if (this._allowedFileExtensions.length === 0) {
        return items;
      }

      return items.filter(function (item) {
        return item.isDirectory || _this20._isValidExtension(item.name);
      });
    }
  }, {
    key: "validateExtension",
    value: function validateExtension(name) {
      if (!this._isValidExtension(name)) {
        this._throwError(_errors.default.WrongFileExtension);
      }
    }
  }, {
    key: "validateMaxFileSize",
    value: function validateMaxFileSize(size) {
      if (this._maxFileSize && size > this._maxFileSize) {
        this._throwError(_errors.default.MaxFileSizeExceeded);
      }
    }
  }, {
    key: "_isValidExtension",
    value: function _isValidExtension(name) {
      if (this._allowedFileExtensions.length === 0) {
        return true;
      }

      var extension = (0, _utils.getFileExtension)(name).toUpperCase();
      return this._extensionsMap[extension];
    }
  }, {
    key: "_throwError",
    value: function _throwError(errorId) {
      throw {
        errorId: errorId
      };
    }
  }, {
    key: "_allowedFileExtensions",
    get: function get() {
      return this._options.allowedFileExtensions;
    }
  }, {
    key: "_maxFileSize",
    get: function get() {
      return this._options.maxFileSize;
    }
  }]);

  return FileSecurityController;
}();

module.exports = exports.default;