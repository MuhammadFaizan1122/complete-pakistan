'use client'
import React from 'react';

const StepIndicator = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center md:justify-start mb-8 gap-4 sm:space-x-4 md:space-x-8">
            <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 ${currentStep >= 1 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                    1
                </div>
                <span className={`text-[16px] font-medium ${currentStep >= 1 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Personal Details</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 ${currentStep >= 2 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                    2
                </div>
                <span className={`text-[16px] font-medium ${currentStep >= 2 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Professional Info</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 ${currentStep >= 3 ? 'bg-[#00956B] text-white' : 'bg-gray-200 text-gray-600'} rounded-full flex items-center justify-center text-[16px] font-semibold`}>
                    3
                </div>
                <span className={`text-[16px] font-medium ${currentStep >= 3 ? 'text-[#00956B]' : 'text-gray-500'} hidden sm:block`}>Documents</span>
            </div>
        </div>
    );
};

export default StepIndicator;