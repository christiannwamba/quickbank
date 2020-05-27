import React from 'react';
import Head from 'next/head';

export default function ({ children }) {
  return (
    <Head>
      <title>{children} | Quick Bank</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
