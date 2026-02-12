'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Decimal } from 'decimal.js';

export default function LoanRefinanceCalculatorPage() {
  const [principal, setPrincipal] = useState(5000000);
  const [currentRate, setCurrentRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);
  const [newRate, setNewRate] = useState(8.0);
  const [fees, setFees] = useState(5000);

  const [results, setResults] = useState<{ savings: number; breakEven: number } | null>(null);

  const calculateEmi = (p: Decimal, r: Decimal, t: Decimal) => {
    const monthlyRate = r.div(100).div(12);
    const months = t.mul(12);
    if (p.isZero() || r.isZero() || t.isZero()) return new Decimal(0);
    return p.mul(monthlyRate).mul(monthlyRate.plus(1).pow(months.toNumber())).div(monthlyRate.plus(1).pow(months.toNumber()).minus(1));
  };

  const calculateRefinance = () => {
    const p = new Decimal(principal);
    const oldR = new Decimal(currentRate);
    const t = new Decimal(tenure);
    const newR = new Decimal(newRate);
    const processingFees = new Decimal(fees);

    const oldEmi = calculateEmi(p, oldR, t);
    const newEmi = calculateEmi(p, newR, t);

    const monthlySaving = oldEmi.minus(newEmi);
    if (monthlySaving.lessThanOrEqualTo(0)) {
        setResults({ savings: 0, breakEven: 0 });
        return;
    }

    const totalSaving = monthlySaving.mul(t.mul(12)).minus(processingFees);
    const breakEvenInMonths = processingFees.div(monthlySaving).ceil();

    setResults({
      savings: totalSaving.toDP(0).toNumber(),
      breakEven: breakEvenInMonths.toNumber(),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Loan Refinance Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Loan Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Outstanding Principal</label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div>
              <label>Current Interest Rate (%)</label>
              <Input type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} />
            </div>
            <div>
              <label>Remaining Tenure (years)</label>
              <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div>
              <label>New Lender's Rate (%)</label>
              <Input type="number" value={newRate} onChange={(e) => setNewRate(Number(e.target.value))} />
            </div>
            <div>
              <label>Processing Fees/Charges</label>
              <Input type="number" value={fees} onChange={(e) => setFees(Number(e.target.value))} />
            </div>
            <Button onClick={calculateRefinance} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4 text-center">
                <div>
                  <p>Net Savings</p>
                  <p className="text-4xl font-bold">₹ {results.savings}</p>
                </div>
                <div>
                  <p>Break-even Period (in months)</p>
                  <p className="text-4xl font-bold">{results.breakEven} months</p>
                </div>
              </div>
            )}
            {results && results.savings <=0 && (
                 <div className="text-center">
                    <p className='text-red-500'>Refinancing is not beneficial.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
