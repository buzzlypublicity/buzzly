import { FAQs } from '@/components/home/faqs';
import { FinalCTA } from '@/components/home/final-cta';
import { Hero } from '@/components/home/hero';
import { Portfolio } from '@/components/home/portfolio';
import { Problems } from '@/components/home/problems';
import { Process } from '@/components/home/process';
import { Services } from '@/components/home/services';
import { WhyChoose } from '@/components/home/why-choose';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
    <Hero/>
    <Services/>
    <Problems/>
    <Portfolio/>
    <WhyChoose/>
    <Process/>
    <FAQs/>
    <FinalCTA/>
    </>
  );
}