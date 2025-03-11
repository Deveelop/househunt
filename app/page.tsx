import Image from "next/image";
import Hero from "@/components/Hero";

import AvailableProperties from "@/components/AvailableProperties";

export default function Home() {
  return (
    <div>
      <Hero/>
    
     <AvailableProperties/>
    </div>
  );
}
