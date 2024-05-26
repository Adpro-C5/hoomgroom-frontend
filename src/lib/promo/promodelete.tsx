export async function promodelete (id: string) {
  const param: String = id;
  const res = await fetch(`http://localhost:8080/promo_code/delete/${param}`, {
    method: 'DELETE',
    cache: 'no-store',
  });
  if (res.ok) {
    alert("Successfully deleted promo code")
    return
  } else {
    alert("Failed to delete promo code")
    return
  }
}
