import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = ({ category, productCount = 0 }) => {
  return (
    <Link 
      href={`/products?category=${category.name}`}
      className="min-w-[280px] flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative h-44 w-full">
        <Image
          src={category.image || '/images/curtain-placeholder.jpg'}
          alt={category.name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
        <p className="text-base text-gray-600">{category.name} ({productCount})</p>
      </div>
    </Link>
  );
};

export default CategoryCard;