import { shades } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%,30%,40%)">
          <Typography
            variant="h3"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            Shopify
          </Typography>
          <div>
            Frankness applauded by supported ye household. Collected favourite
            now for for and rapturous repulsive consulted. An seems green be
            wrote again. She add what own only like. Tolerably we as extremity
            exquisite do commanded. Doubtful offended do entrance of landlord
            moreover is mistress in. Nay was appear entire ladies. Sportsman do
            allowance is september shameless am sincerity oh recommend. Gate
            tell man day that who.
          </div>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers@Shopify</Typography>
          <Typography mb="30px">Physical Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">data Sharing & privacy policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Order</Typography>
          <Typography mb="30px">Corporate & Bulk purchasing</Typography>
          <Typography mb="30px">Return and refund Policy</Typography>
        </Box>

        <Box width="clamp(20%,25%,30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact us
          </Typography>

          <Typography mb="30px">Along Kang'undo Road</Typography>
          <Typography mb="30px">Email:KrugerJ@gmail.com</Typography>
          <Typography mb="30px">Tel: (020)-034-567</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
