import { Handler, S3Event } from "aws-lambda";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { promisify } from "util";

const REGION = "ap-northeast-1";
const BUCKET = "springbatch-sample-backet1";

const s3Client = new S3Client({ region: REGION });

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

export const handler: Handler = async (event, context) => {
  try {
    const listCommand = new ListObjectsCommand({
      Bucket: BUCKET,
    });
    const listResponse = await s3Client.send(listCommand);
    console.log(listResponse);

    if (listResponse.Contents && listResponse.Contents.length > 0) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: BUCKET,
        Key: listResponse.Contents[0].Key!,
      });
      const getObjectResponse = await s3Client.send(getObjectCommand);
      const bodyContents = await streamToString(
        getObjectResponse.Body as Readable
      );
      console.log(bodyContents);
    }
  } catch (err) {
    console.error(err);
  }

  return "Hello, world!";
};
