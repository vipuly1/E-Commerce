import React from "react";
import { useState, useContext } from "react";
import { client } from "@/lib/client";
import { urlFor } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "@/components";
import {useStateContext} from "../../context/StateContext"
import { Context } from "../../context/StateContext";



const productDetails = ({ product, similarProducts }) => {
  const {quantity, qty} = useContext(Context)
  const { image, name, details, price } = product;
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[imageIndex])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <img
                  src={urlFor(item)}
                  className={
                    i == imageIndex
                      ? "small-image selected-image"
                      : "small-image"
                  }
                  onMouseEnter={() => setImageIndex(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price} </p>
          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={(a)=>quantity(-1)}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={(a)=>quantity(+1)}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick="">
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track ">
            {similarProducts.map((item) => {
              return <Product key={item._id} product={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = '*[_type == "product"]';

  const products = await client.fetch(query);

  /*The immediate ({ }) in arrow function indicates that the function is immediately returning an object*/
  const paths = products.map((item) => ({
    params: {
      slug: item.slug.current,
    },
  }));
  /*paths are [ {params: {slug:earphones}}, {params: {slug: earphones}}, {}, {}] */
  return {
    paths,
    fallback: "blocking",
  };
};

/*static takes context.params.[dynamicroute]*/
export const getStaticProps = async ({ params: { slug } }) => {
  console.log(slug);
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`; // this is for saying - grab all the products froms sanity

  const product = await client.fetch(productQuery);

  const productsQuery = '*[_type == "product"]';
  const similarProducts = await client.fetch(productsQuery);

  return {
    props: {
      product,
      similarProducts,
    },
  };
};
export default productDetails;

