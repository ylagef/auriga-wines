async function WineDetail({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div>WineDetail {params.id}</div>;
}

export default WineDetail;
