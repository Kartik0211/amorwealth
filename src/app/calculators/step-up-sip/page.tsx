'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { LineGraph } from '@/components/charts/LineGraph';
import { Decimal } from 'decimal.js';

export default function StepUpSipCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [rateOfReturn, setRateOfReturn] = useState(12);
  const [tenure, setTenure] = useState(10);

  const [results, setResults] = useState<{ invested: number; wealth: number; finalValue: number; standardSipValue: number } | null>(null);
  const [chartData, setChartData] = useState<{ name: string; standard: number; stepUp: number }[]>([]);

  const calculateSip = () => {
    const monthlyInvestment = new Decimal(initialInvestment);
    const annualRate = new Decimal(rateOfReturn).div(100);
    const monthlyRate = annualRate.div(12);
    const years = tenure;
    const stepUp = new Decimal(stepUpPercentage).div(100);

    let futureValue = new Decimal(0);
    let currentInvestment = monthlyInvestment;
    let totalInvested = new Decimal(0);

    const data = [];
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvested = totalInvested.plus(currentInvestment);
        futureValue = futureValue.plus(currentInvestment).times(monthlyRate.plus(1));
      }
      currentInvestment = currentInvestment.times(stepUp.plus(1));
      data.push({ name: `Year ${year}`, stepUp: futureValue.toDP(0).toNumber(), standard: 0 });
    }
    
    // Standard SIP calculation for comparison
    const n = years * 12;
    const standardSipValue = monthlyInvestment.times(
        (monthlyRate.plus(1).pow(n).minus(1)).div(monthlyRate)
    ).times(monthlyRate.plus(1));

    // Add standard SIP value to chart data
    let standardFutureValue = new Decimal(0);
    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        standardFutureValue = standardFutureValue.plus(monthlyInvestment).times(monthlyRate.plus(1));
      }
      data[year-1].standard = standardFutureValue.toDP(0).toNumber();
    }


    setResults({
      invested: totalInvested.toDP(0).toNumber(),
      wealth: futureValue.minus(totalInvested).toDP(0).toNumber(),
      finalValue: futureValue.toDP(0).toNumber(),
      standardSipValue: standardSipValue.toDP(0).toNumber()
    });
    setChartData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Step-Up SIP Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Investment Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Initial Monthly Investment</label>
              <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
            </div>
            <div>
              <label>Annual Step-Up (%)</label>
              <Slider value={[stepUpPercentage]} onValueChange={(v) => setStepUpPercentage(v[0])} max={30} step={1} />
              <span>{stepUpPercentage}%</span>
            </div>
            <div>
              <label>Expected Rate of Return (%)</label>
              <Slider value={[rateOfReturn]} onValueChange={(v) => setRateOfReturn(v[0])} max={30} step={0.5} />
              <span>{rateOfReturn}%</span>
            </div>
            <div>
              <label>Investment Tenure (years)</label>
              <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} max={40} step={1} />
              <span>{tenure} years</span>
            </div>
            <Button onClick={calculateSip} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4">
                <div className="text-center">
                    <p>Final Value (Step-Up SIP)</p>
                    <p className="text-4xl font-bold">₹ {results.finalValue}</p>
                </div>
                 <div className="text-center">
                    <p>Final Value (Standard SIP)</p>
                    <p className="text-2xl font-bold">₹ {results.standardSipValue}</p>
                </div>
                <div className="h-64">
                    <LineGraph data={chartData} lines={[{dataKey: 'stepUp', stroke: '#4A55A2'}, {dataKey: 'standard', stroke: '#7885CB'}]} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
