import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import colors from "../theme/colors";

const BreadcrumbsNav = ({ items }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2 }}
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>

      {items.map((item, index) =>
        item.to ? (
          <Link
            key={index}
            component={RouterLink}
            to={item.to}
            color="inherit"
            sx={{ textTransform: "capitalize" }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography
            key={index}
            color={colors["--clr-black-2"]}
            sx={{ textTransform: "capitalize" }}
          >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
