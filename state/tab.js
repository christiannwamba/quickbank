import { assign } from 'xstate';

export const initial = 'active';

export const states = {
  active: {
    on: {
      'TAB.ONE': {
        actions: assign({
          tab: { index: 1 },
        }),
      },
      'TAB.ZERO': {
        actions: assign({
          tab: { index: 0 },
        }),
      },
    },
  },
};

export const tab = {
  id: 'tab',
  initial,
  states,
};

export default tab;
