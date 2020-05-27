import React from 'react';
import { PseudoBox, FormErrorMessage, FormLabel } from '@chakra-ui/core';

import { getValidationMessage } from 'lib/errors';

function TextInput({ name, error, register, label, ...props }) {
  return (
    <>
      <FormLabel
        htmlFor="name"
        textTransform="uppercase"
        letterSpacing="0.01rem"
        fontWeight="600"
        color="gray.600"
        fontSize="14px"
      >
        {label}
      </FormLabel>
      <PseudoBox
        name={name}
        placeholder="Say something..."
        as="input"
        type="text"
        ref={register}
        backgroundColor="gray.50"
        borderColor={error ? 'red.400' : 'gray.100'}
        borderWidth="1px"
        borderStyle="solid"
        rounded="sm"
        py="3"
        px="4"
        mt="2"
        display="block"
        width="full"
        transition="all 200ms ease-in-out"
        _focus={{
          outline: 'none',
          boxShadow: error ? 'flatError' : 'flat',
          border: '1px',
          borderColor: error ? 'red.400' : 'brand.500',
        }}
        {...props}
      />
      <FormErrorMessage>{getValidationMessage(name, error)}</FormErrorMessage>
    </>
  );
}

export default TextInput;
