import { HowWeWork } from "@/components/services/how-we-work";
import { SectorsServed } from "@/components/services/sectors-served";
import { ServicesFinalCTA } from "@/components/services/services-final-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";
import { WhyBuzzly } from "@/components/services/why-buzzly";

export default function ServicesPage() {
  return (
    <>
    
  <ServicesHero/>
  <ServicesList/>
  <SectorsServed/>
<HowWeWork/>
<WhyBuzzly/>
<ServicesFinalCTA/>

  </>
  );
}