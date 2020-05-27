import React from 'react';
import { Box, Grid, Flex, Text, PseudoBox } from '@chakra-ui/core';
import {
  AiOutlineDollar,
  AiFillCreditCard,
  AiOutlinePlayCircle,
} from 'react-icons/ai';
import { useService } from '@xstate/react';
import { stateService } from '../state';

export function QuickActions({ formDrawerDisclosure }) {
  const [state] = useService(stateService);
  const actions = state.context.transactionActions;
  return (
    <Box mx={4} my={[5, 10]}>
      <Text fontSize="xl" fontWeight="600" mb={[3, 4]}>
        Quick Actions
      </Text>
      <Grid
        alignItems="center"
        gridTemplateColumns="1fr 1fr 1fr"
        gridGap={[0, '40px']}
      >
        {actions.map((action, i) => (
          <QuickAction
            action={action}
            i={i}
            key={action.name}
            formDrawerDisclosure={formDrawerDisclosure}
          />
        ))}
      </Grid>
    </Box>
  );
}

export function QuickAction({ action, i, formDrawerDisclosure }) {
  const [_, send] = useService(stateService);
  const actionIcons = [AiOutlineDollar, AiFillCreditCard, AiOutlinePlayCircle];
  const Icon = actionIcons.find((icon) => icon.displayName === action.Icon);
  return (
    <PseudoBox
      roundedLeft={[i === 0 ? 'sm' : 0, 'md']}
      roundedRight={[i === 2 ? 'sm' : 0, 'md']}
      py={4}
      display="flex"
      backgroundColor="white"
      flexDirection={['column', 'row']}
      height={['auto', '80px']}
      alignItems="center"
      justifyContent="center"
      borderRight={[i === 2 ? 'none' : '1px', 0]}
      borderRightColor="gray.300"
      transition="all 200ms"
      cursor="pointer"
      _hover={{
        backgroundColor: 'gray.bg',
      }}
      onClick={() => {
        const actions = [
          'TRANSACTION.SEND_MONEY',
          'TRANSACTION.BUY_AIRTIME',
          'TRANSACTION.PAY_TV',
        ];
        send(actions[i], { name: actions[i].split('.')[1] });
      }}
    >
      <Box backgroundColor={['white', 'gray.bg']} p={2} rounded="sm">
        <Icon fill="#6899cf" />{' '}
      </Box>
      <Text ml={1} fontWeight="600" fontSize={['sm', 'md']}>
        {action.name}
      </Text>
    </PseudoBox>
  );
}
