'use client'
import Link from "next/link";
import React, {useEffect, useState} from 'react'

interface Transaction {
    transactionId: string;
    userId: number;
    productId: string;
    productAmount: number;
    promoCode: string;
    paymentDate: string;
    totalPrice: number;
}

export default function TransactionListPage(){

    let [transactions, setTransactions] = useState<Transaction[] | undefined>(undefined)
    let [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        (async () => {
            console.log("Token: " + localStorage.getItem('token'))
            fetch("http://34.143.253.15/profile", {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (!response.ok) {
                        if(response.status == 401 || response.status == 400){
                            throw new Error(`Login untuk melihat daftar transaksi Anda`);
                        }
                        else{
                            throw new Error(`${response.status}`);
                        }
                    }
                    return response.json()
                })
                .then(data => {
                    console.log('Profile: ' + JSON.stringify(data))

                    // fetch the transactions
                    fetch(`http://34.101.211.204/transaction/user/${data.id}`, {
                        headers:{
                            'Content-Type': 'application.json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Transaction: ' + JSON.stringify(data))
                            setTransactions(data)
                        })
                })
                .catch(error => {
                    setError(error);
                })
        })();

        // const token = localStorage.getItem('token')
        // console.log(token)
    }, []);

    if(error){
        return <div>{error.message}</div>;
    }

    if(!transactions){
        return (
            <div>
                <h1>Memuat daftar transaksi...</h1>
            </div>
        );
    }

    if(transactions.length === 0){
        return <div>
            <h1>Anda belum membuat transaksi apapun</h1>
        </div>;
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl text-blue-900 py-5">Your Transactions</h1>
            <div className = "space-y-5 w-2/5">
                {transactions.map((transaction) =>
                    <div key={transaction.transactionId} className="bg-amber-500 w-full text-white rounded-md text-sm font-medium">
                        <Link href={`/transaction/${transaction.transactionId}`}>
                            <div className="px-3 py-3 space-y-2">
                                <p>Transaction ID: {transaction.transactionId}</p>
                                <p>Product ID: {transaction.productId}</p>
                                <p>Total Price: {transaction.totalPrice}</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}