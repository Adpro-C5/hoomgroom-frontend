async function getTransaction(transactionId: string){
    const res = await fetch(`http://localhost:8080/transaction/${transactionId}`);
    return await res.json();
}

export default async function TransactionPage({params}: any){
    const transaction = await getTransaction(params.transactionId);
    console.log(transaction);

    return(
        <div>
            <h1>Transaction</h1>
            <div>
                <p>Transaction ID: {transaction.transactionId}</p>
                <p>Product ID: {transaction.productId}</p>
                <p>Total Price: {transaction.totalPrice}</p>
            </div>
        </div>
    );
}