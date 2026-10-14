import { FAQs } from '@/components/home/faqs';
import { Hero } from '@/components/home/hero';
import { Portfolio } from '@/components/home/portfolio';
import { Problems } from '@/components/home/problems';
import { Process } from '@/components/home/process';
import { Services } from '@/components/home/services';
import { WhyChoose } from '@/components/home/why-choose';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');

  return (
    <>
    <Hero/>
    <Services/>
    <Problems/>
    <Portfolio/>
    <WhyChoose/>
    <Process/>
    <FAQs/>
    </>
  );
}