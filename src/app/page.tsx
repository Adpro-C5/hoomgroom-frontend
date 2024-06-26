"use client";

import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

export default function Page() {
	const { isAuthenticated } = useAppSelector(state => state.auth);
	return (
		<main className='bg-white-50'>
			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-black-900 sm:text-6xl'>
							🏡HoomGroom
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-700'>
              				HoomGroom is a platform that enables users to search for and buy home equipment and furniture that suits their needs.
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							{!isAuthenticated ? (
							<>
								<Link
								href='/auth/login'
								className='rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
								>
								Log into your account
								</Link>
								<Link
								href='/auth/register'
								className='rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
								>
								Or create an account{' '}
								<span aria-hidden='true'>&rarr;</span>
								</Link>
							</>
							) : (<></>)
							}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}