import React from 'react';
import { Text, Icon, PseudoBox, Flex } from '@chakra-ui/core';
import { AiFillHome, AiOutlineUnorderedList } from 'react-icons/ai';
import Card from './Card';

function SideNav({ handleSetTabIndex, ...props }) {
  const menuItems = [
    { name: 'Home', Icon: AiFillHome },
    { name: 'Transactions', Icon: AiOutlineUnorderedList },
  ];
  return (
    <Card display={['none', 'block']} {...props}>
      <Flex justifyContent="center" mb={10}>
        <Icon name="logo" color="brand.500" width="100px" ml="-20px"></Icon>
      </Flex>
      {menuItems.map((item, i) => (
        <PseudoBox
          alignItems="center"
          mb={4}
          key={item.name}
          p={4}
          display="flex"
          rounded="md"
          cursor="pointer"
          transition="all 200ms"
          onClick={() => handleSetTabIndex(i)}
          outline="none"
          _hover={{
            backgroundColor: 'gray.bg',
          }}
        >
          <item.Icon fill="#6899cf" /> <Text ml={3}>{item.name}</Text>
        </PseudoBox>
      ))}
    </Card>
  );
}

export default SideNav;
