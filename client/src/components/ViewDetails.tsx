import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  HStack,
  Avatar,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Product } from "./ProductTable";

// we need to pass in props to use the usedisclosure
interface ViewDetailProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: Product;
}

const ViewDetails = ({ isOpen, onClose, currentData }: ViewDetailProps) => {
  //useStates / custom hooks from chakra
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // we will use the useDisclorue in the Product table as a custom hook there

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View Details: {currentData.name}</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Avatar name={currentData.name} size={"lg"} />
              <VStack>
                <Heading fontSize={16}>{currentData.name}</Heading>
                <Heading>${currentData.price}</Heading>
                <Text>{currentData.description}</Text>
              </VStack>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewDetails;
