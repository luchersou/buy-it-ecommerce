import { Menu, MenuItem } from '@mui/material';
import Loading from '../Loading';

export default function CategoryMenu({ 
  anchorEl, 
  categories, 
  loading, 
  error, 
  onClose 
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => onClose()}
      slotProps={{
        paper: {
            sx: { mt: 1, minWidth: 180, maxHeight: 400 },
        }
      }}
    >
      {loading ? (
        <Loading text="Loading..."/>
      ) : error ? (
        <MenuItem disabled sx={{ color: 'error.main' }}>
          Error loading categories
        </MenuItem>
      ) : categories.length > 0 ? (
        categories.map((cat, index) => (
          <MenuItem
            key={index}
            onClick={() => onClose(cat)}
            sx={{ textTransform: 'capitalize' }}
          >
            {cat}
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No categories found</MenuItem>
      )}
    </Menu>
  );
}