import React from 'react';
import { Box } from '@chakra-ui/core';

function Card({ children, ...props }) {
  return (
    <Box m={4} p={4} backgroundColor="white" rounded={['sm', 'md']} {...props}>
      {children}
    </Box>
  );
}

export default Card;
