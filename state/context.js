export const context = {
  tab: {
    index: 0,
  },
  transactionActions: [
    { id: 'sendMoney', name: 'Send Money', Icon: 'AiOutlineDollar' },
    { id: 'buyAirtime', name: 'Buy Airtime', Icon: 'AiFillCreditCard' },
    { id: 'payTV', name: 'Pay TV Bills', Icon: 'AiOutlinePlayCircle' },
  ],
  input: {
    type: '',
    beneficiary: { value: '', label: 'Choose a beneficiary' },
    amount: '',
    to: '',
    touched: {
      beneficiary: false,
      amount: false,
      to: false,
    },
  },
  beneficiaries: [],
  balance: '',
  transactions: [],
  user: {
    name: '',
    username: '',
  },
};

export default context;
