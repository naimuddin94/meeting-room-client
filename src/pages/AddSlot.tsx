import AlertModel from "@/components/shared/AlertModel";
import Loader from "@/components/shared/Loader";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useAddBrandMutation, useFetchBrandsQuery, useDeleteBrandMutation } from "@/redux/api/brandApi";
import { TBrand } from "@/Types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

const AddSlot = () => {
    const [page, setPage] = useState(1);

    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
      reset,
    } = useForm();

    const [addBrandFn] = useAddBrandMutation();
    const { data, isLoading } = useFetchBrandsQuery({
      param: { page, limit: 5, sort: "name" },
    });

    const onSubmit = async (data: FieldValues) => {
      await addBrandFn(data)
        .unwrap()
        .then((res) => {
          if (res?.statusCode === 201) {
            toast({
              title: res?.message,
              duration: 2000,
            });
            reset();
          }
        })
        .catch((error) => {
          toast({
            title: error?.data?.message,
            duration: 2000,
          });
        });
    };

    const handlePageChange = (page: number) => {
      setPage(page);
    };

    const [deleteBrandFn] = useDeleteBrandMutation();

    const handleBrandDelete = async (brandId: string) => {
      await deleteBrandFn(brandId)
        .unwrap()
        .then((res) => {
          if (res?.statusCode === 200) {
            toast({
              title: res?.message,
              duration: 2000,
            });
          }
        })
        .catch((error) => {
          toast({
            title: error?.data?.message,
            duration: 2000,
          });
        });
    };

    if (isLoading) {
      return <Loader size={200} />;
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      <div className="bg-background rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Slot</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <Label htmlFor="name">Brand Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter brand name"
              {...register("name")}
            />
          </div>
          <div>
            <Label htmlFor="origin">Brand Origin</Label>
            <Input
              id="origin"
              type="text"
              placeholder="Enter brand origin"
              {...register("origin")}
            />
          </div>
          <Button type="submit">
            {isSubmitting ? <Loader size={28} /> : "Add Brand"}
          </Button>
        </form>
      </div>
      <div className="bg-background rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Existing Brands</h2>
        <Table className="mb-8">
          <TableHeader>
            <TableRow>
              <TableHead>Brand Name</TableHead>
              <TableHead>Brand Origin</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.result?.map((brand: TBrand) => (
              <TableRow key={brand._id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.origin}</TableCell>
                <TableCell>
                  <AlertModel onConfirm={() => handleBrandDelete(brand._id)}>
                    <Trash2
                      size={20}
                      className="text-theme/90 cursor-pointer hover:text-theme"
                    />
                  </AlertModel>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationComponent
          meta={data?.data?.meta}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AddSlot;
