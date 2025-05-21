import React from 'react';
import { lengthConversions, weightConversions, volumeConversions, temperatureConversions, areaConversions, speedConversions } from '../lib/conversionUtils';
import ConversionTool from './ConversionTool';

const LengthConverter: React.FC = () => {
  const lengthUnits = ['meter', 'centimeter', 'kilometer', 'feet', 'inch', 'mile'];
  
  const convert = (value: number, from: string, to: string): number => {
    // Convert to meters first (base unit)
    let inMeters: number;
    
    switch (from) {
      case 'meter':
        inMeters = value;
        break;
      case 'centimeter':
        inMeters = value / 100;
        break;
      case 'kilometer':
        inMeters = value * 1000;
        break;
      case 'feet':
        inMeters = lengthConversions.feetToMeter(value);
        break;
      case 'inch':
        inMeters = lengthConversions.inchToMeter(value);
        break;
      case 'mile':
        inMeters = lengthConversions.mileToKilometer(value) * 1000;
        break;
      default:
        throw new Error(`Unsupported unit: ${from}`);
    }
    
    // Convert from meters to target unit
    switch (to) {
      case 'meter':
        return inMeters;
      case 'centimeter':
        return inMeters * 100;
      case 'kilometer':
        return inMeters / 1000;
      case 'feet':
        return lengthConversions.meterToFeet(inMeters);
      case 'inch':
        return lengthConversions.meterToInch(inMeters);
      case 'mile':
        return lengthConversions.kilometerToMile(inMeters / 1000);
      default:
        throw new Error(`Unsupported unit: ${to}`);
    }
  };
  
  return (
    <ConversionTool
      title="Length Converter"
      fromOptions={lengthUnits}
      toOptions={lengthUnits}
      convertFunction={convert}
      precision={4}
    />
  );
};

const WeightConverter: React.FC = () => {
  const weightUnits = ['kilogram', 'gram', 'pound', 'ounce'];
  
  const convert = (value: number, from: string, to: string): number => {
    // Convert to kilograms first (base unit)
    let inKilograms: number;
    
    switch (from) {
      case 'kilogram':
        inKilograms = value;
        break;
      case 'gram':
        inKilograms = value / 1000;
        break;
      case 'pound':
        inKilograms = weightConversions.poundToKilogram(value);
        break;
      case 'ounce':
        inKilograms = weightConversions.ounceToGram(value) / 1000;
        break;
      default:
        throw new Error(`Unsupported unit: ${from}`);
    }
    
    // Convert from kilograms to target unit
    switch (to) {
      case 'kilogram':
        return inKilograms;
      case 'gram':
        return inKilograms * 1000;
      case 'pound':
        return weightConversions.kilogramToPound(inKilograms);
      case 'ounce':
        return weightConversions.gramToOunce(inKilograms * 1000);
      default:
        throw new Error(`Unsupported unit: ${to}`);
    }
  };
  
  return (
    <ConversionTool
      title="Weight Converter"
      fromOptions={weightUnits}
      toOptions={weightUnits}
      convertFunction={convert}
      precision={4}
    />
  );
};

const TemperatureConverter: React.FC = () => {
  const temperatureUnits = ['Celsius', 'Fahrenheit', 'Kelvin'];
  
  const convert = (value: number, from: string, to: string): number => {
    switch (`${from}-${to}`) {
      case 'Celsius-Fahrenheit':
        return temperatureConversions.celsiusToFahrenheit(value);
      case 'Celsius-Kelvin':
        return temperatureConversions.celsiusToKelvin(value);
      case 'Fahrenheit-Celsius':
        return temperatureConversions.fahrenheitToCelsius(value);
      case 'Fahrenheit-Kelvin':
        return temperatureConversions.fahrenheitToKelvin(value);
      case 'Kelvin-Celsius':
        return temperatureConversions.kelvinToCelsius(value);
      case 'Kelvin-Fahrenheit':
        return temperatureConversions.kelvinToFahrenheit(value);
      default:
        return value; // Same unit
    }
  };
  
  return (
    <ConversionTool
      title="Temperature Converter"
      fromOptions={temperatureUnits}
      toOptions={temperatureUnits}
      convertFunction={convert}
      precision={2}
    />
  );
};

const VolumeConverter: React.FC = () => {
  const volumeUnits = ['liter', 'milliliter', 'gallon', 'quart', 'fluid ounce', 'cup', 'tablespoon', 'teaspoon'];
  
  const convert = (value: number, from: string, to: string): number => {
    // Convert to milliliters first (base unit)
    let inMilliliters: number;
    
    switch (from) {
      case 'liter':
        inMilliliters = value * 1000;
        break;
      case 'milliliter':
        inMilliliters = value;
        break;
      case 'gallon':
        inMilliliters = volumeConversions.gallonToLiter(value) * 1000;
        break;
      case 'quart':
        inMilliliters = volumeConversions.quartToLiter(value) * 1000;
        break;
      case 'fluid ounce':
        inMilliliters = volumeConversions.fluidOunceToMilliliter(value);
        break;
      case 'cup':
        inMilliliters = volumeConversions.cupToMilliliter(value);
        break;
      case 'tablespoon':
        inMilliliters = volumeConversions.tablespoonToMilliliter(value);
        break;
      case 'teaspoon':
        inMilliliters = volumeConversions.teaspoonToMilliliter(value);
        break;
      default:
        throw new Error(`Unsupported unit: ${from}`);
    }
    
    // Convert from milliliters to target unit
    switch (to) {
      case 'liter':
        return inMilliliters / 1000;
      case 'milliliter':
        return inMilliliters;
      case 'gallon':
        return volumeConversions.literToGallon(inMilliliters / 1000);
      case 'quart':
        return volumeConversions.literToQuart(inMilliliters / 1000);
      case 'fluid ounce':
        return volumeConversions.milliliterToFluidOunce(inMilliliters);
      case 'cup':
        return volumeConversions.milliliterToCup(inMilliliters);
      case 'tablespoon':
        return volumeConversions.milliliterToTablespoon(inMilliliters);
      case 'teaspoon':
        return volumeConversions.milliliterToTeaspoon(inMilliliters);
      default:
        throw new Error(`Unsupported unit: ${to}`);
    }
  };
  
  return (
    <ConversionTool
      title="Volume Converter"
      fromOptions={volumeUnits}
      toOptions={volumeUnits}
      convertFunction={convert}
      precision={4}
    />
  );
};

const AreaConverter: React.FC = () => {
  const areaUnits = ['square meter', 'square kilometer', 'square feet', 'square mile', 'acre', 'hectare'];
  
  const convert = (value: number, from: string, to: string): number => {
    // Convert to square meters first (base unit)
    let inSquareMeters: number;
    
    switch (from) {
      case 'square meter':
        inSquareMeters = value;
        break;
      case 'square kilometer':
        inSquareMeters = value * 1000000;
        break;
      case 'square feet':
        inSquareMeters = areaConversions.squareFeetToSquareMeter(value);
        break;
      case 'square mile':
        inSquareMeters = areaConversions.squareMileToSquareKilometer(value) * 1000000;
        break;
      case 'acre':
        inSquareMeters = areaConversions.acreToHectare(value) * 10000;
        break;
      case 'hectare':
        inSquareMeters = value * 10000;
        break;
      default:
        throw new Error(`Unsupported unit: ${from}`);
    }
    
    // Convert from square meters to target unit
    switch (to) {
      case 'square meter':
        return inSquareMeters;
      case 'square kilometer':
        return inSquareMeters / 1000000;
      case 'square feet':
        return areaConversions.squareMeterToSquareFeet(inSquareMeters);
      case 'square mile':
        return areaConversions.squareKilometerToSquareMile(inSquareMeters / 1000000);
      case 'acre':
        return areaConversions.hectareToAcre(inSquareMeters / 10000);
      case 'hectare':
        return inSquareMeters / 10000;
      default:
        throw new Error(`Unsupported unit: ${to}`);
    }
  };
  
  return (
    <ConversionTool
      title="Area Converter"
      fromOptions={areaUnits}
      toOptions={areaUnits}
      convertFunction={convert}
      precision={4}
    />
  );
};

const SpeedConverter: React.FC = () => {
  const speedUnits = ['meter per second', 'kilometer per hour', 'mile per hour', 'knot'];
  
  const convert = (value: number, from: string, to: string): number => {
    // Convert to meters per second first (base unit)
    let inMetersPerSecond: number;
    
    switch (from) {
      case 'meter per second':
        inMetersPerSecond = value;
        break;
      case 'kilometer per hour':
        inMetersPerSecond = speedConversions.kilometerPerHourToMeterPerSecond(value);
        break;
      case 'mile per hour':
        inMetersPerSecond = speedConversions.milePerHourToMeterPerSecond(value);
        break;
      case 'knot':
        // 1 knot = 0.514444 meters per second
        inMetersPerSecond = value * 0.514444;
        break;
      default:
        throw new Error(`Unsupported unit: ${from}`);
    }
    
    // Convert from meters per second to target unit
    switch (to) {
      case 'meter per second':
        return inMetersPerSecond;
      case 'kilometer per hour':
        return speedConversions.meterPerSecondToKilometerPerHour(inMetersPerSecond);
      case 'mile per hour':
        return speedConversions.meterPerSecondToMilePerHour(inMetersPerSecond);
      case 'knot':
        // 1 meter per second = 1.94384 knots
        return inMetersPerSecond * 1.94384;
      default:
        throw new Error(`Unsupported unit: ${to}`);
    }
  };
  
  return (
    <ConversionTool
      title="Speed Converter"
      fromOptions={speedUnits}
      toOptions={speedUnits}
      convertFunction={convert}
      precision={2}
    />
  );
};

export { LengthConverter, WeightConverter, TemperatureConverter, VolumeConverter, AreaConverter, SpeedConverter };
