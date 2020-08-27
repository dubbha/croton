import { SetStateAction, Dispatch } from 'react';

import { InputConfigs } from './inputConfigs';
import { InputTypes, ValidationResult } from './interfaces';

const hideMessageClassComponent = function(obj: any, validationType: any) {
  const defaultResult = {
    status: false,
    isShowMessage: false,
  };
  const validateStatus: { [index: string]: any } = {};

  if (Array.isArray(validationType)) {
    validationType.forEach(type => {
      const validationStatus = { ...obj.state[type] };
      validationStatus.isShowMessage = false;
      validateStatus[type] = validationStatus;
    });
  } else {
    validateStatus[validationType] = defaultResult;
  }

  obj.setState(validateStatus);
};

const hideMessageFunctionalComponent = (
  result: ValidationResult,
  statusHandler: Dispatch<SetStateAction<ValidationResult>>,
) => {
  const status = result.status;

  statusHandler({
    status,
    isShowMessage: false,
  });
};

const inputValidatorFunctionalComponent = (
  value: string | { prev: string; current: string },
  inputType: InputTypes,
  statusHandler: Dispatch<SetStateAction<ValidationResult>>,
  isValidateWhenSubmit?: boolean,
) => {
  let result: ValidationResult = {
    status: null,
    isShowMessage: false,
  };
  const isValueEmpty = value === '';
  const isDefaultState = isValueEmpty && !isValidateWhenSubmit;
  if (isDefaultState) {
    statusHandler(result);
    return;
  }
  const config: any = InputConfigs[inputType];
  const validator = config.validator;
  let status;
  if (inputType !== 'repeatPassword') {
    status = validator(value);
  } else {
    const prewPasswordValue = value.prev;
    status = validator(value.current, prewPasswordValue);
  }
  result = {
    status,
    isShowMessage: status ? false : true,
  };

  if (!status && !isValidateWhenSubmit) {
    setTimeout(() => {
      hideMessageFunctionalComponent(result, statusHandler);
    }, 2000);
  }

  statusHandler(result);

  if (isValidateWhenSubmit) {
    return result;
  }
};

const inputValidatorClassComponent = (
  obj: any,
  inputType: InputTypes,
  statusHandler: string,
  isValidateWhenSubmit?: boolean,
): ValidationResult | undefined => {
  let result: ValidationResult = {
    status: null,
    isShowMessage: false,
  };
  const isValueEmpty = obj.state[inputType] === '';
  const isDefaultState = isValueEmpty && !isValidateWhenSubmit;
  if (isDefaultState) {
    obj.setState(result);
    return;
  }
  const config: any = InputConfigs[inputType];
  const value = obj.state[inputType];
  const validator = config.validator;
  let status;

  if (inputType !== 'repeatPassword') {
    status = validator(value);
  } else {
    const prewPasswordValue = obj.state.password;
    status = validator(value, prewPasswordValue);
  }
  result = {
    status,
    isShowMessage: status ? false : true,
  };

  if (!status && !isValidateWhenSubmit) {
    setTimeout(() => {
      hideMessageClassComponent(obj, statusHandler);
    }, 2000);
  }

  const validateStatus = {
    [statusHandler]: result,
  };
  obj.setState(validateStatus);

  if (isValidateWhenSubmit) {
    return result;
  }
};

export {
  hideMessageClassComponent,
  hideMessageFunctionalComponent,
  inputValidatorFunctionalComponent,
  inputValidatorClassComponent,
};
