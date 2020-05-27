module.exports = {
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
    };
  },
};
