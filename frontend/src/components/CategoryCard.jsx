import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = ({ category, productCount = 0 }) => {
  return (
    <Link 
      href={`/products?category=${category.name}`}
      className="min-w-[200px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative h-32 w-full">
        <Image
          src={category.image || '/images/curtain-placeholder.jpg'}
          alt={category.name}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.name} ({productCount})</p>
      </div>
    </Link>
  );
};

export default CategoryCard; 