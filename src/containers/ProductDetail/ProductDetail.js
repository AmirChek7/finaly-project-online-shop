import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clientContext } from '../../contexts/ClientContext';

const ProductDetail = () => {
    const { getProductDetail, productDetail } = useContext(clientContext)
    const { id } = useParams()
    useEffect(() => {
        getProductDetail(id)
    }, [])
    console.log(productDetail)
    return (
        <>
            {
                productDetail ? (
                    <div className="container">
                        <div className="product-detail">
                            <div className="detail-left">
                                <img src={productDetail.image} />
                            </div>
                            <div className="detail-right">
                                <h3 className="title">{productDetail.title}</h3>
                                <ul>
                                    <li>
                                        <div>Цена:</div>
                                        <div>{productDetail.price}₽</div>
                                    </li>
                                    <li>
                                        <div>Скидка:</div>
                                        <div>{productDetail.discount}%</div>
                                    </li>
                                    <li>
                                        <div>Продавец:</div>
                                        <div>{productDetail.author}</div>
                                    </li>
                                    <li>
                                        <div>Номер:</div>
                                        <div>{productDetail.phone}</div>
                                    </li>
                                    <li>
                                        <div>Категория: </div>
                                        <div>{productDetail.category} </div>
                                    </li>
                                    <li>
                                        <div>Кол-во:</div>
                                        <div>{productDetail.countInStock}</div>
                                    </li>                                    <li>
                                        <div>Где купить: </div>
                                        <div>{productDetail.storeAddress}</div>
                                    </li>
                                </ul>
                                <div>
                                    <p className="description">{productDetail.description}</p>
                                </div>
                                <button className="buy">продолжить</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </>
    );
};

export default ProductDetail;