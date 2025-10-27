import { Box, Paper, InputBase, IconButton, Button, Backdrop } from '@mui/material';
import { Search, KeyboardArrowDown } from '@mui/icons-material';
import { useRef, useState } from 'react';
import CategoryMenu from './CategoryMenu';
import SearchSuggestions from './SearchSuggestions';
import useSearchBar from './useSearchBar';
import colors from "../../theme/colors";

export default function SearchBar({ 
  categories = [], 
  loading = false, 
  error = null, 
  onSearch, 
  onCategorySelect 
}) {
  const searchBarRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const {
    anchorEl,
    setAnchorEl,
    selectedCategory,
    searchTerm,
    setSearchTerm,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    loadingSuggestions,
    handleCategoryClose,
    handleSearch
  } = useSearchBar({ onSearch, onCategorySelect, categories });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      if (!showSuggestions) {
        setIsFocused(false);
      }
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    setShowSuggestions(false);
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <>
      <Backdrop
        open={isFocused || showSuggestions}
        onClick={() => {
          setIsFocused(false);
          setShowSuggestions(false);
        }}
        sx={{
          zIndex: 999,
          backgroundColor: colors["--clr-black-overlay-40"], 
        }}
      />
      
      <Box 
        ref={searchBarRef} 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          zIndex: (isFocused || showSuggestions) ? 1000 : 1 
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            boxShadow: isFocused ? 4 : 2,
            borderRadius: 1,
            height: { xs: 36, sm: 40, md: 45 },
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <Button
            onClick={(e) => { 
              setAnchorEl(e.currentTarget); 
              setShowSuggestions(false); 
            }}
            endIcon={<KeyboardArrowDown sx={{ fontSize: { xs: 16, sm: 20 } }} />}
            sx={{
              bgcolor: colors["--clr-gray-10"],
              color: colors["--clr-black-1"],
              px: { xs: 1, sm: 2 },
              minWidth: { xs: 30, sm: 80 },
              height: '100%',
              borderRight: `1px solid ${colors["--clr-gray-8"]}`,
              textTransform: 'none',
              fontSize: { xs: '0.7rem', sm: '0.9rem' },
              '&:hover': { bgcolor: colors["--clr-gray-9"] },
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            {selectedCategory}
          </Button>

          <InputBase
            sx={{
              ml: { xs: 1, sm: 2 },
              flex: 1,
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
              '& input': {
                py: { xs: 0.5, sm: 1 },
              },
            }}
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <IconButton
            type="submit"
            sx={{
              p: { xs: '6px', sm: '8px', md: '10px' },
              bgcolor: colors["--clr-yellow-4"],
              borderRadius: 1,
              height: '100%',
              '&:hover': { bgcolor: colors["--clr-yellow-2"] },
            }}
          >
            <Search sx={{ fontSize: { xs: 18, sm: 22, md: 24 } }} />
          </IconButton>
        </Paper>

        <CategoryMenu
          anchorEl={anchorEl}
          categories={categories}
          loading={loading}
          error={error}
          onClose={handleCategoryClose}
        />

        <SearchSuggestions
          show={showSuggestions}
          suggestions={suggestions}
          loading={loadingSuggestions}
          onClose={() => {
            setShowSuggestions(false);
            setIsFocused(false); 
            setSearchTerm('');
          }}
        />
      </Box>
    </>
  );
}