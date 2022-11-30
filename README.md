# api-mock-server

> 启动一个本地 mock 接口服务
> 
> 当前 node 版本是 14.15.4 , 如果不匹配，可能需要更新 package.json 里面pkg的配置，或者用nvm做nodejs版本管理，切换对应版本运行此项目。

## 安装

```shell
npm install
```

## 运行

```shell
npm start
```

## 修改配置

> 参考 zgMockServerFiles/config/readme.txt

```
zgMockServerFiles/config/config.json
```

## 修改mock

```
zgMockServerFiles/mocks 文件夹

参考现有js范例进行添加、修改
```

## 打包成可执行文件

> 需全局安装 pkg 包 npm install -g pkg
> npm 地址： https://www.npmjs.com/package/pkg

```shell
# 打包3个平台 包括 npm run cp
npm run pkg

# 下面两个单独平台打包，需要手动先执行 npm run cp 复制好配置文件

# 打包 windows 平台
npm run pkg:win

# 打包 mac 平台
npm run pkg:win

# 执行pkg命令的时候，会下载 fetched-v14.19.2-win-x64 或 fetched-v14.19.2-macos-x64 文件，
# 存放目录，windows 目录是在 C:\Users\你电脑用户名\.pkg-cache 文件夹里面

# 所以第一次打包会慢，后面不需要下载文件，就快了

```