import React from 'react';
import { Box, Text, Flex, Button, Spinner } from '@chakra-ui/core';
import { AiOutlineLogout } from 'react-icons/ai';

function Greeting({ user, ...props }) {
  return (
    <Flex {...props} justifyContent="space-between" alignItems="center">
      <Box>
        <Text color="gray.900" fontSize="xl" fontWeight="bold">
          Hi,{' '}
          {user.name ? (
            user.name
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.500"
              size="sm"
              mr={2}
            />
          )}{' '}
          👋🏼
        </Text>
        <Text color="gray.500">Welcome to Quick Bank Dashboard</Text>
      </Box>
      <Button
        leftIcon={AiOutlineLogout}
        variantColor="gray"
        variant="solid"
        rounded="sm"
        as="a"
        href="/logout"
      >
        Logout
      </Button>
    </Flex>
  );
}

export default Greeting;
