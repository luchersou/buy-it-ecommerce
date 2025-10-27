import { Link } from 'react-router-dom';
import { 
  Paper, List, ListItemButton, ListItemText
} from '@mui/material';
import Loading from '../Loading';
import colors from "../../theme/colors";

export default function SearchSuggestions({ 
  show, 
  suggestions, 
  loading, 
  onClose 
}) {
  if (!show) return null;

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 10,
        maxHeight: 250,
        overflowY: 'auto',
      }}
    >
      {loading ? (
        <Loading text="Loading..."/>
      ) : suggestions.length > 0 ? (
        <List dense>
          {suggestions.map((item) => (
            <ListItemButton
              key={item.id}
              component={Link}
              to={`/product/${item.id}`}
              onClick={(e) => {
                e.stopPropagation(); 
                onClose();
              }}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: 35,
                  height: 35,
                  objectFit: 'contain',
                  marginRight: 10,
                  border: `1px solid ${colors["--clr-gray-10"]}`,
                  borderRadius: 4,
                  padding: 1,
                  backgroundColor: colors["--clr-white-1"],
                }}
              />
              <ListItemText
                primary={item.title}
                secondary={`$${item.price}`}
              />
            </ListItemButton>
          ))}
        </List>
      ) : (
        <ListItemButton disabled>
          <ListItemText primary="No results found" />
        </ListItemButton>
      )}
    </Paper>
  );
}