'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";

interface Product {
    id: string;
    productName: number;
    categories: string[];
    description: string;
    imagePath: string;
    price: number;
    discountedPrice: number | null;
    sales: number;
}

export default function BuyProductPage({params}:any){
    let [product, setProduct] = useState<Product | undefined>(undefined);
    let [error, setError] = useState<Error | null>(null);
    let [count, setCount] = useState<number>(1);
    let [promocode, setPromoCode] = useState<string>("");

    useEffect(() => {
        fetch(`http://34.87.141.138/product/${params.productId}`, {
            headers:{
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.body}`);
                }
                return response.json()
            })
            .then(data => {
                setProduct(data)
            })
            .catch(error => {
                setError(error);
            })
    }, [params.productId]);

    const inc = () => {
        setCount(count + 1);
    };

    const dec = () => {
        if(count>1){
            setCount(count - 1);
        }
    }

    if(error != null){
        return <div>{error.message}</div>;
    }

    if (!product) {
        return (
            <div>
                <h1>Memuat...</h1>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-blue-900 py-5">Beli Produk</h1>
            <h1 className="text-xl py-2">{product.productName}</h1>
            <h3 className="text-xl py-2">Rp{product.discountedPrice !== null ? product.discountedPrice : product.price} / item</h3>

            <h3 className="text-sm mt-5">Jumlah</h3>
            <div className="flex justify-center flex-row items-center w-full space-x-3">
                <button className="bg-amber-500 w-10 h-10 text-white rounded-full text-sm font-medium" onClick={dec}>-
                </button>

                <input
                    className='text-center h-12 w-20 bg-gray-200 rounded-2xl border border-gray-300 border-opacity-50 px-2 text-sm'
                    type="number" value={count} />

                <button onClick={inc} className="bg-amber-500 w-10 h-10 text-white rounded-full text-sm font-medium">+
                </button>
            </div>

            <div className="flex flex-col items-center py-10">
                <p>Kode Promo:</p>
                <input
                    className=' h-12 w-[220px] bg-gray-200 rounded-2xl border border-gray-300 border-opacity-50 px-2 text-sm'
                    type="text" id="promocode" name="promocode"
                    placeholder='ex : BELANJAHEMAT25'
                    value={promocode}
                    onChange={e => { setPromoCode(e.currentTarget.value); }}></input>
            </div>

            <div className="bg-amber-500 text-xl w-[220px] h-[50px] text-center text-white rounded-md font-medium">
                <Link
                    href={{
                    pathname: '/transaction/purchase',
                    query: {
                        productId: params.productId,
                        amount: count,
                        promoCode: promocode
                    }
                }}>
                    <div className="flex flex-col justify-center w-full h-full"> Beli </div>
                </Link>
            </div>
        </div>
    );
}