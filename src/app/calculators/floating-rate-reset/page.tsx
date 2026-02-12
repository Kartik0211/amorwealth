'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { Decimal } from 'decimal.js';

export default function FloatingRateResetCalculatorPage() {
  const [principal, setPrincipal] = useState(5000000);
  const [oldRate, setOldRate] = useState(8.0);
  const [newRate, setNewRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);
  const [impactOn, setImpactOn] = useState('emi'); // 'emi' or 'tenure'

  const [results, setResults] = useState<{ newEmi?: number; newTenure?: number, oldEmi: number } | null>(null);

  const calculateEmi = (p: Decimal, r: Decimal, t: Decimal) => {
    const monthlyRate = r.div(100).div(12);
    const months = t.mul(12);
    if (p.isZero() || r.isZero() || t.isZero()) return new Decimal(0);
    return p.mul(monthlyRate).mul(monthlyRate.plus(1).pow(months.toNumber())).div(monthlyRate.plus(1).pow(months.toNumber()).minus(1));
  };
  
  const calculateNewTenure = (p: Decimal, r: Decimal, emi: Decimal) => {
    const monthlyRate = r.div(100).div(12);
    if (emi.isZero() || p.isZero() || r.isZero()) return new Decimal(0);
    const n = new Decimal(-1).div(monthlyRate.plus(1).log()).mul(
        (emi.div(emi.minus(p.mul(monthlyRate)))).log()
    );
    return n;
  }

  const calculateReset = () => {
    const p = new Decimal(principal);
    const oldR = new Decimal(oldRate);
    const newR = new Decimal(newRate);
    const t = new Decimal(tenure);

    const oldEmi = calculateEmi(p, oldR, t);

    if (impactOn === 'emi') {
      const newEmi = calculateEmi(p, newR, t);
      setResults({ newEmi: newEmi.toDP(0).toNumber(), oldEmi: oldEmi.toDP(0).toNumber() });
    } else {
      const newTenure = calculateNewTenure(p, newR, oldEmi);
      setResults({ newTenure: newTenure.ceil().toNumber(), oldEmi: oldEmi.toDP(0).toNumber() });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Floating Rate Loan Reset Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Loan Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Current Principal</label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div>
              <label>Old Interest Rate (%)</label>
              <Input type="number" value={oldRate} onChange={(e) => setOldRate(Number(e.target.value))} />
            </div>
            <div>
              <label>New Interest Rate (%)</label>
              <Input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} />
            </div>
             <div>
              <label>Remaining Tenure (years)</label>
              <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div className='flex gap-2'>
                <Toggle pressed={impactOn === 'emi'} onPressedChange={() => setImpactOn('emi')}>Impact on EMI</Toggle>
                <Toggle pressed={impactOn === 'tenure'} onPressedChange={() => setImpactOn('tenure')}>Impact on Tenure</Toggle>
            </div>
            <Button onClick={calculateReset} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4 text-center">
                <div>
                  <p>Old EMI</p>
                  <p className="text-2xl font-bold">₹ {results.oldEmi}</p>
                </div>
                {results.newEmi && (
                    <div>
                        <p>New EMI</p>
                        <p className="text-4xl font-bold">₹ {results.newEmi}</p>
                    </div>
                )}
                 {results.newTenure && (
                    <div>
                        <p>New Tenure (months)</p>
                        <p className="text-4xl font-bold">{results.newTenure} months</p>
                    </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
