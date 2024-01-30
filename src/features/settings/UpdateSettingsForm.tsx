import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings.ts";
import { SettingsInsertType } from "../../services/supabase.ts";
import Spinner from "../../ui/Spinner.tsx";
import useUpdateSetting from "./useUpdateSetting.ts";
import type { FocusEvent } from "react";

const DEFAULT_SETTINGS_VALUES: SettingsInsertType = {
  min_booking_length: 0,
  breakfast_price: 0,
  max_guests_per_booking: 0,
  max_booking_length: 0,
};

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings || DEFAULT_SETTINGS_VALUES;

  function handleEvent(
    event: FocusEvent<HTMLInputElement>,
    name: keyof typeof DEFAULT_SETTINGS_VALUES,
  ) {
    const { value } = event.target;
    updateSetting({ [name]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          onBlur={(event) => handleEvent(event, "min_booking_length")}
          type="number"
          disabled={isUpdating}
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
          onBlur={(event) => handleEvent(event, "max_booking_length")}
          type="number"
          disabled={isUpdating}
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
          onBlur={(event) => handleEvent(event, "max_guests_per_booking")}
          type="number"
          disabled={isUpdating}
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
          disabled={isUpdating}
          onBlur={(event) => handleEvent(event, "breakfast_price")}
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
