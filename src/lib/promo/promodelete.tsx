import { toast } from "react-toastify";

export async function promodelete (id: string) {
  const param: String = id;
  const res = await fetch(`http://34.87.141.138/promo_code/delete/${param}`, {
    method: 'DELETE',
    cache: 'no-store',
  });
  if (res.ok) {
    toast.success("Successfully deleted promo code")
    return
  } else {
    toast.error("Failed to delete promo code")
    return
  }
}
