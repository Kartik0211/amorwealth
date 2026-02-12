'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Decimal } from 'decimal.js';

export default function LoanPrepaymentCalculatorPage() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [prepayment, setPrepayment] = useState(100000);

  const [results, setResults] = useState<{ interestSaved: number; tenureReduction: number } | null>(null);

  const calculateEmi = (p: Decimal, r: Decimal, t: Decimal) => {
    const monthlyRate = r.div(100).div(12);
    const months = t.mul(12);
    if (p.isZero() || r.isZero() || t.isZero()) return new Decimal(0);
    const emi = p.mul(monthlyRate).mul(monthlyRate.plus(1).pow(months.toNumber())).div(monthlyRate.plus(1).pow(months.toNumber()).minus(1));
    return emi;
  };

  const calculatePrepayment = () => {
    const p = new Decimal(principal);
    const r = new Decimal(rate);
    const t = new Decimal(tenure);
    const prepay = new Decimal(prepayment);

    const emi = calculateEmi(p, r, t);
    if (emi.isZero()) return;

    const originalTotalInterest = emi.mul(t.mul(12)).minus(p);

    // After prepayment
    const newPrincipal = p.minus(prepay);
    const monthlyRate = r.div(100).div(12);
    
    // Calculate new tenure in months
    const n = new Decimal(-1).div(monthlyRate.plus(1).log()).mul(
        (emi.div(emi.minus(newPrincipal.mul(monthlyRate)))).log()
    );
    
    const newTenureInMonths = n.ceil().toNumber();

    const newTotalPayment = emi.mul(newTenureInMonths);
    const newTotalInterest = newTotalPayment.minus(newPrincipal);

    const interestSaved = originalTotalInterest.minus(newTotalInterest);
    const tenureReduction = t.mul(12).minus(newTenureInMonths);

    setResults({
      interestSaved: interestSaved.toDP(0).toNumber(),
      tenureReduction: tenureReduction.toNumber(),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Loan Prepayment Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Loan Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Outstanding Principal</label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
            </div>
            <div>
              <label>Interest Rate (%)</label>
              <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div>
              <label>Remaining Tenure (years)</label>
              <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
             <div>
              <label>Prepayment Amount</label>
              <Input type="number" value={prepayment} onChange={(e) => setPrepayment(Number(e.target.value))} />
            </div>
            <Button onClick={calculatePrepayment} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Results</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4 text-center">
                <div>
                  <p>Interest Saved</p>
                  <p className="text-4xl font-bold">₹ {results.interestSaved}</p>
                </div>
                <div>
                  <p>Tenure Reduction (in months)</p>
                  <p className="text-4xl font-bold">{results.tenureReduction} months</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
