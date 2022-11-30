/**
 * Mock server
 */
const fs = require('fs');
const path = require('path');
const express = require('express');
const klaw = require('klaw');
const _ = require('lodash');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const address = require('address');
const localIp = address.ip();

console.log(`process.platform: ${process.platform}`);
const platform = process.platform;
switch (platform) {
  case 'aix':
    console.log('IBM AIX platform');
    break;
  case 'darwin':
    console.log('Darwin platfrom(MacOS, IOS etc)');
    break;
  case 'freebsd':
    console.log('FreeBSD Platform');
    break;
  case 'linux':
    console.log('Linux Platform');
    break;
  case 'openbsd':
    console.log('OpenBSD platform');
    break;
  case 'sunos':
    console.log('SunOS platform');
    break;
  case 'win32':
    console.log('windows platform');
    break;
  default:
    console.log('unknown platform');
}

console.log('localIP:', localIp);

const resolvePath = (pathUrl) => {
  return path.join(process.cwd(), './zgMockServerFiles', pathUrl);
};

// 读取外置依赖的配置文件
const configPath = resolvePath('./config/config.json');
// console.log('cwd configPath:', configPath);
let config = null;
config = fs.readFileSync(configPath, 'utf-8');
if (config) {
  config = JSON.parse(config);
} else {
  console.log(`读取配置文件失败，需要 ${configPath} 文件`);
  process.exit();
}

// 项目对应的mock数据文件夹目录 - 读取mocks目录
const mockFolder = config.mockFolder || 'mocks';
const mockDir = resolvePath(mockFolder);
// console.log('cwd mockFolderPath:', mockDir);
// pkg打包需要先读好外置依赖的配置文件
fs.readdirSync(mockDir);

const methodFlag = ['$get', '$post']; // 请求方法

const port = config.port || '5555';
// 接口延时
const sleepTimer = config.sleepTimer || 0;

const routers = {};

const mockFiles = [];

let err;

klaw(mockDir)
  .on('data', (file) => {
    if (path.extname(file.path) !== '.js') return;
    mockFiles.push(file.path);
  })
  .on('end', () => {
    mockFiles.forEach((file) => {
      try {
        const router = require(file); // require mocks/xmzg 文件夹下的文件
        Object.assign(routers, router);
      } catch (error) {
        err = error;
        console.log(err);
      }
    });
    server(routers);
  });
let sr = null;
function server(routers) {
  const app = express();

  const allowCrossDomain = function (req, res, next) {
    // 允许跨域
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With'
    );
    // res.header(
    //   'Access-Control-Allow-Origin',
    //   'PUT, POST, GET, DELETE, OPTIONS'
    // );
    next();
  };
  app.use(allowCrossDomain);
  // 处理请求体
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  Object.keys(routers).forEach(function (api) {
    const routeHander = routers[api];
    const routerInst = new express.Router();

    if (_.isFunction(routeHander)) {
      routerInst.use(api, routeHander);
    } else if (_.isObject(routeHander)) {
      // 如果存在$get/$post
      if (
        methodFlag.some((it) => {
          return routeHander[it];
        })
      ) {
        methodFlag.forEach((it) => {
          const method = it.toLocaleLowerCase().replace('$', '');
          if (routeHander[it]) {
            if (_.isFunction(routeHander[it])) {
              routerInst[method](api, (req, res, next) => {
                let params = req.body;
                if (method === 'get') {
                  params = req.query;
                }
                console.log(chalk.green(`${api}  ${method}`));
                responseTo(res, api, method, routeHander[it](params), next);
              });
            } else {
              routerInst[method](api, (req, res, next) => {
                console.log(chalk.green(`${api}  ${method}`));
                responseTo(res, api, method, routeHander[it], next);
              });
            }
          }
        });
      }
    }
    app.use('/', routerInst);
  });

  if (err) {
    app.use((req, res, next) => {
      return next(err);
    });
  }

  sr = app.listen(port, () => {
    console.log(chalk.green('MockServer running at:'));
    console.log(' - Local:   ', chalk.green(`http://localhost:${port}`));
    console.log(' - Network: ', chalk.green(`http://${localIp}:${port}`));
  });
}

function responseTo(res, api, method, data, next) {
  // 模拟接口延时
  setTimeout(() => {
    res.json(data);
    next();
  }, sleepTimer);
}

// setTimeout(() => {
//   if (sr && sr.close) {
//     sr.close();
//   }
// }, 6000);
