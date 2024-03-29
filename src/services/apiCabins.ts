import supabase, { CabinInsertType, supabaseUrl } from "./supabase.ts";

const CABIN_BUCKET_NAME = "cabin-images";
const CABINS_TABLE_NAME = "cabins";

type CabinFormInsertData = Omit<CabinInsertType, "image"> & {
  image: File | string | null;
};

export type CabinFormUpdateData = Omit<CabinInsertType, "image"> & {
  image: string | File | null;
};

export async function getAllCabinsFromSupabase() {
  const { data, error } = await supabase.from(CABINS_TABLE_NAME).select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
}

export async function getCabinFromSupabase(id: number) {
  const { data, error } = await supabase
    .from(CABINS_TABLE_NAME)
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error("Cabin could not be loaded");
  return data;
}

function getOrCreateCabinImageName(
  cabin: CabinFormInsertData | CabinFormUpdateData,
) {
  if (cabin.image === null) return "";
  else if (cabin.image instanceof File)
    return `${Math.random()}-${cabin.image.name}`.replace("/", "");
  else return cabin.image;
}

function createImagePath(imageName: string) {
  return `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
}

async function uploadImageToBucket(imageName: string, image: File) {
  const { error } = await supabase.storage
    .from(CABIN_BUCKET_NAME)
    .upload(imageName, image);

  if (error) throw new Error("Unable to upload image");
}

async function deleteImageFromBucket(imageName: string) {
  const { error } = await supabase.storage
    .from(CABIN_BUCKET_NAME)
    .remove([imageName]);

  if (error) throw new Error("Unable to delete previous image");
}

export async function createCabinOnSupabase(cabin: CabinFormInsertData) {
  let imageName: string, imagePath: string;

  // If a file is provided, create its path and upload to server
  if (cabin.image instanceof File) {
    imageName = getOrCreateCabinImageName(cabin);
    imagePath = createImagePath(imageName);
    await uploadImageToBucket(imageName, cabin.image);
  } // As a filepath is provided, extract image name from it
  else {
    imagePath = cabin.image || "";
    imageName = imagePath.split("/").pop() || "";
  }

  // Create the cabin
  const { data, error } = await supabase
    .from(CABINS_TABLE_NAME)
    .insert([{ ...cabin, image: imagePath }])
    .select();

  if (error) {
    // If image was uploaded, delete it
    if (cabin.image instanceof File) await deleteImageFromBucket(imageName);

    throw new Error("Cabin could not be created.");
  }

  return data;
}

export async function updateCabinOnSupabase(
  cabin: CabinFormUpdateData,
  id: number,
) {
  const imageName = getOrCreateCabinImageName(cabin);

  // If a new image is created, delete the previous image and upload the new one
  if (cabin.image instanceof File) {
    // Delete the previous image
    const previousCabin = await getCabinFromSupabase(id);
    const previousImage = previousCabin.image?.split("/")?.pop();
    if (previousImage) await deleteImageFromBucket(previousImage);

    // Create a unique image name and path
    await uploadImageToBucket(imageName, cabin.image);
  }

  // Whether to use the previous path or create a new
  const imagePath =
    typeof cabin.image === "string" ? cabin.image : createImagePath(imageName);

  // Update the cabin
  const { data, error } = await supabase
    .from(CABINS_TABLE_NAME)
    .update({ ...cabin, image: cabin.image ? imagePath : null })
    .eq("id", id)
    .select();

  if (error) throw new Error("Cabin could not be updated");
  return data;
}

export async function deleteCabinFromSupabase(id: number) {
  const { error } = await supabase
    .from(CABINS_TABLE_NAME)
    .delete()
    .eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}
