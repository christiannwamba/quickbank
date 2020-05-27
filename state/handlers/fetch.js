const apiBase = process.env.NEXT_PUBLIC_API;

export const services = {
  requestFetchWallet: (ctx, ext) => {
    return fetch(apiBase + '/fetchBalance')
      .then((res) => res.json())
      .then((data) => data.data);
  },
  requestFetchTransactions: (ctx, evt) => {
    return fetch(apiBase + '/fetchTransactions')
      .then((res) => res.json())
      .then((data) => data.data.transactions);
  },
  requestFetchUser: (ctx, ext) => {
    if (process.env.NODE_ENV === 'development') {
      return wait(2000).then(() => ({
        username: 'codebeast',
        name: 'Christian Nwamba',
      }));
    } else {
      return fetch(apiBase + '/me')
        .then((res) => res.json())
        .then((data) => {
          return ({
            username: data.profile.login,
            name: data.profile.name,
          })
        });
    }
  },
  requestFetchBeneficiaries: () => {
    return fetch(apiBase + '/fetchBeneficiaries')
    .then((res) => res.json())
    .then((data) => data.data);
  }
};

function wait(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms);
  });
}
