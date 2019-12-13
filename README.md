Node.js - gitlab-download
================


Easily download Gitlab repos without any external dependencies such as Git, Tar, Unzip, etc.



Installation
------------

    npm install gitlab-download



Usage
-----

### instanciate new GitlabDownload(gitlabUrl, token)
Instanciate gitlab-download
```js
var GitlabDownload = require('gitlab-download');
var gitlab = new GitlabDownload('https://mysgitlab.com', 'aze12233zae');
```

- **gitlabUrl**: 
    - a Github URL string such as `https://mysgitlab.com`
- **token**: You private token.

### download(params)

Downloads the latest copy of some Gitlab reference (branch, tag, or commit), or the `master` branch by default.

- **params**: Object of param:
     - **remote**: path of project (sample:`eyolas/gitlab-download`) (required)
     - **dest**: The output directory. Uses the current working directory if nothing is specified.
     - **ref**: Gitlab reference (branch, tag, or commit). Default : `master`
     - **downloadOptions**: Options for [download api]()

Returns a GithubDownloader object that emits events on `dir`, `file`, and `end`.

Example:

```javascript
var GitlabDownload = require('gitlab-download');
var gitlab = new GitlabDownload('https://mysgitlab.com', 'aze12233zae');
gitlab.download({remote: 'eyolas/gitlab-download'});
```


License
-------

(WTFPL License)
