/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/DatePiker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TimePiker from "@/components/ui/TimePiker";
import { toast } from "@/components/ui/use-toast";
import { useFetchAllRoomsQuery } from "@/redux/api/roomApi";
import { useCreateSlotMutation } from "@/redux/api/slotApi";
import { useState } from "react";

const AddSlot = () => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: roomData, isLoading } = useFetchAllRoomsQuery({});

  const roomOptions = roomData?.data?.result?.map((room) => ({
    label: `${room.name} - ${room.roomNo}`,
    value: room._id,
  }));

  const [createSlotFn] = useCreateSlotMutation();

  const onSubmit = async () => {
    setIsSubmitting(true);
    const slotData = {room, date, startTime, endTime };
    try {
      const res = await createSlotFn(slotData).unwrap();
      if (res?.statusCode === 201) {
        toast({ title: res?.message });
      }
    } catch (error: any) {
      toast({ title: error?.data?.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader size={200} />;
  }

  return (
    <Container>
      <div className="grid gap-6 px-4 py-8 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight text-center">
            Create New Slots
          </h1>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle>Create Slots</CardTitle>
                <CardDescription>
                  Fill in the details for your new slots.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="material">Room</Label>
                      <Select value={room} onValueChange={setRoom}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {roomOptions?.map((item) => (
                              <SelectItem value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="weight">Date</Label>
                      <DatePicker date={date} setDate={setDate} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Start Time</Label>
                      <TimePiker time={startTime} setTime={setStartTime} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">End Time</Label>
                      <TimePiker time={endTime} setTime={setEndTime} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-end mt-5">
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    variant="outline"
                    className="min-w-28"
                  >
                    {isSubmitting ? <Loader size={28} /> : "Create Slots"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddSlot;
