"use client";
import { Container, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import productStore from "@/functions/productController";
import PropTypes from "prop-types";

function Pagination({isDark}) {
  const {
    currentPage,
    prevPage,
    nextPage,
    totalPages,
    isPrevPossible,
    isNextPossible,
  } = productStore();

  return (
    <>
      <Container
        className="flex justify-center"
        style={{ columnGap: "25px", marginTop: "20px", marginBottom: "20px" }}
        textColor={isDark ? "white" : "black"}
      >
        <IconButton
          colorScheme="blue"
          aria-label="Previous Page"
          icon={<ArrowBackIcon />}
          onClick={prevPage}
          isDisabled={!isPrevPossible}
        />
        <Text className="m-auto">
          <strong>Page {currentPage} of {totalPages + 1}</strong>
        </Text>
        <IconButton
          colorScheme="blue"
          aria-label="next Page"
          icon={<ArrowForwardIcon />}
          onClick={nextPage}
          isDisabled={!isNextPossible}
        />
      </Container>
    </>
  );
}

Pagination.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default Pagination;
