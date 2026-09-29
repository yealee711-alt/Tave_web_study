import type { Category } from '../types'

type CategoryFilterProps = {
  selectedCategory: Category | 'All'
  onCategoryChange: (category: Category | 'All') => void
}
const categories: (Category | 'All')[] = [
    'All', 'Study', 'Personal', 'Work'
  ]
function CategoryFilter({
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-rose-400 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter