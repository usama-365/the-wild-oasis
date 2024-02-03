import TableOperations from "../../ui/TableOperations.tsx";
import Filter, { FilterValueLabels } from "../../ui/Filter.tsx";
import { DiscountValue } from "./CabinTable.tsx";

const values: FilterValueLabels<DiscountValue>[] = [
  { value: "all", label: "All" },
  { value: "with-discount", label: "With discount" },
  { value: "no-discount", label: "No discount" },
];

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField={"discount"} filterValueLabels={values} />
    </TableOperations>
  );
}
