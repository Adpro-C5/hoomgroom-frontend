export async function productdelete  (id: string) {
  const param: String = id;
  const res = await fetch(`http://localhost:8080/product/delete/${param}`, {
    method: 'DELETE',
    cache: 'no-store',
  });
  if (res.ok) {
    alert("Successfully deleted product")
    return
  } else {
    alert("Failed to delete product")
    return
  }
}
