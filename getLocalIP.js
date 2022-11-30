const fs = require('fs');


function getIp() {
  const address = require('address');
  const ip = address.ip();
  return ip;
}

const localIp = getIp();
console.log('localIp:', localIp);

// 调用执行exe文件
/* const { execFile } = require('child_process');
const execPath = "./dist/mockServerWin";
const child = execFile('mock-server-win.exe', [], { cwd: execPath }, function(error, data){
  if (error) {
    console.error(error);
    return;
  };
  console.log(data.toString());
}); */


// 监听文件变化，其实可以用 chokidar 这个npm包
/* const opt = {
  persistent: true, // persistent <boolean> 指示如果文件已正被监视，进程是否应继续运行。默认值: true。
  recursive: false, // recursive <boolean> 指示应该监视所有子目录，还是仅监视当前目录。 这适用于监视目录时，并且仅适用于受支持的平台（参见注意事项）。默认值: false。
};
fs.watch('./mocks', opt, (eventType, filename) => {
  console.log(`事件类型是: ${eventType}`);
  if (filename) {
    console.log(`提供的文件名: ${filename}`);
  } else {
    console.log('文件名未提供');
  }
});
 */