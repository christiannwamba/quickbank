import React from 'react';
import dynamic from 'next/dynamic';
import { FormControl, FormHelperText } from '@chakra-ui/core';
import { useService } from '@xstate/react';

import TextInput from 'components/controls/TextInput';
import FormDrawer from 'components/forms/FormDrawer';
import Toast from 'components/Toast';
import { stateService } from 'state';

const SelectInput = dynamic(
  () => import('../controls/SelectInput'),
  { loading: () => <p>...</p>, ssr: false }
)


function SendMoneyForm() {
  const [state, send] = useService(stateService);
  const { transaction } = state.value;
  const { input } = state.context;
  const isOpen = transaction === 'idle' ? false : true;

  function onSubmit(e) {
    console.log('Submitting');
    send('TRANSACTION.SUBMIT');
    e.preventDefault();
  }

  const isInvalidAmount = state.matches('transaction.transact.amountError');
  const isInvalidTo = state.matches('transaction.transact.toError');
  const isInvalidBeneficiary = state.matches(
    'transaction.transact.beneficiaryError'
  );
  const isSuccess = state.matches('transaction.transact.transactionSuccessful');
  const isServiceError = state.matches('transaction.transact.serviceError');

  const isAwaitingResponse = state.matches(
    'transaction.transact.awaitingResponse'
  );

  const disableSendButton =
    isAwaitingResponse ||
    isInvalidBeneficiary ||
    isInvalidTo ||
    isInvalidAmount;

  return (
    <FormDrawer
      isOpen={isOpen}
      onSubmit={onSubmit}
      disableSendButton={disableSendButton}
      isAwaitingResponse={isAwaitingResponse}
      onClose={() => {
        send('TRANSACTION.CANCEL');
        send('TRANSACTION.IDLE');
      }}
      title={
        input.type === 'SEND_MONEY'
          ? 'Send Money'
          : input.type === 'BUY_AIRTIME'
          ? 'Buy Airtime'
          : 'Pay TV Bills'
      }
    >
      <form onSubmit={onSubmit}>
        {input.type === 'SEND_MONEY' ? (
          <FormControl isInvalid={isInvalidBeneficiary} isRequired mb={4}>
            <SelectInput
              error={
                isInvalidBeneficiary && transaction.transact.beneficiaryError
              }
              label="To"
              name="beneficiary"
              options={state.context.beneficiaries}
              value={input.beneficiary}
              onChange={(beneficiary) => {
                send('TRANSACTION.SELECT_BENEFICIARY', {
                  beneficiary,
                });
              }}
              onBlur={(e) => {
                send('TRANSACTION.BENEFICIARY_BLUR');
              }}
            />
          </FormControl>
        ) : (
          <FormControl isInvalid={isInvalidTo} isRequired mb={4}>
            <TextInput
              error={isInvalidTo && transaction.transact.toError}
              label={
                input.type === 'BUY_AIRTIME'
                  ? 'Phone Number'
                  : 'DSTV/GOTV Number'
              }
              name="to"
              placeholder={
                input.type === 'BUY_AIRTIME'
                  ? 'Phone Number'
                  : 'DSTV/GOTV Number'
              }
              type="text"
              value={input.to}
              onChange={(e) => {
                send('TRANSACTION.ENTER_TO', {
                  to: e.target.value,
                });
              }}
              onBlur={(e) => {
                if (input.touched.to) {
                  send('TRANSACTION.TO_BLUR');
                }
              }}
            />

            <FormHelperText
              onClick={() => {
                send('TRANSACTION.ENTER_TO', {
                  to:
                    input.type === 'BUY_AIRTIME'
                      ? '+2349080384030'
                      : '9184316255',
                });
              }}
            >
              (Click to autofill test{' '}
              {input.type === 'BUY_AIRTIME' ? 'phone' : 'TV smart card'})
            </FormHelperText>
          </FormControl>
        )}
        <FormControl isInvalid={isInvalidAmount} isRequired mb={4}>
          <TextInput
            error={isInvalidAmount && transaction.transact.amountError}
            label="Amount"
            name="amount"
            placeholder="0"
            type="text"
            value={input.amount}
            onChange={(e) => {
              send('TRANSACTION.ENTER_AMOUNT', {
                amount: e.target.value,
              });
            }}
            onBlur={(e) => {
              if (input.touched.amount) {
                send('TRANSACTION.AMOUNT_BLUR');
              }
            }}
          />
        </FormControl>
      </form>
      <Toast
        isShown={isSuccess}
        status="success"
        title="Money sent!"
        description={`₦${input.amount} was sent to ${
          input.type === 'SEND_MONEY' ? input.beneficiary.label : input.to
        }`}
      />
      <Toast
        isShown={isServiceError}
        status="error"
        title="Something bad happened"
        description={`Unable to complete your transaction at this time`}
      />
    </FormDrawer>
  );
}

export default SendMoneyForm;
