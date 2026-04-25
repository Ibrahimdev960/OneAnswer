/**
 * Renders a single JSON-LD document (Schema.org) for Google rich results.
 * Use only `application/ld+json` — not RDFa or Microdata.
 */
type JsonLd = Record<string, unknown>;

export interface SchemaMarkupProps {
  /** Any serializable JSON-LD object (must include @context and @type). */
  schema: JsonLd;
  /** Optional id for debugging / anchors in DevTools. */
  id?: string;
}

export function SchemaMarkup({ schema, id }: SchemaMarkupProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
