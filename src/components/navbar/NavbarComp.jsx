import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import PaletteIcon from "@mui/icons-material/Palette";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchPartial from "./SearchPartial";
import MobileMenuPartial from "./MobileMenu";
import NavLinkComponent from "./NavLink";
import MobileProfilePartial from "./MobileProfile";
import ProfileMenuComp from "./ProfileMenu";
import { darkModeActions } from "../../store/DarkMode";
import { authActions } from "../../store/auth";
import ROUTES from "../../routes/ROUTES";

const notAuthPages = [
  { label: "Sign Up", url: ROUTES.REGISTER },
  { label: "Sign In", url: ROUTES.LOGIN },
];

const NavbarComp = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector((bigPie) => bigPie.darkModeSlice.isDarkMode);
  const isLoggedIn = useSelector((bigPie) => bigPie.authSlice.isLoggedIn);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  React.useEffect(() => {
    axios
      .get("/users/userInfo")
      .then((userInfo) => {
        setAvatar({
          url: userInfo.data.imageUrl,
          alt: userInfo.data.imageAlt,
        });
        setUserName(userInfo.data.firstName);
      })
      .catch((err) => {});
  }, [isLoggedIn]);
  const isMenuOpen = Boolean(anchorEl);
  const handleModeTheme = () => {
    dispatch(darkModeActions.changeTheme());
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(authActions.logOut());
    localStorage.removeItem("token");
    toast.success("See you soon");
    navigate(ROUTES.FAKEHOME);
  };

  const renderProfileMenu = (
    <ProfileMenuComp
      anchorEl={anchorEl}
      isMenuOpen={isMenuOpen}
      handleLogOut={handleLogOut}
      handleMenuClose={handleMenuClose}
      name={userName}
    />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            fontWeight={700}
            color={"white"}
            style={{ textDecoration: "none" }}
          >
            <PaletteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: { xs: "0", md: "0.5rem" },
            }}
          >
            <MenuItem>
              <NavLinkComponent url={ROUTES.ABOUT} label={"About Us"} />
            </MenuItem>
            {isLoggedIn && (
              <MenuItem>
                <NavLinkComponent
                  url={ROUTES.FAV}
                  label={" My Favourite Cards"}
                />
              </MenuItem>
            )}
            {payload && payload.isAdmin && (
              <MenuItem>
                <NavLinkComponent url={ROUTES.MYCARDS} label={"My Cards"} />
              </MenuItem>
            )}
            {payload && payload.isAdmin && (
              <MenuItem>
                <NavLinkComponent url={ROUTES.SANDBOX} label={"Sandbox"} />
              </MenuItem>
            )}
          </Box>
          <MobileMenuPartial
            pages={[
              {
                url: ROUTES.HOME,
                label: "Home",
              },
              {
                url: ROUTES.ABOUT,
                label: "About Us",
              },
              isLoggedIn && {
                url: ROUTES.FAV,
                label: "Favourites",
              },
              payload &&
                payload.isAdmin && {
                  url: ROUTES.MYCARDS,
                  label: "My-Cards",
                },
              payload &&
                payload.isAdmin && {
                  url: ROUTES.SANDBOX,
                  label: "Sandbox",
                },
            ]}
          />
          <Box sx={{ flexGrow: 1 }} />
          <SearchPartial />
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={"account-menu"}
            aria-haspopup="true"
            onClick={handleModeTheme}
            color="inherit"
          >
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {isLoggedIn ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={"account-menu"}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {avatar && <Avatar alt={avatar.alt} src={avatar.url} />}
            </IconButton>
          ) : (
            <React.Fragment>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <MobileProfilePartial pages={notAuthPages} />
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {notAuthPages.map((page) => (
                  <MenuItem
                    onClick={handleMenuClose}
                    key={`notAuthPage-${page.url}`}
                  >
                    <NavLinkComponent url={page.url} label={page.label} />
                  </MenuItem>
                ))}
              </Box>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </Box>
  );
};

export default NavbarComp;
