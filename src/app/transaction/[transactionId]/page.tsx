'use client'

import React, {useEffect, useState} from "react";

export default function TransactionPage({params}:any){
    let [transaction, setTransaction] = useState({});
    let [error, setError] = useState(null);
    let [productName, setProductName] = useState("");

    useEffect(() => {
        fetch(`http://34.101.211.204/transaction/${params.transactionId}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (!response.ok) {
                    if(response.status == 403){
                        throw new Error(`${response.body}`);
                    }
                    else{
                        throw new Error(`${response.status}`);
                    }
                }
                return response.json()
            })
            .then(data => {
                setTransaction(data)

                fetch(`http://34.87.141.138/product/${data.productId}`, {
                    headers:{
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setProductName(data.productName)
                    })
            })
            .catch(error => {
                setError(error);
            })
    }, [params.transactionId]);

    if(error){
        return <div>{error.message}</div>;
    }

    return(
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-blue-900 py-5">Transaction Detail</h1>
            <h1>ID : {transaction.transactionId}</h1>
            <div className="space-y-5 my-6 px-5 py-5 bg-blue-900 text-white rounded-md text-sm font-medium">
                <p>Product: {productName} - {transaction.productId}</p>
                <p>Product amount: {transaction.productAmount}</p>
                <p>Promo code used in this
                    transaction: {transaction.promoCode ? transaction.promoCode : "No promo code"}</p>
                <p>Total Price: {transaction.totalPrice}</p>
            </div>
        </div>
    );
}