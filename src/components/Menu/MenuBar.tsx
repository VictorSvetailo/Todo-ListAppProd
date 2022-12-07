import React, { useCallback } from 'react'
import { alpha, styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { useSelector } from 'react-redux'
import { authActions, authSelectors } from '../../features/Auth'
import stales from '../../app/App.module.css'
import { useActions } from '../../utils/redux-utils'
import { BadgeAvatars } from './AvatarButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { FormControlLabel, Switch, SwitchProps } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
   }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch'
      }
   }
}))

export const AppMenuBar = () => {
   const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
   const { logout } = useActions(authActions)
   const logoutH = useCallback(() => {
      logout()
   }, [])

   ///

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null)

   const isMenuOpen = Boolean(anchorEl)
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
      handleMobileMenuClose()
   }

   const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget)
   }

   //
   const [checked, setChecked] = React.useState(false)

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
   }

   const IOSSwitch = styled((props: SwitchProps) => (
      <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
   ))(({ theme }) => ({
      width: 42,
      height: 21,
      padding: 0,
      '& .MuiSwitch-switchBase': {
         padding: 0,
         margin: 2,
         transitionDuration: '300ms',
         '&.Mui-checked': {
            transform: 'translateX(20px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
               backgroundColor:
                  theme.palette.mode === 'dark' ? '#313030' : '#313030',
               opacity: 1,
               border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
               opacity: 0.5
            }
         },
         '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#313030',
            border: '6px solid #fff'
         },
         '&.Mui-disabled .MuiSwitch-thumb': {
            color:
               theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[600]
         },
         '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
         }
      },
      '& .MuiSwitch-thumb': {
         boxSizing: 'border-box',
         width: 17,
         height: 17
      },
      '& .MuiSwitch-track': {
         borderRadius: 26 / 2,
         backgroundColor:
            theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
         opacity: 1,
         transition: theme.transitions.create(['background-color'], {
            duration: 500
         })
      }
   }))

   //

   const menuId = 'primary-search-account-menu'
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
         }}
         id={menuId}
         keepMounted
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={handleMenuClose} disabled>
            <Avatar /> Profile
         </MenuItem>
         <MenuItem disabled>
            <Avatar /> My account
         </MenuItem>
         <Divider />
         <MenuItem disabled>
            <ListItemIcon>
               <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
         </MenuItem>
         <MenuItem disabled>
            <ListItemIcon>
               <Settings fontSize="small" />
            </ListItemIcon>
            Settings
         </MenuItem>
         <MenuItem style={{ color: 'red' }} onClick={logoutH}>
            <ListItemIcon>
               <Logout style={{ color: 'red' }} fontSize="small" />
            </ListItemIcon>
            Sign out
         </MenuItem>
      </Menu>
   )

   const mobileMenuId = 'primary-search-account-menu-mobile'
   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem disabled>
            <IconButton
               size="large"
               aria-label="show 4 new mails"
               color="inherit"
            >
               <Badge badgeContent={4} color="error">
                  <MailIcon />
               </Badge>
            </IconButton>
            <p>Messages </p>
         </MenuItem>
         <MenuItem disabled>
            <IconButton
               size="large"
               aria-label="show 17 new notifications"
               color="inherit"
            >
               <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
               </Badge>
            </IconButton>
            <p>Notifications</p>
         </MenuItem>
         <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
            >
               <AccountCircle />
            </IconButton>
            <p>Profile</p>
         </MenuItem>
      </Menu>
   )

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  disabled
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
               >
                  <h1 className={stales.appTitle}>Todo-List App</h1>
               </Typography>
               <Search>
                  <SearchIconWrapper>
                     <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                     placeholder="Search…"
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </Search>
               <Box sx={{ flexGrow: 1 }} />
               <FormControlLabel
                  checked={checked}
                  label={checked ? 'Dark' : 'Light'}
                  control={<IOSSwitch onChange={handleChange} sx={{ m: 1 }} />}
               />
               <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton
                     disabled
                     size="large"
                     aria-label="show 4 new mails"
                     color="inherit"
                  >
                     <Badge badgeContent={4} color="error">
                        <MailIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     disabled
                     size="large"
                     aria-label="show 17 new notifications"
                     color="inherit"
                  >
                     <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     size="large"
                     edge="end"
                     aria-label="account of current user"
                     aria-controls={menuId}
                     aria-haspopup="true"
                     onClick={handleProfileMenuOpen}
                     color="inherit"
                  >
                     <BadgeAvatars />
                  </IconButton>
               </Box>
               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="inherit"
                  >
                     <MoreIcon />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </Box>
   )
}
