"use client";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ProductView from "@/components/productView";
import Pagination from "@/components/pagination";
import SearchView from "@/components/search";

export default function Home() {
  const [darkModeEnabled, changeTheme] = useState(true);
  const toggleTheme = () => changeTheme(!darkModeEnabled);

  useEffect(() => {
    document.body.style.backgroundColor = darkModeEnabled
      ? "#101826"
      : "#F9F8FA";
  }, [darkModeEnabled]);

  return (
    <>
      <Button
        onClick={toggleTheme}
        position="fixed"
        className="hoverBlack"
        top={5}
        left={5}
        zIndex={100}
        backgroundColor={darkModeEnabled ? "#1a202b" : "#ffffff"}
        textColor={darkModeEnabled ? "white" : "black"}
      >
        {darkModeEnabled ? <MoonIcon /> : <SunIcon />}
      </Button>
      <SearchView isDark={darkModeEnabled} />
      <ProductView isDark={darkModeEnabled} />
      <Pagination isDark={darkModeEnabled} />
    </>
  );
}
