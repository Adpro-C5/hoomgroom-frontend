import Link from "next/link";

async function getAllTransaction(){
    const res = await fetch("http://localhost:8080/transaction/all");
    return await res.json();
}

export default async function TransactionListPage(){
    const transactions = await getAllTransaction();
    console.log(transactions);

    return(
        <div>
            <h1>Transaction</h1>
            <div>
                {transactions?.map((transaction: any) => {
                    return <Transaction key={transaction.transactionId} transaction={transaction}/>;
                })}
            </div>
        </div>
    );
}

function Transaction({transaction}: any){
    const {transactionId, userId, productId, totalPrice} = transaction || {};

    return(
      <Link href = {`/transaction/${transactionId}`}>
        <div>
            <h2>Product ID: {productId}</h2>
            <h5>User ID: {userId}</h5>
            <p>Total Price: {totalPrice}</p>
        </div>
      </Link>
    );
}