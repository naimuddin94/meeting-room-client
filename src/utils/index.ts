import asus from "@/assets/brand/asus.png";
import corsair from "@/assets/brand/CORSAIRLogo2020_stack_K.avif";
import dasKeyboard from "@/assets/brand/icon.png";
import logitech from "@/assets/brand/logitexh.webp";
import prestigio from "@/assets/brand/prestigio.avif";
import razer from "@/assets/brand/razer.webp";
import steelseries from "@/assets/brand/steelseries.png";
import varmilo from "@/assets/brand/Varmilo.png";

export const featureCardData = [
  {
    image: corsair,
    name: "Corsair",
  },
  {
    image: logitech,
    name: "Logitech",
  },
  {
    image: razer,
    name: "Razer",
  },
  {
    image: steelseries,
    name: "Steelseries",
  },
  {
    image: dasKeyboard,
    name: "Das Keyboard",
  },
  {
    image: varmilo,
    name: "Varmilo",
  },
  {
    image: prestigio,
    name: "Prestigio",
  },
  {
    image: asus,
    name: "Asus",
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
