import React from 'react';
import Link from 'next/link';

async function getCatalogue(){
  const res = await fetch("http://localhost:8080/product/catalogue");
  return await res.json();
}

async function CataloguePage() {
  const products = await getCatalogue();

    return (
      <>
      <div className='bg-white min-h-screen'>
      <main className='mx-auto max-w-7xl py-4 my-8 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-cyan-900'>
						Catalogue
					</h1>
        <div className='max-w-md mx-auto py-6'>
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

        <div className='max-w-md py-3'>
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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products?.map((product: any) => {
                    return <Catalogue key={product.Id} product={product}/>;
                })}
          </div>
      </main>
      </div>
      </>
    );
}

function Catalogue({product}: any){
  const {id, productName, categories, description, imagePath, price, discountedPriced, sales} = product || {};

  return(
    <Link href = {`/product/${id}`}>
      <div>
          <h2>Product Name: {id}</h2>
          <h5>Description: {description}</h5>
          <p>Total Price: {price}</p>
      </div>
    </Link>
  );
}
export default CataloguePage;