import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/material";

interface LinkButtonProps {
  text: string;
  path: string;
  sx?: SxProps;
}

const LinkButton = ({ text, path, sx }: LinkButtonProps) => {
  return (
    <Button variant="contained" component={Link} to={path} sx={sx}>
      <Box sx={{ fontWeight: 'bold' }}>{text}</Box>
    </Button>
  )
}
const NavBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <LinkButton text="home" path="/"/>
          <LinkButton text="users" path="users" sx={{ ml: 2 }}/>
          <LinkButton text="about" path="about" sx={{ ml: 2 }}/>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default NavBar;