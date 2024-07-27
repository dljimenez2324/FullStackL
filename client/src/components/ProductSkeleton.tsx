import {
  // Avatar,
  Box,
  Button,
  // Center,
  Flex,
  Heading,
  HStack,
  Table,
  // TableCaption,
  TableContainer,
  Tbody,
  Td,
  // Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  Skeleton,
  SkeletonCircle,
  // useToast
} from "@chakra-ui/react";
// import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";

// lets get our interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}


const ProductSkeleton = () => {

  // usestates to hold our data / states
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('')


  // lets create the fetching data function
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Product")
      .then(response => {
          setData(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
          setIsLoading(false);
      })
  }

  useEffect(() => {
    
    fetchData();
    
  }, [])
  

  return (
    <>
    {/* Stuff below will be commented out for our Skeleton */}
      {/* <ColorModeSwitch /> */}
      <Box m={32} shadow={'lg'} rounded={'md'}>
          <Flex justifyContent={'space-between'}  px={'5'}>
            <Heading>
              <Skeleton>Product List</Skeleton>
            </Heading>
            <Button color="teal.300" leftIcon={<AddIcon/>}>
              {" "}
              <Skeleton>Add Product</Skeleton>
            </Button>

          </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          
          <Thead>
            <Tr>
              <Th><Skeleton>Id</Skeleton></Th>
              <Th><Skeleton>Name</Skeleton></Th>
              <Th><Skeleton>Description</Skeleton></Th>
              <Th><Skeleton>IsinStock</Skeleton></Th>
              <Th isNumeric><Skeleton>Price</Skeleton></Th>
              
            </Tr>
          </Thead>
          <Tbody>
              {

                Array.from({length:5}).map((_,index) => (
                    <Tr key={index}>
                          <Td><Skeleton>01</Skeleton></Td>
                          <Td>
                            <HStack>
                              <SkeletonCircle>AD</SkeletonCircle>
                              <Text><Skeleton>Product Name</Skeleton></Text>
                            </HStack>
                          </Td>
                          {/* <Td>{product.name}</Td>  moved this up above */}
                          <Td><Skeleton>Product Description</Skeleton></Td>
                          <Td>
                            {/* {product.isInStore} */}
                            <Badge><Skeleton>Yes</Skeleton></Badge>
                          </Td>
                          <Td><Skeleton>12345</Skeleton></Td>
                          <Td>
                            <HStack>
                              <SkeletonCircle>1</SkeletonCircle>
                              <SkeletonCircle>1</SkeletonCircle>
                              <SkeletonCircle>1</SkeletonCircle>
                            </HStack>
                          </Td>
                    </Tr>
                ))

              }
           
          </Tbody>
          
        </Table>
      </TableContainer>
     
      </Box>
    </>
  );
};

export default ProductSkeleton;
