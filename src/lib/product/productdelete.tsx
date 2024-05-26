import { toast } from "react-toastify";

export async function productdelete  (id: string) {
  const param: String = id;
  const res = await fetch(`http://34.87.141.138/product/delete/${param}`, {
    method: 'DELETE',
    cache: 'no-store',
  });
  if (res.ok) {
    toast.success("Successfully deleted product")
    return
  } else {
    toast.error("Failed to delete product")
    return
  }
}
