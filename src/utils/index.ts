import room4 from "@/assets/images/feature-four.jpg";
import room1 from "@/assets/images/feature-one.jpg";
import room3 from "@/assets/images/feature-three.jpg";
import room2 from "@/assets/images/feature-two.jpg";

export const featureCardData = [
  {
    image: room1,
    name: "Top Rated",
  },
  {
    image: room2,
    name: "Tech Setups",
  },
  {
    image: room3,
    name: "Flexible Layouts",
  },
  {
    image: room4,
    name: "Elegant Design",
  },
];

export const cartStatus = [
  "processing",
  "cancel",
  "shipped",
  "delivered",
  "received",
] as const;

export function truncate(paragraph: string, wordLimit: number) {
  const words = paragraph.split(" ");

  if (words.length <= wordLimit) {
    return paragraph;
  }

  const truncatedWords = words.slice(0, wordLimit).join(" ") + "...";

  return truncatedWords;
}

export function formatDateString(dateString: string) {
  const [year, month, day] = dateString.split("-"); // Remove leading zero from month
  const formattedDay = day.replace(/^0+/, ""); // Remove leading zero from day
  return `${year}-${month}-${formattedDay}`;
}

export const amenitiesOptions = [
  { label: "Wifi", value: "Wifi" },
  { label: "Whiteboards", value: "Whiteboards" },
  { label: "Catering Services", value: "Catering Services" },
  { label: "Tech Support", value: "Tech Support" },
  { label: "Reception Services", value: "Reception Services" },
  { label: "24/7 Access", value: "24/7 Access" },
  { label: "Parking", value: "Parking" },
  { label: "Interactive Touchscreens", value: "Interactive Touchscreens" },
  { label: "Telephony Services", value: "Telephony Services" },
  { label: "Smart Room Controls", value: "Smart Room Controls" },
  { label: "Soundproofing", value: "Soundproofing" },
  { label: "High-Speed Internet", value: "High-Speed Internet" },
  { label: "Video Conferencing", value: "Video Conferencing" },
  { label: "Natural Lighting", value: "Natural Lighting" },
  { label: "Customizable Room Layouts", value: "Customizable Room Layouts" },
  { label: "Refreshment Stations", value: "Refreshment Stations" },
  { label: "Presentation Tools", value: "Presentation Tools" },
  { label: "Room Scheduling Display", value: "Room Scheduling Display" },
  { label: "Storage Solutions", value: "Storage Solutions" },
  { label: "Power Outlets", value: "Power Outlets" },
  { label: "USB Charging Ports", value: "USB Charging Ports" },
  { label: "Guest Wi-Fi", value: "Guest Wi-Fi" },
  { label: "Surveillance & Security", value: "Surveillance & Security" },
  { label: "Emergency Equipment", value: "Emergency Equipment" },
  { label: "Mobile App Integration", value: "Mobile App Integration" },
  { label: "Room Customization Options", value: "Room Customization Options" },
  {
    label: "Personalized Welcome Signage",
    value: "Personalized Welcome Signage",
  },
  { label: "VR Setup", value: "VR Setup" },
  {
    label: "Health & Wellness Facilities",
    value: "Health & Wellness Facilities",
  },
  {
    label: "Green & Sustainable Options",
    value: "Green & Sustainable Options",
  },
  { label: "On-Site Support Staff", value: "On-Site Support Staff" },
  { label: "Flexible Booking", value: "Flexible Booking" },
  { label: "Lounge Area", value: "Lounge Area" },
];
