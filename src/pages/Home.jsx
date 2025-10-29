import { Box} from "@mui/material";
import ProductsByCategory from '../components/sections/ProductsByCategory';
import Benefits from '../components/sections/Benefits';
import Banner from '../components/sections/Banner.jsx';
import TopRated from '../components/sections/TopRated.jsx';
import BestSellers from '../components/sections/BestSellers.jsx';
import Newsletter from '../components/sections/Newsletter.jsx';
import FAQ from "../components/sections/FAQ.jsx";
import colors from "../theme/colors";

function Home() {  
  return (
    <Box sx={{ background: colors["--clr-gradient-background"], minHeight: "100vh" }}>
      <Banner />
      <Benefits />
      <BestSellers />
      <ProductsByCategory />
      <TopRated />
      <Newsletter/>
      <FAQ/>
    </Box>
  );
}

export default Home;