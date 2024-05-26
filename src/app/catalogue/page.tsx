import React from 'react'

export default function page() {
    return (
      <>
      <div className='bg-white min-h-screen'>
      <header className='bg-cyan-900 shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-white-900'>
						HoomGroom
					</h1>
				</div>
			</header>

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
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          </div>
        </div>
      </main>
      </div>
      </>
    )
  }