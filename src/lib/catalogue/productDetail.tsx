import { toast } from "react-toastify";

const getDetail = async (ProductId: String) => {
    const res = await fetch (
        'http://localhost:8080/product/detail/${ProductId}', 
        {cache: 'no-store'}
    );
    if (!res.ok) {
      toast.warning("Failed to retrieve Promo Codes")
      return null;
    }
}
export default getDetail;