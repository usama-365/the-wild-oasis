import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import useCabins from "./useCabins.ts";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";
import { useSearchParams } from "react-router-dom";
import { CabinType } from "../../services/supabase.ts";

export type DiscountValue = "all" | "no-discount" | "with-discount";

export default function CabinTable() {
  const { isLoading, cabins = [] } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = (searchParams.get("discount") as DiscountValue) || "all";

  let filteredCabins: CabinType[] = cabins;
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => (cabin.discount || 0) > 0);
  else if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => (cabin.discount || 0) === 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          items={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
