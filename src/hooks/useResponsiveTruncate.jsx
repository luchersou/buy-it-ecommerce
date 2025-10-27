import { useMediaQuery, useTheme } from "@mui/material";

export const useResponsiveTruncate = (xsLength = 25, smLength = 45, mdLength = 65) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));

  const truncate = (text) => {
    const length = isXs ? xsLength : isSm ? smLength : mdLength;
    
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return truncate;
};