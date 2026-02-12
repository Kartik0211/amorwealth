'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BarChartComponent } from '@/components/charts/BarChart';
import { Decimal } from 'decimal.js';

export default function TaxRegimeCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState(1000000);
  const [hraExemption, setHraExemption] = useState(0);
  const [ltaExemption, setLtaExemption] = useState(0);
  const [deduction80c, setDeduction80c] = useState(150000);
  const [deduction80d, setDeduction80d] = useState(25000);
  const [deduction80ccd, setDeduction80ccd] = useState(50000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(200000);

  const [oldRegimeTax, setOldRegimeTax] = useState(0);
  const [newRegimeTax, setNewRegimeTax] = useState(0);
  const [recommendation, setRecommendation] = useState('');

  const calculateOldRegimeTax = (income: Decimal) => {
    if (income.lessThanOrEqualTo(500000)) {
      return new Decimal(0); // Rebate
    }

    let tax: Decimal;
    if (income.lessThanOrEqualTo(250000)) {
      tax = new Decimal(0);
    } else if (income.lessThanOrEqualTo(500000)) {
      tax = income.minus(250000).mul(0.05);
    } else if (income.lessThanOrEqualTo(1000000)) {
      tax = new Decimal(12500).plus(income.minus(500000).mul(0.2));
    } else {
      tax = new Decimal(112500).plus(income.minus(1000000).mul(0.3));
    }

    const cess = tax.mul(0.04);
    return tax.plus(cess);
  };

  const calculateNewRegimeTax = (income: Decimal) => {
    if (income.lessThanOrEqualTo(700000)) {
      return new Decimal(0); // Rebate
    }

    let tax: Decimal;
    if (income.lessThanOrEqualTo(300000)) {
        tax = new Decimal(0);
    } else if (income.lessThanOrEqualTo(700000)) {
        tax = income.minus(300000).mul(0.05);
    } else if (income.lessThanOrEqualTo(1000000)) {
        tax = new Decimal(20000).plus(income.minus(700000).mul(0.10));
    } else if (income.lessThanOrEqualTo(1200000)) {
        tax = new Decimal(50000).plus(income.minus(1000000).mul(0.15));
    } else if (income.lessThanOrEqualTo(1500000)) {
        tax = new Decimal(80000).plus(income.minus(1200000).mul(0.20));
    } else {
        tax = new Decimal(140000).plus(income.minus(1500000).mul(0.30));
    }

    const cess = tax.mul(0.04);
    return tax.plus(cess);
  };

  const calculateTax = () => {
    const gross = new Decimal(grossSalary);
    const standardDeduction = new Decimal(50000);

    // Old Regime Calculation
    const deductions = new Decimal(hraExemption)
      .plus(ltaExemption)
      .plus(deduction80c)
      .plus(deduction80d)
      .plus(deduction80ccd)
      .plus(homeLoanInterest);

    let taxableIncomeOld = gross.minus(deductions).minus(standardDeduction);
    if (taxableIncomeOld.lessThan(0)) taxableIncomeOld = new Decimal(0);

    const oldTax = calculateOldRegimeTax(taxableIncomeOld);
    setOldRegimeTax(oldTax.toDP(0).toNumber());

    // New Regime Calculation
    let taxableIncomeNew = gross.minus(standardDeduction);
    if (taxableIncomeNew.lessThan(0)) taxableIncomeNew = new Decimal(0);

    const newTax = calculateNewRegimeTax(taxableIncomeNew);
    setNewRegimeTax(newTax.toDP(0).toNumber());

    if (oldTax.lessThan(newTax)) {
      setRecommendation('Old regime is better for you.');
    } else {
      setRecommendation('New regime is better for you.');
    }
  };

  const chartData = [
    { name: 'Old Regime', tax: oldRegimeTax },
    { name: 'New Regime', tax: newRegimeTax },
  ];

  const chartBars = [{ dataKey: 'tax', fill: '#4A55A2' }];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Old vs. New Tax Regime Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Gross Salary</label>
              <Input type="number" value={grossSalary} onChange={(e) => setGrossSalary(Number(e.target.value))} />
            </div>
            <div>
              <label>HRA Exemption</label>
              <Input type="number" value={hraExemption} onChange={(e) => setHraExemption(Number(e.target.value))} />
            </div>
            <div>
              <label>LTA Exemption</label>
              <Input type="number" value={ltaExemption} onChange={(e) => setLtaExemption(Number(e.target.value))} />
            </div>
            <div>
              <label>80C Deductions</label>
              <Input type="number" value={deduction80c} onChange={(e) => setDeduction80c(Number(e.target.value))} />
            </div>
            <div>
              <label>80D Deductions</label>
              <Input type="number" value={deduction80d} onChange={(e) => setDeduction80d(Number(e.target.value))} />
            </div>
            <div>
              <label>80CCD Deductions</label>
              <Input type="number" value={deduction80ccd} onChange={(e) => setDeduction80ccd(Number(e.target.value))} />
            </div>
            <div>
              <label>Home Loan Interest</label>
              <Input type="number" value={homeLoanInterest} onChange={(e) => setHomeLoanInterest(Number(e.target.value))} />
            </div>
            <Button onClick={calculateTax} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tax Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {oldRegimeTax > 0 && (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-center">{recommendation}</p>
                <div className="h-64">
                    <BarChartComponent data={chartData} bars={chartBars} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p>Old Regime Tax</p>
                    <p className="text-2xl font-bold">₹ {oldRegimeTax}</p>
                  </div>
                  <div>
                    <p>New Regime Tax</p>
                    <p className="text-2xl font-bold">₹ {newRegimeTax}</p>
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
