import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  // Sample exchange rates (USD base)
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.36,
    AUD: 1.53,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.05,
  };

  const convert = (val: string) => {
    const numValue = parseFloat(val);
    if (!isNaN(numValue)) {
      const usdAmount = numValue / exchangeRates[fromCurrency];
      const converted = usdAmount * exchangeRates[toCurrency];
      setResult(parseFloat(converted.toFixed(2)));
    } else {
      setResult(null);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAmount(newValue);
    convert(newValue);
  };

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    if (amount) convert(amount);
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    if (amount) convert(amount);
  };

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
  ];

  const faqs = [
    {
      question: "How accurate are these exchange rates?",
      answer: "These are sample exchange rates for demonstration purposes. For real-time, accurate rates for transactions, use your bank or a reputable foreign exchange service. Exchange rates fluctuate constantly based on market conditions."
    },
    {
      question: "What factors affect exchange rates?",
      answer: "Exchange rates are influenced by interest rates, inflation, political stability, economic performance, and market speculation. Central bank policies and international trade balances also play significant roles."
    },
    {
      question: "Should I exchange currency at the airport?",
      answer: "Airport currency exchanges typically have less favorable rates and higher fees. Better options include using your bank, ATMs at your destination, or pre-ordering currency from your bank before travel."
    },
    {
      question: "What's the difference between the exchange rate I see here and what I get at a bank?",
      answer: "Banks and exchange services add a markup (spread) to the market rate. They may also charge transaction fees. The interbank rate (what you see in calculators) is typically better than what consumers get."
    }
  ];

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between major world currencies with live rates"
      category="conversion"
      calculatorId="currency"
      howItWorks="This currency converter allows you to convert between major world currencies. Select your source currency and target currency, enter the amount, and get instant conversion results. Note: This calculator uses sample exchange rates for demonstration. For actual transactions, always use current rates from reliable financial sources."
      formula="Converted Amount = (Input Amount / Source Rate) × Target Rate (all rates relative to USD)"
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="100"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fromCurrency">From</Label>
            <Select value={fromCurrency} onValueChange={handleFromCurrencyChange}>
              <SelectTrigger id="fromCurrency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="toCurrency">To</Label>
            <Select value={toCurrency} onValueChange={handleToCurrencyChange}>
              <SelectTrigger id="toCurrency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result !== null && amount && (
          <div className="p-6 bg-gradient-to-br from-primary/10 to-primary-accent/10 rounded-lg border border-primary text-center hover:scale-[1.02] transition-all duration-300 animate-fade-in">
            <p className="text-sm font-medium text-muted-foreground">Converted Amount</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
              {currencies.find(c => c.code === toCurrency)?.symbol}{result.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {currencies.find(c => c.code === fromCurrency)?.symbol}{amount} {fromCurrency} = {currencies.find(c => c.code === toCurrency)?.symbol}{result} {toCurrency}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Exchange Rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
            </p>
          </div>
        )}

        <div className="p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> These are sample exchange rates for demonstration purposes only. 
            For actual currency exchange, please use real-time rates from your bank or a reputable financial service.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CurrencyConverter;
