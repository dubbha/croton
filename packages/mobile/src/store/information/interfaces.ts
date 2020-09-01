export const INFORMATION_NOTIFY = 'INFORMATION_NOTIFY';
export const INFORMATION_HIDE = 'INFORMATION_NOTIFY_HIDE';
export const INFORMATION_LOADER = 'INFORMATION_LOADER';
export const INFORMATION_LOADER_HIDE = 'INFORMATION_LOADER_HIDE';
export interface InformationState {
  isLoading: boolean;
  status: null | boolean;
  type: null | 'error' | 'info';
  message: null | 'string';
}

export interface PayloadInformationNotify {
  type: 'error' | 'info';
  message: 'string';
}
