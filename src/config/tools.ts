export type ToolCategory =
  | 'age-date'
  | 'time'
  | 'health'
  | 'conversion'
  | 'live'
  | 'random'
  | 'math';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  emoji: string;
  popular?: boolean;
}

export const CATEGORIES: Record<ToolCategory, { label: string; emoji: string }> = {
  'age-date': { label: 'Age & Date', emoji: '📅' },
  'time': { label: 'Time & Clock', emoji: '🕐' },
  'health': { label: 'Health & Body', emoji: '💪' },
  'conversion': { label: 'Converters', emoji: '🔄' },
  'live': { label: 'Live Tools', emoji: '📡' },
  'random': { label: 'Random Generators', emoji: '🎲' },
  'math': { label: 'Math & Numbers', emoji: '🔢' },
};

export const TOOLS: Tool[] = [
  // Age & Date
  {
    slug: 'age-calculator',
    title: 'Age Calculator — How Old Am I?',
    description: 'Calculate your exact age in years, months, days, hours, and minutes from your date of birth.',
    category: 'age-date',
    keywords: ['age calculator', 'how old am i', 'date of birth calculator', 'age in days'],
    emoji: '🎂',
    popular: true,
  },
  {
    slug: 'days-until',
    title: 'Days Until — Countdown to Any Date',
    description: 'Find out exactly how many days, hours, and minutes until any date or holiday.',
    category: 'age-date',
    keywords: ['days until', 'countdown', 'how many days until christmas', 'days until date'],
    emoji: '⏳',
    popular: true,
  },
  {
    slug: 'day-of-week',
    title: 'What Day of the Week Was I Born?',
    description: 'Find out what day of the week any date fell on — past, present, or future.',
    category: 'age-date',
    keywords: ['what day was I born', 'day of week calculator', 'day finder'],
    emoji: '📆',
  },
  // Time
  {
    slug: 'timezone-converter',
    title: 'Timezone Converter — Convert Time Between Cities',
    description: 'Convert time between any two timezones or cities instantly. Perfect for scheduling international meetings.',
    category: 'time',
    keywords: ['timezone converter', 'time zone converter', 'convert time zones', 'world time'],
    emoji: '🌍',
    popular: true,
  },
  {
    slug: 'world-clock',
    title: 'World Clock — Current Time in Any City',
    description: 'See the current local time in any city around the world, updated live every second.',
    category: 'time',
    keywords: ['world clock', 'current time', 'time in new york', 'time in london'],
    emoji: '🕐',
  },
  // Health
  {
    slug: 'bmi-calculator',
    title: 'BMI Calculator — Body Mass Index',
    description: 'Calculate your Body Mass Index (BMI) instantly. Enter your height and weight to find out your BMI category.',
    category: 'health',
    keywords: ['bmi calculator', 'body mass index', 'am I overweight', 'healthy weight'],
    emoji: '⚖️',
    popular: true,
  },
  {
    slug: 'calorie-calculator',
    title: 'Calorie Burn Calculator — Walking & Running',
    description: 'Calculate how many calories you burn walking or running based on your weight and distance.',
    category: 'health',
    keywords: ['calorie calculator', 'calories burned walking', 'calories burned running'],
    emoji: '🔥',
  },
  {
    slug: 'sleep-calculator',
    title: 'Sleep Calculator — Best Time to Wake Up',
    description: 'Find the best time to wake up or go to sleep based on sleep cycles to feel fully rested.',
    category: 'health',
    keywords: ['sleep calculator', 'when should I wake up', 'sleep cycle calculator'],
    emoji: '😴',
  },
  // Conversion
  {
    slug: 'currency-converter',
    title: 'Currency Converter — Live Exchange Rates',
    description: 'Convert between 150+ currencies with live exchange rates updated every hour.',
    category: 'conversion',
    keywords: ['currency converter', 'exchange rate', 'usd to eur', 'convert currency'],
    emoji: '💱',
    popular: true,
  },
  {
    slug: 'weight-converter',
    title: 'Weight Converter — kg, lbs, stone, oz',
    description: 'Convert weight between kilograms, pounds, stone, ounces, and grams instantly.',
    category: 'conversion',
    keywords: ['weight converter', 'kg to lbs', 'pounds to kilograms', 'stone to kg'],
    emoji: '⚖️',
  },
  {
    slug: 'temperature-converter',
    title: 'Temperature Converter — Celsius, Fahrenheit, Kelvin',
    description: 'Convert temperature between Celsius, Fahrenheit, and Kelvin instantly.',
    category: 'conversion',
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius'],
    emoji: '🌡️',
  },
  {
    slug: 'length-converter',
    title: 'Length Converter — cm, inches, feet, meters',
    description: 'Convert length and distance between metric and imperial units instantly.',
    category: 'conversion',
    keywords: ['length converter', 'cm to inches', 'feet to meters', 'distance converter'],
    emoji: '📏',
  },
  // Live Tools
  {
    slug: 'ip-address',
    title: 'What Is My IP Address?',
    description: 'Find your public IP address, location, ISP, and network information instantly.',
    category: 'live',
    keywords: ['what is my ip address', 'my ip', 'find my ip', 'ip lookup'],
    emoji: '📡',
    popular: true,
  },
  {
    slug: 'internet-speed',
    title: 'Internet Speed Test',
    description: 'Test your internet download and upload speed directly in your browser.',
    category: 'live',
    keywords: ['internet speed test', 'speed test', 'check internet speed', 'wifi speed'],
    emoji: '⚡',
  },
  // Random
  {
    slug: 'coin-flip',
    title: 'Coin Flip — Flip a Virtual Coin',
    description: 'Flip a virtual coin online. Get heads or tails instantly with a true random result.',
    category: 'random',
    keywords: ['coin flip', 'flip a coin', 'heads or tails', 'virtual coin'],
    emoji: '🪙',
    popular: true,
  },
  {
    slug: 'dice-roller',
    title: 'Dice Roller — Roll Any Dice Online',
    description: 'Roll any number of dice (D4, D6, D8, D10, D12, D20) online instantly.',
    category: 'random',
    keywords: ['dice roller', 'roll a dice', 'random dice', 'd20 roller'],
    emoji: '🎲',
  },
  {
    slug: 'random-number',
    title: 'Random Number Generator',
    description: 'Generate random numbers between any range. Perfect for raffles, games, and decisions.',
    category: 'random',
    keywords: ['random number generator', 'random number', 'generate random number'],
    emoji: '🔢',
  },
  {
    slug: 'password-generator',
    title: 'Password Generator — Strong Random Passwords',
    description: 'Generate strong, secure, random passwords with custom length and character options.',
    category: 'random',
    keywords: ['password generator', 'strong password', 'random password', 'secure password'],
    emoji: '🔐',
    popular: true,
  },
  // Math
  {
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages instantly. Find what percent of a number is, percentage change, and more.',
    category: 'math',
    keywords: ['percentage calculator', 'percent calculator', 'how to calculate percentage'],
    emoji: '📊',
    popular: true,
  },
  {
    slug: 'word-counter',
    title: 'Word Counter — Count Words & Characters',
    description: 'Count words, characters, sentences, and paragraphs in any text instantly.',
    category: 'math',
    keywords: ['word counter', 'character counter', 'word count', 'count words'],
    emoji: '📝',
    popular: true,
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string, category: ToolCategory, limit = 4): Tool[] {
  return TOOLS.filter((t) => t.slug !== slug && t.category === category).slice(0, limit);
}

export function getPopularTools(): Tool[] {
  return TOOLS.filter((t) => t.popular);
}
