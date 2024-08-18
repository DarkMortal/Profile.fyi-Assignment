"use client";
import { useEffect, useState } from "react";
import useProductStore from "@/functions/productController";
import ProductCard from "@/components/productCard";
import PropTypes from "prop-types";
import getCountryCurrency from "@/functions/getCountry";

function ProductView({ isDark }) {
  const [rate, updateRate] = useState(1.0);
  const [symbol, updateSymbol] = useState("$");
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    getCountryCurrency()
      .then((arg) => {
        updateRate(arg.rate);
        updateSymbol(arg.symbol);
      })
      .catch((err) => console.error(err));
  }, [updateRate, updateSymbol]);

  return (
    <>
      <div
        className="flex justify-center flex-wrap -m-4 items-center"
        style={{
          columnGap: "15px",
          height: products.length === 0 ? "65vh" : "fit-content",
        }}
      >
        {products.length === 0 ? (
          <span style={{ color: isDark ? "white" : "black" }}>
            No products to show
          </span>
        ) : (
          products.map((_product) => (
            <ProductCard
              product={_product}
              isDark={isDark}
              key={_product.id}
              currency_symbol={symbol}
              currency_rate={rate}
            />
          ))
        )}
      </div>
    </>
  );
}

ProductCard.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

export default ProductView;
