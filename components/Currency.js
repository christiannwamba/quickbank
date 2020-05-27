import React from 'react';

import { Text, Box } from '@chakra-ui/core';

function Currency({ children, ...props }) {
  var formatter = new Intl.NumberFormat('en-US');
  if (typeof children !== 'string') {
    throw new Error('Currency child must be string');
  }
  return (
    <Box>
      <Text display="inline">₦</Text>{' '}
      <Text display="inline" {...props}>
        {' '}
        {formatter.format(children)}
      </Text>
    </Box>
  );
}

export default Currency;
