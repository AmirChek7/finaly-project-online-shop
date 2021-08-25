import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { clientContext } from '../../contexts/ClientContext';
import { Link } from 'react-router-dom'
import arrowRight from './../../icons/right-arrow.png'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        flexDirection: 'row',
        margin: 45,
        shadowBox: '0 0 20px rgba(0, 0, 0, 0.10)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 0,
    },
    media: {
        height: 300,
        marginTop: 25,
        backgroundSize: 'contain'
    },
    price: {
        fontSize: 25,
        marginRight: 40,
        marginLeft: 10,
    },
    more: {
        color: '#06c;',
        cursor: 'pointer'
    },
    img: {
    
    }
}); 

export default function MediaCard({ product }) {
    const classes = useStyles();
    const { addAndDeleteProductInCart, checkProductInCart } = useContext(clientContext)
    return (
        <Card className={classes.root}>
            <Link to={`/product-detail/${product.id}`}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={product.image}
                        title="Amirbek Mamasaliev 2021."
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Typography className={classes.price} gutterBottom component="h4">
                    {product.price} ₽
                </Typography>
                <IconButton
                    variant="contained"
                    color={checkProductInCart(product.id) ? "secondary" : 'primary'}
                    onClick={() => addAndDeleteProductInCart(product)}
                >
                    <ShoppingCart />
                </IconButton>
                <Link  to={`/product-detail/${product.id}`} className={classes.more}>
                    Learn More
                </Link>
                    <img width={13} height={13} paddingLeft={20} className="img" src={arrowRight} />
            </CardActions>
        </Card>
    );
}
