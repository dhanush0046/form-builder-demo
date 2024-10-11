"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FiImage, FiPlusCircle, FiEdit } from 'react-icons/fi';

const FormCover: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div 
      className="relative w-full h-48 mb-8 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {coverImage ? (
        <Image
          src={coverImage}
          alt="Form cover"
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-100" />
      )}

      {logo && (
        <div className="absolute top-4 left-4 z-10">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
          {/* Changed background to gray and added border */}
          <button className="text-gray-800 border border-gray-300 rounded-lg px-2 hover:bg-gray-200 transition-colors" onClick={() => {}}>
            <FiPlusCircle className="mr-2 inline" /> Add logo
          </button>
          <button className="text-gray-800 border border-gray-300 rounded-lg px-2 hover:bg-gray-200 transition-colors" onClick={() => {}}>
            <FiImage className="mr-2 inline" /> Add cover
          </button>
          <button className="text-gray-800 border border-gray-300 rounded-lg px-2 hover:bg-gray-200 transition-colors" onClick={() => {}}>
            <FiEdit className="mr-2 inline" /> Design
          </button>
        </div>
      )}
    </div>
  );
};

export default FormCover;

