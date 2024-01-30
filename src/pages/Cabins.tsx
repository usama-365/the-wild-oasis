import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.tsx";
import { useState } from "react";
import Button from "../ui/Button.tsx";
import CreateOrEditCabinForm from "../features/cabins/CreateOrEditCabinForm.tsx";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((showForm) => !showForm)}>
          Add new cabin
        </Button>
        {showForm && <CreateOrEditCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
