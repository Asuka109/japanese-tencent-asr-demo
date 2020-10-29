# 简介

调用腾讯云 asr 接口对日语音频进行语音识别，

# 使用方式

需要在腾讯云[开通语音识别能力](https://cloud.tencent.com/product/asr)并进行相关配置，具体参考官方文档。

创建配置文件 `.env`，添加腾讯云个人密钥：

```
SECRET_ID=<-- SECRET_ID -->
SECRET_KEY=<-- SECRET_KEY -->
```

安装依赖并运行：

```bash
yarn install
yarn start
```

不过好像对日语的识别效果还是不太好😅