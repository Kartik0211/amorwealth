'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Decimal } from 'decimal.js';

export default function AdvanceTaxCalculatorPage() {
  const [salaryIncome, setSalaryIncome] = useState(1200000);
  const [capitalGains, setCapitalGains] = useState(0);
  const [businessIncome, setBusinessIncome] = useState(0);
  const [tdsDeducted, setTdsDeducted] = useState(0);

  const [installments, setInstallments] = useState<{ dueDate: string; amount: number }[]>([]);

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

  const calculateAdvanceTax = () => {
    const totalIncome = new Decimal(salaryIncome).plus(capitalGains).plus(businessIncome);
    const standardDeduction = new Decimal(50000);
    const taxableIncome = totalIncome.minus(standardDeduction);
    
    const totalTax = calculateNewRegimeTax(taxableIncome);
    const advanceTaxPayable = totalTax.minus(tdsDeducted);

    if (advanceTaxPayable.lessThan(10000)) {
        setInstallments([]);
        return;
    }

    const newInstallments = [
      { dueDate: 'June 15', amount: advanceTaxPayable.mul(0.15).toDP(0).toNumber() },
      { dueDate: 'September 15', amount: advanceTaxPayable.mul(0.45).toDP(0).toNumber() },
      { dueDate: 'December 15', amount: advanceTaxPayable.mul(0.75).toDP(0).toNumber() },
      { dueDate: 'March 15', amount: advanceTaxPayable.mul(1).toDP(0).toNumber() },
    ];
    setInstallments(newInstallments);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Advance Tax Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Income Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label>Income from Salary</label>
              <Input type="number" value={salaryIncome} onChange={(e) => setSalaryIncome(Number(e.target.value))} />
            </div>
            <div>
              <label>Capital Gains</label>
              <Input type="number" value={capitalGains} onChange={(e) => setCapitalGains(Number(e.target.value))} />
            </div>
            <div>
              <label>Business Income</label>
              <Input type="number" value={businessIncome} onChange={(e) => setBusinessIncome(Number(e.target.value))} />
            </div>
            <div>
              <label>TDS Deducted</label>
              <Input type="number" value={tdsDeducted} onChange={(e) => setTdsDeducted(Number(e.target.value))} />
            </div>
            <Button onClick={calculateAdvanceTax} className="w-full">Calculate</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advance Tax Installments</CardTitle>
          </CardHeader>
          <CardContent>
            {installments.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Cumulative Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {installments.map((installment) => (
                    <TableRow key={installment.dueDate}>
                      <TableCell>{installment.dueDate}</TableCell>
                      <TableCell className="text-right">₹ {installment.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
