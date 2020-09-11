import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, FileImageIcon, ButtonWithLoader } from 'elements';
import { SHELF_ADD_FLOWER_IMAGES, SHELF_RESET } from 'store/shelf';
import { getShelf } from 'store/shelf/selectors';

type Props = {
  id: number;
};

const maxFileSize = 5000000; // 5M before base64 encoding
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

export const AddImage = ({ id }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgSize, setImgSize] = useState(0);
  const [imgType, setImgType] = useState('');
  const [imgError, setImgError] = useState('');

  useEffect(() => {
    if (imgType && !allowedFileTypes.includes(imgType)) {
      setImgError('File type is not supported');
    } else if (imgSize > maxFileSize) {
      setImgError('File is too large');
    }
    return () => setImgError('');
  }, [imgSize, imgType]);

  const { isLoading, info, error } = useSelector(getShelf);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
    setImgUrl('');
    setImgSize(0);
    setImgType('');
    setImgError('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result as string);
        setImgSize(file.size);
        setImgType(file.type);
      };
      reader.readAsDataURL(file);
    } else {
      setImgUrl('');
      setImgSize(0);
    }
  };

  const handleSubmit = () => {
    dispatch({
      type: SHELF_ADD_FLOWER_IMAGES,
      payload: {
        flowerId: id,
        images: [imgUrl],
      },
    });
  };

  const handleNotificationTimeout = () => {
    dispatch({
      type: SHELF_RESET,
    });
    handleClose();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => setShowModal(true)}>
        Add Image
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FileImageIcon />
            <span className="icon-prefix">
              Add Image
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ width: 500, height: 600, padding: 16 }}>
          <Form.File onChange={handleChange} style={{ height: 30, marginBottom: 16 }} />
          <div style={{ height: 468, width: 468, position: 'relative', marginBottom: 16, border: '1px solid grey', textAlign: 'center', verticalAlign: 'middle' }}>
            <img src={imgUrl} alt="" style={{ maxHeight: '100%', maxWidth: '100%', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }} />
          </div>
          <ButtonWithLoader
            disabled={!imgUrl || !!imgError}
            isLoading={isLoading}
            isSuccess={!!info}
            isFailure={!!error}
            onClick={handleSubmit}
            onNotificationTimeout={handleNotificationTimeout}
          >
            { imgError || 'Upload' }
          </ButtonWithLoader>
        </Modal.Body>
      </Modal>
    </>
  );
};
