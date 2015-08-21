'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _underscoreStringIsBlank = require('underscore.string/isBlank');

var _underscoreStringIsBlank2 = _interopRequireDefault(_underscoreStringIsBlank);

var _download = require('download');

var _download2 = _interopRequireDefault(_download);

var _uriTemplate = require('uri-template');

var _uriTemplate2 = _interopRequireDefault(_uriTemplate);

var _normalizeUrl = require('normalize-url');

var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

var tpl = _uriTemplate2['default'].parse('repository/archive.zip{?private_token,ref}');
var DEFAULT_OPTIONS = { extract: 'true', mode: '755', strip: 1 };

var GitlabDownload = (function () {
  function GitlabDownload(gitlabUrl, token) {
    _classCallCheck(this, GitlabDownload);

    (0, _assert2['default'])(!(0, _underscoreStringIsBlank2['default'])(gitlabUrl), 'gitlab is mandatory');
    (0, _assert2['default'])(!(0, _underscoreStringIsBlank2['default'])(token), 'token is mandatory');
    this.gitlabUrl = gitlabUrl;
    this.token = token;
  }

  _createClass(GitlabDownload, [{
    key: 'download',
    value: function download(_ref) {
      var _this = this;

      var remote = _ref.remote;
      var _ref$dest = _ref.dest;
      var dest = _ref$dest === undefined ? './' : _ref$dest;
      var _ref$ref = _ref.ref;
      var ref = _ref$ref === undefined ? 'master' : _ref$ref;
      var _ref$downloadOptions = _ref.downloadOptions;
      var downloadOptions = _ref$downloadOptions === undefined ? {} : _ref$downloadOptions;

      var options = (0, _lodashObjectAssign2['default'])({}, DEFAULT_OPTIONS, downloadOptions);

      return new Promise(function (resolve, reject) {
        (0, _assert2['default'])(!(0, _underscoreStringIsBlank2['default'])(remote), 'remote is mandatory');
        (0, _assert2['default'])(!(0, _underscoreStringIsBlank2['default'])(ref), 'ref is mandatory');
        (0, _assert2['default'])(!(0, _underscoreStringIsBlank2['default'])(dest), 'dest is mandatory');

        var url = _this.gitlabUrl + '/' + remote + '/' + tpl.expand({ private_token: _this.token, ref: ref });
        new _download2['default'](options).get((0, _normalizeUrl2['default'])(url)).dest(dest).run(function (err, files) {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      });
    }
  }]);

  return GitlabDownload;
})();

exports['default'] = GitlabDownload;
module.exports = exports['default'];