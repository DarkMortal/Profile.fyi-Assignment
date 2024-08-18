"use client";
import {
  Card,
  Image,
  Stack,
  Heading,
  CardFooter,
  CardBody,
  Text,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import useOrderStore from "@/functions/orderController";

function OrderCard({ product, quantity, isDark, currency_symbol, currency_rate }) {
  const { addItem, removeItem } = useOrderStore();

  console.log(currency_symbol, currency_rate)

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      style={{margin: '10px'}}
      maxWidth='lg'
      borderColor={isDark ? "#1a202b" : "#ffffff"}
    >
      <Image
        padding={3}
        maxW={{ base: "100%", sm: "200px" }}
        src={product.image}
        alt="Product Image"
        borderRadius='lg'
      />

      <Stack backgroundColor={isDark ? "#1a202b" : "#ffffff"}>
        <CardBody>
          <Heading size="md" className="text-2xl" fontFamily='Noto Sans' color={isDark?'white':'black'}>
            {product.name}
          </Heading>
          <Text color="blue.600" className="text-3xl" fontFamily='Noto Sans'>
            {currency_symbol} {(product.price * currency_rate).toFixed(2)}
          </Text>
        </CardBody>

        <CardFooter>
          <ButtonGroup
            columnGap={4}
            className="flex justify-center flex-wrap items-center"
            fontFamily='Noto Sans'
          >
            <IconButton
              variant="solid"
              colorScheme="red"
              onClick={() => removeItem(product.id.toString())}
            >
              <MinusIcon />
            </IconButton>
            <span style={{color: isDark?'white':'black'}}>{quantity}</span>
            <IconButton
              variant="solid"
              colorScheme="green"
              onClick={() => addItem(product.id.toString())}
            >
              <AddIcon />
            </IconButton>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
}

OrderCard.propTypes = {
  product: PropTypes.object.isRequired,
  isDark: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  currency_symbol: PropTypes.string.isRequired,
  currency_rate: PropTypes.number.isRequired
};

export default OrderCard;
