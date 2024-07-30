import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  Badge,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  useToast,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import ProductSkeleton from "./ProductSkeleton";
import ProductForm from "./ProductForm";
import ViewDetails from "./ViewDetails";

// lets get our interface
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isInStore: boolean;
}

const ProductTable = () => {
  // custom hook so we can use these states
  const { isOpen, onOpen, onClose } = useDisclosure();
  // different useDisclosure so rename it
  const { isOpen:viewDialogOpen, onOpen:onViewDialogOpen, onClose:onviewDialogClose } = useDisclosure();

  // usestates to hold our data / states
  const [currentData, setCurrentData] = useState<Product>({} as Product);
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const toast = useToast();

  // lets create the fetching data function
  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Product")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //function for the edit icon
  const getProduct = (id: number) => {
    axios
      .get(BASE_URL + "Product/" + id)
      .then((res) => {
        setCurrentData(res.data);
        
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // helper function for the delete icon
  const handleDelete = (id: number) => {
    axios
      .delete(BASE_URL + "Product/" + id)
      .then(() => {
        toast({
          title: "Product Deleted.",
          description: "Product deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // refreshes the screen
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handleView function
  const handleViewDetail = (id: number) => {
    axios
      .get<Product>(BASE_URL + "Product/" + id)
      .then((res) => {
        setCurrentData(res.data);
        onViewDialogOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) return <ProductSkeleton />;

  //
  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Product);
  };

  return (
    <>
      <ColorModeSwitch />
      <Box m={32} shadow={"lg"} rounded={"md"}>
        <Flex justifyContent={"space-between"} px={"5"}>
          <Heading fontSize={30}>Product List</Heading>
          <Button
            onClick={() => handleAdd()}
            color="teal.300"
            leftIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Is In Stock</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: Product) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={product.name} />
                      <Text>{product.name}</Text>
                    </HStack>
                  </Td>
                  {/* <Td>{product.name}</Td>  moved this up above */}
                  <Td>{product.description}</Td>
                  <Td>
                    {/* {product.isInStore} */}
                    <Badge>{product.isInStore ? "Yes" : "No"}</Badge>
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <HStack>
                      <EditIcon
                        boxSize={23}
                        color={"orange.200"}
                        onClick={() => getProduct(product.id)}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <DeleteIcon boxSize={23} color={"red.400"} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              colorScheme="red"
                              variant={"outline"}
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                      <ViewIcon
                        onClick={() => handleViewDetail(product.id)}
                        boxSize={23}
                        color={"green.300"}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {/* <Tfoot>      WE ARE NOT GOING TO USE THE FOOTER
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
          </Table>
        </TableContainer>
        {data.length == 0 && (
          <Center>
            <Heading p={5} fontSize={24}>
              No Data
            </Heading>
          </Center>
        )}
        {/* When the modal is open */}
        {isOpen && (
          <ProductForm
            isOpen={isOpen}
            onClose={onClose}
            fetchProduct={fetchData}
            currentData={currentData}
          />
        )}

        {/* view our details here */}
        {viewDialogOpen && <ViewDetails isOpen={viewDialogOpen} onClose={onviewDialogClose} currentData={currentData} />}
      </Box>
    </>
  );
};

export default ProductTable;
