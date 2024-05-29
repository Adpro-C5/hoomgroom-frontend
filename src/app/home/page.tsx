import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <Link className='p-2 mt-4 border rounded-lg border-spacing-2 bg-sky-200' href='/product'>Manage Some Products</Link>
            <Link className='p-2 mt-4 border rounded-lg border-spacing-2 bg-sky-200' href='/promo-code'>Or Check Our Promos!</Link>
        </div>
    );
}