import { DarkMode, LightMode, Menu, MenuOpen } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const VendorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <AppBar
      position="absolute"
      elevation={4}
      color="inherit"
      sx={{ zIndex: 1300 }}
    >
      <Toolbar>
        {/* Left Section: Menu Toggle and Logo */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box>
            <IconButton onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <MenuOpen /> : <Menu />}
            </IconButton>
          </Box>
          <a
            href="/"
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label="Brand logo"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box sx={{ width: 40, height: 40, bgcolor: "primary.main" }} />
              <Typography variant="h6" fontWeight="bold">
                Suresop Vendor
              </Typography>
            </Stack>
          </a>
        </Stack>

        {/* Right Section: Dark Mode Toggle */}
        <Stack direction="row" alignItems="center" spacing={2} ml="auto">
          <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default VendorHeader;
