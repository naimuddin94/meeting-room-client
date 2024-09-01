import room1 from "@/assets/images/feature-one.jpg";
import room2 from "@/assets/images/feature-two.jpg";
import room3 from "@/assets/images/feature-three.jpg";
import room4 from "@/assets/images/feature-four.jpg";

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
