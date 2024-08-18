"use client";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import OrderCard from "./orderCard";
import _products from "@/functions/products.json";
import useOrderStore from "@/functions/orderController";
import { Providers } from "@/components/provider";
import "@/app/globals.css";
import getCountryCurrency from "@/functions/getCountry";

function Cart() {
  const [ rate, updateRate ] = useState(1.0);
  const [ symbol, updateSymbol ] = useState("$");
  const [darkModeEnabled, changeTheme] = useState(true);
  const toggleTheme = () => changeTheme(!darkModeEnabled);

  useEffect(() => {
    document.body.style.backgroundColor = darkModeEnabled
      ? "#101826"
      : "#F9F8FA";
      document.body.style.color = darkModeEnabled
      ? "white"
      : "black";
  }, [darkModeEnabled]);

  const { orders, totalPrice } = useOrderStore();
  
  useEffect(() => {
    getCountryCurrency().then(arg => {
      updateRate(arg.rate);
      updateSymbol(arg.symbol);
    }).catch(err => console.error(err))
  }, [updateRate, updateSymbol])

  function getOrdersWidget() {
    const iterable = orders.keys();
    let widgetArr = [];

    while (true) {
      let res = iterable.next();
      if (res.done) break;

      widgetArr.push(
        <OrderCard
          key={res.value}
          isDark={darkModeEnabled}
          currency_symbol={symbol}
          currency_rate={rate}
          product={_products[res.value]}
          quantity={orders.get(res.value)}
        />
      );
    }

    return widgetArr;
  }

  return (
    <Providers>
      <>
      <Button
        onClick={toggleTheme}
        position="fixed"
        className="hoverBlack"
        top={5}
        right={5}
        zIndex={100}
        backgroundColor={darkModeEnabled ? "#1a202b" : "#ffffff"}
        textColor={darkModeEnabled ? "white" : "black"}
      >
        {darkModeEnabled ? <MoonIcon /> : <SunIcon />}
      </Button>
        <h1
          className="text-4xl font-extrabold"
          style={{ fontFamily: "Noto Sans", margin: "25px" }}
        >
          Your Orders
        </h1>
        <div className="flex justify-center flex-wrap -m-4 items-center">
          {orders.size === 0
            ? <div className="text-lg justify-center items-center font-bold flex" style={{height: '65vh'}}>You have not ordered anything yet</div>
            : getOrdersWidget()}
        </div>

        <div
          className="text-2xl font-extrabold"
          style={{ fontFamily: "Noto Sans", margin: "25px" }}
        >
          Total price: {symbol} {(totalPrice * rate).toFixed(2)}
        </div>
      </>
    </Providers>
  );
}

export default Cart;
