import Button from "../../ui/Button.tsx";
import CreateOrEditCabinForm from "./CreateOrEditCabinForm.tsx";
import Modal from "../../ui/Modal.tsx";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"add-cabin"}>
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window name={"add-cabin"}>
          <CreateOrEditCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
