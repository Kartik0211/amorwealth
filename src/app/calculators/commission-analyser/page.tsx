'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { LineGraph } from '@/components/charts/LineGraph';
import { Decimal } from 'decimal.js';

export default function CommissionAnalyserPage() {
  const [investment, setInvestment] = useState(100000);
  const [tenure, setTenure] = useState(10);
  const [expenseDifference, setExpenseDifference] = useState(1.5);

  const [results, setResults] = useState<{ commission: number; extraWealth: number } | null>(null);
  const [chartData, setChartData] = useState<{ name: string; direct: number; regular: number }[]>([]);

  const calculateCommission = () => {
    const principal = new Decimal(investment);
    const years = tenure;
    const diff = new Decimal(expenseDifference).div(100);

    // Assuming a rate of return of 12% for both plans before expense ratio
    const rateOfReturn = new Decimal(0.12);

    const directRate = rateOfReturn;
    const regularRate = rateOfReturn.minus(diff);

    const directValue = principal.times(directRate.plus(1).pow(years));
    const regularValue = principal.times(regularRate.plus(1).pow(years));

    const extraWealth = directValue.minus(regularValue);

    // The commission is not a simple calculation. It's the opportunity cost.
    // I will show the extra wealth as the "cost of commission".

    setResults({
      commission: extraWealth.toDP(0).toNumber(),
      extraWealth: extraWealth.toDP(0).toNumber(),
    });

    const data = [];
    for (let year = 1; year <= years; year++) {
      const direct = principal.times(directRate.plus(1).pow(year));
      const regular = principal.times(regularRate.plus(1).pow(year));
      data.push({ name: `Year ${year}`, direct: direct.toDP(0).toNumber(), regular: regular.toDP(0).toNumber() });
    }
    setChartData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mutual Fund Commission Analyser</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Investment Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Total Investment</label>
              <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
            </div>
            <div>
              <label>Investment Tenure (years)</label>
              <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} max={40} step={1} />
              <span>{tenure} years</span>
            </div>
            <div>
              <label>Expense Ratio Difference (%)</label>
              <Slider value={[expenseDifference]} onValueChange={(v) => setExpenseDifference(v[0])} max={3} step={0.1} />
              <span>{expenseDifference}%</span>
            </div>
            <Button onClick={calculateCommission} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4">
                <div className="text-center">
                    <p>Potential Extra Wealth with Direct Plan</p>
                    <p className="text-4xl font-bold">₹ {results.extraWealth}</p>
                </div>
                 <div className="h-64">
                    <LineGraph data={chartData} lines={[{dataKey: 'direct', stroke: '#4A55A2'}, {dataKey: 'regular', stroke: '#7885CB'}]} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
