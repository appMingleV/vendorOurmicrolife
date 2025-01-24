import InventoryIcon from "@mui/icons-material/Inventory";
import PaidIcon from "@mui/icons-material/Paid";
import StarIcon from "@mui/icons-material/Star";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaProductHunt, FaTruck } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdCategory, MdDashboard } from "react-icons/md";
import { RiCouponFill, RiMenuUnfold4Line } from "react-icons/ri";

import React, { useEffect, useState } from "react";
import { FaCog, FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      navigate("/"); // Redirect if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout?");
    if (logoutConfirm) {
      alert("Logout Successfully.");
      localStorage.removeItem("token");
      setIsLogin(false);
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isLogin) {
    return null; // Don't render sidebar if user isn't logged in
  }

  const links = [
    { to: "/dashboard", text: "Dashboard", icon: <MdDashboard /> },
    { to: "/products", text: "Products", icon: <FaProductHunt /> },
    { to: "/inventory", text: "Inventory", icon: <InventoryIcon /> },
    { to: "/orders", text: "Orders", icon: <FaTruck /> },
    { to: "/category", text: "Category", icon: <MdCategory /> },
    { to: "/coupons", text: "Coupons", icon: <RiCouponFill /> },
    { to: "/analytics", text: "Analytics", icon: <TrendingUpIcon /> },
    { to: "/transactions", text: "Transactions", icon: <PaidIcon /> },
    { to: "/rating", text: "Rating & Review", icon: <StarIcon /> },
    { to: "/profile", text: "Profile", icon: <FaUser /> },
    { to: "/setting", text: "Setting", icon: <FaCog /> },
    { to: "/support", text: "Supports", icon: <SupportAgentIcon /> },
    {
      to: "/",
      text: "Logout",
      icon: <RiLogoutBoxLine />,
      action: handleLogout,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 70 : 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 70 : 250,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          p: 2,
          backgroundColor: "#ffffff",
          color: "#fff",
        }}
      >
        <IconButton onClick={toggleSidebar}>
          {isCollapsed ? <FiMenu /> : <RiMenuUnfold4Line className="text-md" />}
        </IconButton>
        <span
          style={{
            fontSize: isCollapsed ? "0" : "1.2rem",
            fontWeight: "bold",
            color: "#1976D2",
            textAlign: "start",
          }}
          // className="text-purple-700"
        >
          OurMicroLife
        </span>
      </Box>
      <List>
        {links.map((link, index) => (
          <ListItem
            button
            key={index}
            onClick={link.action || undefined}
            component={link.to ? NavLink : "button"}
            to={link.to || undefined}
            sx={{
              "&.active": { backgroundColor: "#e3f2fd" },
              justifyContent: isCollapsed ? "center" : "flex-start",
            }}
          >
            <ListItemIcon
              sx={{ color: "gray", fontSize: "18px", justifyContent: "center" }}
            >
              {link.icon}
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={link.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
