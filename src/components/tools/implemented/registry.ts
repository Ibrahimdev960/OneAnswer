import type { ComponentType } from 'react';
import {
  type ImplementedToolSlug,
  IMPLEMENTED_TOOL_SLUGS,
  isImplementedToolSlug,
} from './implemented-slugs';
import AgeCalculator from './age-calculator';
import BmiCalculator from './bmi-calculator';
import CoinFlip from './coin-flip';
import CurrencyConverter from './currency-converter';
import DaysUntil from './days-until';
import IpAddress from './ip-address';
import PasswordGenerator from './password-generator';
import PercentageCalculator from './percentage-calculator';
import TemperatureConverter from './temperature-converter';
import TimezoneConverter from './timezone-converter';
import WeightConverter from './weight-converter';
import WordCounter from './word-counter';

export const toolViewBySlug: Record<ImplementedToolSlug, ComponentType> = {
  'age-calculator': AgeCalculator,
  'bmi-calculator': BmiCalculator,
  'coin-flip': CoinFlip,
  'currency-converter': CurrencyConverter,
  'days-until': DaysUntil,
  'ip-address': IpAddress,
  'password-generator': PasswordGenerator,
  'percentage-calculator': PercentageCalculator,
  'temperature-converter': TemperatureConverter,
  'timezone-converter': TimezoneConverter,
  'weight-converter': WeightConverter,
  'word-counter': WordCounter,
};

export { IMPLEMENTED_TOOL_SLUGS, isImplementedToolSlug };
