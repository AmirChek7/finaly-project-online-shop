import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clientContext } from '../../contexts/ClientContext';
import { calcSubPrice, calcTotalPrice } from '../../helpers/calcPrice';

const Cart = () => {
    const { getCart, cartData, changeCountProduct, makeOrder } = useContext(clientContext)

    useEffect(() => {
        getCart()
    }, [])
    const history = useHistory()
    function handleClick() {
        makeOrder()
        history.push('/')
    }

    return (
        <>
            {cartData ? (
                cartData.length ? (
                    <div className="cart">
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>image</th>
                                        <th>Название</th>
                                        <th>Цена</th>
                                        <th>Кол-во</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData.map(item => (
                                            <tr key={item.product.id}>
                                                <td> <img width="50" src={item.product.image} /> </td>
                                                <td>{item.product.title}</td>
                                                <td>{item.product.price}</td>
                                                <td> <input min="1" onChange={(e) => changeCountProduct(e.target.value, item.product.id)} type="number" value={item.count} /> </td>
                                                <td>{calcSubPrice(item)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h4>Общая сумма: {calcTotalPrice(cartData)} рублей</h4>
                            <button onClick={handleClick}>Оплатить</button>
                        </div>
                    </div>
                ) : (
                    <h1>Корзина пуста</h1>
                )
            ) : (
                <h1>Loading...</h1>
            )}

        </>
    );
};

export default Cart;