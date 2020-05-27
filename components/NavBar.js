import React from 'react';
import { Flex, Icon } from '@chakra-ui/core';

function NavBar(props) {
  return (
    <Flex justifyContent="center" backgroundColor="brand.500" p={4} {...props}>
      <Icon name="logo" color="white" width="90px" ml="-10px"></Icon>
    </Flex>
  );
}

export default NavBar;
