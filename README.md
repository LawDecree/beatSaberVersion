# beatSaberVersion

> 本工具用来把 Beat Saber 的 2.0 版本自定义歌曲转换为 1.5 版
> 只在自己电脑上测试过好使，还很不完善，代码也不难，也就是给大家做个参考

## How to use
### 1. Install Nodejs
要先安装 nodejs，详见 [Nodejs 官网](https://nodejs.org/en/)
### 2. Download code and install dependence
下载本项目，并安装依赖
```bash
# 下载项目
$ git clone https://github.com/zhaolandelong/beatSaberVersion.git

# 进入目录
$ cd beatSaberVersion

# 安装依赖
$ npm i

# 新建 dist 和 origin 文件夹
$ mkdir dist origin
```
### 3. Download customSongs and run script
1. 把从 [beatsaver](https://beatsaver.com/) 或 [bsaber](https://bsaber.com/) 下载的压缩包解压成文件夹，建议自己重命名下，假设叫 song_folder，结构大概如下：
```
song_folder
    cover.jpg
    Expert.dat
    Freaks.egg
    Hard.dat
    info.dat
    Normal.dat
```
2. 把 song_folder 复制到项目的 origin 目录下，可以多下载几首一起复制，大概结构如下：
```
beatSaberVersion
    origin
        song_folder1
        song_folder2
        song_folder3
        ...
```
3. **运行脚本 2 次**，这里偷了个懒，第一次先生成文件夹，第二次才是转换文件，大家将就下
```bash
$ npm start
```
4. 把 dist 下的所有文件夹（结构应该跟 origin 一样），剪切或复制到 Beat Saber 下的 CustomSongs 目录下即可