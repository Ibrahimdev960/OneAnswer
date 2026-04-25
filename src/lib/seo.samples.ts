/**
 * STEP 1 — Three sample tool metadata objects (for review, Storybook, or tests).
 * Live routes use the same `generateToolMetadata` from `app/(tools)/[slug]/page.tsx`.
 */
import { getToolBySlug } from '@/config/tools';
import { generateToolMetadata } from './seo';

const age = getToolBySlug('age-calculator');
const bmi = getToolBySlug('bmi-calculator');
const currency = getToolBySlug('currency-converter');

if (!age || !bmi || !currency) {
  throw new Error('seo.samples: expected age-calculator, bmi-calculator, currency-converter in TOOLS');
}

/** Sample 1 — Age Calculator */
export const sampleMetadataAgeCalculator = generateToolMetadata(age, 'age-calculator');

/** Sample 2 — BMI Calculator */
export const sampleMetadataBmiCalculator = generateToolMetadata(bmi, 'bmi-calculator');

/** Sample 3 — Currency Converter */
export const sampleMetadataCurrencyConverter = generateToolMetadata(currency, 'currency-converter');
