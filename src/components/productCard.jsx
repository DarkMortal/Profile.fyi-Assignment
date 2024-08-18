"use client";
import PropTypes from "prop-types";
import useOrderStore from "@/functions/orderController";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  useToast,
  Container
} from "@chakra-ui/react";

function ProductCard({ product, isDark, currency_symbol, currency_rate }) {
  const toast = useToast();
  const addItem = useOrderStore((state) => state.addItem);

  return (
    <Card
      className="p-1 md:w-1/2 w-full h-full movie"
      maxWidth="sm"
      backgroundColor={isDark ? "#1a202b" : "#ffffff"}
      style={{
        transition: "ease-out 0.5s",
        marginBottom: "15px",
      }}
      fontFamily="Noto Sans"
    >
      <CardBody>
        <Container className="h-full overflow-hidden rounded-md">
          <Image
            src={product.image}
            className="hover:scale-125 transition-all duration-500"
            alt="Product Image"
            borderRadius="lg"
            style={{ height: "20%", aspectRatio: "4/3" }}
          />
        </Container>
        <Stack mt="6" spacing="3">
          <Heading size="md" color={isDark ? "white" : "black"} fontFamily='Noto Sans'>
            {product.name}
          </Heading>
          <Text color="blue.600" fontSize="2xl" fontFamily='Noto Sans'>
            {currency_symbol} {(product.price * currency_rate).toFixed(2)}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          width="100%"
          fontFamily='Noto Sans'
          variant="solid"
          colorScheme="blue"
          onClick={() => {
            addItem(product.id.toString());
            toast({
              title: "Cart Updated",
              description: "Product added to you cart",
              status: "success",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isDark: PropTypes.bool.isRequired,
  currency_symbol: PropTypes.string.isRequired,
  currency_rate: PropTypes.number.isRequired
};

export default ProductCard;
