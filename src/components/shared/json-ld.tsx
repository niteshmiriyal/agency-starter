export type JsonLdProps = {
  data: object | object[];
};

/**
 * Renders one or more JSON-LD objects as a `<script type="application/ld+json">`
 * tag. Every angle bracket in the serialized data is unicode-escaped before
 * being injected, so a value containing a closing script tag can't break out
 * of the element — `JSON.stringify` alone does not guard against this.
 * Server Component; safe to render from any page or the root layout.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
