'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { LineGraph } from '@/components/charts/LineGraph';
import { Decimal } from 'decimal.js';

export default function RetirementCorpusCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const [results, setResults] = useState<{ corpus: number; monthlySavings: number } | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  const calculateCorpus = () => {
    const yearsToRetire = new Decimal(retirementAge).minus(currentAge);
    const postRetirementYears = new Decimal(lifeExpectancy).minus(retirementAge);
    const inflation = new Decimal(inflationRate).div(100);
    const expectedRate = new Decimal(expectedReturn).div(100);

    // Future value of current monthly expenses at retirement
    const futureMonthlyExpenses = new Decimal(monthlyExpenses).times(inflation.plus(1).pow(yearsToRetire.toNumber()));
    const futureAnnualExpenses = futureMonthlyExpenses.mul(12);

    // Corpus calculation (using present value of a growing annuity formula)
    const realRate = expectedRate.minus(inflation).div(inflation.plus(1));
    const corpus = futureAnnualExpenses.div(realRate).times(
      new Decimal(1).minus(
        (new Decimal(1).plus(realRate)).pow(postRetirementYears.negated().toNumber())
      )
    );
    
    // Monthly savings calculation (sinking fund)
    const monthlyRate = expectedRate.div(12);
    const n = yearsToRetire.mul(12);
    const monthlySavings = corpus.mul(monthlyRate).div(
      monthlyRate.plus(1).pow(n.toNumber()).minus(1)
    );

    setResults({
      corpus: corpus.toDP(0).toNumber(),
      monthlySavings: monthlySavings.toDP(0).toNumber(),
    });
    
    const data = [];
    let savingsValue = new Decimal(0);
    for (let year = 1; year <= yearsToRetire.toNumber(); year++) {
        savingsValue = savingsValue.plus(monthlySavings.mul(12)).times(expectedRate.plus(1));
        data.push({name: `Year ${year}`, value: savingsValue.toDP(0).toNumber()});
    }
    setChartData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Retirement Corpus Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><label>Current Age</label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} /></div>
            <div><label>Retirement Age</label><Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} /></div>
            <div><label>Current Monthly Expenses</label><Input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} /></div>
            <div><label>Expected Inflation Rate (%)</label><Slider value={[inflationRate]} onValueChange={(v) => setInflationRate(v[0])} max={15} step={0.5} /><span>{inflationRate}%</span></div>
            <div><label>Life Expectancy</label><Input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Number(e.target.value))} /></div>
             <div><label>Expected Return on Investment (%)</label><Slider value={[expectedReturn]} onValueChange={(v) => setExpectedReturn(v[0])} max={20} step={0.5} /><span>{expectedReturn}%</span></div>
            <Button onClick={calculateCorpus} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4">
                <div className="text-center">
                    <p>Retirement Corpus Required</p>
                    <p className="text-4xl font-bold">₹ {results.corpus}</p>
                </div>
                <div className="text-center">
                    <p>Monthly Savings Needed</p>
                    <p className="text-4xl font-bold">₹ {results.monthlySavings}</p>
                </div>
                 <div className="h-64">
                    <LineGraph data={chartData} lines={[{dataKey: 'value', stroke: '#4A55A2'}]} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
