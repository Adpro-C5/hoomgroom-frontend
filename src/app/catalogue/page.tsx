'use client';
import React, {useState} from 'react';
import Link from 'next/link';

async function getCatalogue(){
  const res = await fetch("http://34.87.141.138/product/catalogue");
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

// const dummyProducts = [
//   {
//     id: '1',
//     productName: 'Product 1',
//     categories: ['Kursi'],
//     description: 'This is a description for product 1.',
//     imagePath: '/diagram/r1.jpg',
//     price: '10.00',
//     discountedPrice: '8.00',
//     sales: 100
//   },
//   {
//     id: '2',
//     productName: 'Product 2',
//     categories: ['Meja'],
//     description: 'This is a description for product 2.',
//     imagePath: '/diagram/r2.png',
//     price: '20.00',
//     discountedPrice: '15.00',
//     sales: 200
//   },
//   {
//     id: '3',
//     productName: 'Product 3',
//     categories: ['Dekorasi'],
//     description: 'This is a description for product 3.aksjfnkanfaknfc asjda adjsfna dsj',
//     imagePath: '/diagram/r2.png',
//     price: '20.00',
//     discountedPrice: '15.00',
//     sales: 200
//   },
//   {
//     id: '4',
//     productName: 'Product 4',
//     categories: ['Meja'],
//     description: 'This is a description for ygygygygygygygygygygygy yada',
//     imagePath: '/diagram/r2.png',
//     price: '20.00',
//     discountedPrice: '15.00',
//     sales: 200
//   },
// ];

async function CataloguePage() {
  //const products = dummyProducts;
  const allProducts = await getCatalogue();
  const [currentPage, setCurrentPage] = useState(1);
  const products = allProducts.slice((currentPage - 1) * 32, currentPage * 32);
  console.log(products);

  const totalPages = Math.ceil(allProducts.length / 32);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    return (
      <>
      <div className='bg-white min-h-screen'>
      <main className='mx-auto max-w-7xl py-4 my-8 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center max-w-2xl py-6'>
          <h1 className='text-3xl font-bold tracking-tight text-cyan-900 mr-5'>
						Catalogue    
				  </h1>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <form role="form" className="flex w-full">
            <input
            className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pr-2 pl-2 py-5"
            type="text"
            id="search"
            placeholder="Search something.." /> 
            <button className="bg-cyan-700 text-white rounded-lg font-semibold px-8 py-4 ml-2 hover:bg-cyan-600 focus:bg-cyan-900 focus:outline-none">
              Search
              </button>
            </form>
          </div>
        </div>

        <div className='max-w-md py-4'>
          <div className='relative flex'>
            <select className="peer h-full outline-none rounded bg-gray-100 text-sm text-gray-700 pr-2 pl-2" id="filter">
              <option value="all">All</option>
              <option value="Kursi">Kursi</option>
              <option value="Meja">Meja</option>
              <option value="Penyimpanan">Penyimpanan</option>
              <option value="Dekorasi">Dekorasi</option>
              <option value="Ranjang">Ranjang</option>
              <option value="Harga Minimal">Harga Minimal</option>
              <option value="Harga Maksimal">Harga Maksimal</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-2'>
          {products?.map((product: any) => {
                    return <Catalogue key={product.id} product={product}/>;
                })}
          </div>

          <div className='flex justify-between mt-4'>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next Page
            </button>
          </div>
      </main>
      </div>
      </>
    );
}

function Catalogue({product}: any){
  const {id, productName, categories, description, imagePath, price, discountedPriced, sales} = product || {};

  return (
    <Link href={`/catalogue/${id}`}>
      <div className="cursor-pointer border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full md:w-auto">
        <img src={imagePath} alt={productName} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900 overflow-hidden whitespace-nowrap">{productName}</h2>
          <p className="text-gray-600 overflow-hidden whitespace-nowrap">{description}</p>
          <p className="mt-2 text-cyan-900 font-bold">Rp{price}</p>
        </div>
      </div>
    </Link>
  );
}
export default CataloguePage;


  