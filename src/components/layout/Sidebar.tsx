import Link from 'next/link';

const categories = [
  { name: 'Income Tax', path: '/calculators/tax' },
  { name: 'Investment', path: '/calculators/investment' },
  { name: 'Loan & Debt', path: '/calculators/loan' },
  { name: 'Insurance', path: '/calculators/insurance' },
  { name: 'Retirement', path: '/calculators/retirement' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-pure-white p-4 border-r">
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.name} className="mb-2">
              <Link href={category.path} className="text-dark-charcoal hover:text-amorwealth-indigo">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
