import { assign } from 'xstate';

const transactStates = {
  dataEntry: {
    on: {
      'TRANSACTION.SELECT_BENEFICIARY': {
        actions: ['handleBeneficiarySelect'],
      },
      'TRANSACTION.BENEFICIARY_BLUR': {
        cond: 'isBeneficiaryNotSelected',
        target: 'beneficiaryError.beneficiaryNotSelected',
      },
      'TRANSACTION.ENTER_AMOUNT': {
        actions: ['handleAmountInputChange'],
      },
      'TRANSACTION.AMOUNT_BLUR': {
        cond: 'isAmountNotEntered',
        target: 'amountError.amountNotEntered',
      },
      'TRANSACTION.ENTER_TO': {
        actions: ['handleToInputChange'],
      },
      'TRANSACTION.TO_BLUR': [
        {
          cond: 'isToNotEntered',
          target: 'toError.toNotEntered',
        },
        {
          cond: 'isToNotPhone',
          target: 'toError.toNotPhone',
        },
        {
          cond: 'isToNotTV',
          target: 'toError.toNotTV',
        },
      ],
      'TRANSACTION.CANCEL': {
        actions: ['handleTransactionCancel'],
      },
      'TRANSACTION.SUBMIT': [
        {
          cond: 'isBeneficiaryNotSelected',
          target: 'beneficiaryError.beneficiaryNotSelected',
        },
        {
          cond: 'isToNotEntered',
          target: 'toError.toNotEntered',
        },
        {
          cond: 'isToNotPhone',
          target: 'toError.toNotPhone',
        },
        {
          cond: 'isToNotTV',
          target: 'toError.toNotTV',
        },
        {
          cond: 'isAmountNotEntered',
          target: 'amountError.amountNotEntered',
        },
        {
          target: 'awaitingResponse',
        },
      ],
    },
  },
  awaitingResponse: {
    invoke: {
      src: 'requestTransaction',
      onDone: 'transactionSuccessful',
      onError: 'serviceError',
    },
  },
  transactionSuccessful: {
    type: 'final',
  },
  serviceError: {
    on: {
      'TRANSACTION.SUBMIT': {
        target: 'awaitingResponse',
      },
    },
  },
  beneficiaryError: {
    initial: 'beneficiaryNotSelected',
    on: {
      'TRANSACTION.SELECT_BENEFICIARY': {
        target: 'dataEntry',
        actions: ['handleBeneficiarySelect'],
      },
    },
    states: {
      beneficiaryNotSelected: {},
    },
  },
  amountError: {
    initial: 'amountNotEntered',
    on: {
      'TRANSACTION.ENTER_AMOUNT': {
        target: 'dataEntry',
        actions: ['handleAmountInputChange'],
      },
    },
    states: {
      amountNotEntered: {},
    },
  },
  toError: {
    initial: 'toNotEntered',
    on: {
      'TRANSACTION.ENTER_TO': {
        target: 'dataEntry',
        actions: ['handleToInputChange'],
      },
    },
    states: {
      toNotEntered: {},
      toNotPhone: {},
      toNotTV: {},
    },
  },
};

export const states = {
  idle: {
    on: {
      'TRANSACTION.BUY_AIRTIME': {
        target: 'transact',
        actions: ['handleTransactionType'],
      },
      'TRANSACTION.PAY_TV': {
        target: 'transact',
        actions: ['handleTransactionType'],
      },
      'TRANSACTION.SEND_MONEY': {
        target: 'transact',
        actions: ['handleTransactionType'],
      },
    },
  },
  transact: {
    on: {
      'TRANSACTION.IDLE': 'idle',
    },
    initial: 'dataEntry',
    states: transactStates,
  },
};

export const transaction = {
  id: 'transaction',
  initial: 'idle',
  states,
};

export default transaction;
