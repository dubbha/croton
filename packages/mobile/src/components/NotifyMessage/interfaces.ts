export interface MessageOptions {
  message: string | null;
  type?: null | 'info' | 'error';
}

export interface NotifyMessageProps {
  timer?: number;
}
