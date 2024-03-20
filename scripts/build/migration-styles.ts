/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import * as fs from 'fs-extra';

import * as path from 'path';

import { buildConfig } from '../build-config';

const sourcePath = buildConfig.publishDir;
const targetPath = path.join(buildConfig.publishDir, `src`);

/**
 * 将原public/style目录下的文件copy至public/src/style下
 * 将全部样式汇总css、less同样copy至public/src下
 */
export function copyStylesToSrc(): void {
  fs.mkdirsSync(targetPath);
  console.log('source.path:', sourcePath);
  console.log('target.path:', targetPath);
  // throw new Error();
  fs.copySync(path.resolve(sourcePath, `style`), path.resolve(targetPath, `style`));
  fs.copySync(path.resolve(sourcePath, `ng-zorro-antd.css`), path.resolve(targetPath, `ng-zorro-antd.css`));
  fs.copySync(path.resolve(sourcePath, `ng-zorro-antd.min.css`), path.resolve(targetPath, `ng-zorro-antd.min.css`));
  fs.outputFileSync(
    path.resolve(targetPath, `ng-zorro-antd.less`),
    `@root-entry-name: default;
@import "../style/entry.less";
@import "../components.less";`
  );
}
