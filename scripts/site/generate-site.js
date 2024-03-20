const fs = require('fs-extra');
const path = require('path');
const parseDocMdUtil = require('./utils/parse-doc-md');
const parseDemoMdUtil = require('./utils/parse-demo-md');
const nameWithoutSuffixUtil = require('./utils/name-without-suffix');
const generateCodeBox = require('./utils/generate-code-box');
const generateDemo = require('./utils/generate-demo');
const generateDemoCodeFiles = require('./utils/generate-demo-code-files');
const generateDocs = require('./utils/generate-docs');
const generateRoutes = require('./utils/generate-routes');
const generateIframe = require('./utils/generate-iframe');
const capitalizeFirstLetter = require('./utils/capitalize-first-letter');
const camelCase = require('./utils/camelcase');
const getMeta = require('./utils/get-meta');
const arg = process.argv[2];
// create site folder
const showCasePath = path.resolve(__dirname, '../../site');

/**
 * _site/doc所指为scripts/site/_site/doc,_site下均为模版文件
 * {{component}}/demo下的示例组件的selector命名规则为：nz-demo-{{component}}-{{key}}，key为对应demo的文件名
 */
function generate(target) {
  const isSyncSpecific = target && target !== 'init';
  if (!target) {
    fs.removeSync(`${showCasePath}/doc`);
    fs.copySync(path.resolve(__dirname, '_site/doc'), `${showCasePath}/doc`);
  } else if (target === 'init') {
    fs.removeSync(`${showCasePath}`);
    fs.copySync(path.resolve(__dirname, '_site'), `${showCasePath}`);
  } else {
    fs.removeSync(`${showCasePath}/doc/app/${target}`);
  }

  const showCaseTargetPath = `${showCasePath}/doc/app/`;
  const iframeTargetPath = `${showCasePath}/iframe/app/`;
  // read components folder
  const rootPath = path.resolve(__dirname, '../../components');
  const rootDir = fs.readdirSync(rootPath);
  const componentsDocMap = {};
  const componentsMap = {};
  // 生成每一个component对应的文档
  rootDir.forEach(componentName => {
    // 此处用于处理热更新，即组件代码改变后，通过判断是否是同步模式（isSyncSpecific）与当前所循环的组件是否是已更改的组件（componentName !== target）来决定是否生成新代码
    if (isSyncSpecific) {
      if (componentName !== target) {
        return;
      }
    }
    const componentDirPath = path.join(rootPath, componentName);
    const skips = ['style', 'core', 'locale', 'cdk', 'i18n', 'version', 'experimental'];
    if (skips.indexOf(componentName) !== -1) {
      return;
    }
    if (fs.statSync(componentDirPath).isDirectory()) {
      // create site/doc/app->${component} folder
      const showCaseComponentPath = path.join(showCaseTargetPath, componentName);
      fs.mkdirSync(showCaseComponentPath);

      // handle components->${component}->demo folder
      const demoDirPath = path.join(componentDirPath, 'demo');
      const demoMap = {};
      const debugDemos = new Set();

      if (fs.existsSync(demoDirPath)) {
        /**
         * 从这里开始真正处理demo文件夹中的代码
         * demo文件夹下的文件分三种：.md, .ts, module。md用来生成每一个demo的描述，ts用来生成每一个demo的代码，module用来生成该组件下的module.ts文件
         */
        const demoDir = fs.readdirSync(demoDirPath);
        demoDir.forEach(demo => {
          if (/.md$/.test(demo)) {
            const nameKey = nameWithoutSuffixUtil(demo);
            const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demo));
            /**
             * {
             *   meta: { order: 2, title: { 'zh-CN': '中文标题', 'en-US': '英文标题' } },
             *   zh: '<p>中文描述。</p>\n',
             *   en: '<p>英文描述</p>\n'
             *  }
             */
            const demoMeta = parseDemoMdUtil(demoMarkDownFile);

            if (demoMeta.meta.debug && process.env.NODE_ENV !== 'development') {
              debugDemos.add(nameKey);
              return;
            }
            demoMap[nameKey] = demoMeta;
            demoMap[nameKey]['name'] = `NzDemo${camelCase(capitalizeFirstLetter(componentName))}${camelCase(
              capitalizeFirstLetter(nameKey)
            )}Component`;
            // 根据模版文件生成codebox代码
            // 当前不需要双语，故屏蔽所有英语相关内容
            // demoMap[nameKey]['enCode'] = generateCodeBox(
            //   componentName,
            //   demoMap[nameKey]['name'],
            //   nameKey,
            //   demoMap[nameKey].meta.title['en-US'],
            //   demoMap[nameKey].en,
            //   demoMap[nameKey].meta.iframe
            // );
            demoMap[nameKey]['zhCode'] = generateCodeBox(
              componentName,
              demoMap[nameKey]['name'],
              nameKey,
              demoMap[nameKey].meta.title['zh-CN'],
              demoMap[nameKey].zh,
              demoMap[nameKey].meta.iframe
            );
          }

          if (/.ts$/.test(demo)) {
            const nameKey = nameWithoutSuffixUtil(demo);
            if (debugDemos.has(nameKey)) {
              return;
            }

            demoMap[nameKey].ts = String(fs.readFileSync(path.join(demoDirPath, demo)));
            // copy ts file to site->${component} folder
            fs.writeFileSync(path.join(showCaseComponentPath, demo), demoMap[nameKey].ts);
          }

          if (demo === 'module') {
            const data = String(fs.readFileSync(path.join(demoDirPath, demo)));
            fs.writeFileSync(path.join(showCaseComponentPath, 'module.ts'), data);
          }
        });
      }

      // handle components->${component}->page folder, parent component of demo page
      let pageDemo = '';
      const pageDirPath = path.join(componentDirPath, 'page');
      if (fs.existsSync(pageDirPath)) {
        const pageDir = fs.readdirSync(pageDirPath);
        let zhLocale = '';
        // let enLocale = '';
        pageDemo = {};
        pageDir.forEach(file => {
          if (/.ts$/.test(file)) {
            pageDemo.raw = String(fs.readFileSync(path.join(pageDirPath, file)));
          }
          if (/^zh-CN.txt$/.test(file)) {
            zhLocale = String(fs.readFileSync(path.join(pageDirPath, file)));
          }
          // if (/^en-US.txt$/.test(file)) {
          //   enLocale = String(fs.readFileSync(path.join(pageDirPath, file)));
          // }
        });
        // pageDemo.enCode = pageDemo.raw.replace(/locale;/g, enLocale);
        pageDemo.zhCode = pageDemo.raw.replace(/locale;/g, zhLocale);
      }

      // handle components->${component}->doc folder
      const result = {
        name: componentName,
        docZh: parseDocMdUtil(
          fs.readFileSync(path.join(componentDirPath, 'doc/index.zh-CN.md')),
          `components/${componentName}/doc/index.zh-CN.md`
        ),
        // docEn: parseDocMdUtil(
        //   fs.readFileSync(path.join(componentDirPath, 'doc/index.en-US.md')),
        //   `components/${componentName}/doc/index.en-US.md`
        // ),
        demoMap,
        pageDemo
      };
      // componentsDocMap[componentName] = { zh: result.docZh.meta, en: result.docEn.meta };
      componentsDocMap[componentName] = { zh: result.docZh.meta };
      componentsMap[componentName] = demoMap;
      generateDemo(showCaseComponentPath, result);
      generateDemoCodeFiles(result, showCasePath);
    }
  });

  // handle iframe folder
  generateIframe(iframeTargetPath, componentsMap);

  if (!isSyncSpecific) {
    // read docs folder
    const docsPath = path.resolve(__dirname, '../../docs');
    const docsDir = fs.readdirSync(docsPath);
    let docsMap = {};
    let docsMeta = {};
    docsDir.forEach(doc => {
      const name = nameWithoutSuffixUtil(doc);
      docsMap[name] = {
        zh: fs.readFileSync(path.join(docsPath, `${name}.zh-CN.md`)),
        // en: fs.readFileSync(path.join(docsPath, `${name}.en-US.md`))
      };
      docsMeta[name] = {
        zh: getMeta(docsMap[name].zh),
        // en: getMeta(docsMap[name].en)
      };
    });

    generateDocs(showCaseTargetPath, docsMap);
    generateRoutes(showCaseTargetPath, componentsDocMap, docsMeta);
  }
}

if (require.main === module) {
  generate(arg);
}

module.exports = generate;
