import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Section } from '@/components/shared/section';
import { FadeIn } from '@/components/shared/fade-in';

const features = [
  {
    icon: Zap,
    title: 'Modern stack',
    description:
      'Next.js 15, TypeScript, and Tailwind CSS wired together with sensible, opinionated defaults.',
  },
  {
    icon: ShieldCheck,
    title: 'Built to scale',
    description:
      'A clean, predictable folder structure so the codebase stays maintainable as the project grows.',
  },
  {
    icon: Rocket,
    title: 'Ready to ship',
    description:
      'Accessible, performant, and SEO-friendly out of the box — just add content.',
  },
];

const included = [
  'Next.js 15 (App Router)',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'Lucide Icons',
  'Framer Motion',
  'ESLint',
  'Prettier',
];

export default function Home() {
  return (
    <>
      <Section className="pt-20 sm:pt-32">
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="border-border bg-muted/50 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
            <Sparkles className="size-3.5" />
            Production-ready starter
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Build premium web experiences, faster.
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg text-balance">
            A reusable foundation for every new project — modern tooling,
            accessible components, and a clean architecture that scales with
            you.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className={buttonVariants({ size: 'lg' })}>
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#features"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              See features
            </Link>
          </div>
        </FadeIn>
      </Section>

      <Section id="features">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why teams choose this starter
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every piece is chosen for long-term maintainability, not just a fast
            demo.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1}>
              <div className="border-border bg-card h-full rounded-2xl border p-6">
                <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section id="about" className="bg-muted/30">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What&apos;s included
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Everything below is installed, configured, and ready to build on.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {included.map((item) => (
            <div
              key={item}
              className="border-border bg-background flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium"
            >
              <CheckCircle2 className="text-primary size-4 shrink-0" />
              {item}
            </div>
          ))}
        </FadeIn>
      </Section>

      <Section id="contact">
        <FadeIn className="border-border bg-card mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border p-10 text-center sm:p-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to start your next project?
          </h2>
          <p className="text-muted-foreground max-w-md text-lg">
            This page confirms the stack is wired up correctly — swap in real
            content whenever you&apos;re ready.
          </p>
          <Button size="lg">
            Get in touch
            <ArrowRight className="size-4" />
          </Button>
        </FadeIn>
      </Section>
    </>
  );
}
