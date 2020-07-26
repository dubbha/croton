import { InputConfigs } from './../../../components/Input/inputConfigs';

const hideMessage = function(obj: any, validationType: any) {
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

type InputTypes =
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'firstName'
  | 'lastName';

interface ValidateResult {
  status: null | boolean;
  isShowMessage: boolean;
}
type ValidateInput = ValidateResult | void;

const validateInput = function(
  obj: any,
  type: InputTypes,
  validationType: string,
  isValidateWhenSubmit?: boolean,
): ValidateInput {
  let result;
  const isValueEmpty = obj.state[type] === '';
  // TODO: How to write this statement inverser accroding to Uncle Bob ???
  if (isValueEmpty && !isValidateWhenSubmit) {
    result = {
      status: null,
      isShowMessage: false,
    };
  } else {
    const config: any = InputConfigs[type];
    const value = obj.state[type];
    const validator = config.validator;
    let status;
    if (type !== 'repeatPassword') {
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
      setTimeout(function() {
        hideMessage(obj, validationType);
      }, 2000);
    }
  }
  const validateStatus = {
    [validationType]: result,
  };
  obj.setState(validateStatus);

  if (isValidateWhenSubmit) {
    return result;
  }
};

export { validateInput, hideMessage };
