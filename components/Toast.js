import React from 'react';
import { useToast } from '@chakra-ui/core';

const Toast = React.memo(function ToastComponent({ status, isShown, title, description }) {
  const toast = useToast();
  isShown &&
    toast({
      title,
      description,
      status: status,
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
    });
});

export default Toast;
