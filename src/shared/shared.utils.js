import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.NOMADCOFFEE_AWS_KEY,
    secretAccessKey: process.env.NOMADCOFFEE_AWS_SECRET_KEY,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "redbas3-nomadcoffee-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return Location;
};
