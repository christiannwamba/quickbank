import React from 'react';
import { Box, Grid, Flex, Icon, Button, Text } from '@chakra-ui/core';
import { AiFillGithub } from 'react-icons/ai'

import Head from 'components/Head';

function Login() {

  return (
    <Box backgroundColor={['white', 'gray.100']} overflow="hidden">
      <Head>Login</Head>
      <Grid
        height="100vh"
        gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr' }}
        justifyItems="center"
        mx={{ sm: '8px', md: '40px' }}
      >
        <Box alignSelf={['end', 'center']}>
          <Icon
            name="logo"
            color="brand.500"
            width="230px"
            height="40px"
          ></Icon>
          <Text color="gray.900" fontSize="2xl" fontWeight="bold" mt="10">
            Welcome to Quick Bank
          </Text>
          <Text color="gray.500">Sign in to continue</Text>
        </Box>

        <Flex
          boxShadow={['none', 'xl']}
          width={['100%', 'md']}
          height="180px"
          rounded="lg"
          backgroundColor="white"
          justifyContent="center"
          alignSelf={["start", "center"]}
          alignItems="center"
        >
          <Button variantColor="github" as="a" size="lg" rounded="sm" leftIcon={AiFillGithub} href="/auth/login" borderColor="black" border="2px">
            Login with GitHub
          </Button>
        </Flex>
      </Grid>
      <Box position="relative">
        <Box
          borderRadius="50%"
          width="400px"
          position="absolute"
          right="-100px"
          bottom="-100px"
          height="400px"
          opacity=".1"
          borderColor="brand.500"
          borderWidth="60px"
          borderStyle="solid"
        ></Box>
      </Box>
    </Box>
  );
}

export default Login;
