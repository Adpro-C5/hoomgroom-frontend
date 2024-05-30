// async function getCatalogue(){
//     const res = await fetch("http://34.87.141.138/product/details/{}");
//     if (!res.ok) {
//       return null;
//     }
//     return await res.json();
//   }

import getDetail from '@/lib/catalogue/productDetail';

export default async function ProductDetailPage({params} : any) {
    const {ProductId} = params
    const detail = await getDetail(ProductId);

    return (
        <p>Hello World</p>
    );
}