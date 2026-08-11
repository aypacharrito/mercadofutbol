import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { policies } from "@/lib/policies";

type PolicySlug = keyof typeof policies;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];
  return policy ? { title: policy.title } : {};
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = policies[slug as PolicySlug];
  if (!policy) notFound();
  return <main className="policy-page"><p className="eyebrow">MERCADO FÚTBOL</p><h1>{policy.title}</h1><p className="policy-updated">Last updated: {policy.updated}</p>{policy.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</main>;
}
