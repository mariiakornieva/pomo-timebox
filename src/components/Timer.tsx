import React, { useState } from 'react';

type TimerStatus = 'running' | 'paused' | 'stopped';
type State = 'focus' | 'rest';

interface TimerProps {
  status: TimerStatus;
  state: State;
}

export const Timer: React.FC = () => {
  return (
    <div>
      <button>{'Start'}</button>
      <button>{'Rest'}</button>
    </div>
  );
};
