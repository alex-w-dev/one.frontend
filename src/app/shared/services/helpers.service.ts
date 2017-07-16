import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
  static deepFind(obj, fullPath) {
    let paths = fullPath.split('.')
      , current = obj
      , i;

    for (i = 0; i < paths.length; ++i) {
      if (!current[paths[i]] && (i + 1 < paths.length)) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }

    return current;
  }

  static set(object, path, value) {
    let schema = object;
    const pList = path.split('.');
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
      let elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
  }
}

