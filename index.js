const tencentcloud = require("tencentcloud-sdk-nodejs");
const fs = require("fs");
require('dotenv').config();

const AsrClient = tencentcloud.asr.v20190614.Client;

const clientConfig = {
  credential: {
    secretId: process.env.SECRET_ID,
    secretKey: process.env.SECRET_KEY,
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "asr.tencentcloudapi.com",
    },
  },
};

const client = new AsrClient(clientConfig);
const data = fs.readFileSync("audio.mp3").toString('base64');
const params = {
    "EngineModelType": "16k_ja",
    "ChannelNum": 1,
    "ResTextFormat": 1,
    "SourceType": 1,
    "Data": data
};

(async () => {
  const result = await client.CreateRecTask(params);

  const intervalId = setInterval(async () => {
    const result2 = await client.DescribeTaskStatus({ "TaskId": result.Data.TaskId });
    console.log(result2);
    if (result2.Data.StatusStr === "success") {
      clearInterval(intervalId);
      const jsonFileData = JSON.stringify(result2.Data, null, "\t");
      fs.writeFileSync("data.json", jsonFileData);
    }
  }, 2000);
})();
