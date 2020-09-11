import { useMedia } from './useMedia';

export const useMediaWidth = () => {
  const sm = useMedia('(min-width: 576px)');
  const md = useMedia('(min-width: 768px)');
  const xl = useMedia('(min-width: 1200px)');

  /* eslint-disable no-nested-ternary */
  return xl
    ? 'xl'
    : md
      ? 'md'
      : sm
        ? 'sm'
        : 'xs';
};
