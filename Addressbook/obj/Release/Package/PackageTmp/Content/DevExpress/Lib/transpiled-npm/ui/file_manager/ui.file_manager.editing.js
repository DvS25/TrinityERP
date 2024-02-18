"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _deferred = require("../../core/utils/deferred");

var _iterator = require("../../core/utils/iterator");

var _string = require("../../core/utils/string");

var _message = _interopRequireDefault(require("../../localization/message"));

var _ui = _interopRequireDefault(require("../widget/ui.widget"));

var _uiFile_manager = _interopRequireDefault(require("./ui.file_manager.dialog_manager"));

var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.file_uploader"));

var _uiFile_manager3 = require("./ui.file_manager.messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FileManagerEditingControl = /*#__PURE__*/function (_Widget) {
  _inherits(FileManagerEditingControl, _Widget);

  var _super = _createSuper(FileManagerEditingControl);

  function FileManagerEditingControl() {
    _classCallCheck(this, FileManagerEditingControl);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerEditingControl, [{
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(FileManagerEditingControl.prototype), "_initMarkup", this).call(this);

      this._initActions();

      this._controller = this.option('controller');

      this._controller.on('EditActionStarting', this._onEditActionStarting.bind(this));

      this._controller.on('EditActionResultAcquired', this._onEditActionResultAcquired.bind(this));

      this._controller.on('EditActionItemError', this._onEditActionItemError.bind(this));

      this._controller.on('EditActionError', this._onEditActionError.bind(this));

      this._controller.on('CompleteEditActionItem', this._onCompleteEditActionItem.bind(this));

      this._controller.on('CompleteEditAction', this._onCompleteEditAction.bind(this));

      this._model = this.option('model');
      this._uploadOperationInfoMap = {};
      this._dialogManager = new _uiFile_manager.default(this.$element(), {
        chooseDirectoryDialog: {
          provider: this._controller._fileProvider,
          getDirectories: this._controller.getDirectories.bind(this._controller),
          getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
        },
        onDialogClosed: this._onDialogClosed.bind(this)
      });
      this._fileUploader = this._createFileUploader();

      this._createMetadataMap();
    }
  }, {
    key: "_initNotificationControl",
    value: function _initNotificationControl(notificationControl) {
      var _this = this;

      this._notificationControl = notificationControl;

      this._notificationControl.option({
        onOperationCanceled: function onOperationCanceled(_ref) {
          var info = _ref.info;
          return _this._onCancelUploadSession(info);
        },
        onOperationItemCanceled: function onOperationItemCanceled(_ref2) {
          var item = _ref2.item,
              itemIndex = _ref2.itemIndex;
          return _this._onCancelFileUpload(item, itemIndex);
        }
      });
    }
  }, {
    key: "_getFileUploaderComponent",
    value: function _getFileUploaderComponent() {
      return _uiFile_manager2.default;
    }
  }, {
    key: "_createFileUploader",
    value: function _createFileUploader() {
      var _this2 = this;

      var $fileUploader = (0, _renderer.default)('<div>').appendTo(this.$element());
      return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
        getController: this._getFileUploaderController.bind(this),
        dropZonePlaceholderContainer: this.option('uploadDropZonePlaceholderContainer'),
        onUploadSessionStarted: function onUploadSessionStarted(e) {
          return _this2._onUploadSessionStarted(e);
        },
        onUploadProgress: function onUploadProgress(e) {
          return _this2._onUploadProgress(e);
        }
      });
    }
  }, {
    key: "setUploaderDropZone",
    value: function setUploaderDropZone($element) {
      this._fileUploader.option('dropZone', $element);
    }
  }, {
    key: "_getFileUploaderController",
    value: function _getFileUploaderController() {
      var _this3 = this;

      return {
        chunkSize: this._controller.getFileUploadChunkSize(),
        uploadFileChunk: function uploadFileChunk(fileData, chunksInfo) {
          var _this3$uploadDirector;

          return _this3._controller.uploadFileChunk(fileData, chunksInfo, (_this3$uploadDirector = _this3.uploadDirectoryInfo) === null || _this3$uploadDirector === void 0 ? void 0 : _this3$uploadDirector.fileItem);
        },
        abortFileUpload: function abortFileUpload(fileData, chunksInfo) {
          var _this3$uploadDirector2;

          return _this3._controller.abortFileUpload(fileData, chunksInfo, (_this3$uploadDirector2 = _this3.uploadDirectoryInfo) === null || _this3$uploadDirector2 === void 0 ? void 0 : _this3$uploadDirector2.fileItem);
        }
      };
    }
  }, {
    key: "_createMetadataMap",
    value: function _createMetadataMap() {
      var _this4 = this;

      this._metadataMap = {
        create: {
          action: function action(arg) {
            return _this4._tryCreate(arg);
          },
          affectsAllItems: true,
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingCreateSingleItemProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingCreateSingleItemSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingCreateSingleItemErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingCreateCommonErrorMessage')
        },
        rename: {
          action: function action(arg) {
            return _this4._tryRename(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingRenameSingleItemProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingRenameSingleItemSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingRenameSingleItemErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingRenameCommonErrorMessage')
        },
        delete: {
          action: function action(arg) {
            return _this4._tryDelete(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingDeleteSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingDeleteSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingDeleteSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingDeleteMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingDeleteCommonErrorMessage')
        },
        move: {
          action: function action(arg) {
            return _this4._tryMove(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingMoveSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingMoveSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingMoveSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingMoveMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingMoveCommonErrorMessage')
        },
        copy: {
          action: function action(arg) {
            return _this4._tryCopy(arg);
          },
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingCopySingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingCopySingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingCopySingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingCopyMultipleItemsErrorMessage'),
          commonErrorMessage: _message.default.format('dxFileManager-editingCopyCommonErrorMessage')
        },
        upload: {
          action: function action(arg) {
            return _this4._tryUpload(arg);
          },
          allowCancel: true,
          allowItemProgress: true,
          singleItemProcessingMessage: _message.default.format('dxFileManager-editingUploadSingleItemProcessingMessage'),
          multipleItemsProcessingMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsProcessingMessage'),
          singleItemSuccessMessage: _message.default.format('dxFileManager-editingUploadSingleItemSuccessMessage'),
          multipleItemsSuccessMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsSuccessMessage'),
          singleItemErrorMessage: _message.default.format('dxFileManager-editingUploadSingleItemErrorMessage'),
          multipleItemsErrorMessage: _message.default.format('dxFileManager-editingUploadMultipleItemsErrorMessage'),
          canceledMessage: _message.default.format('dxFileManager-editingUploadCanceledMessage')
        },
        download: {
          action: function action(arg) {
            return _this4._download(arg);
          }
        },
        getItemContent: {
          action: function action(arg) {
            return _this4._getItemContent(arg);
          }
        },
        getItems: {
          singleItemProcessingMessage: '',
          singleItemErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed'),
          commonErrorMessage: _message.default.format('dxFileManager-errorDirectoryOpenFailed')
        }
      };
    }
  }, {
    key: "getCommandActions",
    value: function getCommandActions() {
      var _this5 = this;

      var result = {};
      (0, _iterator.each)(this._metadataMap, function (name) {
        if (Object.prototype.hasOwnProperty.call(_this5._metadataMap, name)) {
          result[name] = function (arg) {
            return _this5._executeAction(name, arg);
          };
        }
      });
      return result;
    }
  }, {
    key: "_executeAction",
    value: function _executeAction(actionName, arg) {
      var actionMetadata = this._metadataMap[actionName];
      return actionMetadata ? actionMetadata.action(arg) : null;
    }
  }, {
    key: "_onCancelUploadSession",
    value: function _onCancelUploadSession(info) {
      this._fileUploader.cancelUpload(info.uploadSessionId);
    }
  }, {
    key: "_onCancelFileUpload",
    value: function _onCancelFileUpload(item, itemIndex) {
      this._fileUploader.cancelFileUpload(item.info.uploadSessionId, itemIndex);
    }
  }, {
    key: "_onUploadProgress",
    value: function _onUploadProgress(_ref3) {
      var sessionId = _ref3.sessionId,
          fileIndex = _ref3.fileIndex,
          commonValue = _ref3.commonValue,
          fileValue = _ref3.fileValue;
      var operationInfo = this._uploadOperationInfoMap[sessionId];

      this._notificationControl.updateOperationItemProgress(operationInfo, fileIndex, fileValue * 100, commonValue * 100);
    }
  }, {
    key: "_onUploadSessionStarted",
    value: function _onUploadSessionStarted(_ref4) {
      var sessionInfo = _ref4.sessionInfo;

      this._controller.processUploadSession(sessionInfo, this.uploadDirectoryInfo);
    }
  }, {
    key: "_onEditActionStarting",
    value: function _onEditActionStarting(actionInfo) {
      var actionMetadata = this._metadataMap[actionInfo.name];
      var context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);

      var operationInfo = this._notificationControl.addOperation(context.processingMessage, actionMetadata.allowCancel, !actionMetadata.allowItemProgress);

      (0, _extend.extend)(actionInfo.customData, {
        context: context,
        operationInfo: operationInfo
      });

      switch (actionInfo.name) {
        case 'upload':
          {
            var sessionId = actionInfo.customData.sessionInfo.sessionId;
            operationInfo.uploadSessionId = sessionId;
            this._uploadOperationInfoMap[sessionId] = operationInfo;
          }
          break;

        case 'rename':
          actionInfo.customData.context.itemNewName = actionInfo.customData.itemNewName;
          break;

        default:
          break;
      }
    }
  }, {
    key: "_onEditActionResultAcquired",
    value: function _onEditActionResultAcquired(actionInfo) {
      var _this6 = this;

      var _actionInfo$customDat = actionInfo.customData,
          context = _actionInfo$customDat.context,
          operationInfo = _actionInfo$customDat.operationInfo;
      context.singleRequest = actionInfo.singleRequest;
      var details = context.itemInfos.map(function (itemInfo) {
        return _this6._getItemProgressDisplayInfo(itemInfo);
      });

      this._notificationControl.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel);
    }
  }, {
    key: "_onEditActionError",
    value: function _onEditActionError(actionInfo, error) {
      var _actionInfo$customDat2 = actionInfo.customData,
          context = _actionInfo$customDat2.context,
          operationInfo = _actionInfo$customDat2.operationInfo;
      context.singleRequest = actionInfo.singleRequest;

      this._handleActionError(operationInfo, context, error);

      this._completeAction(operationInfo, context);
    }
  }, {
    key: "_onEditActionItemError",
    value: function _onEditActionItemError(actionInfo, info) {
      var _actionInfo$customDat3 = actionInfo.customData,
          context = _actionInfo$customDat3.context,
          operationInfo = _actionInfo$customDat3.operationInfo;

      this._handleActionError(operationInfo, context, info);
    }
  }, {
    key: "_onCompleteEditActionItem",
    value: function _onCompleteEditActionItem(actionInfo, info) {
      var _actionInfo$customDat4 = actionInfo.customData,
          context = _actionInfo$customDat4.context,
          operationInfo = _actionInfo$customDat4.operationInfo;

      if (!info.result || !info.result.canceled) {
        context.completeOperationItem(info.index);

        this._notificationControl.completeOperationItem(operationInfo, info.index, context.commonProgress);
      }
    }
  }, {
    key: "_onCompleteEditAction",
    value: function _onCompleteEditAction(actionInfo) {
      var _actionInfo$customDat5 = actionInfo.customData,
          context = _actionInfo$customDat5.context,
          operationInfo = _actionInfo$customDat5.operationInfo;

      this._completeAction(operationInfo, context);

      if (actionInfo.name === 'upload') {
        delete this._uploadOperationInfoMap[actionInfo.customData.sessionInfo.sessionId];
      }
    }
  }, {
    key: "_tryCreate",
    value: function _tryCreate(parentDirectories) {
      var _this7 = this;

      var parentDirectoryInfo = parentDirectories && parentDirectories[0] || this._getCurrentDirectory();

      var newDirName = _message.default.format('dxFileManager-newDirectoryName');

      return this._showDialog(this._dialogManager.getCreateItemDialog(), newDirName).then(function (_ref5) {
        var name = _ref5.name;
        return _this7._controller.createDirectory(parentDirectoryInfo, name);
      });
    }
  }, {
    key: "_tryRename",
    value: function _tryRename(itemInfos) {
      var _this8 = this;

      var itemInfo = itemInfos && itemInfos[0] || this._model.getMultipleSelectedItems()[0];

      return this._showDialog(this._dialogManager.getRenameItemDialog(), itemInfo.fileItem.name).then(function (_ref6) {
        var name = _ref6.name;
        return _this8._controller.renameItem(itemInfo, name);
      });
    }
  }, {
    key: "_tryDelete",
    value: function _tryDelete(itemInfos) {
      var _this9 = this;

      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      var itemName = itemInfos[0].fileItem.name;
      var itemCount = itemInfos.length;
      return this._showDialog(this._dialogManager.getDeleteItemDialog(), {
        itemName: itemName,
        itemCount: itemCount
      }).then(function () {
        return _this9._controller.deleteItems(itemInfos);
      });
    }
  }, {
    key: "_tryMove",
    value: function _tryMove(itemInfos) {
      var _this10 = this;

      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      return this._showDialog(this._dialogManager.getMoveDialog()).then(function (_ref7) {
        var folder = _ref7.folder;
        return _this10._controller.moveItems(itemInfos, folder);
      });
    }
  }, {
    key: "_tryCopy",
    value: function _tryCopy(itemInfos) {
      var _this11 = this;

      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      return this._showDialog(this._dialogManager.getCopyDialog()).then(function (_ref8) {
        var folder = _ref8.folder;
        return _this11._controller.copyItems(itemInfos, folder);
      });
    }
  }, {
    key: "_tryUpload",
    value: function _tryUpload(destinationFolder) {
      this._uploadDirectoryInfo = destinationFolder === null || destinationFolder === void 0 ? void 0 : destinationFolder[0];

      this._fileUploader.tryUpload();
    }
  }, {
    key: "_download",
    value: function _download(itemInfos) {
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      return this._controller.downloadItems(itemInfos);
    }
  }, {
    key: "_getItemContent",
    value: function _getItemContent(itemInfos) {
      itemInfos = itemInfos || this._model.getMultipleSelectedItems();
      return this._controller.getItemContent(itemInfos);
    }
  }, {
    key: "_completeAction",
    value: function _completeAction(operationInfo, context) {
      this._notificationControl.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);

      if (context.hasModifiedItems()) {
        this._raiseOnSuccess(context.onlyFiles);
      }
    }
  }, {
    key: "_handleActionError",
    value: function _handleActionError(operationInfo, context, errorInfo) {
      operationInfo.hasError = true;

      if (context.singleRequest) {
        this._handleSingleRequestActionError(operationInfo, context, errorInfo);
      } else {
        this._handleMultipleRequestActionError(operationInfo, context, errorInfo);
      }
    }
  }, {
    key: "_handleSingleRequestActionError",
    value: function _handleSingleRequestActionError(operationInfo, context, errorInfo) {
      var itemInfo = context.getItemForSingleRequestError();
      var itemName = context.itemNewName;

      var errorText = this._getErrorText(errorInfo, itemInfo, itemName);

      context.processSingleRequestError(errorText);

      var operationErrorInfo = this._getOperationErrorInfo(context);

      this._notificationControl.completeSingleOperationWithError(operationInfo, operationErrorInfo);

      if (context.multipleItems) {
        this._raiseOnSuccess(context.onlyFiles);
      }
    }
  }, {
    key: "_handleMultipleRequestActionError",
    value: function _handleMultipleRequestActionError(operationInfo, context, errorInfo) {
      var itemInfo = context.getItemForMultipleRequestError(errorInfo.index);

      var errorText = this._getErrorText(errorInfo, itemInfo);

      context.processMultipleRequestError(errorInfo.index, errorText);

      var operationErrorInfo = this._getOperationErrorInfo(context);

      this._notificationControl.addOperationDetailsError(operationInfo, operationErrorInfo);
    }
  }, {
    key: "_getOperationErrorInfo",
    value: function _getOperationErrorInfo(context) {
      var detailError = context.errorState.currentDetailError;
      return {
        commonErrorText: context.errorState.commonErrorText,
        item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
        itemIndex: detailError.itemIndex,
        detailErrorText: detailError.errorText
      };
    }
  }, {
    key: "_getErrorText",
    value: function _getErrorText(errorInfo, itemInfo, itemName) {
      itemName = itemName || (itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem.name);

      var errorText = _uiFile_manager3.FileManagerMessages.get(errorInfo.errorId, itemName);

      var errorArgs = {
        fileSystemItem: itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.fileItem,
        errorCode: errorInfo.errorId,
        errorText: errorText
      };

      this._raiseOnError(errorArgs);

      return errorArgs.errorText;
    }
  }, {
    key: "_getItemProgressDisplayInfo",
    value: function _getItemProgressDisplayInfo(itemInfo) {
      return {
        commonText: itemInfo.fileItem.name,
        imageUrl: this._getItemThumbnail(itemInfo)
      };
    }
  }, {
    key: "_showDialog",
    value: function _showDialog(dialog, dialogArgument) {
      this._dialogDeferred = new _deferred.Deferred();
      dialog.show(dialogArgument);
      return this._dialogDeferred.promise();
    }
  }, {
    key: "_onDialogClosed",
    value: function _onDialogClosed(e) {
      var result = e.dialogResult;

      if (result) {
        this._dialogDeferred.resolve(result);
      } else {
        this._dialogDeferred.reject();
      }
    }
  }, {
    key: "_getItemThumbnail",
    value: function _getItemThumbnail(item) {
      var itemThumbnailGetter = this.option('getItemThumbnail');

      if (!itemThumbnailGetter) {
        return null;
      }

      var info = itemThumbnailGetter(item);
      return info ? info.thumbnail : null;
    }
  }, {
    key: "_initActions",
    value: function _initActions() {
      this._actions = {
        onSuccess: this._createActionByOption('onSuccess'),
        onError: this._createActionByOption('onError'),
        onCreating: this._createActionByOption('onCreating')
      };
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileManagerEditingControl.prototype), "_getDefaultOptions", this).call(this), {
        model: {
          getMultipleSelectedItems: null
        },
        notificationControl: null,
        getItemThumbnail: null,
        onSuccess: null,
        onError: null,
        onCreating: null
      });
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var name = args.name;

      switch (name) {
        case 'model':
          this.repaint();
          break;

        case 'notificationControl':
          this._initNotificationControl(args.value);

          break;

        case 'getItemThumbnail':
          break;

        case 'uploadDropZonePlaceholderContainer':
          this._fileUploader.option('dropZonePlaceholderContainer', args.value);

          break;

        case 'onSuccess':
        case 'onError':
        case 'onCreating':
          this._actions[name] = this._createActionByOption(name);
          break;

        default:
          _get(_getPrototypeOf(FileManagerEditingControl.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "_raiseOnSuccess",
    value: function _raiseOnSuccess(updatedOnlyFiles) {
      this._actions.onSuccess({
        updatedOnlyFiles: updatedOnlyFiles
      });
    }
  }, {
    key: "_raiseOnError",
    value: function _raiseOnError(args) {
      this._actions.onError(args);
    }
  }, {
    key: "_getCurrentDirectory",
    value: function _getCurrentDirectory() {
      return this._controller.getCurrentDirectory();
    }
  }, {
    key: "uploadDirectoryInfo",
    get: function get() {
      return this._uploadDirectoryInfo || this._getCurrentDirectory();
    }
  }]);

  return FileManagerEditingControl;
}(_ui.default);

var FileManagerActionContext = /*#__PURE__*/function () {
  function FileManagerActionContext(actionMetadata, itemInfos, directoryInfo) {
    _classCallCheck(this, FileManagerActionContext);

    this._actionMetadata = actionMetadata;
    this._itemInfos = itemInfos;
    this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(function (info) {
      return !info.fileItem.isDirectory;
    });
    this._items = this._itemInfos.map(function (itemInfo) {
      return itemInfo.fileItem;
    });
    this._multipleItems = this._items.length > 1;
    this._location = directoryInfo.getDisplayName();
    this._singleRequest = true;
    this._completedItems = [];
    this._commonProgress = 0;
    this._errorState = {
      failedCount: 0
    };
    this._itemNewName = '';
  }

  _createClass(FileManagerActionContext, [{
    key: "completeOperationItem",
    value: function completeOperationItem(itemIndex) {
      if (this._singleRequest) {
        this._completedItems = _toConsumableArray(this._items);
      } else {
        var item = this._items[itemIndex];

        this._completedItems.push(item);
      }

      if (!this._actionMetadata.allowItemProgress) {
        this._commonProgress = this._completedItems.length / this._items.length * 100;
      }
    }
  }, {
    key: "processSingleRequestError",
    value: function processSingleRequestError(errorText) {
      this._errorState.failedCount = 1;
      this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
      var itemIndex = this._multipleItems ? -1 : 1;
      var itemInfo = this.getItemForSingleRequestError();

      this._setCurrentDetailError(itemIndex, itemInfo, errorText);
    }
  }, {
    key: "processMultipleRequestError",
    value: function processMultipleRequestError(itemIndex, errorText) {
      this._errorState.failedCount++;
      this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
      var itemInfo = this.getItemForMultipleRequestError(itemIndex);

      this._setCurrentDetailError(itemIndex, itemInfo, errorText);
    }
  }, {
    key: "hasModifiedItems",
    value: function hasModifiedItems() {
      return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems;
    }
  }, {
    key: "getItemForSingleRequestError",
    value: function getItemForSingleRequestError() {
      return this._multipleItems ? null : this._itemInfos[0];
    }
  }, {
    key: "getItemForMultipleRequestError",
    value: function getItemForMultipleRequestError(itemIndex) {
      return this._itemInfos[itemIndex];
    }
  }, {
    key: "_setCurrentDetailError",
    value: function _setCurrentDetailError(itemIndex, itemInfo, errorText) {
      this._errorState.currentDetailError = {
        itemIndex: itemIndex,
        itemInfo: itemInfo,
        errorText: errorText
      };
    }
  }, {
    key: "_hasCompletedItems",
    value: function _hasCompletedItems() {
      return this._completedItems.length > 0;
    }
  }, {
    key: "actionMetadata",
    get: function get() {
      return this._actionMetadata;
    }
  }, {
    key: "itemInfos",
    get: function get() {
      return this._itemInfos;
    }
  }, {
    key: "itemNewName",
    get: function get() {
      return this._itemNewName;
    },
    set: function set(value) {
      this._itemNewName = value;
    }
  }, {
    key: "errorState",
    get: function get() {
      return this._errorState;
    }
  }, {
    key: "singleRequest",
    get: function get() {
      return this._singleRequest;
    },
    set: function set(value) {
      this._singleRequest = value;
    }
  }, {
    key: "multipleItems",
    get: function get() {
      return this._multipleItems;
    }
  }, {
    key: "onlyFiles",
    get: function get() {
      return this._onlyFiles;
    }
  }, {
    key: "processingMessage",
    get: function get() {
      return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemProcessingMessage, this._location);
    }
  }, {
    key: "successMessage",
    get: function get() {
      if (this._hasCompletedItems()) {
        return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemSuccessMessage, this._location);
      } else {
        return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage;
      }
    }
  }, {
    key: "completionMessage",
    get: function get() {
      return this.success ? this.successMessage : this.errorState.commonErrorText;
    }
  }, {
    key: "statusText",
    get: function get() {
      return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : undefined;
    }
  }, {
    key: "commonProgress",
    get: function get() {
      return this._commonProgress;
    }
  }, {
    key: "success",
    get: function get() {
      return !this._errorState.failedCount;
    }
  }]);

  return FileManagerActionContext;
}();

var _default = FileManagerEditingControl;
exports.default = _default;
module.exports = exports.default;