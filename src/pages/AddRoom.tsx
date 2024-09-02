import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelect from "@/components/ui/MultiSelect";
import { toast } from "@/components/ui/use-toast";
import { useFetchSingleProductQuery } from "@/redux/api/productApi";
import { useAddRoomMutation, useUpdateRoomMutation } from "@/redux/api/roomApi";
import { amenitiesOptions } from "@/utils";
import { jsonToFormData } from "@/utils/formDataBuilder";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function AddRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const { data: productData, isLoading } = useFetchSingleProductQuery(id, {
    skip: !id,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [addRoomFn] = useAddRoomMutation();
  const [updateRoomFn] = useUpdateRoomMutation();

  // Discard form
  const handleDiscard = () => {
    setPreviewUrl(null);
    setSelectedImage(null);
    setAmenities([]);
    reset();
  };

  useEffect(() => {
    if (id) {
      setPreviewUrl(productData?.data?.image);
    } else {
      handleDiscard();
    }
  }, [id]);

  // Save a new product to the database
  const onSubmit = async (data: FieldValues) => {
    const { roomNo, floorNo, pricePerSlot, capacity, name } = data;
    const newRoomData: Record<string, unknown> = {
      roomNo: Number(roomNo),
      floorNo: Number(floorNo),
      pricePerSlot: Number(pricePerSlot),
      capacity: Number(capacity),
      name,
      amenities,
    };

    if (selectedImage) {
      newRoomData.image = selectedImage;
    }

    if (!id) {
      if (!selectedImage) {
        return toast({
          title: "Product image is required",
          duration: 2000,
        });
      }
    }

    let roomFormData: Record<string, unknown> | FormData = newRoomData;

    if (selectedImage) {
      roomFormData = jsonToFormData(newRoomData);
    }

    if (id) {
      await updateRoomFn({ id, updateProduct: roomFormData })
        .unwrap()
        .then((res) => {
          if (res?.statusCode === 200) {
            toast({
              title: res?.message,
              duration: 2000,
            });
            reset();
            setPreviewUrl(null);
            setSelectedImage(null);
            navigate(-1);
          }
        })
        .catch((error) => {
          toast({
            title: error?.data?.message,
            duration: 2000,
          });
        });
    } else {
      await addRoomFn(roomFormData)
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.statusCode === 201) {
            toast({
              title: res?.message,
              duration: 2000,
            });
            reset();
            setPreviewUrl(null);
            setSelectedImage(null);
            setAmenities([]);
          }
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: error?.data?.message,
            duration: 2000,
          });
        });
    }
  };

  if (id && isLoading) {
    return <Loader size={300} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {id ? "Update Room" : "Add New Room"}
        </h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Room Image</CardTitle>
              <CardDescription>Upload an image for your room.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="aspect-square bg-muted dark:bg-muted/30 rounded-md overflow-hidden">
                  {previewUrl && (
                    <img
                      src={previewUrl as string}
                      alt="Product Image"
                      width={300}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <Button
                  variant="outline"
                  type="button"
                  className="justify-center"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>
                Fill in the details for your new room.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    id="name"
                    type="text"
                    placeholder="Enter room name"
                    defaultValue={id ? productData?.data?.name : ""}
                  />
                  {errors.name && (
                    <span className="text-theme text-xs">
                      {errors?.name?.message as string}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brand">Amenities</Label>
                  <MultiSelect
                    options={amenitiesOptions}
                    onValueChange={setAmenities}
                    defaultValue={amenities}
                  />
                  {errors.name && (
                    <span className="text-theme text-xs">
                      {errors.name.message as string}
                    </span>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="material">Capacity</Label>
                    <Input
                      {...register("capacity", {
                        required: "Capacity is required",
                      })}
                      type="number"
                      id="material"
                      placeholder="Enter room capacity"
                      defaultValue={id ? productData?.data?.material : ""}
                    />
                    {errors.price && (
                      <span className="text-theme text-xs">
                        {errors?.capacity?.message as string}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="weight">Price Per-slot</Label>
                    <Input
                      {...register("pricePerSlot", {
                        required: "Weight is required",
                      })}
                      type="number"
                      id="weight"
                      placeholder="Enter price per slot"
                      defaultValue={id ? productData?.data?.weight : ""}
                    />
                    {errors.stock && (
                      <span className="text-theme text-xs">
                        {errors?.pricePerSlot?.message as string}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Room Number</Label>
                    <Input
                      {...register("roomNo", {
                        required: "Room number is required",
                      })}
                      type="number"
                      id="price"
                      placeholder="Enter room number"
                      defaultValue={id ? productData?.data?.price : ""}
                    />
                    {errors.price && (
                      <span className="text-theme text-xs">
                        {errors?.roomNo?.message as string}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Floor Number</Label>
                    <Input
                      {...register("floorNo", {
                        required: "Floor number is required",
                      })}
                      type="number"
                      id="stock"
                      placeholder="Enter floor number"
                      defaultValue={id ? productData?.data?.stock : ""}
                    />
                    {errors.stock && (
                      <span className="text-theme text-xs">
                        {errors?.floorNo?.message as string}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        {!id && (
          <Button type="reset" variant="outline" onClick={handleDiscard}>
            Discard
          </Button>
        )}
        <Button type="submit" className="min-w-28">
          {isSubmitting ? (
            <Loader size={28} />
          ) : id ? (
            "Update Room"
          ) : (
            "Save Room"
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddRoom;
