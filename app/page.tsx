import Image from "next/image";
import Hero from "@/components/Hero";
import ListApartmentForm from "@/components/ListApartmentForm";

export default function Home() {
  return (
    <div>
      <Hero/>
     <ListApartmentForm/>
    </div>
  );
}
