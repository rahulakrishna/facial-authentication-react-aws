import 'aws-sdk/dist/aws-sdk';
import aws_config from './aws_config.json';

const AWS = window.AWS;
AWS.config.update(aws_config);

const AWSUtil = (()=>{
    const bucket = 'face-rekognition-shyam';
    const sourceImage = 'source.jpg';
    const targetImage = 'rahul.jpg';

    let s3 = new AWS.S3( { params: { Bucket : bucket } } );
    let rekognition = new AWS.Rekognition();

    const compareFacesWithRekognition = () => {
        let compareFacePromise = rekognition.compareFaces(
          {
            SimilarityThreshold: 90,
            SourceImage: {
              S3Object: {
                Bucket: bucket,
                Name: sourceImage
              }
            },
            TargetImage: {
              S3Object: {
                Bucket: bucket,
                Name: targetImage
              }
            }
          }
        ).promise();
    
        return compareFacePromise
          .then((data) => {
            console.log(data);
            return data.FaceMatches[0] ? true : false;
          }).catch(() => {
            return false;
          });
      }

      const compareFaces = (buffer) => {
        let putObjectPromise = s3.putObject(
          {
            Key: sourceImage,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
          }
        ).promise();
    
        return putObjectPromise
          .then(() => {
            return compareFacesWithRekognition();
          }).catch(() => {
            return false;
          });
      }

      return {
          compareFaces
      };
})();

export default AWSUtil;