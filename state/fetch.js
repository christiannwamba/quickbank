import { assign } from 'xstate';

const fetchWalletStates = {
  fetchWallet: {
    on: {
      'FETCH.WALLET': 'awaitingFetchWallet',
    },
  },

  awaitingFetchWallet: {
    invoke: {
      src: 'requestFetchWallet',
      onDone: {
        target: 'walletReceived',
        actions: assign({
          balance: (_, evt) => evt.data.available_balance,
        }),
      },
      onError: 'walletServiceError',
    },
  },

  walletReceived: {
    type: 'final',
  },

  walletServiceError: {
    type: 'final',
  },
};

const fetchUserStates = {
  fetchUser: {
    on: {
      'FETCH.USER': 'awaitingFetchUser',
    },
  },

  awaitingFetchUser: {
    invoke: {
      src: 'requestFetchUser',
      onDone: {
        target: 'userReceived',
        actions: assign({
          user: (_, evt) => evt.data,
        }),
      },
      onError: 'userServiceError',
    },
  },

  userReceived: {
    type: 'final',
  },

  userServiceError: {
    type: 'final',
  },
};

const fetchTransactionsStates = {
  fetchTransactions: {
    on: {
      'FETCH.TRANSACTIONS': 'awaitingFetchTransactions',
    },
  },

  awaitingFetchTransactions: {
    invoke: {
      src: 'requestFetchTransactions',
      onDone: {
        target: 'transactionsReceived',
        actions: assign({
          transactions: (_, evt) =>
            evt.data.map((t) => ({
              merchant: t.product_name || 'UNKNOWN',
              to: t.customer_id,
              amount: t.amount,
              date: t.created_at,
              id: t.tx_id
            })),
        }),
      },
      onError: 'transactionsServiceError',
    },
  },

  transactionsReceived: {
    type: 'final',
  },

  transactionsServiceError: {
    type: 'final',
  },
};

const fetchBeneficiariesStates = {
  fetchBeneficiaries: {
    on: {
      'FETCH.BENEFICIARIES': 'awaitingFetchBeneficiaries',
    },
  },

  awaitingFetchBeneficiaries: {
    invoke: {
      src: 'requestFetchBeneficiaries',
      onDone: {
        target: 'beneficiariesReceived',
        actions: assign({
          beneficiaries: (_, evt) =>
            evt.data.map((b) => ({
              value: b.id,
              label: b.full_name,
            })),
        }),
      },
      onError: 'beneficiariesServiceError',
    },
  },

  beneficiariesReceived: {
    type: 'final',
  },

  beneficiariesServiceError: {
    type: 'final',
  },
};

export const states = {
  idle: {
    // on: {
    //   'FETCH.WALLET': 'fetchWallet',
    //   'FETCH.USER': 'fetchUser',
    //   'FETCH.TRANSACTIONS': 'fetchTransactions',
    // },
  },
  fetchWallet: {
    on: {
      'FETCH.IDLE': 'idle',
    },
    initial: 'fetchWallet',
    states: fetchWalletStates,
  },
  fetchUser: {
    on: {
      'FETCH.IDLE': 'idle',
    },
    initial: 'fetchUser',
    states: fetchUserStates,
  },
  fetchTransactions: {
    on: {
      'FETCH.IDLE': 'idle',
    },
    initial: 'fetchTransactions',
    states: fetchTransactionsStates,
  },
  fetchBeneficiaries: {
    on: {
      'FETCH.IDLE': 'idle',
    },
    initial: 'fetchBeneficiaries',
    states: fetchBeneficiariesStates,
  },
};

export const fetch = {
  id: 'fetch',
  type: 'parallel',
  states,
};

export default fetch;
