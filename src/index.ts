import assert from 'assert';
import { isBlank, tpl } from './utils';
import download from 'download';
import normalizeurl from 'normalize-url';

const DEFAULT_OPTIONS: download.DownloadOptions = { extract: true, strip: 1 };

export interface GitlabDownloadOptions {
  remote: string;

  dest?: string;

  ref?: string;

  downloadOptions: download.DownloadOptions;
}

export default class GitlabDownload {
  private gitlabUrl: string;

  private token: string;

  constructor(gitlabUrl: string, token: string) {
    assert(!isBlank(gitlabUrl), `gitlab is mandatory`);
    assert(!isBlank(token), `token is mandatory`);
    this.gitlabUrl = gitlabUrl;
    this.token = token;
  }

  download({
    remote,
    dest,
    ref = 'master',
    downloadOptions = {},
  }: GitlabDownloadOptions) {
    assert(!isBlank(remote), `remote is mandatory`);
    assert(!isBlank(ref), `ref is mandatory`);

    const options: download.DownloadOptions = {
      ...DEFAULT_OPTIONS,
      ...downloadOptions,
    };
    remote = encodeURIComponent(remote);

    const url = `${this.gitlabUrl}/api/v4/projects/${remote}/${tpl.expand({
      private_token: this.token,
      sha: ref,
    })}`;

    return download(normalizeurl(url), dest, options);
  }
}
