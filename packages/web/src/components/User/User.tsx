import React from 'react';
import { useStore } from 'react-redux';

export const User = () => {
  const store = useStore();
  const state = store.getState();

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  );
};
