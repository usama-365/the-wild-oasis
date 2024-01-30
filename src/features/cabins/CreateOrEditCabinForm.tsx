import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CabinFormUpdateData,
  createCabin,
  updateCabin,
} from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import FormRow, { StyledFormRow } from "../../ui/FormRow.tsx";
import { CabinType } from "../../services/supabase.ts";

export type CabinFormData = Omit<CabinType, "image"> & {
  image: FileList | string | null;
};

type CreateOrEditCabinFormProps = {
  cabinToEdit?: CabinType;
};

function CreateOrEditCabinForm({ cabinToEdit }: CreateOrEditCabinFormProps) {
  const isForEditing = !!cabinToEdit;

  const queryClient = useQueryClient();

  const { mutate: create, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      void queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      let message = "Something went wrong in creating the cabin.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });

  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: CabinFormUpdateData; id: number }) =>
      updateCabin(cabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully updated!");
      void queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      let message = "Something went wrong in updating the cabin.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });

  const {
    register,
    handleSubmit: handleSubmitReactHookForm,
    reset,
    formState: { errors },
  } = useForm<CabinFormData>(
    isForEditing ? { defaultValues: cabinToEdit } : {},
  );

  const handleSubmit = handleSubmitReactHookForm((data) => {
    if (isForEditing)
      update({
        cabin: {
          ...data,
          image: data.image instanceof FileList ? data.image[0] : data.image,
        },
        id: cabinToEdit.id,
      });
    else create({ ...data, image: (data.image as FileList)[0] });
  });

  const isLoading = isUpdating || isCreating;

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow error={errors.name?.message} label={"Cabin name"}>
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors.max_capacity?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="max_capacity"
          {...register("max_capacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors.regular_price?.message} label={"Regular price"}>
        <Input
          disabled={isCreating}
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Regular price should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors.discount?.message} label={"Discount"}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (discount, formValues) => {
              const price = formValues.regular_price
                ? +formValues.regular_price
                : 0;
              discount = discount ? +discount : 0;

              return discount < price || "Discount should be less than price";
            },
          })}
        />
      </FormRow>

      <FormRow
        error={errors.description?.message}
        label={"Description for website"}
      >
        <Textarea
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors.image?.message}>
        <FileInput
          id="image"
          type="file"
          {...register("image", {
            required: isForEditing ? false : "This field is required.",
          })}
          accept="image/*"
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isForEditing ? "Update" : "Add"} cabin
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateOrEditCabinForm;
