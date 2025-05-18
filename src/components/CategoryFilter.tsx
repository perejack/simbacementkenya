interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'cement', label: 'Cement Products' },
  { id: 'steel', label: 'Steel Products' },
  { id: 'tanks', label: 'Water Tanks' },
  { id: 'roofing', label: 'Roofing Materials' },
  { id: 'construction', label: 'Building Supplies' }
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}