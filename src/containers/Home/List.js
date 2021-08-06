import React, { useContext, useEffect } from 'react';
import { clientContext } from '../../contexts/ClientContext';
import MediaCard from './MediaCard';
import './List.css'

const List = () => {
    const { getProducts, products } = useContext(clientContext)

    useEffect(() => {
        // getProducts()
    }, [])

    return (
        <div className="list">
            {
                products ? (
                    products.length ? (
                        products.map(product => (
                            <div>
                                <MediaCard key={product.id} product={product} />
                            </div>
                        ))
                    ) : (
                        <h1>Нету товаров</h1>
                    )
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </div>
    );
};

export default List;