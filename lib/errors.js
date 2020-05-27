export const validationErrors = {
  amount: {
    amountNotEntered: 'Please enter an amount',
  },
  beneficiary: {
    beneficiaryNotSelected: 'Please chose a beneficiary',
  },
  to: {
    toNotEntered: 'Please enter a receiver',
    toNotPhone: 'Please enter a valid Phone number',
    toNotTV: 'Please enter a valid TV card number',
  },
};

export function getValidationMessage(name, error) {
  return validationErrors[name][error];
}
