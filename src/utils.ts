const parser = require('uri-template');

const makeString = (obj: any) => {
  if (obj === null || obj === undefined) {
    return '';
  }

  return '' + obj;
};

export const isBlank = (str: any) => /^\s*$/.test(makeString(str));


export interface TplParser {
  expand(options: {}): string;
}

export const tpl: TplParser = parser.parse('repository/archive.zip{?private_token,sha}');
