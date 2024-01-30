import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";
import FormRow, { StyledFormRow } from "../../ui/FormRow.tsx";
import { CabinInsertType } from "../../services/supabase.ts";

type CabinFormData = CabinInsertType & { image: FileList };

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
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

  const {
    register,
    handleSubmit: handleSubmitReactHookForm,
    reset,
    formState: { errors },
  } = useForm<CabinFormData>();

  const handleSubmit = handleSubmitReactHookForm((data) => {
    mutate({ ...data, image: data.image[0] });
  });

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
              const price = formValues.regular_price;

              if (!price) return "Please provide a regular price first";
              if (!discount) return "Please provide a discount";
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
            required: "This field is required.",
          })}
          accept="image/*"
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
