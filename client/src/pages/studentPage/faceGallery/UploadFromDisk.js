import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Modal, Row, Upload } from 'antd';
import React, { useState } from 'react';
import { ROBOT_ICON_URL } from '../../../assets';
import { CheckError } from '../../../ErrorHandling';
import { getFullFaceDescription } from '../../../faceUtil';
import { inputSize } from '../../../globalData';
import { EmojiProcessing } from '../../../utils/EmojiProcessing';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

export const UploadFromDisk = ({
  addFacePhotoCallback,
  galleryRefetch,
  countRefetch,
  loading,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fullDesc, setFullDesc] = useState([]);
  const [faceDescriptor, setFaceDescriptor] = useState([]);
  const [expression, setExpression] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isRunningFaceDetector, setIsRunningFaceDetector] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);

  const [fileList, setFileList] = useState({});
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = async ({ fileList }) => {
    if (fileList.length === 0) {
      setFaceDescriptor([]);
      setDetectionCount(0);
      setFileList([]);
      return;
    }

    if (!fileList[0].url && !fileList[0].preview) {
      fileList[0].preview = await getBase64(fileList[0].originFileObj);
    }
    setPreviewImage(fileList[0].url || fileList[0].preview);
    setFileList(fileList);
    setTimeout(() => {
      if (fileList[0].preview.length > 0) {
        setIsRunningFaceDetector(true);
        getFullFaceDescription(fileList[0].preview, inputSize).then((data) => {
          setFullDesc(data);
          setDetectionCount(data.length);
          setFaceDescriptor(data[0]?.descriptor);
          setExpression(
            data[0] &&
              Object.keys(data[0]?.expressions).find(
                (key) =>
                  data[0]?.expressions[key] ===
                  Object.values(data[0]?.expressions).reduce((a, b) =>
                    Math.max(a, b)
                  )
              )
          );
          setIsRunningFaceDetector(false);
        });
      }
    }, 1000);
  };
  
  const handleSubmit = () => {
    if (previewImage.length > 0 && faceDescriptor.length === 128)
      addFacePhotoCallback({
        update(_, data) {
          galleryRefetch();
          countRefetch();
          message.success('Add Face Photo Success!');
        },
        onError(err) {
          CheckError(err);
        },
        variables: {
          photoData: previewImage,
          faceDescriptor: faceDescriptor.toString(),
          expression: expression,
        },
      });
  };
  console.log(faceDescriptor);
  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col>
          <Upload
            beforeUpload={() => false}
            multiple={false}
            listType='picture-card'
            onPreview={handlePreview}
            onChange={handleChange}
            accept='image/x-png,image/gif,image/jpeg'
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Col>
        <Col>
          {' '}
          <Button
            type='primary'
            loading={loading}
            disabled={
              previewImage.length === 0 ||
              loading ||
              detectionCount !== 1 ||
              faceDescriptor.length !== 128
            }
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row>
        <div>
          {detectionCount > 1 && (
            <span className='alert'>Only single face allowed</span>
          )}
          {detectionCount === 0 && (
            <span className='alert'>No face detected</span>
          )}
          {detectionCount === 1 && expression.length > 0 && (
            <Card>
              <img
                src={ROBOT_ICON_URL.link}
                style={{
                  width: ROBOT_ICON_URL.width,
                  height: ROBOT_ICON_URL.height,
                }}
              />
              <span style={{ color: 'darkblue', fontWeight: 900 }}>
                : Feel like you are{' '}
              </span>
              <EmojiProcessing exp={expression} size='sm' />
            </Card>
          )}
          <p>
            Number of detection:{' '}
            {isRunningFaceDetector ? (
              <>
                Detecting face... <LoadingOutlined />
              </>
            ) : (
              detectionCount
            )}
          </p>
          Face Descriptor:{' '}
          {detectionCount === 0 && !isRunningFaceDetector && <span>Empty</span>}
          {isRunningFaceDetector && (
            <>
              Generating 128 measurements... <LoadingOutlined />
            </>
          )}
          <br />
          {fullDesc.map((desc, index) => (
            <div
              key={index}
              style={{
                wordBreak: 'break-all',
                marginBottom: '10px',
                backgroundColor: 'lightblue',
              }}
            >
              <p style={{ color: 'red', fontSize: '20px', fontWeight: 900 }}>
                Face #{index + 1}:{' '}
              </p>{' '}
              {desc.descriptor.toString()}
            </div>
          ))}
        </div>
      </Row>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
