'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Decimal } from 'decimal.js';

export default function GratuityCalculatorPage() {
  const [salary, setSalary] = useState(50000);
  const [years, setYears] = useState(5);
  const [gratuity, setGratuity] = useState(0);

  const calculateGratuity = () => {
    const lastSalary = new Decimal(salary);
    const yearsOfService = new Decimal(years);

    if (yearsOfService.lessThan(5)) {
      setGratuity(0);
      return;
    }

    // Round years of service to the nearest integer
    const roundedYears = yearsOfService.round();

    const gratuityAmount = lastSalary.mul(15).mul(roundedYears).div(26);
    setGratuity(gratuityAmount.toDP(0).toNumber());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Gratuity Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Last Drawn Salary (Basic + DA)</label>
              <Input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
            </div>
            <div>
              <label>Years of Service</label>
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
            <Button onClick={calculateGratuity} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gratuity Amount</CardTitle>
          </CardHeader>
          <CardContent>
            {gratuity > 0 && (
              <div className="text-center">
                <p>Total Gratuity Payable</p>
                <p className="text-4xl font-bold">₹ {gratuity}</p>
              </div>
            )}
             {years < 5 && (
              <div className="text-center">
                <p className='text-red-500'>Gratuity is only applicable after 5 years of service.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
