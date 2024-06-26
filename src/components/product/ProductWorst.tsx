import { getWorstProducts, Product } from '@/lib/product/worstproducts';
import Image from 'next/image';
import React from 'react';
import { Flex, Tag } from 'antd';


const ProductsWorst = async () => {
  const products: Product[] = await getWorstProducts();

  return (
    <table className='border border-opacity-20 p-4 m-2 overflow-x-auto'>
      <thead>
        <tr>
          <th className='border border-sky-950'>Image</th>
          <th className='border border-sky-950'>Product Id</th>
          <th className='border border-sky-950'>Name</th>
          <th className='border border-sky-950'>Description</th>
          <th className='border border-sky-950'>Categories</th>
          <th className='border border-sky-950'>Price</th>
          <th className='border border-sky-950'>Discount Price</th>
          <th className='border border-sky-950'>Sales</th>
        </tr>
      </thead>
      <tbody>
        {products.map(
          Product => <tr key={Product.id}>
            <td className='p-2 border border-sky-950'>
              <Image
                src={'/uploads/' + Product.imagePath}
                width={200}
                height={200}
                alt='Product Picture'
              />
            </td>
            <td className='p-2 border border-sky-950'>{Product.id}</td>
            <td className='p-2 border border-sky-950'>{Product.productName}</td>
            <td className='p-2 border border-sky-950'>{Product.description}</td>
            <td className='p-2 border border-sky-950'>
              <Flex gap="4px 0" wrap>
              {
                Product.categories &&
                Product.categories.map(
                  category => <Tag color='magenta' key={category}>{category}</Tag>
                )
              }
              </Flex>
            </td>
            <td className='p-2 border border-sky-950'>{Product.price}</td>
            <td className='p-2 border border-sky-950'>{Product.discountedPrice}</td>
            <td className='p-2 border border-sky-950'>{Product.sales.toString()}</td>
          </tr>
        )}
      </tbody>  
    </table>
  )
}

export default ProductsWorst