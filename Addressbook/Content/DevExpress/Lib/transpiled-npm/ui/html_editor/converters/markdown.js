"use strict";

exports.default = void 0;

var _turndown = _interopRequireDefault(require("turndown"));

var _showdown = _interopRequireDefault(require("showdown"));

var _window = require("../../../core/utils/window");

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

var _converterController = _interopRequireDefault(require("../converterController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MarkdownConverter = /*#__PURE__*/function () {
  function MarkdownConverter() {
    _classCallCheck(this, MarkdownConverter);

    var window = (0, _window.getWindow)();
    var turndown = window && window.TurndownService || _turndown.default;
    var showdown = window && window.showdown || _showdown.default;

    if (!turndown) {
      throw _ui.default.Error('E1041', 'Turndown');
    }

    if (!showdown) {
      throw _ui.default.Error('E1041', 'Showdown');
    }

    this._html2Markdown = new turndown();
    this._markdown2Html = new showdown.Converter({
      simpleLineBreaks: true,
      strikethrough: true
    });
  }

  _createClass(MarkdownConverter, [{
    key: "toMarkdown",
    value: function toMarkdown(htmlMarkup) {
      return this._html2Markdown.turndown(htmlMarkup || '');
    }
  }, {
    key: "toHtml",
    value: function toHtml(markdownMarkup) {
      var markup = this._markdown2Html.makeHtml(markdownMarkup);

      if (markup) {
        markup = markup.replace(new RegExp('\\r?\\n', 'g'), '');
      }

      return markup;
    }
  }]);

  return MarkdownConverter;
}();

_converterController.default.addConverter('markdown', MarkdownConverter);

var _default = MarkdownConverter;
exports.default = _default;
module.exports = exports.default;