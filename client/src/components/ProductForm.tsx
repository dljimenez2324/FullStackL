import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, Input, Textarea, Text, Switch } from "@chakra-ui/react"
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    fetchProduct: () => void;
}

const ProductForm = ({isOpen, onClose, fetchProduct}:ProductFormProps) => {
    // const { isOpen, onOpen, onClose } = useDisclosure()

    // lets hardcode some data for our usestates
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        description: "",
        price: "",
        isInStore: false
    })

    // helper function to save inside the modal
    const onSave = () => {
      // lets give our axios POST
      axios
        .post(BASE_URL + "Product", product)
        .then(response => {onClose(); 
                            fetchProduct();
                            console.log(response)})
        .catch(error => {console.log(error)})
        
      console.log(product);
    }

    return (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack gap={3} alignItems={'self-start'}>
                <Input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({...product,name:e.target.value})}/>
                <Textarea placeholder="Description" value={product.description} onChange={(e) => setProduct({...product,description:e.target.value})}/>
                <Input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({...product,price:e.target.value})}/>
                <Text>
                  Is in Store?
                </Text>
                <Switch isChecked={product.isInStore} onChange={(e) => setProduct({...product,isInStore:e.target.checked})}/>
                
              </VStack>
            </ModalBody>

            {/* line below will show the update in real time
            {JSON.stringify({product})} */}
  
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="teal" onClick={onSave} >Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ProductForm