import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';

interface ConversionToolProps {
  title: string;
  fromOptions: string[];
  toOptions: string[];
  convertFunction: (value: number, from: string, to: string) => number;
  precision?: number;
  inputLabel?: string;
  resultLabel?: string;
}

const ConversionTool: React.FC<ConversionToolProps> = ({
  title,
  fromOptions,
  toOptions,
  convertFunction,
  precision = 4,
  inputLabel = 'Value',
  resultLabel = 'Result',
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(fromOptions[0]);
  const [toUnit, setToUnit] = useState<string>(toOptions[0]);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (inputValue) {
      handleConvert();
    }
  }, [fromUnit, toUnit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };

  const handleConvert = () => {
    try {
      const value = parseFloat(inputValue);
      
      if (isNaN(value)) {
        setError('Please enter a valid number');
        setResult('');
        return;
      }
      
      const convertedValue = convertFunction(value, fromUnit, toUnit);
      setResult(convertedValue.toFixed(precision));
      setError('');
    } catch (err) {
      setError('Conversion error: ' + (err instanceof Error ? err.message : String(err)));
      setResult('');
    }
  };

  const handleSwapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">{inputLabel}</label>
        <Input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter value"
          className="w-full"
        />
      </div>
      
      <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <Select
            value={fromUnit}
            onChange={handleFromUnitChange}
            className="w-full"
          >
            {fromOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
        
        <Button
          type="button"
          onClick={handleSwapUnits}
          variant="outline"
          className="mt-6"
          aria-label="Swap units"
        >
          ⇄
        </Button>
        
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <Select
            value={toUnit}
            onChange={handleToUnitChange}
            className="w-full"
          >
            {toOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>
      
      <Button
        onClick={handleConvert}
        className="w-full mb-4"
      >
        Convert
      </Button>
      
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <div className="text-sm font-medium text-gray-500">{resultLabel}</div>
          <div className="text-2xl font-bold">{result} {toUnit}</div>
        </div>
      )}
    </div>
  );
};

export default ConversionTool;
