'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { DonutChart } from '@/components/charts/DonutChart';
import { Decimal } from 'decimal.js';

export default function NpsCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [contribution, setContribution] = useState(5000);
  const [roi, setRoi] = useState(10);
  const [annuityRate, setAnnuityRate] = useState(6);

  const [results, setResults] = useState<{ corpus: number; lumpSum: number; pension: number } | null>(null);
  
  const calculateNps = () => {
    const yearsToRetire = new Decimal(60).minus(currentAge);
    if (yearsToRetire.lessThanOrEqualTo(0)) {
        setResults(null);
        return;
    }
    const monthlyRate = new Decimal(roi).div(100).div(12);
    const n = yearsToRetire.mul(12);
    const monthlyContribution = new Decimal(contribution);

    const corpus = monthlyContribution.times(
      (monthlyRate.plus(1).pow(n.toNumber()).minus(1)).div(monthlyRate)
    ).times(monthlyRate.plus(1));

    const lumpSum = corpus.mul(0.6);
    const annuityCorpus = corpus.mul(0.4);
    
    const monthlyPension = annuityCorpus.mul(new Decimal(annuityRate).div(100)).div(12);

    setResults({
      corpus: corpus.toDP(0).toNumber(),
      lumpSum: lumpSum.toDP(0).toNumber(),
      pension: monthlyPension.toDP(0).toNumber(),
    });
  };
  
  const chartRings = results ? [
    {
        data: [{name: 'Lump Sum', value: results.lumpSum}, {name: 'Annuity', value: results.corpus - results.lumpSum}],
        colors: ['#4A55A2', '#7885CB']
    }
  ] : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">NPS Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Your Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><label>Current Age</label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} /></div>
            <div><label>Monthly Contribution</label><Input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} /></div>
            <div><label>Expected ROI on NPS (%)</label><Slider value={[roi]} onValueChange={(v) => setRoi(v[0])} max={15} step={0.5} /><span>{roi}%</span></div>
            <div><label>Annuity Rate for Pension (%)</label><Slider value={[annuityRate]} onValueChange={(v) => setAnnuityRate(v[0])} max={10} step={0.5} /><span>{annuityRate}%</span></div>
            <Button onClick={calculateNps} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4">
                 <div className="h-64">
                    <DonutChart rings={chartRings} />
                </div>
                <div className="text-center">
                    <p>Total Corpus at 60</p>
                    <p className="text-4xl font-bold">₹ {results.corpus}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p>Lump Sum (60%)</p>
                    <p className="text-2xl font-bold">₹ {results.lumpSum}</p>
                  </div>
                   <div>
                    <p>Monthly Pension</p>
                    <p className="text-2xl font-bold">₹ {results.pension}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
