// Conversion utility functions

// Length conversions
export const lengthConversions = {
  // Metric to Imperial
  meterToFeet: (meter: number): number => meter * 3.28084,
  meterToInch: (meter: number): number => meter * 39.3701,
  centimeterToInch: (cm: number): number => cm * 0.393701,
  kilometerToMile: (km: number): number => km * 0.621371,
  
  // Imperial to Metric
  feetToMeter: (feet: number): number => feet * 0.3048,
  inchToMeter: (inch: number): number => inch * 0.0254,
  inchToCentimeter: (inch: number): number => inch * 2.54,
  mileToKilometer: (mile: number): number => mile * 1.60934,
};

// Weight conversions
export const weightConversions = {
  // Metric to Imperial
  kilogramToPound: (kg: number): number => kg * 2.20462,
  gramToOunce: (gram: number): number => gram * 0.035274,
  
  // Imperial to Metric
  poundToKilogram: (pound: number): number => pound * 0.453592,
  ounceToGram: (ounce: number): number => ounce * 28.3495,
};

// Volume conversions
export const volumeConversions = {
  // Metric to Imperial
  literToGallon: (liter: number): number => liter * 0.264172,
  literToQuart: (liter: number): number => liter * 1.05669,
  milliliterToFluidOunce: (ml: number): number => ml * 0.033814,
  
  // Imperial to Metric
  gallonToLiter: (gallon: number): number => gallon * 3.78541,
  quartToLiter: (quart: number): number => quart * 0.946353,
  fluidOunceToMilliliter: (flOz: number): number => flOz * 29.5735,
  
  // Cooking specific
  cupToMilliliter: (cup: number): number => cup * 236.588,
  tablespoonToMilliliter: (tbsp: number): number => tbsp * 14.7868,
  teaspoonToMilliliter: (tsp: number): number => tsp * 4.92892,
  milliliterToCup: (ml: number): number => ml / 236.588,
  milliliterToTablespoon: (ml: number): number => ml / 14.7868,
  milliliterToTeaspoon: (ml: number): number => ml / 4.92892,
};

// Temperature conversions
export const temperatureConversions = {
  celsiusToFahrenheit: (celsius: number): number => (celsius * 9/5) + 32,
  fahrenheitToCelsius: (fahrenheit: number): number => (fahrenheit - 32) * 5/9,
  celsiusToKelvin: (celsius: number): number => celsius + 273.15,
  kelvinToCelsius: (kelvin: number): number => kelvin - 273.15,
  fahrenheitToKelvin: (fahrenheit: number): number => ((fahrenheit - 32) * 5/9) + 273.15,
  kelvinToFahrenheit: (kelvin: number): number => ((kelvin - 273.15) * 9/5) + 32,
};

// Area conversions
export const areaConversions = {
  squareMeterToSquareFeet: (sqMeter: number): number => sqMeter * 10.7639,
  squareFeetToSquareMeter: (sqFeet: number): number => sqFeet * 0.092903,
  squareKilometerToSquareMile: (sqKm: number): number => sqKm * 0.386102,
  squareMileToSquareKilometer: (sqMile: number): number => sqMile * 2.58999,
  hectareToAcre: (hectare: number): number => hectare * 2.47105,
  acreToHectare: (acre: number): number => acre * 0.404686,
};

// Speed conversions
export const speedConversions = {
  kilometerPerHourToMilePerHour: (kmh: number): number => kmh * 0.621371,
  milePerHourToKilometerPerHour: (mph: number): number => mph * 1.60934,
  meterPerSecondToKilometerPerHour: (mps: number): number => mps * 3.6,
  kilometerPerHourToMeterPerSecond: (kmh: number): number => kmh / 3.6,
  meterPerSecondToMilePerHour: (mps: number): number => mps * 2.23694,
  milePerHourToMeterPerSecond: (mph: number): number => mph * 0.44704,
};

// Time conversions
export const timeConversions = {
  minutesToSeconds: (minutes: number): number => minutes * 60,
  hoursToMinutes: (hours: number): number => hours * 60,
  daysToHours: (days: number): number => days * 24,
  weeksToDays: (weeks: number): number => weeks * 7,
  monthsToDays: (months: number): number => months * 30.436875, // Average days in a month
  yearsToMonths: (years: number): number => years * 12,
  secondsToMinutes: (seconds: number): number => seconds / 60,
  minutesToHours: (minutes: number): number => minutes / 60,
  hoursToDays: (hours: number): number => hours / 24,
  daysToWeeks: (days: number): number => days / 7,
  daysToMonths: (days: number): number => days / 30.436875, // Average days in a month
  monthsToYears: (months: number): number => months / 12,
};

// Digital storage conversions
export const digitalConversions = {
  bytesToKilobytes: (bytes: number): number => bytes / 1024,
  kilobytesToMegabytes: (kb: number): number => kb / 1024,
  megabytesToGigabytes: (mb: number): number => mb / 1024,
  gigabytesToTerabytes: (gb: number): number => gb / 1024,
  terabytesToPetabytes: (tb: number): number => tb / 1024,
  kilobytesToBytes: (kb: number): number => kb * 1024,
  megabytesToKilobytes: (mb: number): number => mb * 1024,
  gigabytesToMegabytes: (gb: number): number => gb * 1024,
  terabytesToGigabytes: (tb: number): number => tb * 1024,
  petabytesToTerabytes: (pb: number): number => pb * 1024,
};

// Financial calculations
export const financialCalculations = {
  // Simple interest calculation
  calculateSimpleInterest: (principal: number, rate: number, time: number): number => {
    // rate is in percentage, time is in years
    return principal * (rate / 100) * time;
  },
  
  // Compound interest calculation
  calculateCompoundInterest: (principal: number, rate: number, time: number, n: number = 1): number => {
    // rate is in percentage, time is in years, n is number of times interest is compounded per year
    return principal * Math.pow(1 + (rate / 100) / n, n * time) - principal;
  },
  
  // Monthly mortgage payment calculation
  calculateMortgagePayment: (principal: number, annualRate: number, years: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const payments = years * 12;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, payments) / (Math.pow(1 + monthlyRate, payments) - 1);
  },
  
  // Loan payment calculation
  calculateLoanPayment: (principal: number, annualRate: number, months: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    return principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  },
};

// Currency conversion - placeholder for API integration
export const currencyConversion = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  // This would typically use an API to get current exchange rates
  // For now, we'll use a placeholder implementation
  try {
    // In a real implementation, this would fetch from an API
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    // const data = await response.json();
    // return amount * data.rates[toCurrency];
    
    // Placeholder implementation with some common currencies
    const mockRates: Record<string, Record<string, number>> = {
      'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 150.59, 'CAD': 1.36, 'AUD': 1.51 },
      'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 164.23, 'CAD': 1.48, 'AUD': 1.65 },
      'GBP': { 'USD': 1.27, 'EUR': 1.16, 'JPY': 190.62, 'CAD': 1.72, 'AUD': 1.91 },
      'JPY': { 'USD': 0.0066, 'EUR': 0.0061, 'GBP': 0.0052, 'CAD': 0.0090, 'AUD': 0.010 },
      'CAD': { 'USD': 0.74, 'EUR': 0.67, 'GBP': 0.58, 'JPY': 110.73, 'AUD': 1.11 },
      'AUD': { 'USD': 0.66, 'EUR': 0.61, 'GBP': 0.52, 'JPY': 99.73, 'CAD': 0.90 }
    };
    
    if (fromCurrency === toCurrency) return amount;
    
    if (mockRates[fromCurrency] && mockRates[fromCurrency][toCurrency]) {
      return amount * mockRates[fromCurrency][toCurrency];
    }
    
    // If direct conversion not available, try through USD
    if (fromCurrency !== 'USD' && toCurrency !== 'USD' && 
        mockRates[fromCurrency]?.['USD'] && mockRates['USD']?.[toCurrency]) {
      const toUSD = amount * mockRates[fromCurrency]['USD'];
      return toUSD * mockRates['USD'][toCurrency];
    }
    
    throw new Error(`Conversion from ${fromCurrency} to ${toCurrency} not available`);
  } catch (error) {
    console.error('Currency conversion error:', error);
    throw error;
  }
};

// BMI calculation
export const calculateBMI = (weight: number, height: number, unit: 'metric' | 'imperial'): number => {
  if (unit === 'metric') {
    // Weight in kg, height in meters
    return weight / (height * height);
  } else {
    // Weight in pounds, height in inches
    return (weight * 703) / (height * height);
  }
};

// Calorie calculation based on Harris-Benedict equation
export const calculateBMR = (
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female', 
  unit: 'metric' | 'imperial'
): number => {
  let weightKg = weight;
  let heightCm = height;
  
  if (unit === 'imperial') {
    // Convert pounds to kg
    weightKg = weight * 0.453592;
    // Convert inches to cm
    heightCm = height * 2.54;
  }
  
  if (gender === 'male') {
    return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  }
};

// Date and time zone conversion
export const convertTimeZone = (date: Date, _fromTimeZone: string, toTimeZone: string): Date => {
  // This is a simplified implementation
  // In a real application, you would use a library like moment-timezone or date-fns-tz
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: toTimeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    
    // Format the date in the target timezone
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    
    // Parse the formatted date back to a Date object
    const [datePart, timePart] = formattedDate.split(', ');
    const [month, day, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    
    return new Date(year, month - 1, day, hour, minute, second);
  } catch (error) {
    console.error('Time zone conversion error:', error);
    throw error;
  }
};
