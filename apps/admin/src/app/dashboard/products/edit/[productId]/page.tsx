export default function Page({ params }: { params: { productId: string } }) {
  return <div>My Post: {params.productId}</div>;
}
