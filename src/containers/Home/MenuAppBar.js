import React, { useContext, useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import { ShoppingBasket } from '@material-ui/icons';
import { clientContext } from '../../contexts/ClientContext';

// Стили

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    navBar: {
        backgroundColor: '#333'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontFamily: 'Comfortaa;',
        color: '#ffffff',
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: '30px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

// Конец стилей



export default function PrimarySearchAppBar() {
    const { productsCountInCart, getProducts } = useContext(clientContext)
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const history = useHistory()
    const goSignIn = () => {
        history.push('/signin')
        handleMenuClose()
    }
    const goSignUp = () => {
        history.push('/signup')
        handleMenuClose()
    }
    let search = new URLSearchParams(history.location.search)
    const [searchWord, setSearchWord] = useState(search.get('q') || '');
    function handleSearchInput(params, value) {
        setSearchWord(value)
        search.set(params, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
    }
    useEffect(() => {
        getProducts(searchWord)
    }, [searchWord])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={goSignUp}>Регистрация</MenuItem>
            <MenuItem onClick={goSignIn}>Войти</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu>
            <MenuItem>
                <Link to="/cart">
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={productsCountInCart} color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </IconButton>
                </Link>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar className={classes.navBar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/">BootShop</Link>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={(e) => handleSearchInput("q", e.target.value)}
                            placeholder="Search..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name="searchValue"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link to="/cart">
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={productsCountInCart} color="secondary">
                                    <ShoppingBasket />
                                </Badge>
                            </IconButton>
                        </Link>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
