import { PayloadInformationNotify } from './interfaces';

export const INFORMATION_NOTIFY = 'INFORMATION_NOTIFY';
export const INFORMATION_HIDE = 'INFORMATION_NOTIFY_HIDE';
export const INFORMATION_LOADER = 'INFORMATION_LOADER';
export const INFORMATION_LOADER_HIDE = 'INFORMATION_LOADER_HIDE';
interface InformationNotify {
  type: typeof INFORMATION_NOTIFY;
  payload: PayloadInformationNotify;
}

interface InformationHide {
  type: typeof INFORMATION_HIDE;
}

interface InformationLoader {
  type: typeof INFORMATION_LOADER;
}

interface InformationLoaderHide {
  type: typeof INFORMATION_LOADER_HIDE;
}

export type InformationActionTypes =
  | InformationNotify
  | InformationHide
  | InformationLoader
  | InformationLoaderHide;
