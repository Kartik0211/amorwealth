'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Decimal } from 'decimal.js';
import { DonutChart } from '@/components/charts/DonutChart';

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEmi = () => {
    const principal = new Decimal(loanAmount);
    const rate = new Decimal(interestRate).div(100).div(12);
    const time = new Decimal(tenure).mul(12);
    const one = new Decimal(1);

    if (principal.isZero() || rate.isZero() || time.isZero()) {
        setEmi(0);
        setTotalInterest(0);
        setTotalPayment(0);
        return;
    }

    const ratePlusOne = rate.plus(one);
    const ratePlusOnePowTime = ratePlusOne.pow(time.toNumber());

    const emiDecimal = principal.mul(rate).mul(ratePlusOnePowTime).div(ratePlusOnePowTime.minus(one));
    const totalPaymentDecimal = emiDecimal.mul(time);
    const totalInterestDecimal = totalPaymentDecimal.minus(principal);
    
    setEmi(emiDecimal.toDP(2).toNumber());
    setTotalPayment(totalPaymentDecimal.toDP(2).toNumber());
    setTotalInterest(totalInterestDecimal.toDP(2).toNumber());
  };

  const ring = {
    data: [
      { name: 'Principal', value: loanAmount },
      { name: 'Interest', value: totalInterest },
    ],
    colors: ['#4A55A2', '#FF9800'],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">EMI Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">
                  Loan Amount
                </label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  max={10000000}
                  step={10000}
                  className="mt-2"
                />
              </div>
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium mb-1">
                  Interest Rate (%)
                </label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  max={20}
                  step={0.1}
                  className="mt-2"
                />
              </div>
              <div>
                <label htmlFor="tenure" className="block text-sm font-medium mb-1">
                  Loan Tenure (years)
                </label>
                <Input
                  id="tenure"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  max={30}
                  step={1}
                  className="mt-2"
                />
              </div>
              <Button onClick={calculateEmi} className="w-full">
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {emi > 0 && (
              <div className="flex flex-col items-center">
                <p className="text-lg">Your Monthly EMI is</p>
                <p className="text-4xl font-bold">₹ {emi}</p>

                <div className="w-full mt-4">
                  <DonutChart rings={[ring]} />
                </div>

                <div className="w-full mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-lg font-semibold">Total Principal</p>
                        <p className="text-2xl">₹ {loanAmount}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Total Interest</p>
                        <p className="text-2xl">₹ {totalInterest}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-lg font-semibold">Total Payment</p>
                        <p className="text-2xl">₹ {totalPayment}</p>
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
