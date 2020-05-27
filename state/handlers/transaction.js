import { assign } from 'xstate';
const apiBase = process.env.NEXT_PUBLIC_API;

export const actions = {
  handleTransactionType: assign((ctx, evt) => ({
    input: {
      ...ctx.input,
      type: evt.name,
    },
  })),
  handleAmountInputChange: assign((ctx, evt) => {
    console.log(123);
    const amt = evt.amount.replace(/\,/g, '');
    if (isNaN(amt)) return;
    const formatter = new Intl.NumberFormat('en-US');
    return {
      input: {
        ...ctx.input,
        amount: formatter.format(amt),
        touched: {
          ...ctx.input.touched,
          amount: true,
        },
      },
    };
  }),
  handleBeneficiarySelect: assign((ctx, evt) => {
    return {
      input: {
        ...ctx.input,
        beneficiary: evt.beneficiary,
        touched: {
          ...ctx.input.touched,
          beneficiary: true,
        },
      },
    };
  }),
  handleToInputChange: assign((ctx, evt) => {
    console.log(evt);
    return {
      input: {
        ...ctx.input,
        to: evt.to,
        touched: {
          ...ctx.input.touched,
          to: true,
        },
      },
    };
  }),

  handleTransactionCancel: assign((ctx, evt) => {
    return {
      input: {
        beneficiary: { value: '', label: 'Choose a beneficiary' },
        amount: '',
        to: '',
        touched: {
          beneficiary: false,
          amount: false,
          to: false,
        },
      },
    };
  }),
};

export const guards = {
  isBeneficiaryNotSelected: (ctx) => {
    return (
      ctx.input.type === 'SEND_MONEY' && !ctx.input.beneficiary.value
    );
  },
  isAmountNotEntered: (ctx) => {
    console.log(1234);
    const amt = ctx.input.amount.replace(/\,/g, '');
    const isInvalid = !amt || amt < 1;
    return isInvalid;
  },
  isToNotEntered: (ctx) => {
    return ctx.input.type !== 'SEND_MONEY' && !ctx.input.to;
  },
  isToNotPhone: (ctx) => {
    return (
      ctx.input.type === 'BUY_AIRTIME' &&
      // valid Nigerian phone number
      !/^[\+][(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/.test(
        ctx.input.to
      )
    );
  },
  isToNotTV: (ctx) => {
    return ctx.input.type === 'PAY_TV' && ctx.input.to.length !== 10;
  },
};

export const services = {
  requestTransaction: (ctx, evt) => {
    const payload = { ...ctx.input, beneficiary: ctx.input.beneficiary.value };
    delete payload.touched;

    return fetch(apiBase + '/transact', {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        console.log(data);
        return data;
      });
  },
};
