'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Decimal } from 'decimal.js';

export default function InsuranceSurrenderCalculatorPage() {
  const [term, setTerm] = useState(20);
  const [premiumsPaid, setPremiumsPaid] = useState(5);
  const [premiumAmount, setPremiumAmount] = useState(25000);
  const [sumAssured, setSumAssured] = useState(500000);

  const [results, setResults] = useState<{ gsv: number; ssv: number } | null>(null);

  const calculateSurrenderValue = () => {
    const totalPremiums = new Decimal(premiumsPaid).mul(premiumAmount);
    
    // GSV Calculation (simplified)
    const gsvFactor = new Decimal(0.3); // Assuming 30%
    const gsv = totalPremiums.mul(gsvFactor);

    // SSV Calculation (simplified)
    const paidUpValue = new Decimal(sumAssured).mul(premiumsPaid).div(term);
    const ssvFactor = new Decimal(0.4); // Assuming 40%
    const ssv = paidUpValue.mul(ssvFactor);

    setResults({
      gsv: gsv.toDP(0).toNumber(),
      ssv: ssv.toDP(0).toNumber(),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Insurance Surrender Value Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Policy Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Policy Term (years)</label>
              <Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
            </div>
            <div>
              <label>Number of Premiums Paid</label>
              <Input type="number" value={premiumsPaid} onChange={(e) => setPremiumsPaid(Number(e.target.value))} />
            </div>
            <div>
              <label>Annual Premium Amount</label>
              <Input type="number" value={premiumAmount} onChange={(e) => setPremiumAmount(Number(e.target.value))} />
            </div>
            <div>
              <label>Sum Assured</label>
              <Input type="number" value={sumAssured} onChange={(e) => setSumAssured(Number(e.target.value))} />
            </div>
            <Button onClick={calculateSurrenderValue} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Surrender Value</CardTitle></CardHeader>
          <CardContent>
            {results && (
              <div className="space-y-4 text-center">
                <div>
                  <p>Guaranteed Surrender Value (GSV)</p>
                  <p className="text-4xl font-bold">₹ {results.gsv}</p>
                </div>
                <div>
                  <p>Special Surrender Value (SSV)</p>
                  <p className="text-4xl font-bold">₹ {results.ssv}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
