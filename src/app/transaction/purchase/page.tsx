'use client'
import { useSearchParams } from 'next/navigation'

import React, {useEffect, useState} from "react";

interface Transaction {
    transactionId: string;
    userId: number;
    productId: string;
    productAmount: number;
    promoCode: string;
    paymentDate: string;
    totalPrice: number;
}

export default function PurchasePage({params}:any){
    let [transaction, setTransaction] = useState<Transaction | undefined>(undefined);
    let [error, setError] = useState<Error | null>(null);

    const searchParams = useSearchParams()

    useEffect(() => {
        fetch("http://34.143.253.15/profile", {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.body}`);
                }
                return response.json()
            })
            .then(data => {
                const promoCodeParam = searchParams.get('promoCode');
                const promoCode = promoCodeParam === "" ? null : promoCodeParam;
                const requestBody = {
                    userId: data.id,
                    productId: searchParams.get('productId'),
                    productAmount: searchParams.get('amount'),
                    promoCode: promoCode
                };

                fetch(`http://34.101.211.204/transaction/create`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`${response.body}`);
                        }

                        return response.json()
                    })
                    .then(data => {
                        setTransaction(data)
                    })
            })
            .catch(error => {
                setError(error);
            })
    }, []);

    if(error != null){
        return <div>Gagal melakukan transaksi: {error.message}</div>;
    }

    if (!transaction) {
        return (
            <div>
                <h1>Sedang memproses transaksi...</h1>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-blue-900 py-5">Transaksi Berhasil!</h1>
            <div className="space-y-5 my-6 px-5 py-5 bg-blue-900 text-white rounded-md text-sm font-medium">
                <h1>ID : {transaction.transactionId}</h1>
                <p>Product ID: {transaction.productId}</p>
                <p>Total Harga: {transaction.totalPrice}</p>
            </div>
            <h1>Silahkan kunjungi halaman daftar transaksi untuk <br></br> melihat detail transaksi lebih lanjut</h1>
        </div>
    );
}