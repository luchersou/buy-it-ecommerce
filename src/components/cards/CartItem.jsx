import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useResponsiveTruncate } from "../../hooks/useResponsiveTruncate";
import colors from "../../theme/colors";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const truncate = useResponsiveTruncate(40, 50, 60);

  if (isXs) {
    return (
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: colors["--clr-shadow-light"],
          transition: "all 0.2s ease",
          "&:hover": { boxShadow: colors["--clr-shadow-hover-1"] },
          overflow: "hidden",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 1.5,
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            sx={{
              width: 80,
              height: 80,
              objectFit: "contain",
              bgcolor: colors["--clr-white-2"],
              borderRadius: 2,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ fontSize: "0.9rem", mb: 0.5 }}
            >
              {truncate(item.title)}
            </Typography>
            <Typography
              variant="body2"
              color={colors["--clr-gray-3"]}
              sx={{
                textTransform: "capitalize",
                fontSize: "0.8rem",
              }}
            >
              {item.category}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            pb: 1.5,
            pt: 1,
            borderTop: `1px solid ${colors["--clr-gray-11"]}`,
          }}
        >
          <Typography variant="h6" color={colors["--clr-gray-4"]} fontWeight={700} sx={{ fontSize: "1rem" }}>
            $ {item.price.toFixed(2)}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: colors["--clr-white-3"],
                borderRadius: 2,
                px: 1,
                py: 0.5,
              }}
            >
              <IconButton size="small" onClick={onDecrease} sx={{ p: 0.5 }}>
                <Remove fontSize="small" />
              </IconButton>
              <Typography
                fontWeight={600}
                sx={{
                  minWidth: 20,
                  textAlign: "center",
                  fontSize: "0.9rem",
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton size="small" onClick={onIncrease} sx={{ p: 0.5 }}>
                <Add fontSize="small" />
              </IconButton>
            </Box>

            <Tooltip title="Remover item">
              <IconButton onClick={onRemove} color="error" sx={{ p: 1 }}>
                <Delete sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        borderRadius: 3,
        boxShadow: colors["--clr-shadow-light"],
        transition: "all 0.2s ease",
        "&:hover": { boxShadow: colors["--clr-shadow-hover-1"] },
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.title}
        sx={{
          width: 140,
          height: 140,
          objectFit: "contain",
          bgcolor: colors["--clr-white-2"],
          borderRight: `1px solid ${colors["--clr-gray-10"]}`,
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {truncate(item.title)}
          </Typography>
          <Typography variant="body2" color={colors["--clr-gray-3"]} sx={{ mb: 1 }}>
            {item.category}
          </Typography>
          <Typography variant="h6" color={colors["--clr-gray-4"]} fontWeight={700}>
            $ {item.price.toFixed(2)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: colors["--clr-white-3"],
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
          }}
        >
          <IconButton size="small" onClick={onDecrease}>
            <Remove fontSize="small" />
          </IconButton>
          <Typography fontWeight={600}>{item.quantity}</Typography>
          <IconButton size="small" onClick={onIncrease}>
            <Add fontSize="small" />
          </IconButton>
        </Box>

        <Tooltip title="Remover item">
          <IconButton onClick={onRemove} color="error">
            <Delete />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}