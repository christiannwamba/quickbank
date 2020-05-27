import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Text,
  Spinner
} from '@chakra-ui/core';

function FormDrawer({
  onClose,
  onSubmit,
  isOpen,
  children,
  title,
  disableSendButton,
  isAwaitingResponse,
}) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={['full', 'sm']}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="white">
        <DrawerCloseButton />
        <DrawerHeader>
          <Flex>
            <Text>{title}</Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            type="button"
            rounded="sm"
            isDisabled={isAwaitingResponse}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variantColor="brand"
            rounded="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSubmit(e);
            }}
            isDisabled={disableSendButton}
          >
            {isAwaitingResponse && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand.500"
                size="sm"
                mr={2}
              />
            )}
            Send
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FormDrawer;
