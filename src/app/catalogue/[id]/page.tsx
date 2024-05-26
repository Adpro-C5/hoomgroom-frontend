async function getCatalogue(){
    const res = await fetch("http://34.87.141.138/product/details/{}");
    if (!res.ok) {
      return null;
    }
    return await res.json();
  }

export default function ProductDetailPage({ params } : { params: {ProductId: String}}) {
    const {ProductId} = params

    return (
        <p>Hello World</p>
    );
}