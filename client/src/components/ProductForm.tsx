import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Input,
  Textarea,
  Text,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Product } from "./ProductTable";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData?: Product;
}

const ProductForm = ({
  isOpen,
  onClose,
  fetchProduct,
  currentData,
}: ProductFormProps) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  // use toast
  const toast = useToast();

  // lets hardcode some data for our usestates
  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    description: currentData?.description || "",
    price: currentData?.price || "",
    isInStore: currentData?.isInStore || false,
  });

  // helper function to save inside the modal  depending on if we are adding a new product or editing a product
  const onSave = () => {
    if (currentData?.id) {
      editProduct();
    } else {
      addProduct();
    }
  };

  // edit function
  const editProduct = () => {
    axios
      .put(BASE_URL + "Product/" + currentData?.id, product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Product Updated.",
          description: "Product updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(product);
  };

  // add product function
  const addProduct = () => {
    axios
      .post(BASE_URL + "Product", product)
      .then((response) => {
        onClose();
        fetchProduct();
        toast({
          title: "Product Added.",
          description: "Product Added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(product);
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3} alignItems={"self-start"}>
              <Input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <Text>Is in Store?</Text>
              <Switch
                isChecked={product.isInStore}
                onChange={(e) =>
                  setProduct({ ...product, isInStore: e.target.checked })
                }
              />
            </VStack>
          </ModalBody>

          {/* line below will show the update in real time
            {JSON.stringify({product})} */}

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
