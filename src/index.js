import assert from 'assert';
import isBlank from 'underscore.string/isBlank';
import Download from 'download';
import parser from 'uri-template';
import normalizeurl from 'normalize-url';
import assign from 'lodash/object/assign';

var tpl = parser.parse('repository/archive.zip{?private_token,ref}')
const DEFAULT_OPTIONS = {extract: 'true', mode: '755', strip: 1};

export default class GitlabDownload {
  constructor(gitlabUrl, token) {
    assert(!isBlank(gitlabUrl), `gitlab is mandatory`);
    assert(!isBlank(token), `token is mandatory`);
    this.gitlabUrl = gitlabUrl;
    this.token = token;
  }

  download({remote, dest= './', ref = 'master', downloadOptions = {}}) {
    let options = assign({}, DEFAULT_OPTIONS, downloadOptions);

    return new Promise((resolve, reject) => {
      assert(!isBlank(remote), `remote is mandatory`);
      assert(!isBlank(ref), `ref is mandatory`);
      assert(!isBlank(dest), `dest is mandatory`);  
      
      let url = `${this.gitlabUrl}/${remote}/` + tpl.expand({private_token: this.token, ref});
      new Download(options)
      .get(normalizeurl(url))
      .dest(dest)
      .run(function(err, files) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}