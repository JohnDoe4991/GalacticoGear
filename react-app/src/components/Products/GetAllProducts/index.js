import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { getAllProductsThunk } from "../../../store/product";
import OpenModalButton from "../../OpenModalButton";
import UpdateProductModal from "../UpdateProductModal";
import DeleteProductModal from "../DeleteProductModal";
import { GetAllReviewsThunk } from "../../../store/reviews";
import Masonry from "react-masonry-css";



export default function GetProducts() {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const getAllProducts = useSelector((state) => state.products.allProducts);
    const allProductsArray = Object.values(getAllProducts).reverse();
    const newImg = allProductsArray[0];


    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };


    const randomProductsToDisplay = shuffleArray([...allProductsArray]).slice(0, 6);



    const productsToDisplay = allProductsArray.slice(1, 5);
    const productsToDisplay1 = allProductsArray.slice(5, 14);
    const productsToDisplay2 = allProductsArray.slice(14);


    const user = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(getAllProductsThunk())
        dispatch(GetAllReviewsThunk());
    }, [dispatch]);

    const goToProduct = useCallback((product) => {
        push(`/products/${product?.id}`);
    }, [push]);



    return (
        <div className="allproducts-container">
            <div className="top-logo">
                <img className="product-top-img" src={"https://galictogear.s3.us-west-1.amazonaws.com/white-home.jpeg"} alt="" />
                <div className="logo-writing">
                    <h2 className="logo-h2">Early Holiday DEALS are here!</h2>
                    <h3 className="savings">75%+ OFF</h3>
                    <button className="save-now" type="button" onClick={() => push("/products/10")}>Save Now</button>
                    <h4 className="logo-h4">Participating shops only. Terms apply.</h4>
                </div>
                <img className="product-top-img1" src={"https://galictogear.s3.us-west-1.amazonaws.com/shirt.jpeg"} alt="" />
            </div>
            <div className="sponsor-by">
                <h1 className="page-break"><span className="sponsor">Sponsored by</span> Galactico sellers</h1>
                <h3 className="page-breakh3">Fun fact: behind every sponsored item there is an Galactico seller hoping you'll check out their shop</h3>
            </div>

            <div className="items-you-like">
                <div className="welcome">
                    Welcome back, {"  "} <span className="user-name"> {" "} {user.firstName} </span>!
                </div>

                <h3 className="items-you-like-h3">Items you might be interested in</h3>
                <div className="all-photoz">
                    <div className="preview" onClick={() => push(`/products/${newImg.id}`)}>
                        {newImg && (
                            <div className="product-image-container">
                                <img className="preview-img" src={newImg.photoUrl} alt={newImg.title} />
                                <div className="price-tag1">${newImg.price}</div>
                                {user.id === newImg.ownerId && (
                                    <div className="product-bttns">
                                        <OpenModalButton
                                            buttonText="Update Product"
                                            modalComponent={<UpdateProductModal productId={newImg.id} />}
                                        />
                                        <OpenModalButton
                                            buttonText="Delete Product"
                                            modalComponent={
                                                <DeleteProductModal
                                                    productId={newImg.id}
                                                />
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                        )}

                    </div>
                    <div className="bott-photoz">
                        {productsToDisplay.map((product) => (
                            <div className="single-product" onClick={() => goToProduct(product)} key={product?.id}>
                                <div className="product-image-container">
                                    <img src={product.photoUrl} alt="" className="trending-images" onClick={() => goToProduct(product)} key={product?.id} />
                                    <div className="price-tag">${product.price}</div>
                                </div>
                                <div className="Product-Details-Buttons1">
                                    {user.id === product.ownerId && (
                                        <div className="product-bttns">
                                            <OpenModalButton
                                                buttonText="Update Product"
                                                modalComponent={<UpdateProductModal productId={product.id} />}
                                            />
                                            <OpenModalButton
                                                buttonText="Delete Product"
                                                modalComponent={
                                                    <DeleteProductModal
                                                        productId={product.id}
                                                    />
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="more-jerseys">
                <h3 className="song-h3">
                    <ul>
                        <li>Historia que tú hiciste</li>
                        <li>Historia por hacer</li>
                        <li>Porque nadie resiste</li>
                        <li>Tus ganas de vencer</li>
                    </ul>
                </h3>
                <div className="middle-prod-container">
                    <Masonry
                        breakpointCols={3}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {productsToDisplay1.map((product) => (
                            <div className="single-product1" onClick={() => goToProduct(product)} key={product?.id}>
                                <img
                                    src={product.photoUrl}
                                    alt=""
                                    className="userproducts-images"
                                ></img>
                                <div className="price-tag2">${product.price}</div>
                                <div className="Product-Details-Buttons1">
                                    {user.id === product.ownerId && (
                                        <div className="product-bttns">
                                            <OpenModalButton
                                                buttonText="Update Product"
                                                modalComponent={<UpdateProductModal productId={product.id} />}
                                            />
                                            <OpenModalButton
                                                buttonText="Delete Product"
                                                modalComponent={
                                                    <DeleteProductModal
                                                        productId={product.id}
                                                    />
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </div>

            </div>
            <div className="more-jerseys1">
                <h3 className="song-h3">
                    <ul className="ya-salen">
                        <li>Ya salen las estrellas</li>
                        <li>Mi viejo Chamartín</li>
                        <li>De lejos y de cerca</li>
                        <li>Nos traes hasta aquí</li>
                        <li>Llevo tu camiseta</li>
                        <li>Pegada al corazón</li>
                        <li>Los días que tú juegas</li>
                        <li>Son todo lo que soy</li>
                    </ul>
                </h3>
                <div className="editors-pick-container">
                    <div className="editor-h3-container">
                        <h3 className="editors-picks">Editors' Picks</h3>
                        <h3 className="great-gifts">Great Gifts</h3>
                    </div>
                    {randomProductsToDisplay.map((product) => (
                        <div className="editor-product" >
                            <img
                                src={product.photoUrl}
                                alt=""
                                className="editor-images"
                                onClick={() => goToProduct(product)} key={product?.id}
                            ></img>
                        </div>
                    ))}
                </div>
                <div className="jersey-bottom-container">
                    <div className="valintine-container">
                        <h1 className="valintine">Best Sellers</h1>
                        <h2 className="valintine1">Shop the Look</h2>
                    </div>
                    <div className="jersey-bottom-images">
                        {productsToDisplay2.map((product) => (
                            <div className="bottom-images-con">
                                <img
                                    src={product.photoUrl}
                                    alt=""
                                    className="userproducts-images-bottom"
                                    onClick={() => goToProduct(product)} key={product?.id}
                                ></img>
                                <div className="price-tag-bot">${product.price}</div>
                                <div className="Product-Details-Buttons1">
                                    {user.id === product.ownerId && (
                                        <div className="product-bttns">
                                            <OpenModalButton
                                                buttonText="Update Product"
                                                modalComponent={<UpdateProductModal productId={product.id} />}
                                            />
                                            <OpenModalButton
                                                buttonText="Delete Product"
                                                modalComponent={
                                                    <DeleteProductModal
                                                        productId={product.id}
                                                    />
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <h3 className="song-h3">
                    <ul>
                        <li>Ya corre la saeta</li>
                        <li>Ya ataca mi Madrid</li>
                        <li>Soy lucha, soy belleza</li>
                        <li>El grito que aprendí</li>
                        <li>Madrid, Madrid, Madrid</li>
                        <li>¡Hala Madrid!</li>
                        <li>Y nada más</li>
                        <li>Y nada más</li>
                        <li>¡Hala Madrid!</li>
                    </ul>
                </h3>
            </div>
            <div className="what-is-container">
                <h1 className="what-is-h1">What is GalacticoGear?</h1>
                <div className="what-is-bttm-container">
                    <div className="what-is-left">
                        <h2 className="bttm-headers">A community doing good</h2>
                        <p className="what-is-p">GalacticoGear is a global online marketplace, where people come together to make, sell, buy and collect madrid jerseys.
                            We're also a community pushing for positive change for small businesses, people, and the planet.
                        </p>
                    </div>
                    <div className="what-is-middle">
                        <h2 className="bttm-headers">Support independent creators</h2>
                        <p className="what-is-p">There's no GalacticoGear warehouse - just millions of madridistas selling the things they love. We make the whole process easy,
                            helping you connect directly with makers to find something extraordinary.
                        </p>
                    </div>
                    <div className="what-is-right">
                        <h2 className="bttm-headers">Peace of Mind</h2>
                        <p className="what-is-p">Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we're always ready to step in for support.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
