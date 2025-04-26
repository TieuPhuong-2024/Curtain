import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryCard from './CategoryCard';

const CategoryScroll = ({ categories, productCounts = {} }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) {
    return <div className="text-center py-12 text-lg">Chưa có danh mục nào.</div>;
  }

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors -ml-4"
        aria-label="Scroll left"
      >
        <FaChevronLeft className="text-gray-700 text-xl" />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors -mr-4"
        aria-label="Scroll right"
      >
        <FaChevronRight className="text-gray-700 text-xl" />
      </button>
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-6 pt-3 px-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Add extra padding at the start */}
        <div className="pl-3"></div>
        
        {categories.map(category => (
          <div key={category._id} className="px-3 snap-start">
            <CategoryCard 
              category={category} 
              productCount={productCounts[category._id] || 0} 
            />
          </div>
        ))}
        
        {/* Add extra padding at the end */}
        <div className="pr-3"></div>
      </div>
      
      {/* Custom scrollbar styling */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryScroll;