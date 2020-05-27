import React from 'react';
import { AiOutlineHome, AiOutlineUnorderedList } from 'react-icons/ai';
import {
  Box,
  Grid,
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Switch,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/core';
import { useService } from '@xstate/react';

import Head from 'components/Head';
import Greeting from 'components/Greeting';
import NavBar from 'components/NavBar';
import Currency from 'components/Currency';
import SideNav from 'components/SideNav';
import SendMoneyForm from 'components/forms/SendMoneyForm';
import { Transactions } from 'components/Transaction';
import { QuickActions } from 'components/QuickAction';
import { stateService } from 'state';

function NavGreeting() {
  const [state] = useService(stateService);
  return (
    <>
      <NavBar display={['flex', 'none']} />
      <Greeting p={4} user={state.context.user} />
    </>
  );
}

export default function Home() {
  const [state, send] = useService(stateService);

  React.useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API;
    send('FETCH.USER');
    send('FETCH.WALLET');
    send('FETCH.BENEFICIARIES');
    send('FETCH.TRANSACTIONS');
    
    // try {
    //   async function fetchMe() {
    //     const response = await fetch(apiBase + '.auth/me');
    //     if(response.status === 404) {
    //       return
    //     }
    //     const payload = await response.json();
    //     const { clientPrincipal } = payload;
    //     console.log(clientPrincipal);
    //   }
    //   fetchMe();
    //   // return { me: clientPrincipal };
    // } catch (error) {
    //   console.log(error);
    //   // return { me: undefined };
    // }
  });

  const tabContext = state.context.tab;

  const formDrawerDisclosure = useDisclosure();

  function handleSetTabIndex(index) {
    index === 0 ? send('TAB.ZERO') : send('TAB.ONE');
  }
console.log(state.context.balance)
  return (
    <Box backgroundColor="gray.bg">
      <Head>Dashboard</Head>
      <SendMoneyForm
        formDrawerDisclosure={formDrawerDisclosure}
      ></SendMoneyForm>
      <Grid gridTemplateColumns={['auto', '240px auto']}>
        <SideNav
          handleSetTabIndex={handleSetTabIndex}
          tabIndex={tabContext.index}
        />
        <Tabs isFitted index={tabContext.index} onChange={handleSetTabIndex}>
          {/*Using stick footer trick: https://css-tricks.com/couple-takes-sticky-footer/#article-header-id-0 */}
          <TabPanels minHeight="100vh" mb={['-50px', 0]}>
            <TabPanel>
              <NavGreeting />
              {/* Balance */}
              <Box m={4} p={4} backgroundColor="white" rounded={['sm', 'md']} height="120px">
                <Flex alignItems="center" justifyContent="space-between">
                  <Text>Available Balance</Text>
                  <Box color="gray.500" fontSize="sm">
                    Show &nbsp; <Switch color="brand" />
                  </Box>
                </Flex>
                <Box mt={4}>
                  {state.matches('fetch.fetchWallet.awaitingFetchWallet') ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="brand.500"
                      size="lg"
                    />
                  ) : (
                    <Currency fontSize="2rem">{state.context.balance.toString()}</Currency>
                  )}
                </Box>
              </Box>
              {/* Quick Actions */}
              <QuickActions formDrawerDisclosure={formDrawerDisclosure} />

              <Box>
                <Text mx={4} fontSize="xl" fontWeight="600" mb={[3, 4]}>
                  Recent Transactions
                </Text>
                <Transactions count={2} />
              </Box>
            </TabPanel>
            <TabPanel>
              <NavGreeting />
              <Box>
                <Text mx={4} fontSize="xl" fontWeight="600" mb={[3, 4]}>
                  Recent Transactions
                </Text>
                <Transactions />
              </Box>
            </TabPanel>
          </TabPanels>
          <TabList height="50px" display={['flex', 'none']}>
            <Tab>
              <AiOutlineHome /> Home
            </Tab>
            <Tab>
              <AiOutlineUnorderedList /> &nbsp; Transactions
            </Tab>
          </TabList>
        </Tabs>
      </Grid>
    </Box>
  );
}

// Home.getInitialProps = async function () {
//   const apiBase = process.env.API;
//   try {
//     const response = await fetch(apiBase + '.auth/me');
//     const payload = await response.json();
//     const { clientPrincipal } = payload;
//     console.log(clientPrincipal);
//     return { me: clientPrincipal };
//   } catch (error) {
//     console.log(error);
//     return { me: undefined };
//   }
// };
