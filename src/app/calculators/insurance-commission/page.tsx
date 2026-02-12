'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Decimal } from 'decimal.js';

export default function InsuranceCommissionAnalyserPage() {
  const [premium, setPremium] = useState(50000);
  const [term, setTerm] = useState(20);
  const [policyType, setPolicyType] = useState('endowment');

  const [commission, setCommission] = useState(0);

  const commissionRates = {
    term: { firstYear: 0.3, subsequent: 0.05 },
    endowment: { firstYear: 0.2, subsequent: 0.07 },
    ulip: { firstYear: 0.1, subsequent: 0.03 },
  };

  const calculateCommission = () => {
    const annualPremium = new Decimal(premium);
    const policyTerm = new Decimal(term);
    const rates = commissionRates[policyType as keyof typeof commissionRates];

    const firstYearCommission = annualPremium.mul(rates.firstYear);
    const subsequentYearsCommission = annualPremium.mul(rates.subsequent).mul(policyTerm.minus(1));

    const totalCommission = firstYearCommission.plus(subsequentYearsCommission);
    setCommission(totalCommission.toDP(0).toNumber());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Insurance Commission Analyser</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Policy Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Annual Premium</label>
              <Input type="number" value={premium} onChange={(e) => setPremium(Number(e.target.value))} />
            </div>
            <div>
              <label>Policy Term (years)</label>
              <Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
            </div>
            <div>
              <label>Policy Type</label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term">Term Plan</SelectItem>
                  <SelectItem value="endowment">Endowment Plan</SelectItem>
                  <SelectItem value="ulip">ULIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateCommission} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Estimated Commission</CardTitle></CardHeader>
          <CardContent>
            {commission > 0 && (
              <div className="text-center">
                <p>Total Commission Paid to Agent</p>
                <p className="text-4xl font-bold">₹ {commission}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
