import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryCard from './CategoryCard';

const CategoryScroll = ({ categories, productCounts = {} }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) {
    return <div className="text-center py-12">Chưa có danh mục nào.</div>;
  }

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors -ml-3"
        aria-label="Scroll left"
      >
        <FaChevronLeft className="text-gray-700" />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors -mr-3"
        aria-label="Scroll right"
      >
        <FaChevronRight className="text-gray-700" />
      </button>
      
      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Add extra padding at the start */}
        <div className="pl-2"></div>
        
        {categories.map(category => (
          <div key={category._id} className="px-2 snap-start">
            <CategoryCard 
              category={category} 
              productCount={productCounts[category._id] || 0} 
            />
          </div>
        ))}
        
        {/* Add extra padding at the end */}
        <div className="pr-2"></div>
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