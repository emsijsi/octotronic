import { useState } from 'react';
import { 
  LengthConverter, 
  WeightConverter, 
  TemperatureConverter, 
  VolumeConverter, 
  AreaConverter, 
  SpeedConverter 
} from './components/Converters';
import { Button } from './components/ui/button';
import './App.css';

function App() {
  const [activeConverter, setActiveConverter] = useState<string>('length');

  const renderConverter = () => {
    switch (activeConverter) {
      case 'length':
        return <LengthConverter />;
      case 'weight':
        return <WeightConverter />;
      case 'temperature':
        return <TemperatureConverter />;
      case 'volume':
        return <VolumeConverter />;
      case 'area':
        return <AreaConverter />;
      case 'speed':
        return <SpeedConverter />;
      default:
        return <LengthConverter />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Conversion Tools</h1>
          <p className="text-gray-600 mt-2">Quick and accurate unit conversions for everyday use</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Conversion Types</h2>
            <nav className="flex flex-col space-y-2">
              <Button 
                variant={activeConverter === 'length' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('length')}
                className="justify-start"
              >
                Length
              </Button>
              <Button 
                variant={activeConverter === 'weight' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('weight')}
                className="justify-start"
              >
                Weight
              </Button>
              <Button 
                variant={activeConverter === 'temperature' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('temperature')}
                className="justify-start"
              >
                Temperature
              </Button>
              <Button 
                variant={activeConverter === 'volume' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('volume')}
                className="justify-start"
              >
                Volume
              </Button>
              <Button 
                variant={activeConverter === 'area' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('area')}
                className="justify-start"
              >
                Area
              </Button>
              <Button 
                variant={activeConverter === 'speed' ? 'default' : 'outline'} 
                onClick={() => setActiveConverter('speed')}
                className="justify-start"
              >
                Speed
              </Button>
            </nav>

            <div className="mt-8 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800">Coming Soon</h3>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• Currency Converter</li>
                <li>• Time Zone Converter</li>
                <li>• Financial Calculators</li>
                <li>• BMI Calculator</li>
              </ul>
            </div>
          </div>

          <div>
            {renderConverter()}
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">About This Tool</h2>
              <p className="text-gray-700">
                Our conversion tools provide quick, accurate unit conversions for everyday use. 
                Whether you're cooking, studying, traveling, or working on a project, these tools 
                help you convert between different units of measurement with ease.
              </p>
              <p className="text-gray-700 mt-4">
                All calculations are performed instantly in your browser, ensuring fast results 
                without sending your data to a server. The tools are designed to be intuitive and 
                mobile-friendly, so you can use them on any device.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Conversion Tools</h3>
              <p className="text-gray-300">
                Quick and accurate unit conversions for everyday use.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help & FAQ</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-2">
                Subscribe to get updates on new tools and features.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-black rounded-l-md w-full"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Conversion Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
