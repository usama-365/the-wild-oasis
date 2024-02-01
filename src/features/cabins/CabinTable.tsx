import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import useCabins from "./useCabins.ts";
import Table from "../../ui/Table.tsx";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins?.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}
