"use client";
import { useRef } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Container,
  Text,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import useProductStore from "../functions/productController";
import useOrderStore from "@/functions/orderController";

function SearchView({ isDark }) {
  const searchRef = useRef();
  const numOrders = useOrderStore((state) => state.orderCount);
  const { search, updateProductPerPage } = useProductStore();

  return (
    <>
      <Container
        minWidth="100%"
        style={{
          marginBottom: "15px",
        }}
        //backgroundColor={isDark ? "#101826" : "#F9F8FA"}
        textColor={isDark ? "white" : "black"}
      >
        <Container className="flow-root mx-auto" maxWidth='92%'>
          <Text
            className="text-2xl"
            maxWidth="90%"
            style={{ paddingTop: "25px" }}
            fontFamily="Noto Sans"
          >
            <strong className="float-left">Assignment</strong>
          </Text>

          <div className="float-right" style={{ zIndex: -20 }}>
            {numOrders > 0 ? <div
              className="bg-red-600 rounded-full text-sm"
              style={{
                width: "25px",
                aspectRatio: "1/1",
                padding: "3px",
                textAlign: "center",
                marginTop: "-10px",
                color: "white",
                marginLeft: "85px",
                position: "absolute",
                transition: "ease-out 0.5s"
              }}
            >
              {numOrders}
            </div>: null}
            <Link href="/cart">
              <Button zIndex={-10} colorScheme="green" fontFamily="Noto Sans">
                Your Cart
              </Button>
            </Link>
          </div>
        </Container>

        <Container
          className="flex"
          minWidth="90%"
          style={{
            paddingBottom: "20px",
            transition: "ease-out 0.5s",
            paddingRight: 0,
            paddingLeft: 0,
            justifyContent: "flex-end",
          }}
          fontFamily="Noto Sans"
        >
          <Container
            minWidth="100%"
            className="flex flex-wrap flow-root"
            textColor={isDark ? "white" : "black"}
            padding={0}
            float="right"
          >
            <Container
              minWidth="70%"
              className="flex float-left"
              marginTop="20px"
            >
              <Input
                marginRight={3}
                placeholder="Search for a product"
                ref={searchRef}
              />
              <Button
                minWidth="20%"
                colorScheme="blue"
                onClick={() => search(searchRef.current.value)}
                overflow="hidden"
                fontFamily="Noto Sans"
              >
                Search
              </Button>
            </Container>
            <Container
              className="float-right"
              width="200px"
              marginTop="20px"
              padding={0}
              textAlign="right"
            >
              <Menu preventOverflow={true}>
                <MenuButton
                  backgroundColor={isDark ? "#1a202b" : "#FFFFFF"}
                  textColor={isDark ? "white" : "black"}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  className="menuButton hoverBlack"
                  minWidth="100%"
                  fontFamily="Noto Sans"
                >
                  Products per page
                </MenuButton>
                <MenuList
                  backgroundColor={isDark ? "#1a202b" : "#FFFFFF"}
                  textColor={isDark ? "white" : "black"}
                  borderColor={isDark ? "#1a202b" : "#FFFFFF"}
                >
                  {Array.from(Array(10).keys(), (index) => (
                    <MenuItem
                      key={index}
                      style={{ backgroundColor: "inherit", color: "inherit" }}
                      onClick={() => updateProductPerPage(index + 1)}
                    >
                      {index + 1}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}

SearchView.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default SearchView;
