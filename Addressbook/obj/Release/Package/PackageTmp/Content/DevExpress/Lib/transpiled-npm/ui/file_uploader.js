"use strict";

exports.default = void 0;

var _renderer = _interopRequireDefault(require("../core/renderer"));

var _guid = _interopRequireDefault(require("../core/guid"));

var _window = require("../core/utils/window");

var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));

var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));

var _callbacks = _interopRequireDefault(require("../core/utils/callbacks"));

var _type = require("../core/utils/type");

var _iterator = require("../core/utils/iterator");

var _extend = require("../core/utils/extend");

var _array = require("../core/utils/array");

var _deferred = require("../core/utils/deferred");

var _ajax = _interopRequireDefault(require("../core/utils/ajax"));

var _editor = _interopRequireDefault(require("./editor/editor"));

var _button = _interopRequireDefault(require("./button"));

var _progress_bar = _interopRequireDefault(require("./progress_bar"));

var _browser = _interopRequireDefault(require("../core/utils/browser"));

var _devices = _interopRequireDefault(require("../core/devices"));

var _index = require("../events/utils/index");

var _click = require("../events/click");

var _message = _interopRequireDefault(require("../localization/message"));

var _themes = require("./themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// STYLE fileUploader
var window = (0, _window.getWindow)();
var FILEUPLOADER_CLASS = 'dx-fileuploader';
var FILEUPLOADER_EMPTY_CLASS = 'dx-fileuploader-empty';
var FILEUPLOADER_SHOW_FILE_LIST_CLASS = 'dx-fileuploader-show-file-list';
var FILEUPLOADER_DRAGOVER_CLASS = 'dx-fileuploader-dragover';
var FILEUPLOADER_WRAPPER_CLASS = 'dx-fileuploader-wrapper';
var FILEUPLOADER_CONTAINER_CLASS = 'dx-fileuploader-container';
var FILEUPLOADER_CONTENT_CLASS = 'dx-fileuploader-content';
var FILEUPLOADER_INPUT_WRAPPER_CLASS = 'dx-fileuploader-input-wrapper';
var FILEUPLOADER_INPUT_CONTAINER_CLASS = 'dx-fileuploader-input-container';
var FILEUPLOADER_INPUT_LABEL_CLASS = 'dx-fileuploader-input-label';
var FILEUPLOADER_INPUT_CLASS = 'dx-fileuploader-input';
var FILEUPLOADER_FILES_CONTAINER_CLASS = 'dx-fileuploader-files-container';
var FILEUPLOADER_FILE_CONTAINER_CLASS = 'dx-fileuploader-file-container';
var FILEUPLOADER_FILE_INFO_CLASS = 'dx-fileuploader-file-info';
var FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = 'dx-fileuploader-file-status-message';
var FILEUPLOADER_FILE_CLASS = 'dx-fileuploader-file';
var FILEUPLOADER_FILE_NAME_CLASS = 'dx-fileuploader-file-name';
var FILEUPLOADER_FILE_SIZE_CLASS = 'dx-fileuploader-file-size';
var FILEUPLOADER_BUTTON_CLASS = 'dx-fileuploader-button';
var FILEUPLOADER_BUTTON_CONTAINER_CLASS = 'dx-fileuploader-button-container';
var FILEUPLOADER_CANCEL_BUTTON_CLASS = 'dx-fileuploader-cancel-button';
var FILEUPLOADER_UPLOAD_BUTTON_CLASS = 'dx-fileuploader-upload-button';
var FILEUPLOADER_INVALID_CLASS = 'dx-fileuploader-invalid';
var FILEUPLOADER_AFTER_LOAD_DELAY = 400;
var FILEUPLOADER_CHUNK_META_DATA_NAME = 'chunkMetadata';

var renderFileUploaderInput = function renderFileUploaderInput() {
  return (0, _renderer.default)('<input>').attr('type', 'file');
};

var isFormDataSupported = function isFormDataSupported() {
  return !!window.FormData;
};

var FileUploader = /*#__PURE__*/function (_Editor) {
  _inherits(FileUploader, _Editor);

  var _super = _createSuper(FileUploader);

  function FileUploader() {
    _classCallCheck(this, FileUploader);

    return _super.apply(this, arguments);
  }

  _createClass(FileUploader, [{
    key: "_supportedKeys",
    value: function _supportedKeys() {
      var _this = this;

      var click = function click(e) {
        e.preventDefault();

        var $selectButton = _this._selectButton.$element();

        _events_engine.default.trigger($selectButton, _click.name);
      };

      return (0, _extend.extend)(_get(_getPrototypeOf(FileUploader.prototype), "_supportedKeys", this).call(this), {
        space: click,
        enter: click
      });
    }
  }, {
    key: "_setOptionsByReference",
    value: function _setOptionsByReference() {
      _get(_getPrototypeOf(FileUploader.prototype), "_setOptionsByReference", this).call(this);

      (0, _extend.extend)(this._optionsByReference, {
        value: true
      });
    }
  }, {
    key: "_getDefaultOptions",
    value: function _getDefaultOptions() {
      return (0, _extend.extend)(_get(_getPrototypeOf(FileUploader.prototype), "_getDefaultOptions", this).call(this), {
        chunkSize: 0,
        value: [],
        selectButtonText: _message.default.format('dxFileUploader-selectFile'),
        uploadButtonText: _message.default.format('dxFileUploader-upload'),
        labelText: _message.default.format('dxFileUploader-dropFile'),
        name: 'files[]',
        multiple: false,
        accept: '',
        uploadUrl: '/',
        allowCanceling: true,
        showFileList: true,
        progress: 0,
        dialogTrigger: undefined,
        dropZone: undefined,
        readyToUploadMessage: _message.default.format('dxFileUploader-readyToUpload'),
        uploadedMessage: _message.default.format('dxFileUploader-uploaded'),
        uploadFailedMessage: _message.default.format('dxFileUploader-uploadFailedMessage'),
        uploadAbortedMessage: _message.default.format('dxFileUploader-uploadAbortedMessage'),
        uploadMode: 'instantly',
        uploadMethod: 'POST',
        uploadHeaders: {},
        uploadCustomData: {},
        onBeforeSend: null,
        onUploadStarted: null,
        onUploaded: null,
        onFilesUploaded: null,
        onProgress: null,
        onUploadError: null,
        onUploadAborted: null,
        onDropZoneEnter: null,
        onDropZoneLeave: null,
        allowedFileExtensions: [],
        maxFileSize: 0,
        minFileSize: 0,
        inputAttr: {},
        invalidFileExtensionMessage: _message.default.format('dxFileUploader-invalidFileExtension'),
        invalidMaxFileSizeMessage: _message.default.format('dxFileUploader-invalidMaxFileSize'),
        invalidMinFileSizeMessage: _message.default.format('dxFileUploader-invalidMinFileSize'),

        /**
        * @name dxFileUploaderOptions.extendSelection
        * @type boolean
        * @default true
        * @hidden
        */
        extendSelection: true,

        /**
        * @name dxFileUploaderOptions.validationMessageMode
        * @hidden
        */
        validationMessageMode: 'always',
        uploadFile: null,
        uploadChunk: null,
        abortUpload: null,
        validationMessageOffset: {
          h: 0,
          v: 0
        },
        useNativeInputClick: false,
        useDragOver: true,
        nativeDropSupported: true,
        _uploadButtonType: 'normal'
      });
    }
  }, {
    key: "_defaultOptionsRules",
    value: function _defaultOptionsRules() {
      return _get(_getPrototypeOf(FileUploader.prototype), "_defaultOptionsRules", this).call(this).concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: [{
          platform: 'android'
        }],
        options: {
          validationMessageOffset: {
            v: 0
          }
        }
      }, {
        device: function device() {
          return _devices.default.real().deviceType !== 'desktop';
        },
        options: {
          useDragOver: false
        }
      }, {
        device: function device() {
          return !isFormDataSupported();
        },
        options: {
          uploadMode: 'useForm'
        }
      }, {
        device: function device() {
          return _browser.default.msie || _devices.default.real().deviceType !== 'desktop';
        },
        options: {
          nativeDropSupported: false
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          _uploadButtonType: 'default'
        }
      }]);
    }
  }, {
    key: "_init",
    value: function _init() {
      _get(_getPrototypeOf(FileUploader.prototype), "_init", this).call(this);

      this._initFileInput();

      this._initLabel();

      this._setUploadStrategy();

      this._createFiles();

      this._createBeforeSendAction();

      this._createUploadStartedAction();

      this._createUploadedAction();

      this._createFilesUploadedAction();

      this._createProgressAction();

      this._createUploadErrorAction();

      this._createUploadAbortedAction();

      this._createDropZoneEnterAction();

      this._createDropZoneLeaveAction();
    }
  }, {
    key: "_setUploadStrategy",
    value: function _setUploadStrategy() {
      var strategy = null;

      if (this.option('chunkSize') > 0) {
        var uploadChunk = this.option('uploadChunk');
        strategy = uploadChunk && (0, _type.isFunction)(uploadChunk) ? new CustomChunksFileUploadStrategy(this) : new DefaultChunksFileUploadStrategy(this);
      } else {
        var uploadFile = this.option('uploadFile');
        strategy = uploadFile && (0, _type.isFunction)(uploadFile) ? new CustomWholeFileUploadStrategy(this) : new DefaultWholeFileUploadStrategy(this);
      }

      this._uploadStrategy = strategy;
    }
  }, {
    key: "_initFileInput",
    value: function _initFileInput() {
      var _this2 = this;

      this._isCustomClickEvent = false;

      if (!this._$fileInput) {
        this._$fileInput = renderFileUploaderInput();

        _events_engine.default.on(this._$fileInput, 'change', this._inputChangeHandler.bind(this));

        _events_engine.default.on(this._$fileInput, 'click', function (e) {
          e.stopPropagation();
          return _this2.option('useNativeInputClick') || _this2._isCustomClickEvent;
        });
      }

      this._$fileInput.prop({
        multiple: this.option('multiple'),
        accept: this.option('accept'),
        tabIndex: -1
      });
    }
  }, {
    key: "_inputChangeHandler",
    value: function _inputChangeHandler() {
      if (this._doPreventInputChange) {
        return;
      }

      var fileName = this._$fileInput.val().replace(/^.*\\/, '');

      var files = this._$fileInput.prop('files');

      if (files && !files.length && this.option('uploadMode') !== 'useForm') {
        return;
      }

      var value = files ? this._getFiles(files) : [{
        name: fileName
      }];

      this._changeValue(value);

      if (this.option('uploadMode') === 'instantly') {
        this._uploadFiles();
      }
    }
  }, {
    key: "_shouldFileListBeExtended",
    value: function _shouldFileListBeExtended() {
      return this.option('uploadMode') !== 'useForm' && this.option('extendSelection') && this.option('multiple');
    }
  }, {
    key: "_removeDuplicates",
    value: function _removeDuplicates(files, value) {
      var result = [];

      for (var i = 0; i < value.length; i++) {
        if (!this._isFileInArray(files, value[i])) {
          result.push(value[i]);
        }
      }

      return result;
    }
  }, {
    key: "_isFileInArray",
    value: function _isFileInArray(files, file) {
      for (var i = 0; i < files.length; i++) {
        var item = files[i];

        if (item.size === file.size && item.name === file.name) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_changeValue",
    value: function _changeValue(value) {
      var files = this._shouldFileListBeExtended() ? this.option('value').slice() : [];

      if (this.option('uploadMode') !== 'instantly') {
        value = this._removeDuplicates(files, value);
      }

      this.option('value', files.concat(value));
    }
  }, {
    key: "_getFiles",
    value: function _getFiles(fileList) {
      var values = [];
      (0, _iterator.each)(fileList, function (_, value) {
        return values.push(value);
      });
      return values;
    }
  }, {
    key: "_getFile",
    value: function _getFile(fileData) {
      var targetFileValue = (0, _type.isNumeric)(fileData) ? this.option('value')[fileData] : fileData;
      return this._files.filter(function (file) {
        return file.value === targetFileValue;
      })[0];
    }
  }, {
    key: "_initLabel",
    value: function _initLabel() {
      if (!this._$inputLabel) {
        this._$inputLabel = (0, _renderer.default)('<div>');
      }

      this._$inputLabel.text(this.option('labelText'));
    }
  }, {
    key: "_focusTarget",
    value: function _focusTarget() {
      return this.$element().find('.' + FILEUPLOADER_BUTTON_CLASS);
    }
  }, {
    key: "_getSubmitElement",
    value: function _getSubmitElement() {
      return this._$fileInput;
    }
  }, {
    key: "_initMarkup",
    value: function _initMarkup() {
      _get(_getPrototypeOf(FileUploader.prototype), "_initMarkup", this).call(this);

      this.$element().addClass(FILEUPLOADER_CLASS);

      this._renderWrapper();

      this._renderInputWrapper();

      this._renderSelectButton();

      this._renderInputContainer();

      this._renderUploadButton();

      this._preventRecreatingFiles = true;
    }
  }, {
    key: "_render",
    value: function _render() {
      this._preventRecreatingFiles = false;

      this._attachDragEventHandlers(this._$inputWrapper);

      this._attachDragEventHandlers(this.option('dropZone'));

      this._renderFiles();

      _get(_getPrototypeOf(FileUploader.prototype), "_render", this).call(this);
    }
  }, {
    key: "_createFileProgressBar",
    value: function _createFileProgressBar(file) {
      file.progressBar = this._createProgressBar(file.value.size);
      file.progressBar.$element().appendTo(file.$file);

      this._initStatusMessage(file);

      this._ensureCancelButtonInitialized(file);
    }
  }, {
    key: "_setStatusMessage",
    value: function _setStatusMessage(file, message) {
      var _this3 = this;

      setTimeout(function () {
        if (_this3.option('showFileList')) {
          if (file.$statusMessage) {
            file.$statusMessage.text(message);
            file.$statusMessage.css('display', '');
            file.progressBar.$element().remove();
          }
        }
      }, FILEUPLOADER_AFTER_LOAD_DELAY);
    }
  }, {
    key: "_getUploadAbortedStatusMessage",
    value: function _getUploadAbortedStatusMessage() {
      return this.option('uploadMode') === 'instantly' ? this.option('uploadAbortedMessage') : this.option('readyToUploadMessage');
    }
  }, {
    key: "_createFiles",
    value: function _createFiles() {
      var _this4 = this;

      var value = this.option('value');

      if (this._files && (value.length === 0 || !this._shouldFileListBeExtended())) {
        this._preventFilesUploading(this._files);

        this._files = null;
      }

      if (!this._files) {
        this._files = [];
      }

      (0, _iterator.each)(value.slice(this._files.length), function (_, value) {
        var file = _this4._createFile(value);

        _this4._validateFile(file);

        _this4._files.push(file);
      });
    }
  }, {
    key: "_preventFilesUploading",
    value: function _preventFilesUploading(files) {
      var _this5 = this;

      files.forEach(function (file) {
        return _this5._uploadStrategy.abortUpload(file);
      });
    }
  }, {
    key: "_validateFile",
    value: function _validateFile(file) {
      file.isValidFileExtension = this._validateFileExtension(file);
      file.isValidMinSize = this._validateMinFileSize(file);
      file.isValidMaxSize = this._validateMaxFileSize(file);
    }
  }, {
    key: "_validateFileExtension",
    value: function _validateFileExtension(file) {
      var allowedExtensions = this.option('allowedFileExtensions');
      var fileExtension = file.value.name.substring(file.value.name.lastIndexOf('.')).toLowerCase();

      if (allowedExtensions.length === 0) {
        return true;
      }

      for (var i = 0; i < allowedExtensions.length; i++) {
        if (fileExtension === allowedExtensions[i].toLowerCase()) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_validateMaxFileSize",
    value: function _validateMaxFileSize(file) {
      var fileSize = file.value.size;
      var maxFileSize = this.option('maxFileSize');
      return maxFileSize > 0 ? fileSize <= maxFileSize : true;
    }
  }, {
    key: "_validateMinFileSize",
    value: function _validateMinFileSize(file) {
      var fileSize = file.value.size;
      var minFileSize = this.option('minFileSize');
      return minFileSize > 0 ? fileSize >= minFileSize : true;
    }
  }, {
    key: "_createBeforeSendAction",
    value: function _createBeforeSendAction() {
      this._beforeSendAction = this._createActionByOption('onBeforeSend', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createUploadStartedAction",
    value: function _createUploadStartedAction() {
      this._uploadStartedAction = this._createActionByOption('onUploadStarted', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createUploadedAction",
    value: function _createUploadedAction() {
      this._uploadedAction = this._createActionByOption('onUploaded', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createFilesUploadedAction",
    value: function _createFilesUploadedAction() {
      this._filesUploadedAction = this._createActionByOption('onFilesUploaded', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createProgressAction",
    value: function _createProgressAction() {
      this._progressAction = this._createActionByOption('onProgress', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createUploadAbortedAction",
    value: function _createUploadAbortedAction() {
      this._uploadAbortedAction = this._createActionByOption('onUploadAborted', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createUploadErrorAction",
    value: function _createUploadErrorAction() {
      this._uploadErrorAction = this._createActionByOption('onUploadError', {
        excludeValidators: ['readOnly']
      });
    }
  }, {
    key: "_createDropZoneEnterAction",
    value: function _createDropZoneEnterAction() {
      this._dropZoneEnterAction = this._createActionByOption('onDropZoneEnter');
    }
  }, {
    key: "_createDropZoneLeaveAction",
    value: function _createDropZoneLeaveAction() {
      this._dropZoneLeaveAction = this._createActionByOption('onDropZoneLeave');
    }
  }, {
    key: "_createFile",
    value: function _createFile(value) {
      return {
        value: value,
        loadedSize: 0,
        onProgress: (0, _callbacks.default)(),
        onAbort: (0, _callbacks.default)(),
        onLoad: (0, _callbacks.default)(),
        onError: (0, _callbacks.default)(),
        onLoadStart: (0, _callbacks.default)(),
        isValidFileExtension: true,
        isValidMaxSize: true,
        isValidMinSize: true,
        isValid: function isValid() {
          return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize;
        },
        isInitialized: false
      };
    }
  }, {
    key: "_resetFileState",
    value: function _resetFileState(file) {
      file.isAborted = false;
      file.uploadStarted = false;
      file.isStartLoad = false;
      file.loadedSize = 0;
      file.chunksData = undefined;
      file.request = undefined;
    }
  }, {
    key: "_renderFiles",
    value: function _renderFiles() {
      var _this6 = this,
          _this$_validationMess;

      var value = this.option('value');

      if (!this._$filesContainer) {
        this._$filesContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILES_CONTAINER_CLASS).appendTo(this._$content);
      } else if (!this._shouldFileListBeExtended() || value.length === 0) {
        this._$filesContainer.empty();
      }

      var showFileList = this.option('showFileList');

      if (showFileList) {
        (0, _iterator.each)(this._files, function (_, file) {
          if (!file.$file) {
            _this6._renderFile(file);
          }
        });
      }

      this.$element().toggleClass(FILEUPLOADER_SHOW_FILE_LIST_CLASS, showFileList);

      this._toggleFileUploaderEmptyClassName();

      this._updateFileNameMaxWidth();

      (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 ? void 0 : _this$_validationMess.repaint();
    }
  }, {
    key: "_renderFile",
    value: function _renderFile(file) {
      var value = file.value;
      var $fileContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CONTAINER_CLASS).appendTo(this._$filesContainer);

      this._renderFileButtons(file, $fileContainer);

      file.$file = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_CLASS).appendTo($fileContainer);
      var $fileInfo = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_INFO_CLASS).appendTo(file.$file);
      file.$statusMessage = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).appendTo(file.$file);
      (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_NAME_CLASS).text(value.name).appendTo($fileInfo);

      if ((0, _type.isDefined)(value.size)) {
        (0, _renderer.default)('<div>').addClass(FILEUPLOADER_FILE_SIZE_CLASS).text(this._getFileSize(value.size)).appendTo($fileInfo);
      }

      if (file.isValid()) {
        file.$statusMessage.text(this.option('readyToUploadMessage'));
      } else {
        if (!file.isValidFileExtension) {
          file.$statusMessage.append(this._createValidationElement('invalidFileExtensionMessage'));
        }

        if (!file.isValidMaxSize) {
          file.$statusMessage.append(this._createValidationElement('invalidMaxFileSizeMessage'));
        }

        if (!file.isValidMinSize) {
          file.$statusMessage.append(this._createValidationElement('invalidMinFileSizeMessage'));
        }

        $fileContainer.addClass(FILEUPLOADER_INVALID_CLASS);
      }
    }
  }, {
    key: "_createValidationElement",
    value: function _createValidationElement(key) {
      return (0, _renderer.default)('<span>').text(this.option(key));
    }
  }, {
    key: "_updateFileNameMaxWidth",
    value: function _updateFileNameMaxWidth() {
      var cancelButtonsCount = this.option('allowCanceling') && this.option('uploadMode') !== 'useForm' ? 1 : 0;
      var uploadButtonsCount = this.option('uploadMode') === 'useButtons' ? 1 : 0;

      var filesContainerWidth = this._$filesContainer.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).first().width() || this._$filesContainer.width();

      var $buttonContainer = this._$filesContainer.find('.' + FILEUPLOADER_BUTTON_CONTAINER_CLASS).eq(0);

      var buttonsWidth = $buttonContainer.width() * (cancelButtonsCount + uploadButtonsCount);

      var $fileSize = this._$filesContainer.find('.' + FILEUPLOADER_FILE_SIZE_CLASS).eq(0);

      var prevFileSize = $fileSize.text();
      $fileSize.text('1000 Mb');
      var fileSizeWidth = $fileSize.width();
      $fileSize.text(prevFileSize);

      this._$filesContainer.find('.' + FILEUPLOADER_FILE_NAME_CLASS).css('maxWidth', filesContainerWidth - buttonsWidth - fileSizeWidth);
    }
  }, {
    key: "_renderFileButtons",
    value: function _renderFileButtons(file, $container) {
      var $cancelButton = this._getCancelButton(file);

      $cancelButton && $container.append($cancelButton);

      var $uploadButton = this._getUploadButton(file);

      $uploadButton && $container.append($uploadButton);
    }
  }, {
    key: "_getCancelButton",
    value: function _getCancelButton(file) {
      var _this7 = this;

      if (this.option('uploadMode') === 'useForm') {
        return null;
      }

      file.cancelButton = this._createComponent((0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS + ' ' + FILEUPLOADER_CANCEL_BUTTON_CLASS), _button.default, {
        onClick: function onClick() {
          return _this7._removeFile(file);
        },
        icon: 'close',
        visible: this.option('allowCanceling'),
        disabled: this.option('readOnly'),
        integrationOptions: {}
      });
      return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.cancelButton.$element());
    }
  }, {
    key: "_getUploadButton",
    value: function _getUploadButton(file) {
      var _this8 = this;

      if (!file.isValid() || this.option('uploadMode') !== 'useButtons') {
        return null;
      }

      file.uploadButton = this._createComponent((0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS + ' ' + FILEUPLOADER_UPLOAD_BUTTON_CLASS), _button.default, {
        onClick: function onClick() {
          return _this8._uploadFile(file);
        },
        icon: 'upload'
      });
      file.onLoadStart.add(function () {
        return file.uploadButton.option({
          visible: false,
          disabled: true
        });
      });
      file.onAbort.add(function () {
        return file.uploadButton.option({
          visible: true,
          disabled: false
        });
      });
      return (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.uploadButton.$element());
    }
  }, {
    key: "_removeFile",
    value: function _removeFile(file) {
      var _file$$file;

      (_file$$file = file.$file) === null || _file$$file === void 0 ? void 0 : _file$$file.parent().remove();

      this._files.splice((0, _array.inArray)(file, this._files), 1);

      var value = this.option('value').slice();
      value.splice((0, _array.inArray)(file.value, value), 1);
      this._preventRecreatingFiles = true;
      this.option('value', value);
      this._preventRecreatingFiles = false;

      this._toggleFileUploaderEmptyClassName();

      this._doPreventInputChange = true;

      this._$fileInput.val('');

      this._doPreventInputChange = false;
    }
  }, {
    key: "removeFile",
    value: function removeFile(fileData) {
      if (this.option('uploadMode') === 'useForm' || !(0, _type.isDefined)(fileData)) {
        return;
      }

      var file = this._getFile(fileData);

      if (file) {
        if (file.uploadStarted) {
          this._preventFilesUploading([file]);
        }

        this._removeFile(file);
      }
    }
  }, {
    key: "_toggleFileUploaderEmptyClassName",
    value: function _toggleFileUploaderEmptyClassName() {
      this.$element().toggleClass(FILEUPLOADER_EMPTY_CLASS, !this._files.length || this._hasInvalidFile(this._files));
    }
  }, {
    key: "_hasInvalidFile",
    value: function _hasInvalidFile(files) {
      for (var i = 0; i < files.length; i++) {
        if (!files[i].isValid()) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "_getFileSize",
    value: function _getFileSize(size) {
      var i = 0;
      var labels = [_message.default.format('dxFileUploader-bytes'), _message.default.format('dxFileUploader-kb'), _message.default.format('dxFileUploader-Mb'), _message.default.format('dxFileUploader-Gb')];
      var count = labels.length - 1;

      while (i < count && size >= 1024) {
        size /= 1024;
        i++;
      }

      return Math.round(size) + ' ' + labels[i];
    }
  }, {
    key: "_renderSelectButton",
    value: function _renderSelectButton() {
      var $button = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).appendTo(this._$inputWrapper);
      this._selectButton = this._createComponent($button, _button.default, {
        text: this.option('selectButtonText'),
        focusStateEnabled: false,
        integrationOptions: {},
        disabled: this.option('readOnly')
      });
      this._selectFileDialogHandler = this._selectButtonClickHandler.bind(this); // NOTE: click triggering on input 'file' works correctly only in native click handler when device is used

      if (_devices.default.real().deviceType === 'desktop') {
        this._selectButton.option('onClick', this._selectFileDialogHandler);
      } else {
        this._attachSelectFileDialogHandler(this._selectButton.$element());
      }

      this._attachSelectFileDialogHandler(this.option('dialogTrigger'));
    }
  }, {
    key: "_selectButtonClickHandler",
    value: function _selectButtonClickHandler() {
      if (this.option('useNativeInputClick')) {
        return;
      }

      if (this._isInteractionDisabled()) {
        return false;
      }

      this._isCustomClickEvent = true;

      _events_engine.default.trigger(this._$fileInput, 'click');

      this._isCustomClickEvent = false;
    }
  }, {
    key: "_attachSelectFileDialogHandler",
    value: function _attachSelectFileDialogHandler(target) {
      if (!(0, _type.isDefined)(target)) {
        return;
      }

      this._detachSelectFileDialogHandler(target);

      _events_engine.default.on((0, _renderer.default)(target), 'click', this._selectFileDialogHandler);
    }
  }, {
    key: "_detachSelectFileDialogHandler",
    value: function _detachSelectFileDialogHandler(target) {
      if (!(0, _type.isDefined)(target)) {
        return;
      }

      _events_engine.default.off((0, _renderer.default)(target), 'click', this._selectFileDialogHandler);
    }
  }, {
    key: "_renderUploadButton",
    value: function _renderUploadButton() {
      if (this.option('uploadMode') !== 'useButtons') {
        return;
      }

      var $uploadButton = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_BUTTON_CLASS).addClass(FILEUPLOADER_UPLOAD_BUTTON_CLASS).appendTo(this._$content);
      this._uploadButton = this._createComponent($uploadButton, _button.default, {
        text: this.option('uploadButtonText'),
        onClick: this._uploadButtonClickHandler.bind(this),
        type: this.option('_uploadButtonType'),
        integrationOptions: {}
      });
    }
  }, {
    key: "_uploadButtonClickHandler",
    value: function _uploadButtonClickHandler() {
      this._uploadFiles();
    }
  }, {
    key: "_shouldDragOverBeRendered",
    value: function _shouldDragOverBeRendered() {
      return !this.option('readOnly') && (this.option('uploadMode') !== 'useForm' || this.option('nativeDropSupported'));
    }
  }, {
    key: "_isInteractionDisabled",
    value: function _isInteractionDisabled() {
      return this.option('readOnly') || this.option('disabled');
    }
  }, {
    key: "_renderInputContainer",
    value: function _renderInputContainer() {
      this._$inputContainer = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_INPUT_CONTAINER_CLASS).appendTo(this._$inputWrapper);

      this._displayInputContainerIfNeeded();

      this._$fileInput.addClass(FILEUPLOADER_INPUT_CLASS);

      this._renderInput();

      var labelId = "dx-fileuploader-input-label-".concat(new _guid.default());

      this._$inputLabel.attr('id', labelId).addClass(FILEUPLOADER_INPUT_LABEL_CLASS).appendTo(this._$inputContainer);

      this.setAria('labelledby', labelId, this._$fileInput);
    }
  }, {
    key: "_displayInputContainerIfNeeded",
    value: function _displayInputContainerIfNeeded() {
      var displayProperty = this._shouldDragOverBeRendered() ? '' : 'none';

      this._$inputContainer.css('display', displayProperty);
    }
  }, {
    key: "_renderInput",
    value: function _renderInput() {
      if (this.option('useNativeInputClick')) {
        this._selectButton.option('template', this._selectButtonInputTemplate.bind(this));
      } else {
        this._$fileInput.appendTo(this._$inputContainer);

        this._selectButton.option('template', 'content');
      }

      this._applyInputAttributes(this.option('inputAttr'));
    }
  }, {
    key: "_selectButtonInputTemplate",
    value: function _selectButtonInputTemplate(data, content) {
      var $content = (0, _renderer.default)(content);
      var $text = (0, _renderer.default)('<span>').addClass('dx-button-text').text(data.text);
      $content.append($text).append(this._$fileInput);
      return $content;
    }
  }, {
    key: "_renderInputWrapper",
    value: function _renderInputWrapper() {
      this._$inputWrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_INPUT_WRAPPER_CLASS).appendTo(this._$content);
    }
  }, {
    key: "_detachDragEventHandlers",
    value: function _detachDragEventHandlers(target) {
      if (!(0, _type.isDefined)(target)) {
        return;
      }

      _events_engine.default.off((0, _renderer.default)(target), (0, _index.addNamespace)('', this.NAME));
    }
  }, {
    key: "_attachDragEventHandlers",
    value: function _attachDragEventHandlers(target) {
      var isCustomTarget = target !== this._$inputWrapper;

      if (!(0, _type.isDefined)(target) || !this._shouldDragOverBeRendered()) {
        return;
      }

      this._detachDragEventHandlers(target);

      target = (0, _renderer.default)(target);
      this._dragEventsTargets = [];

      _events_engine.default.on(target, (0, _index.addNamespace)('dragenter', this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));

      _events_engine.default.on(target, (0, _index.addNamespace)('dragover', this.NAME), this._dragOverHandler.bind(this));

      _events_engine.default.on(target, (0, _index.addNamespace)('dragleave', this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));

      _events_engine.default.on(target, (0, _index.addNamespace)('drop', this.NAME), this._dropHandler.bind(this, isCustomTarget));
    }
  }, {
    key: "_applyInputAttributes",
    value: function _applyInputAttributes(customAttributes) {
      this._$fileInput.attr(customAttributes);
    }
  }, {
    key: "_useInputForDrop",
    value: function _useInputForDrop() {
      return this.option('nativeDropSupported') && this.option('uploadMode') === 'useForm';
    }
  }, {
    key: "_dragEnterHandler",
    value: function _dragEnterHandler(isCustomTarget, e) {
      if (this.option('disabled')) {
        return false;
      }

      if (!this._useInputForDrop()) {
        e.preventDefault();
      }

      this._updateEventTargets(e);

      this._dropZoneEnterAction({
        event: e,
        dropZoneElement: e.target
      });

      if (!isCustomTarget) {
        this.$element().addClass(FILEUPLOADER_DRAGOVER_CLASS);
      }
    }
  }, {
    key: "_dragOverHandler",
    value: function _dragOverHandler(e) {
      if (!this._useInputForDrop()) {
        e.preventDefault();
      }

      e.originalEvent.dataTransfer.dropEffect = 'copy';
    }
  }, {
    key: "_dragLeaveHandler",
    value: function _dragLeaveHandler(isCustomTarget, e) {
      if (!this._useInputForDrop()) {
        e.preventDefault();
      }

      this._updateEventTargets(e);

      this._dropZoneLeaveAction({
        event: e,
        dropZoneElement: e.target
      });

      if (!this._dragEventsTargets.length && !isCustomTarget) {
        this.$element().removeClass(FILEUPLOADER_DRAGOVER_CLASS);
      }
    }
  }, {
    key: "_updateEventTargets",
    value: function _updateEventTargets(e) {
      var targetIndex = this._dragEventsTargets.indexOf(e.target);

      var isTargetExists = targetIndex !== -1;

      if (e.type === 'dragenter') {
        !isTargetExists && this._dragEventsTargets.push(e.target);
      } else {
        isTargetExists && this._dragEventsTargets.splice(targetIndex, 1);
      }
    }
  }, {
    key: "_dropHandler",
    value: function _dropHandler(isCustomTarget, e) {
      this._dragEventsTargets = [];

      if (!isCustomTarget) {
        this.$element().removeClass(FILEUPLOADER_DRAGOVER_CLASS);
      }

      if (this._useInputForDrop() || isCustomTarget && this._isInteractionDisabled()) {
        return;
      }

      e.preventDefault();
      var fileList = e.originalEvent.dataTransfer.files;

      var files = this._getFiles(fileList);

      if (!this.option('multiple') && files.length > 1) {
        return;
      }

      this._changeValue(this._filterFiles(files));

      if (this.option('uploadMode') === 'instantly') {
        this._uploadFiles();
      }
    }
  }, {
    key: "_handleAllFilesUploaded",
    value: function _handleAllFilesUploaded() {
      var areAllFilesLoaded = this._files.every(function (file) {
        return !file.isValid() || file._isError || file._isLoaded || file.isAborted;
      });

      if (areAllFilesLoaded) {
        this._filesUploadedAction();
      }
    }
  }, {
    key: "_filterFiles",
    value: function _filterFiles(files) {
      if (!files.length) {
        return files;
      }

      var accept = this.option('accept');

      if (!accept.length) {
        return files;
      }

      var result = [];

      var allowedTypes = this._getAllowedFileTypes(accept);

      for (var i = 0, n = files.length; i < n; i++) {
        if (this._isFileTypeAllowed(files[i], allowedTypes)) {
          result.push(files[i]);
        }
      }

      return result;
    }
  }, {
    key: "_getAllowedFileTypes",
    value: function _getAllowedFileTypes(acceptSting) {
      if (!acceptSting.length) {
        return [];
      }

      return acceptSting.split(',').map(function (item) {
        return item.trim();
      });
    }
  }, {
    key: "_isFileTypeAllowed",
    value: function _isFileTypeAllowed(file, allowedTypes) {
      for (var i = 0, n = allowedTypes.length; i < n; i++) {
        var allowedType = allowedTypes[i];

        if (allowedType[0] === '.') {
          allowedType = allowedType.replace('.', '\\.');

          if (file.name.match(new RegExp(allowedType + '$', 'i'))) {
            return true;
          }
        } else {
          allowedType = allowedType.replace('*', '');

          if (file.type.match(new RegExp(allowedType, 'i'))) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "_renderWrapper",
    value: function _renderWrapper() {
      var $wrapper = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_WRAPPER_CLASS).appendTo(this.$element());
      var $container = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTAINER_CLASS).appendTo($wrapper);
      this._$content = (0, _renderer.default)('<div>').addClass(FILEUPLOADER_CONTENT_CLASS).appendTo($container);
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this._$fileInput.detach();

      delete this._$filesContainer;

      if (this._files) {
        this._files.forEach(function (file) {
          file.$file = null;
          file.$statusMessage = null;
        });
      }

      _get(_getPrototypeOf(FileUploader.prototype), "_clean", this).call(this);
    }
  }, {
    key: "abortUpload",
    value: function abortUpload(fileData) {
      if (this.option('uploadMode') === 'useForm') {
        return;
      }

      if ((0, _type.isDefined)(fileData)) {
        var file = this._getFile(fileData);

        if (file) {
          this._preventFilesUploading([file]);
        }
      } else {
        this._preventFilesUploading(this._files);
      }
    }
  }, {
    key: "upload",
    value: function upload(fileData) {
      if (this.option('uploadMode') === 'useForm') {
        return;
      }

      if ((0, _type.isDefined)(fileData)) {
        var file = this._getFile(fileData);

        if (file && isFormDataSupported()) {
          this._uploadFile(file);
        }
      } else {
        this._uploadFiles();
      }
    }
  }, {
    key: "_uploadFiles",
    value: function _uploadFiles() {
      var _this9 = this;

      if (isFormDataSupported()) {
        (0, _iterator.each)(this._files, function (_, file) {
          return _this9._uploadFile(file);
        });
      }
    }
  }, {
    key: "_uploadFile",
    value: function _uploadFile(file) {
      this._uploadStrategy.upload(file);
    }
  }, {
    key: "_updateProgressBar",
    value: function _updateProgressBar(file, loadedFileData) {
      file.progressBar && file.progressBar.option({
        value: loadedFileData.loaded,
        showStatus: true
      });

      this._progressAction({
        file: file.value,
        segmentSize: loadedFileData.currentSegmentSize,
        bytesLoaded: loadedFileData.loaded,
        bytesTotal: loadedFileData.total,
        event: loadedFileData.event,
        request: file.request
      });
    }
  }, {
    key: "_updateTotalProgress",
    value: function _updateTotalProgress(totalFilesSize, totalLoadedFilesSize) {
      var progress = totalFilesSize ? this._getProgressValue(totalLoadedFilesSize / totalFilesSize) : 0;
      this.option('progress', progress);

      this._setLoadedSize(totalLoadedFilesSize);
    }
  }, {
    key: "_getProgressValue",
    value: function _getProgressValue(ratio) {
      return Math.floor(ratio * 100);
    }
  }, {
    key: "_initStatusMessage",
    value: function _initStatusMessage(file) {
      file.$statusMessage.css('display', 'none');
    }
  }, {
    key: "_ensureCancelButtonInitialized",
    value: function _ensureCancelButtonInitialized(file) {
      var _this10 = this;

      if (file.isInitialized) {
        return;
      }

      file.cancelButton.option('onClick', function () {
        _this10._preventFilesUploading([file]);

        _this10._removeFile(file);
      });

      var hideCancelButton = function hideCancelButton() {
        setTimeout(function () {
          file.cancelButton.option({
            visible: false
          });
        }, FILEUPLOADER_AFTER_LOAD_DELAY);
      };

      file.onLoad.add(hideCancelButton);
      file.onError.add(hideCancelButton);
    }
  }, {
    key: "_createProgressBar",
    value: function _createProgressBar(fileSize) {
      var _this11 = this;

      return this._createComponent((0, _renderer.default)('<div>'), _progress_bar.default, {
        value: undefined,
        min: 0,
        max: fileSize,
        statusFormat: function statusFormat(ratio) {
          return _this11._getProgressValue(ratio) + '%';
        },
        showStatus: false,
        statusPosition: 'right'
      });
    }
  }, {
    key: "_getTotalFilesSize",
    value: function _getTotalFilesSize() {
      var _this12 = this;

      if (!this._totalFilesSize) {
        this._totalFilesSize = 0;
        (0, _iterator.each)(this._files, function (_, file) {
          _this12._totalFilesSize += file.value.size;
        });
      }

      return this._totalFilesSize;
    }
  }, {
    key: "_getTotalLoadedFilesSize",
    value: function _getTotalLoadedFilesSize() {
      var _this13 = this;

      if (!this._totalLoadedFilesSize) {
        this._totalLoadedFilesSize = 0;
        (0, _iterator.each)(this._files, function (_, file) {
          _this13._totalLoadedFilesSize += file.loadedSize;
        });
      }

      return this._totalLoadedFilesSize;
    }
  }, {
    key: "_setLoadedSize",
    value: function _setLoadedSize(value) {
      this._totalLoadedFilesSize = value;
    }
  }, {
    key: "_recalculateProgress",
    value: function _recalculateProgress() {
      this._totalFilesSize = 0;
      this._totalLoadedFilesSize = 0;

      this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize());
    }
  }, {
    key: "_updateReadOnlyState",
    value: function _updateReadOnlyState() {
      var readOnly = this.option('readOnly');

      this._selectButton.option('disabled', readOnly);

      this._files.forEach(function (file) {
        var _file$cancelButton;

        return (_file$cancelButton = file.cancelButton) === null || _file$cancelButton === void 0 ? void 0 : _file$cancelButton.option('disabled', readOnly);
      });

      this._displayInputContainerIfNeeded();

      this._attachDragEventHandlers(this._$inputWrapper);
    }
  }, {
    key: "_optionChanged",
    value: function _optionChanged(args) {
      var value = args.value;

      switch (args.name) {
        case 'height':
        case 'width':
          this._updateFileNameMaxWidth();

          _get(_getPrototypeOf(FileUploader.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'value':
          !value.length && this._$fileInput.val('');

          if (!this._preventRecreatingFiles) {
            this._createFiles();

            this._renderFiles();
          }

          this._recalculateProgress();

          _get(_getPrototypeOf(FileUploader.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'name':
          this._initFileInput();

          _get(_getPrototypeOf(FileUploader.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'accept':
          this._initFileInput();

          break;

        case 'multiple':
          this._initFileInput();

          if (!args.value) {
            this.reset();
          }

          break;

        case 'readOnly':
          this._updateReadOnlyState();

          _get(_getPrototypeOf(FileUploader.prototype), "_optionChanged", this).call(this, args);

          break;

        case 'selectButtonText':
          this._selectButton.option('text', value);

          break;

        case 'uploadButtonText':
          this._uploadButton && this._uploadButton.option('text', value);
          break;

        case '_uploadButtonType':
          this._uploadButton && this._uploadButton.option('type', value);
          break;

        case 'dialogTrigger':
          this._detachSelectFileDialogHandler(args.previousValue);

          this._attachSelectFileDialogHandler(value);

          break;

        case 'dropZone':
          this._detachDragEventHandlers(args.previousValue);

          this._attachDragEventHandlers(value);

          break;

        case 'maxFileSize':
        case 'minFileSize':
        case 'allowedFileExtensions':
        case 'invalidFileExtensionMessage':
        case 'invalidMaxFileSizeMessage':
        case 'invalidMinFileSizeMessage':
        case 'readyToUploadMessage':
        case 'uploadedMessage':
        case 'uploadFailedMessage':
        case 'uploadAbortedMessage':
          this._invalidate();

          break;

        case 'labelText':
          this._$inputLabel.text(value);

          break;

        case 'showFileList':
          if (!this._preventRecreatingFiles) {
            this._renderFiles();
          }

          break;

        case 'uploadFile':
        case 'uploadChunk':
        case 'chunkSize':
          this._setUploadStrategy();

          break;

        case 'abortUpload':
        case 'uploadUrl':
        case 'progress':
        case 'uploadMethod':
        case 'uploadHeaders':
        case 'uploadCustomData':
        case 'extendSelection':
          break;

        case 'allowCanceling':
        case 'uploadMode':
          this.reset();

          this._invalidate();

          break;

        case 'onBeforeSend':
          this._createBeforeSendAction();

          break;

        case 'onUploadStarted':
          this._createUploadStartedAction();

          break;

        case 'onUploaded':
          this._createUploadedAction();

          break;

        case 'onFilesUploaded':
          this._createFilesUploadedAction();

          break;

        case 'onProgress':
          this._createProgressAction();

          break;

        case 'onUploadError':
          this._createUploadErrorAction();

          break;

        case 'onUploadAborted':
          this._createUploadAbortedAction();

          break;

        case 'onDropZoneEnter':
          this._createDropZoneEnterAction();

          break;

        case 'onDropZoneLeave':
          this._createDropZoneLeaveAction();

          break;

        case 'useNativeInputClick':
          this._renderInput();

          break;

        case 'useDragOver':
          this._attachDragEventHandlers(this._$inputWrapper);

          break;

        case 'nativeDropSupported':
          this._invalidate();

          break;

        case 'inputAttr':
          this._applyInputAttributes(value);

          break;

        default:
          _get(_getPrototypeOf(FileUploader.prototype), "_optionChanged", this).call(this, args);

      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.option('value', []);
    }
  }]);

  return FileUploader;
}(_editor.default);

var FileBlobReader = /*#__PURE__*/function () {
  function FileBlobReader(file, chunkSize) {
    _classCallCheck(this, FileBlobReader);

    this.file = file;
    this.chunkSize = chunkSize;
    this.index = 0;
  }

  _createClass(FileBlobReader, [{
    key: "read",
    value: function read() {
      if (!this.file) {
        return null;
      }

      var result = this.createBlobResult(this.file, this.index, this.chunkSize);

      if (result.isCompleted) {
        this.file = null;
      }

      this.index++;
      return result;
    }
  }, {
    key: "createBlobResult",
    value: function createBlobResult(file, index, chunkSize) {
      var currentPosition = index * chunkSize;
      return {
        blob: this.sliceFile(file, currentPosition, chunkSize),
        index: index,
        isCompleted: currentPosition + chunkSize >= file.size
      };
    }
  }, {
    key: "sliceFile",
    value: function sliceFile(file, startPos, length) {
      if (file.slice) {
        return file.slice(startPos, startPos + length);
      }

      if (file.webkitSlice) {
        return file.webkitSlice(startPos, startPos + length);
      }

      return null;
    }
  }]);

  return FileBlobReader;
}();

var FileUploadStrategyBase = /*#__PURE__*/function () {
  function FileUploadStrategyBase(fileUploader) {
    _classCallCheck(this, FileUploadStrategyBase);

    this.fileUploader = fileUploader;
  }

  _createClass(FileUploadStrategyBase, [{
    key: "upload",
    value: function upload(file) {
      if (file.isInitialized && file.isAborted) {
        this.fileUploader._resetFileState(file);
      }

      if (file.isValid() && !file.uploadStarted) {
        this._prepareFileBeforeUpload(file);

        this._uploadCore(file);
      }
    }
  }, {
    key: "abortUpload",
    value: function abortUpload(file) {
      var _this14 = this;

      if (file._isError || file._isLoaded || file.isAborted) {
        return;
      }

      file.isAborted = true;
      file.request && file.request.abort();

      if (this._isCustomCallback('abortUpload')) {
        var abortUpload = this.fileUploader.option('abortUpload');

        var arg = this._createUploadArgument(file);

        var deferred = null;

        try {
          var result = abortUpload(file.value, arg);
          deferred = (0, _deferred.fromPromise)(result);
        } catch (error) {
          deferred = new _deferred.Deferred().reject(error).promise();
        }

        deferred.done(function () {
          return file.onAbort.fire();
        }).fail(function (error) {
          return _this14._handleFileError(file, error);
        });
      }
    }
  }, {
    key: "_beforeSend",
    value: function _beforeSend(xhr, file) {
      var arg = this._createUploadArgument(file);

      this.fileUploader._beforeSendAction({
        request: xhr,
        file: file.value,
        uploadInfo: arg
      });

      file.request = xhr;
    }
  }, {
    key: "_createUploadArgument",
    value: function _createUploadArgument(file) {}
  }, {
    key: "_uploadCore",
    value: function _uploadCore(file) {}
  }, {
    key: "_isCustomCallback",
    value: function _isCustomCallback(name) {
      var callback = this.fileUploader.option(name);
      return callback && (0, _type.isFunction)(callback);
    }
  }, {
    key: "_handleFileError",
    value: function _handleFileError(file, error) {
      file._isError = true;
      file.onError.fire(error);
    }
  }, {
    key: "_prepareFileBeforeUpload",
    value: function _prepareFileBeforeUpload(file) {
      if (file.$file) {
        var _file$progressBar;

        (_file$progressBar = file.progressBar) === null || _file$progressBar === void 0 ? void 0 : _file$progressBar.dispose();

        this.fileUploader._createFileProgressBar(file);
      }

      if (file.isInitialized) {
        return;
      }

      file.onLoadStart.add(this._onUploadStarted.bind(this, file));
      file.onLoad.add(this._onLoadedHandler.bind(this, file));
      file.onError.add(this._onErrorHandler.bind(this, file));
      file.onAbort.add(this._onAbortHandler.bind(this, file));
      file.onProgress.add(this._onProgressHandler.bind(this, file));
      file.isInitialized = true;
    }
  }, {
    key: "_isStatusError",
    value: function _isStatusError(status) {
      return 400 <= status && status < 500 || 500 <= status && status < 600;
    }
  }, {
    key: "_onUploadStarted",
    value: function _onUploadStarted(file, e) {
      file.uploadStarted = true;

      this.fileUploader._uploadStartedAction({
        file: file.value,
        event: e,
        request: file.request
      });
    }
  }, {
    key: "_onAbortHandler",
    value: function _onAbortHandler(file, e) {
      var args = {
        file: file.value,
        event: e,
        request: file.request,
        message: this.fileUploader._getUploadAbortedStatusMessage()
      };

      this.fileUploader._uploadAbortedAction(args);

      this.fileUploader._setStatusMessage(file, args.message);

      this.fileUploader._handleAllFilesUploaded();
    }
  }, {
    key: "_onErrorHandler",
    value: function _onErrorHandler(file, error) {
      var args = {
        file: file.value,
        event: undefined,
        request: file.request,
        error: error,
        message: this.fileUploader.option('uploadFailedMessage')
      };

      this.fileUploader._uploadErrorAction(args);

      this.fileUploader._setStatusMessage(file, args.message);

      this.fileUploader._handleAllFilesUploaded();
    }
  }, {
    key: "_onLoadedHandler",
    value: function _onLoadedHandler(file, e) {
      var args = {
        file: file.value,
        event: e,
        request: file.request,
        message: this.fileUploader.option('uploadedMessage')
      };
      file._isLoaded = true;

      this.fileUploader._uploadedAction(args);

      this.fileUploader._setStatusMessage(file, args.message);

      this.fileUploader._handleAllFilesUploaded();
    }
  }, {
    key: "_onProgressHandler",
    value: function _onProgressHandler(file, e) {
      if (file) {
        var totalFilesSize = this.fileUploader._getTotalFilesSize();

        var totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();

        var loadedSize = Math.min(e.loaded, file.value.size);
        var segmentSize = loadedSize - file.loadedSize;
        file.loadedSize = loadedSize;

        this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);

        this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e));
      }
    }
  }, {
    key: "_getLoadedData",
    value: function _getLoadedData(loaded, total, currentSegmentSize, event) {
      return {
        loaded: loaded,
        total: total,
        currentSegmentSize: currentSegmentSize
      };
    }
  }, {
    key: "_extendFormData",
    value: function _extendFormData(formData) {
      var formDataEntries = this.fileUploader.option('uploadCustomData');

      for (var entryName in formDataEntries) {
        if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
          formData.append(entryName, formDataEntries[entryName]);
        }
      }
    }
  }]);

  return FileUploadStrategyBase;
}();

var ChunksFileUploadStrategyBase = /*#__PURE__*/function (_FileUploadStrategyBa) {
  _inherits(ChunksFileUploadStrategyBase, _FileUploadStrategyBa);

  var _super2 = _createSuper(ChunksFileUploadStrategyBase);

  function ChunksFileUploadStrategyBase(fileUploader) {
    var _this15;

    _classCallCheck(this, ChunksFileUploadStrategyBase);

    _this15 = _super2.call(this, fileUploader);
    _this15.chunkSize = _this15.fileUploader.option('chunkSize');
    return _this15;
  }

  _createClass(ChunksFileUploadStrategyBase, [{
    key: "_uploadCore",
    value: function _uploadCore(file) {
      var realFile = file.value;
      var chunksData = {
        name: realFile.name,
        loadedBytes: 0,
        type: realFile.type,
        blobReader: new FileBlobReader(realFile, this.chunkSize),
        guid: new _guid.default(),
        fileSize: realFile.size,
        count: Math.ceil(realFile.size / this.chunkSize),
        customData: {}
      };
      file.chunksData = chunksData;

      this._sendChunk(file, chunksData);
    }
  }, {
    key: "_sendChunk",
    value: function _sendChunk(file, chunksData) {
      var _this16 = this;

      var chunk = chunksData.blobReader.read();
      chunksData.currentChunk = chunk;

      if (chunk) {
        this._sendChunkCore(file, chunksData, chunk).done(function () {
          if (file.isAborted) {
            return;
          }

          chunksData.loadedBytes += chunk.blob.size;
          file.onProgress.fire({
            loaded: chunksData.loadedBytes,
            total: file.value.size
          });

          if (chunk.isCompleted) {
            file.onLoad.fire();
          }

          setTimeout(function () {
            return _this16._sendChunk(file, chunksData);
          });
        }).fail(function (error) {
          if (_this16._shouldHandleError(error)) {
            _this16._handleFileError(file, error);
          }
        });
      }
    }
  }, {
    key: "_sendChunkCore",
    value: function _sendChunkCore(file, chunksData, chunk) {}
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(error) {}
  }, {
    key: "_tryRaiseStartLoad",
    value: function _tryRaiseStartLoad(file) {
      if (!file.isStartLoad) {
        file.isStartLoad = true;
        file.onLoadStart.fire();
      }
    }
  }, {
    key: "_getEvent",
    value: function _getEvent(e) {
      return null;
    }
  }, {
    key: "_createUploadArgument",
    value: function _createUploadArgument(file) {
      return this._createChunksInfo(file.chunksData);
    }
  }, {
    key: "_createChunksInfo",
    value: function _createChunksInfo(chunksData) {
      return {
        bytesUploaded: chunksData.loadedBytes,
        chunkCount: chunksData.count,
        customData: chunksData.customData,
        chunkBlob: chunksData.currentChunk.blob,
        chunkIndex: chunksData.currentChunk.index
      };
    }
  }]);

  return ChunksFileUploadStrategyBase;
}(FileUploadStrategyBase);

var DefaultChunksFileUploadStrategy = /*#__PURE__*/function (_ChunksFileUploadStra) {
  _inherits(DefaultChunksFileUploadStrategy, _ChunksFileUploadStra);

  var _super3 = _createSuper(DefaultChunksFileUploadStrategy);

  function DefaultChunksFileUploadStrategy() {
    _classCallCheck(this, DefaultChunksFileUploadStrategy);

    return _super3.apply(this, arguments);
  }

  _createClass(DefaultChunksFileUploadStrategy, [{
    key: "_sendChunkCore",
    value: function _sendChunkCore(file, chunksData, chunk) {
      var _this17 = this;

      return _ajax.default.sendRequest({
        url: this.fileUploader.option('uploadUrl'),
        method: this.fileUploader.option('uploadMethod'),
        headers: this.fileUploader.option('uploadHeaders'),
        beforeSend: function beforeSend(xhr) {
          return _this17._beforeSend(xhr, file);
        },
        upload: {
          'onloadstart': function onloadstart() {
            return _this17._tryRaiseStartLoad(file);
          },
          'onabort': function onabort() {
            return file.onAbort.fire();
          }
        },
        data: this._createFormData({
          fileName: chunksData.name,
          blobName: this.fileUploader.option('name'),
          blob: chunk.blob,
          index: chunk.index,
          count: chunksData.count,
          type: chunksData.type,
          guid: chunksData.guid,
          size: chunksData.fileSize
        })
      });
    }
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(e) {
      return this._isStatusError(e.status);
    }
  }, {
    key: "_createFormData",
    value: function _createFormData(options) {
      var formData = new window.FormData();
      formData.append(options.blobName, options.blob);
      formData.append(FILEUPLOADER_CHUNK_META_DATA_NAME, JSON.stringify({
        FileName: options.fileName,
        Index: options.index,
        TotalCount: options.count,
        FileSize: options.size,
        FileType: options.type,
        FileGuid: options.guid
      }));

      this._extendFormData(formData);

      return formData;
    }
  }]);

  return DefaultChunksFileUploadStrategy;
}(ChunksFileUploadStrategyBase);

var CustomChunksFileUploadStrategy = /*#__PURE__*/function (_ChunksFileUploadStra2) {
  _inherits(CustomChunksFileUploadStrategy, _ChunksFileUploadStra2);

  var _super4 = _createSuper(CustomChunksFileUploadStrategy);

  function CustomChunksFileUploadStrategy() {
    _classCallCheck(this, CustomChunksFileUploadStrategy);

    return _super4.apply(this, arguments);
  }

  _createClass(CustomChunksFileUploadStrategy, [{
    key: "_sendChunkCore",
    value: function _sendChunkCore(file, chunksData) {
      this._tryRaiseStartLoad(file);

      var chunksInfo = this._createChunksInfo(chunksData);

      var uploadChunk = this.fileUploader.option('uploadChunk');

      try {
        var result = uploadChunk(file.value, chunksInfo);
        return (0, _deferred.fromPromise)(result);
      } catch (error) {
        return new _deferred.Deferred().reject(error).promise();
      }
    }
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(e) {
      return true;
    }
  }]);

  return CustomChunksFileUploadStrategy;
}(ChunksFileUploadStrategyBase);

var WholeFileUploadStrategyBase = /*#__PURE__*/function (_FileUploadStrategyBa2) {
  _inherits(WholeFileUploadStrategyBase, _FileUploadStrategyBa2);

  var _super5 = _createSuper(WholeFileUploadStrategyBase);

  function WholeFileUploadStrategyBase() {
    _classCallCheck(this, WholeFileUploadStrategyBase);

    return _super5.apply(this, arguments);
  }

  _createClass(WholeFileUploadStrategyBase, [{
    key: "_uploadCore",
    value: function _uploadCore(file) {
      var _this18 = this;

      file.loadedSize = 0;

      this._uploadFile(file).done(function () {
        if (!file.isAborted) {
          file.onLoad.fire();
        }
      }).fail(function (error) {
        if (_this18._shouldHandleError(file, error)) {
          _this18._handleFileError(file, error);
        }
      });
    }
  }, {
    key: "_uploadFile",
    value: function _uploadFile(file) {}
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(file, e) {}
  }, {
    key: "_handleProgress",
    value: function _handleProgress(file, e) {
      if (file._isError) {
        return;
      }

      file._isProgressStarted = true;
      file.onProgress.fire(e);
    }
  }, {
    key: "_getLoadedData",
    value: function _getLoadedData(loaded, total, segmentSize, event) {
      var result = _get(_getPrototypeOf(WholeFileUploadStrategyBase.prototype), "_getLoadedData", this).call(this, loaded, total, segmentSize, event);

      result.event = event;
      return result;
    }
  }]);

  return WholeFileUploadStrategyBase;
}(FileUploadStrategyBase);

var DefaultWholeFileUploadStrategy = /*#__PURE__*/function (_WholeFileUploadStrat) {
  _inherits(DefaultWholeFileUploadStrategy, _WholeFileUploadStrat);

  var _super6 = _createSuper(DefaultWholeFileUploadStrategy);

  function DefaultWholeFileUploadStrategy() {
    _classCallCheck(this, DefaultWholeFileUploadStrategy);

    return _super6.apply(this, arguments);
  }

  _createClass(DefaultWholeFileUploadStrategy, [{
    key: "_uploadFile",
    value: function _uploadFile(file) {
      var _this19 = this;

      return _ajax.default.sendRequest({
        url: this.fileUploader.option('uploadUrl'),
        method: this.fileUploader.option('uploadMethod'),
        headers: this.fileUploader.option('uploadHeaders'),
        beforeSend: function beforeSend(xhr) {
          return _this19._beforeSend(xhr, file);
        },
        upload: {
          'onprogress': function onprogress(e) {
            return _this19._handleProgress(file, e);
          },
          'onloadstart': function onloadstart() {
            return file.onLoadStart.fire();
          },
          'onabort': function onabort() {
            return file.onAbort.fire();
          }
        },
        data: this._createFormData(this.fileUploader.option('name'), file.value)
      });
    }
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(file, e) {
      return this._isStatusError(e.status) || !file._isProgressStarted;
    }
  }, {
    key: "_createFormData",
    value: function _createFormData(fieldName, fieldValue) {
      var formData = new window.FormData();
      formData.append(fieldName, fieldValue, fieldValue.name);

      this._extendFormData(formData);

      return formData;
    }
  }]);

  return DefaultWholeFileUploadStrategy;
}(WholeFileUploadStrategyBase);

var CustomWholeFileUploadStrategy = /*#__PURE__*/function (_WholeFileUploadStrat2) {
  _inherits(CustomWholeFileUploadStrategy, _WholeFileUploadStrat2);

  var _super7 = _createSuper(CustomWholeFileUploadStrategy);

  function CustomWholeFileUploadStrategy() {
    _classCallCheck(this, CustomWholeFileUploadStrategy);

    return _super7.apply(this, arguments);
  }

  _createClass(CustomWholeFileUploadStrategy, [{
    key: "_uploadFile",
    value: function _uploadFile(file) {
      var _this20 = this;

      file.onLoadStart.fire();

      var progressCallback = function progressCallback(loadedBytes) {
        var arg = {
          loaded: loadedBytes,
          total: file.size
        };

        _this20._handleProgress(file, arg);
      };

      var uploadFile = this.fileUploader.option('uploadFile');

      try {
        var result = uploadFile(file.value, progressCallback);
        return (0, _deferred.fromPromise)(result);
      } catch (error) {
        return new _deferred.Deferred().reject(error).promise();
      }
    }
  }, {
    key: "_shouldHandleError",
    value: function _shouldHandleError(file, e) {
      return true;
    }
  }]);

  return CustomWholeFileUploadStrategy;
}(WholeFileUploadStrategyBase);

(0, _component_registrator.default)('dxFileUploader', FileUploader);
var _default = FileUploader;
exports.default = _default;
module.exports = exports.default;