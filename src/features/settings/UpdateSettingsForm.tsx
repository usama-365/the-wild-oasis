import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings.ts";
import { SettingsInsertType } from "../../services/supabase.ts";
import Spinner from "../../ui/Spinner.tsx";

const DEFAULT_SETTINGS_VALUES: SettingsInsertType = {
  min_booking_length: 0,
  breakfast_price: 0,
  max_guests_per_booking: 0,
  max_booking_length: 0,
};

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings || DEFAULT_SETTINGS_VALUES;

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          defaultValue={`${
            min_booking_length
              ? min_booking_length
              : DEFAULT_SETTINGS_VALUES.min_booking_length
          }`}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={`${
            max_booking_length
              ? max_booking_length
              : DEFAULT_SETTINGS_VALUES.max_booking_length
          }`}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          defaultValue={`${
            max_guests_per_booking
              ? max_guests_per_booking
              : DEFAULT_SETTINGS_VALUES.max_guests_per_booking
          }`}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          defaultValue={`${
            breakfast_price
              ? breakfast_price
              : DEFAULT_SETTINGS_VALUES.breakfast_price
          }`}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
