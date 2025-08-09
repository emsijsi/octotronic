// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    const themeText = themeToggleBtn.querySelector('span');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
    }
    
    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const converterSections = document.querySelectorAll('.converter-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected converter section
            converterSections.forEach(section => {
                if (section.id === `${category}-converter`) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                if (content.id === `${tab}-tab`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});

// Swap button functionality
document.addEventListener('DOMContentLoaded', function() {
    const swapButtons = document.querySelectorAll('[id$="-swap"]');
    
    swapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.id.replace('-swap', '');
            const fromSelect = document.getElementById(`${category}-from`);
            const toSelect = document.getElementById(`${category}-to`);
            
            // Swap values
            const temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            
            // Trigger conversion
            const valueInput = document.getElementById(`${category}-value`);
            if (valueInput && valueInput.value) {
                convert(category);
            }
        });
    });
});

// Conversion functions
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for all converters
    const converterCategories = ['length', 'weight', 'temperature', 'cooking', 'volume', 'speed', 'area', 'currency', 'time'];
    
    converterCategories.forEach(category => {
        const valueInput = document.getElementById(`${category}-value`);
        const fromSelect = document.getElementById(`${category}-from`);
        const toSelect = document.getElementById(`${category}-to`);
        
        if (valueInput && fromSelect && toSelect) {
            valueInput.addEventListener('input', () => convert(category));
            fromSelect.addEventListener('change', () => convert(category));
            toSelect.addEventListener('change', () => convert(category));
        }
    });
    
    // Set up BMI calculator
    const bmiCalculateBtn = document.getElementById('bmi-calculate');
    if (bmiCalculateBtn) {
        bmiCalculateBtn.addEventListener('click', calculateBMI);
    }
    
    // Set up financial calculators
    const loanCalculateBtn = document.getElementById('loan-calculate');
    if (loanCalculateBtn) {
        loanCalculateBtn.addEventListener('click', calculateLoan);
    }
    
    const savingsCalculateBtn = document.getElementById('savings-calculate');
    if (savingsCalculateBtn) {
        savingsCalculateBtn.addEventListener('click', calculateSavings);
    }
    
    // Set up shoe size converter
    const shoeValueInput = document.getElementById('shoe-value');
    const shoeFromSelect = document.getElementById('shoe-from');
    const shoeToSelect = document.getElementById('shoe-to');
    
    if (shoeValueInput && shoeFromSelect && shoeToSelect) {
        shoeValueInput.addEventListener('input', convertShoeSize);
        shoeFromSelect.addEventListener('change', convertShoeSize);
        shoeToSelect.addEventListener('change', convertShoeSize);
    }
});

// Conversion logic
function convert(category) {
    const value = parseFloat(document.getElementById(`${category}-value`).value);
    const from = document.getElementById(`${category}-from`).value;
    const to = document.getElementById(`${category}-to`).value;
    const resultElement = document.getElementById(`${category}-result`);
    
    if (isNaN(value)) {
        resultElement.textContent = '0';
        return;
    }
    
    let result;
    
    switch (category) {
        case 'length':
            result = convertLength(value, from, to);
            break;
        case 'weight':
            result = convertWeight(value, from, to);
            break;
        case 'temperature':
            result = convertTemperature(value, from, to);
            break;
        case 'cooking':
            result = convertCooking(value, from, to);
            break;
        case 'volume':
            result = convertVolume(value, from, to);
            break;
        case 'speed':
            result = convertSpeed(value, from, to);
            break;
        case 'area':
            result = convertArea(value, from, to);
            break;
        case 'currency':
            result = convertCurrency(value, from, to);
            break;
        case 'time':
            result = convertTime(value, from, to);
            break;
    }
    
    resultElement.textContent = formatResult(result, category);
}

function formatResult(value, category) {
    if (category === 'temperature') {
        return value.toFixed(2);
    } else if (category === 'currency') {
        return value.toFixed(2);
    } else {
        return value.toFixed(6).replace(/\.?0+$/, '');
    }
}

// Length conversion
const lengthConversions = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
};

function convertLength(value, from, to) {
    const meters = value * lengthConversions[from];
    return meters / lengthConversions[to];
}

// Weight conversion
const weightConversions = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    stone: 6.35029,
    ton: 1000
};

function convertWeight(value, from, to) {
    const kilograms = value * weightConversions[from];
    return kilograms / weightConversions[to];
}

// Temperature conversion
function convertTemperature(value, from, to) {
    let celsius;
    
    // Convert to Celsius first
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch (to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return celsius * 9/5 + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Cooking measurements conversion
const cookingConversions = {
    cup: 236.588,
    tablespoon: 14.7868,
    teaspoon: 4.92892,
    fluid_ounce: 29.5735,
    pint: 473.176,
    quart: 946.353,
    gallon: 3785.41,
    milliliter: 1,
    liter: 1000
};

function convertCooking(value, from, to) {
    const milliliters = value * cookingConversions[from];
    return milliliters / cookingConversions[to];
}

// Volume conversion
const volumeConversions = {
    cubic_meter: 1000000,
    cubic_centimeter: 1,
    liter: 1000,
    milliliter: 1,
    cubic_foot: 28316.8,
    cubic_inch: 16.3871,
    gallon: 3785.41,
    quart: 946.353,
    pint: 473.176
};

function convertVolume(value, from, to) {
    const cubicCentimeters = value * volumeConversions[from];
    return cubicCentimeters / volumeConversions[to];
}

// Speed conversion
const speedConversions = {
    meter_per_second: 1,
    kilometer_per_hour: 0.277778,
    mile_per_hour: 0.44704,
    foot_per_second: 0.3048,
    knot: 0.514444
};

function convertSpeed(value, from, to) {
    const metersPerSecond = value * speedConversions[from];
    return metersPerSecond / speedConversions[to];
}

// Area conversion
const areaConversions = {
    square_meter: 1,
    square_kilometer: 1000000,
    square_centimeter: 0.0001,
    square_millimeter: 0.000001,
    square_mile: 2589988.11,
    square_yard: 0.836127,
    square_foot: 0.092903,
    square_inch: 0.00064516,
    acre: 4046.86,
    hectare: 10000
};

function convertArea(value, from, to) {
    const squareMeters = value * areaConversions[from];
    return squareMeters / areaConversions[to];
}

// Currency conversion
// Using USD as the base currency for all conversions
const currencyConversions = {
    // North America
    "USD": 1.00,
    "CAD": 1.35,
    "MXN": 17.25,
    
    // South America
    "BRL": 5.45,
    "ARS": 350.50,
    "CLP": 870.25,
    "COP": 4050.75,
    "PEN": 3.65,
    
    // Europe
    "EUR": 0.92,
    "GBP": 0.78,
    "CHF": 0.88,
    "NOK": 10.45,
    "SEK": 10.65,
    "DKK": 6.85,
    "PLN": 3.95,
    "CZK": 22.75,
    "HUF": 350.50,
    "RON": 4.55,
    "TRY": 30.25,
    "RUB": 90.50,
    
    // Asia
    "JPY": 145.50,
    "CNY": 7.25,
    "HKD": 7.82,
    "KRW": 1325.75,
    "INR": 83.25,
    "IDR": 15450.25,
    "MYR": 4.65,
    "PHP": 56.25,
    "SGD": 1.35,
    "THB": 35.75,
    "VND": 24350.50,
    "PKR": 278.50,
    "BDT": 109.75,
    "NPR": 133.25,
    "LKR": 325.50,
    "MMK": 2100.25,
    "KHR": 4150.75,
    "LAK": 19450.25,
    "BND": 1.35,
    "TWD": 31.75,
    "MNT": 3450.25,
    
    // Middle East
    "AED": 3.67,
    "SAR": 3.75,
    "QAR": 3.64,
    "KWD": 0.31,
    "BHD": 0.38,
    "OMR": 0.38,
    "JOD": 0.71,
    "ILS": 3.75,
    "IRR": 42000.50,
    "IQD": 1310.25,
    "YER": 250.50,
    "LBP": 15000.25,
    "SYP": 13000.50,
    
    // Africa
    "ZAR": 18.25,
    "EGP": 30.85,
    "NGN": 750.25,
    "GHS": 12.25,
    "KES": 145.50,
    "MAD": 10.05,
    "TND": 3.15,
    "DZD": 135.75,
    "XOF": 605.25,
    "XAF": 605.25,
    "ETB": 55.75,
    "UGX": 3700.50,
    "TZS": 2500.25,
    "ZMW": 21.25,
    "MWK": 1650.50,
    "MZN": 63.75,
    "BWP": 13.55,
    "NAD": 18.25,
    "RWF": 1200.25,
    "BIF": 2800.50,
    "SLL": 19750.25,
    "LRD": 185.50,
    "GMD": 62.75,
    "GNF": 8600.25,
    "SZL": 18.25,
    "LSL": 18.25,
    "MUR": 45.75,
    "SCR": 13.25,
    "CVE": 101.50,
    "SOS": 570.25,
    "DJF": 178.50,
    "SDG": 600.25,
    "SSP": 985.50,
    "LYD": 4.85,
    
    // Oceania
    "AUD": 1.52,
    "NZD": 1.65,
    "FJD": 2.25,
    "PGK": 3.65,
    "SBD": 8.35,
    "VUV": 118.50,
    "TOP": 2.35,
    "WST": 2.75
};

function convertCurrency(value, from, to) {
    // Convert to USD first, then to target currency
    const usd = value / currencyConversions[from];
    return usd * currencyConversions[to];
}

// Time zone conversion
const timeZoneOffsets = {
    'UTC': 0,
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'GMT': 0,
    'CET': 1,
    'JST': 9
};

function convertTime(value, from, to) {
    const timeValue = document.getElementById('time-value').value;
    const [hours, minutes] = timeValue.split(':').map(Number);
    
    // Convert to UTC
    let utcHours = hours - timeZoneOffsets[from];
    
    // Handle day wrap
    if (utcHours >= 24) utcHours -= 24;
    if (utcHours < 0) utcHours += 24;
    
    // Convert from UTC to target timezone
    let targetHours = utcHours + timeZoneOffsets[to];
    
    // Handle day wrap again
    if (targetHours >= 24) targetHours -= 24;
    if (targetHours < 0) targetHours += 24;
    
    // Format result
    const formattedHours = targetHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    document.getElementById('time-result').textContent = `${formattedHours}:${formattedMinutes}`;
    
    return 0; // This function handles its own result display
}

// BMI calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('bmi-height').value);
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const heightUnit = document.getElementById('bmi-height-unit').value;
    const weightUnit = document.getElementById('bmi-weight-unit').value;
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('bmi-result').textContent = '0';
        document.getElementById('bmi-category').textContent = '-';
        return;
    }
    
    // Convert height to meters
    let heightInMeters;
    switch (heightUnit) {
        case 'cm':
            heightInMeters = height / 100;
            break;
        case 'm':
            heightInMeters = height;
            break;
        case 'ft':
            heightInMeters = height * 0.3048;
            break;
        case 'in':
            heightInMeters = height * 0.0254;
            break;
    }
    
    // Convert weight to kg
    let weightInKg;
    switch (weightUnit) {
        case 'kg':
            weightInKg = weight;
            break;
        case 'lb':
            weightInKg = weight * 0.453592;
            break;
    }
    
    // Calculate BMI
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    document.getElementById('bmi-result').textContent = bmi.toFixed(1);
    
    // Determine BMI category
    let category;
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 25) {
        category = 'Normal weight';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }
    
    document.getElementById('bmi-category').textContent = category;
}

// Loan calculator
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('loan-interest').value) / 100 / 12; // Monthly interest rate
    const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12; // Term in months
    
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
        document.getElementById('loan-payment').textContent = '$0';
        document.getElementById('loan-total').textContent = '$0';
        document.getElementById('loan-interest-total').textContent = '$0';
        return;
    }
    
    // Calculate monthly payment
    const monthlyPayment = loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm) / (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('loan-payment').textContent = `$${monthlyPayment.toFixed(2)}`;
    document.getElementById('loan-total').textContent = `$${totalPayment.toFixed(2)}`;
    document.getElementById('loan-interest-total').textContent = `$${totalInterest.toFixed(2)}`;
}

// Savings calculator
function calculateSavings() {
    const initialAmount = parseFloat(document.getElementById('savings-initial').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('savings-monthly').value) || 0;
    const interestRate = parseFloat(document.getElementById('savings-interest').value) / 100 / 12; // Monthly interest rate
    const years = parseFloat(document.getElementById('savings-years').value);
    const months = years * 12;
    
    if (isNaN(interestRate) || isNaN(years) || interestRate < 0 || years <= 0) {
        document.getElementById('savings-future').textContent = '$0';
        document.getElementById('savings-contributions').textContent = '$0';
        document.getElementById('savings-interest-earned').textContent = '$0';
        return;
    }
    
    // Calculate future value
    let futureValue = initialAmount;
    for (let i = 0; i < months; i++) {
        futureValue = futureValue * (1 + interestRate) + monthlyContribution;
    }
    
    const totalContributions = initialAmount + (monthlyContribution * months);
    const interestEarned = futureValue - totalContributions;
    
    document.getElementById('savings-future').textContent = `$${futureValue.toFixed(2)}`;
    document.getElementById('savings-contributions').textContent = `$${totalContributions.toFixed(2)}`;
    document.getElementById('savings-interest-earned').textContent = `$${interestEarned.toFixed(2)}`;
}

// Shoe size conversion
const shoeSizes = {
    'us-men': {
        'us-men': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
        'us-women': [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14.5, 15.5, 16.5],
        'uk': [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5],
        'eu': [36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 48, 49.5, 51],
        'cm': [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 31, 32, 33]
    },
    'us-women': {
        'us-men': [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12.5, 13.5],
        'us-women': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
        'uk': [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 13],
        'eu': [34, 34.5, 35, 36, 36.5, 37, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 46, 47.5, 49],
        'cm': [20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29.5, 30.5, 31.5]
    },
    'uk': {
        'us-men': [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13.5, 14.5, 15.5],
        'us-women': [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 16, 17],
        'uk': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
        'eu': [37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 47, 48.5, 50, 51.5],
        'cm': [22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 30.5, 31.5, 32.5, 33.5]
    },
    'eu': {
        'us-men': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
        'us-women': [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14.5, 15.5, 16.5],
        'uk': [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5],
        'eu': [36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 48, 49.5, 51],
        'cm': [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 31, 32, 33]
    },
    'cm': {
        'us-men': [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
        'us-women': [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14.5, 15.5, 16.5],
        'uk': [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12.5, 13.5, 14.5],
        'eu': [36, 37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 42.5, 43, 44, 44.5, 45, 46, 46.5, 48, 49.5, 51],
        'cm': [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5, 30, 31, 32, 33]
    }
};

function convertShoeSize() {
    const value = parseFloat(document.getElementById('shoe-value').value);
    const from = document.getElementById('shoe-from').value;
    const to = document.getElementById('shoe-to').value;
    const resultElement = document.getElementById('shoe-result');
    
    if (isNaN(value)) {
        resultElement.textContent = '0';
        return;
    }
    
    // Find closest size in 'from' system
    const fromSizes = shoeSizes[from][from];
    let closestIndex = 0;
    let minDiff = Math.abs(fromSizes[0] - value);
    
    for (let i = 1; i < fromSizes.length; i++) {
        const diff = Math.abs(fromSizes[i] - value);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = i;
        }
    }
    
    // Get corresponding size in 'to' system
    const result = shoeSizes[from][to][closestIndex];
    resultElement.textContent = result;
}

// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already consented
    if (!localStorage.getItem('cookieConsent')) {
        // Create cookie consent banner
        const consentBanner = document.createElement('div');
        consentBanner.className = 'cookie-consent';
        consentBanner.innerHTML = `
            <div class="cookie-content">
                <p>This website uses cookies to ensure you get the best experience and to enable ad personalization. 
                By continuing to use this site, you consent to our use of cookies as described in our 
                <a href="privacy.html">Privacy Policy</a>.</p>
                <div class="cookie-buttons">
                    <button id="cookie-accept">Accept</button>
                    <button id="cookie-decline">Decline Non-Essential</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        // Handle accept button
        document.getElementById('cookie-accept').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            consentBanner.style.display = 'none';
            enableAllCookies();
        });
        
        // Handle decline button
        document.getElementById('cookie-decline').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            consentBanner.style.display = 'none';
            disableNonEssentialCookies();
        });
    }
});

// Function to enable all cookies (including advertising)
function enableAllCookies() {
    // This is where you would initialize your ad code
    initializeAds();
}

// Function to disable non-essential cookies
function disableNonEssentialCookies() {
    // Set a flag to use only essential cookies
    localStorage.setItem('useEssentialCookiesOnly', 'true');
    
    // You might want to show non-personalized ads instead
    initializeBasicAds();
}

// Initialize Google AdSense with privacy considerations
function initializeAds() {
    // Only load ads if consent is given
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        // Create script element for Google AdSense
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOURPUBLISHERID';
        adScript.crossOrigin = 'anonymous';
        document.head.appendChild(adScript);
        
        // Initialize ads in appropriate locations
        createAdUnit('header-ad', 'header-ad-slot');
        createAdUnit('sidebar-ad', 'sidebar-ad-slot');
        createAdUnit('content-ad', 'content-ad-slot');
        createAdUnit('footer-ad', 'footer-ad-slot');
    }
}

// Initialize basic non-personalized ads
function initializeBasicAds() {
    // Create script element for Google AdSense with non-personalized ads
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOURPUBLISHERID';
    adScript.crossOrigin = 'anonymous';
    document.head.appendChild(adScript);
    
    // Set non-personalized ad preference
    const nonPersonalizedAds = document.createElement('script');
    nonPersonalizedAds.textContent = `
        (adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
    `;
    document.head.appendChild(nonPersonalizedAds);
    
    // Initialize basic ads
    createAdUnit('header-ad', 'header-ad-slot');
    createAdUnit('sidebar-ad', 'sidebar-ad-slot');
    createAdUnit('content-ad', 'content-ad-slot');
    createAdUnit('footer-ad', 'footer-ad-slot');
}

// Helper function to create ad units
function createAdUnit(containerId, slotId) {
    // Find container or create it if it doesn't exist
    let container = document.getElementById(containerId);
    if (!container) {
        // Determine where to place the ad based on the container ID
        let parentElement;
        switch(containerId) {
            case 'header-ad':
                parentElement = document.querySelector('header');
                break;
            case 'sidebar-ad':
                parentElement = document.querySelector('.converter-nav');
                break;
            case 'content-ad':
                parentElement = document.querySelector('.converter-content');
                break;
            case 'footer-ad':
                parentElement = document.querySelector('footer');
                break;
            default:
                return; // Exit if no valid location
        }
        
        // Create container
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'ad-container';
        
        // Insert at appropriate position
        if (containerId === 'content-ad') {
            // Insert after the third converter section
            const sections = parentElement.querySelectorAll('.converter-section');
            if (sections.length >= 3) {
                sections[2].after(container);
            } else {
                parentElement.appendChild(container);
            }
        } else {
            parentElement.appendChild(container);
        }
    }
    
    // Create the ad unit
    const adUnit = document.createElement('ins');
    adUnit.className = 'adsbygoogle';
    adUnit.style.display = 'block';
    adUnit.setAttribute('data-ad-client', 'ca-pub-YOURPUBLISHERID');
    adUnit.setAttribute('data-ad-slot', slotId);
    adUnit.setAttribute('data-ad-format', 'auto');
    adUnit.setAttribute('data-full-width-responsive', 'true');
    
    container.appendChild(adUnit);
    
    // Initialize the ad
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// Check for ad blockers and show a polite message if detected
function checkForAdBlockers() {
    setTimeout(function() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        
        setTimeout(function() {
            if (testAd.offsetHeight === 0) {
                showAdBlockerMessage();
            }
            testAd.remove();
        }, 100);
    }, 500);
}

// Show message for users with ad blockers
function showAdBlockerMessage() {
    const message = document.createElement('div');
    message.className = 'adblocker-message';
    message.innerHTML = `
        <div class="adblocker-content">
            <h3>We noticed you're using an ad blocker</h3>
            <p>Unitli is free to use and relies on advertising to keep running. Would you consider supporting us by disabling your ad blocker?</p>
            <button id="close-adblocker-message">Continue with Ad Blocker</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    document.getElementById('close-adblocker-message').addEventListener('click', function() {
        message.remove();
        localStorage.setItem('adBlockerMessageClosed', 'true');
    });
}

// Initialize compliance checks
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        enableAllCookies();
    } else if (localStorage.getItem('cookieConsent') === 'declined') {
        disableNonEssentialCookies();
    }

    // Check for ad blockers if user has consented to ads
    if (localStorage.getItem('cookieConsent') === 'accepted' && !localStorage.getItem('adBlockerMessageClosed')) {
        checkForAdBlockers();
    }
});
