import { Machine, interpret } from 'xstate';
import context from './context';
import tab from './tab';
import transaction from './transaction';
import fetch from './fetch';

import {
  actions as transactionActions,
  guards as transactionGuards,
  services as transactionServices,
} from './handlers/transaction';
import { services as fetchServices } from './handlers/fetch';

const config = {
  type: 'parallel',
  context,
  states: { tab, transaction, fetch },
  strict: true,
};
const machine = Machine(config, {
  actions: {
    ...transactionActions,
  },
  guards: {
    ...transactionGuards,
  },
  services: {
    ...transactionServices,
    ...fetchServices,
  },
});

export const stateService = interpret(machine, { devTools: true })
  .onTransition((state) => {
    console.log('service', state.context, state.event, state);
  })
  .start();

export default stateService;
