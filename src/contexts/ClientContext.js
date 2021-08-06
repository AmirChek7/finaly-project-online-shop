import axios from 'axios';
import React, { useReducer } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calcPrice';
import { AUTH_API, JSON_API } from '../helpers/constants';

export const clientContext = React.createContext()

const INIT_STATE = {
    products: null,
    productsCountInCart: JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem("cart")).products.length : 0,
    cartData: null,
    productDetail: null
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_AND_DELETE_PRODUCT_IN_CART":
            return { ...state, productsCountInCart: action.payload }
        case "GET_CART":
            return { ...state, cartData: action.payload }
        case "GET_PRODUCT_DETAIL":
            return { ...state, productDetail: action.payload }
        case "MAKE_ORDER":
            return { ...state, productsCountInCart: action.payload }
        default:
            return state
    }
}

const ClientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getProducts = async (searchWord = "") => {
        const { data } = await axios(`${JSON_API}?q=${searchWord}`)
        dispatch({
            type: "GET_PRODUCTS",
            payload: data
        })
    }

    const registerUser = async (newUser, history) => {
        try {
            const res = await axios.post(`${AUTH_API}/registration`, newUser)
            console.log(res)
            history.push('/signin')
        }
        catch {
            alert("Неправильная почта или пароль")
        }
    }

    const loginUser = async (user, history) => {
        try {
            const res = await axios.post(`${AUTH_API}/login`, user)
            console.log(res)
            history.push('/')
        }
        catch {
            alert("Введите верные данные")
        }
    }

    function addAndDeleteProductInCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newProduct = {
            product: product,
            count: 1,
            subPrice: 0
        }
        newProduct.subPrice = calcSubPrice(newProduct)
        let newCart = cart.products.filter(item => item.product.id === product.id)
        if (newCart.length > 0) {
            cart.products = cart.products.filter(item => item.product.id !== product.id)
        }
        else {
            cart.products.push(newProduct)
        }
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch({
            type: "ADD_AND_DELETE_PRODUCT_IN_CART",
            payload: cart.products.length
        })
    }

    function checkProductInCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        if (!cart) {
            cart = {
                products: [],
                totalPrice: 0
            }
        }
        let newCart = cart.products.filter(item => item.product.id === id)
        return newCart.length > 0 ? true : false
    }

    function getCart() {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart) {
            cart = {
                products: []
            }
        }
        dispatch({
            type: "GET_CART",
            payload: cart.products
        })
    }

    function changeCountProduct(count, id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart.products = cart.products.map(item => {
            if (item.product.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        cart.totalPrice = calcTotalPrice(cart.products)
        localStorage.setItem("cart", JSON.stringify(cart))
        getCart()
    }

    function makeOrder() {
        localStorage.setItem("cart", null)
        dispatch({
            type: "MAKE_ORDER",
            payload: 0
        })
    }

    async function getProductDetail(id) {
        const { data } = await axios(`${JSON_API}/${id}`)
        dispatch({
            type: "GET_PRODUCT_DETAIL",
            payload: data
        })
    }

    return (
        <clientContext.Provider value={{
            products: state.products,
            productsCountInCart: state.productsCountInCart,
            cartData: state.cartData,
            productDetail: state.productDetail,
            getProducts,
            registerUser,
            loginUser,
            addAndDeleteProductInCart,
            checkProductInCart,
            getCart,
            changeCountProduct,
            makeOrder,
            getProductDetail
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;