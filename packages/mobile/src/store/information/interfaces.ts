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
export interface PayloadInformatinoPushnotification {
  id: string;
  foreground: boolean;
  title: string;
  message: string;
  sound: string | null;
  userInteraction: boolean;
}
