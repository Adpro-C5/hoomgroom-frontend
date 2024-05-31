'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { logout as setLogout } from '@/redux/features/authSlice';
import { NavLink } from '@/components/common';
import { toast } from 'react-toastify';

export default function Navbar() {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const [logout] = useLogoutMutation();

	const { isAuthenticated } = useAppSelector(state => state.auth);

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				toast.success('Logged out');
				dispatch(setLogout());
			}).catch(() => {
				toast.error('Failed to log out');
			});
	};

	const isSelected = (path: string) => (pathname?.includes(path) ? true : false);

	const authLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/home')}
				isMobile={isMobile}
				href='/home'
			>
				Home
			</NavLink>
			<NavLink
				isSelected={isSelected('/catalogue')}
				isMobile={isMobile}
				href='/catalogue'
			>
				My Catalogue
			</NavLink>
			<NavLink
				isSelected={isSelected('/transaction')}
				isMobile={isMobile}
				href='/transaction/list'
			>
				Transaction
			</NavLink>
			<NavLink
				isSelected={isSelected('/tracking')}
				isMobile={isMobile}
				href='/tracking'
			>
				Tracking
			</NavLink>
			<NavLink
				isSelected={isSelected('/profile')}
				isMobile={isMobile}
				href='/profile'
			>
				Profile
			</NavLink>
			<button
				className={`${
					isMobile ? 'block w-full text-left' : 'inline-block'
				} bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium`}
				onClick={handleLogout}
			>
				Logout
			</button>
		</>
	);

	const guestLinks = (isMobile: boolean) => (
		<>
			<NavLink
				isSelected={isSelected('/auth/login')}
				isMobile={isMobile}
				href='/auth/login'
			>
				<button
					className={`${
						isMobile ? 'block w-full text-left' : 'inline-block'
					} bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium`}
				>
					Login
				</button>
			</NavLink>
			<NavLink
				isSelected={isSelected('/auth/register')}
				isMobile={isMobile}
				href='/auth/register'
			>
				<button
					className={`${
						isMobile ? 'block w-full text-left' : 'inline-block'
					} bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium`}
				>
					Register
				</button>
			</NavLink>
			<NavLink
				isSelected={isSelected('/tracking')}
				isMobile={isMobile}
				href='/tracking'
			>
				<button
					className={`${
						isMobile ? 'block w-full text-left' : 'inline-block'
					} bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium`}
				>
					Tracking
				</button>
			</NavLink>
			<NavLink
				isSelected={isSelected('/catalogue')}
				isMobile={isMobile}
				href='/catalogue'
			>
				<button
					className={`${
						isMobile ? 'block w-full text-left' : 'inline-block'
					} bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium`}
				>
					Catalogue
				</button>
			</NavLink>
		</>
	);

	return (
		<Disclosure as='nav' className='bg-blue-900'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<NavLink href='/' isBanner className='text-white'>
										HoomGroom
									</NavLink>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{isAuthenticated
											? authLinks(false)
											: guestLinks(false)}
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{isAuthenticated
								? authLinks(true)
								: guestLinks(true)}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}