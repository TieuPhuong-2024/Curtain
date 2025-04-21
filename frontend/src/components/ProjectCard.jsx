'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaImages, FaVideo, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const { title, description, location, type, images, videos } = project;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openVideo = (index) => {
    setCurrentVideoIndex(index);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
      {/* Main image with navigation */}
      <div className="relative h-80 w-full">
        <Image
          src={images[currentImageIndex]}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-opacity duration-300"
        />
        
        {/* Image navigation buttons */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
        
        {/* Project type badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md font-medium">
            {type}
          </span>
        </div>
      </div>
      
      {/* Project details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        
        {location && (
          <div className="flex items-center text-gray-600 mb-3">
            <FaMapMarkerAlt className="mr-1 text-blue-600" />
            <span>{location}</span>
          </div>
        )}
        
        <p className="text-gray-700 mb-4">{description}</p>
        
        {/* Media buttons */}
        <div className="flex gap-3">
          {images.length > 0 && (
            <button 
              onClick={() => openLightbox(0)}
              className="flex items-center bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 transition-colors"
            >
              <FaImages className="mr-2" />
              Xem tất cả ảnh ({images.length})
            </button>
          )}
          
          {videos && videos.length > 0 && (
            <button 
              onClick={() => openVideo(0)}
              className="flex items-center bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors"
            >
              <FaVideo className="mr-2" />
              Xem video ({videos.length})
            </button>
          )}
        </div>
      </div>
      
      {/* Thumbnail preview */}
      {images.length > 1 && (
        <div className="px-5 pb-5 overflow-x-auto">
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`relative w-16 h-16 flex-shrink-0 cursor-pointer border-2 rounded overflow-hidden ${
                  idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Lightbox for full-screen images */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-full max-h-screen flex items-center justify-center">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Close lightbox"
            >
              <FaTimes size={20} />
            </button>
            
            <button 
              onClick={handleLightboxPrev}
              className="absolute left-4 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <button 
              onClick={handleLightboxNext}
              className="absolute right-4 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
            
            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <Image
                src={images[lightboxIndex]}
                alt={`Full size ${lightboxIndex + 1}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
      
      {/* Video modal */}
      {showVideo && videos && videos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Close video"
            >
              <FaTimes size={20} />
            </button>
            
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={videos[currentVideoIndex]}
                title={`Video ${currentVideoIndex + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            {videos.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentVideoIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentVideoIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                    aria-label={`Switch to video ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}