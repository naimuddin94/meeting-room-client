import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import NoDataFound from "@/components/shared/NoDataFound";
import PaginationComponent from "@/components/shared/PaginationComponent";
import RoomCard from "@/components/shared/RoomCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useFetchAllRoomsQuery } from "@/redux/api/roomApi";
import { IRoom } from "@/Types";
import { FilterIcon, FilterXIcon, ListOrderedIcon } from "lucide-react";
import { useState } from "react";

function Rooms() {
  const [limit, setLimit] = useState("8");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("stock");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchAllRoomsQuery({
    page,
    limit: Number(limit),
    sort,
    searchTerm,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSort = (sort: string) => {
    setSort(sort);
  };

  const handleClearFilter = () => {
    setSort("stock");
    setSearchTerm("");
  };

  if (isLoading) {
    return <Loader size={200} />;
  }

  return (
    <Container className="my-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 flex gap-4">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-5">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2">
                      <Checkbox value="Electronics" />
                      Electronics
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox value="Bags" />
                      Bags
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox value="Outdoor" />
                      Outdoor
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox value="Accessories" />
                      Accessories
                    </Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="price-range">Price Range</Label>
                  <div className="w-full" />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Slider
                    id="rating"
                    min={0}
                    max={5}
                    step={0.5}
                    //   value={[filters.rating]}
                    //   onValueChange={(value) =>
                    //     setFilters({ ...filters, rating: value })
                    //   }
                    className="w-full"
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListOrderedIcon className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onClick={() => handleSort("-createdAt")}
              >
                Latest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleSort("price")}>
                Price: Low to High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleSort("-price")}>
                Price: High to Low
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleSort("-rating")}>
                Rating: High to Low
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <FilterXIcon onClick={handleClearFilter} className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Select
            onValueChange={(value) => setLimit(value)}
            value={limit.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="32">32</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {data?.data?.meta?.total > 8 && (
        <div className="mb-4">
          <p className="text-muted-foreground w-fit">
            Total {data?.data?.meta?.total} products found
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.data?.result?.length > 0 ? (
          data?.data?.result?.map((room: IRoom) => (
            <RoomCard room={room} key={room._id} />
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
      {data?.data?.meta?.total > 8 && (
        <div className="flex justify-center mt-8">
          <PaginationComponent
            meta={data?.data?.meta}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Container>
  );
}

export default Rooms;
