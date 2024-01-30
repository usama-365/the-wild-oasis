import supabase, { CabinInsertType, supabaseUrl } from "./supabase.ts";

export async function getAllCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) throw new Error("Cabins could not be loaded");
  return data;
}

type CabinFormProcessedData = CabinInsertType & { image: File };

export async function createCabin(cabin: CabinFormProcessedData) {
  // Create a unique image name and path
  const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  // Error handling
  if (storageError)
    throw new Error("Unable to upload cabin image. Cabin not created.");

  // Create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])
    .select();

  // Error handling
  if (error) throw new Error("Cabin could not be created.");

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}
