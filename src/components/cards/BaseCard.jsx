import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import colors from "../../theme/colors";

const BaseCard = ({ image, title, description, children, sx = {} }) => {
  return (
    <Card
      sx={{
        width: {
          xs: '100%',     
          sm: 250,        
          md: 250,        
        },        
        height: {
          xs: 380,        
          sm: 400,        
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 1,
        py: 0.5,
        boxShadow: colors["--clr-shadow-default"],
        textAlign: "center",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          boxShadow: colors["--clr-shadow-hover-1"],
        },
        ...sx, 
      }}
    >
      <Box
        sx={{
          height: {
            xs: 140,    
            sm: 160,     
          },
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          mb: 2
        }}
      >
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{ 
              maxHeight: "100%", 
              maxWidth: "100%", 
              objectFit: "contain" 
            }}
          />
        )}
      </Box>

      <CardContent 
        sx={{ 
          flexGrow: 1, 
          px: {
            xs: 2,     
            sm: 3,     
          },
          width: '100%',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            fontSize: {
              xs: '0.9rem',  
              sm: '1.0rem',   
            },
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            sx={{
              color: colors["--clr-gray-3"],
              mb: 1,
              fontSize: {
                xs: '0.8rem',   
                sm: '0.875rem', 
              },
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default BaseCard;