import React from 'react'
import {FooterBanner,Product, HeroBanner} from "../components"
import {client} from "../lib/client"
const Home = ({products, bannerData}) => {
  
  return (
    <div>
      <HeroBanner/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
  <div className='products-container'>
    {products?.map(item => item.name)}
  </div>
      <FooterBanner/>
    </div>
  )
}
export const getServerSideProps = async () =>{
  const productQuery = '*[_type == "product"]'  // this is for saying - grab all the products froms sanity
  const products = await client.fetch(productQuery)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props:{
      products, 
      bannerData
    }
  }
}

export default Home