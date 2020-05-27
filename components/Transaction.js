import React from 'react';
import { useService } from '@xstate/react';
import { Flex, Box, Text, Avatar, Skeleton } from '@chakra-ui/core';

import Card from './Card';
import Currency from './Currency';
import { stateService } from 'state';

export function Transactions({ count, ...props }) {
  const [state] = useService(stateService);
  const { transactions } = state.context;
  return (
    <Card minHeight="250px" height={[count ? '250px' : '450px', 'auto']} overflowY="scroll">
      {state.matches('fetch.fetchTransactions.awaitingFetchTransactions') ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <Skeleton key={n} height="48px" my="10px" />
          ))}
        </>
      ) : (
        transactions.slice(0, count).map((transaction, i) => (
          <Transaction transaction={transaction} i={i} key={transaction.id} />
        ))
      )}
    </Card>
  );
}
export function Transaction({ transaction, i }) {
  const [state] = useService(stateService);
  const { transactions } = state.context;
  return (
    <Flex
      justifyContent="space-between"
      mb={i === transactions.length - 1 ? 0 : 6}
    >
      <Flex alignItems="center">
        <Box display={['none', 'block']} mr={4}>
          <Avatar name={transaction.merchant}></Avatar>
        </Box>
        <Box>
          <Text fontWeight="600">{transaction.merchant}</Text>
          <Text fontSize="xs" color="gray.600">
            {transaction.to}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Currency fontWeight="600">{transaction.amount}</Currency>
        <Text textAlign="right" fontSize="xs" color="gray.600">
          {transaction.date.split('T')[0]}
        </Text>
      </Box>
    </Flex>
  );
}
