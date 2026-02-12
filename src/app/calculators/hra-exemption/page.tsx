'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Decimal } from 'decimal.js';

export default function HraExemptionCalculatorPage() {
  const [basicDa, setBasicDa] = useState(500000);
  const [hraReceived, setHraReceived] = useState(200000);
  const [rentPaid, setRentPaid] = useState(240000);
  const [cityType, setCityType] = useState('metro');

  const [exemptHra, setExemptHra] = useState(0);
  const [taxableHra, setTaxableHra] = useState(0);

  const calculateHraExemption = () => {
    const salary = new Decimal(basicDa);
    const hra = new Decimal(hraReceived);
    const rent = new Decimal(rentPaid);

    const rentInExcessOfSalary = rent.minus(salary.mul(0.1));
    const cityPercentage = cityType === 'metro' ? 0.5 : 0.4;
    const percentageOfSalary = salary.mul(cityPercentage);

    const exempt = Decimal.min(hra, rentInExcessOfSalary, percentageOfSalary);
    const finalExemptHra = exempt.lessThan(0) ? new Decimal(0) : exempt;
    
    setExemptHra(finalExemptHra.toDP(0).toNumber());
    setTaxableHra(hra.minus(finalExemptHra).toDP(0).toNumber());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">HRA Exemption Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Basic + DA Salary</label>
              <Input type="number" value={basicDa} onChange={(e) => setBasicDa(Number(e.target.value))} />
            </div>
            <div>
              <label>HRA Received</label>
              <Input type="number" value={hraReceived} onChange={(e) => setHraReceived(Number(e.target.value))} />
            </div>
            <div>
              <label>Actual Rent Paid</label>
              <Input type="number" value={rentPaid} onChange={(e) => setRentPaid(Number(e.target.value))} />
            </div>
            <div>
              <label>City Type</label>
              <Select value={cityType} onValueChange={setCityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metro">Metro</SelectItem>
                  <SelectItem value="non-metro">Non-Metro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateHraExemption} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>HRA Exemption Details</CardTitle>
          </CardHeader>
          <CardContent>
            {exemptHra > 0 && (
              <div className="space-y-4 text-center">
                <div>
                  <p>Exempt HRA</p>
                  <p className="text-2xl font-bold">₹ {exemptHra}</p>
                </div>
                <div>
                  <p>Taxable HRA</p>
                  <p className="text-2xl font-bold">₹ {taxableHra}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
