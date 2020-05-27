import React from 'react';
import { FormErrorMessage, FormLabel } from '@chakra-ui/core';
import Select from 'react-select';
import theme from 'theme';

import { getValidationMessage } from 'lib/errors';

function SelectInput({ name, error, label, ...props }) {
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
      <Select {...props} styles={getSelectStyles(error)}></Select>
      <FormErrorMessage>{getValidationMessage(name, error)}</FormErrorMessage>
    </>
  );
}

function getSelectStyles(error) {
  const selectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: '#FDFDFD',
      borderWidth: '1px',
      borderStyle: 'solid',
      boxShadow: isFocused
        ? theme.shadows.flat
        : error && isFocused
        ? theme.shadows.flatError
        : 'none',
      borderColor: isFocused
        ? theme.colors.brand[500]
        : error && isFocused
        ? theme.colors.red[400]
        : theme.colors.gray[100],
    }),

    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? theme.colors.brand[500]
          : isFocused
          ? theme.colors.brand[100]
          : null,
        color: isDisabled ? '#ccc' : isSelected ? 'white' : '#1A202C',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  return selectStyles;
}

export default SelectInput;
