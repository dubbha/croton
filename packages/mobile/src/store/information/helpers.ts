import { MessageOptions } from '../../components/NotifyMessage/interfaces';

export const getMessageOptions = (data: any) => {
  let handledMessage: MessageOptions = {
    type: null,
    message: null,
  };

  if (data.error) {
    handledMessage.type = 'error';
    handledMessage.message = data.error;
    return handledMessage;
  }

  if (data.info) {
    handledMessage.type = 'info';
    handledMessage.message = data.info;
    return handledMessage;
  }
};

export const getStatus = (data: any) => {
  let status = null;
  if (data.error) {
    status = false;
  }
  if (data.info) {
    status = true;
  }
  return status;
};
