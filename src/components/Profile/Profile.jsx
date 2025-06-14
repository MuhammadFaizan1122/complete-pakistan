'use client'
import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export default function CreateProfessionalProfile() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        cnicNumber: '',
        passportNumber: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        city: '',
        completeAddress: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        const requiredFields = ['name', 'cnicNumber', 'email', 'phoneNumber'];
        return requiredFields.every(field => formData[field].trim() !== '');
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (!validateStep1()) {
                alert('Please fill in all required fields (Name, CNIC, Email, Phone Number)');
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        } else {
            alert('Form completed! Data saved.');
            console.log('Final Form Data:', formData);
        }
    };

    const handleCancel = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            if (confirm('Are you sure you want to cancel? All data will be lost.')) {
                setFormData({
                    name: '',
                    cnicNumber: '',
                    passportNumber: '',
                    dateOfBirth: '',
                    email: '',
                    phoneNumber: '',
                    city: '',
                    completeAddress: '',
                    appliedPositions: 'Electronic Technician',
                    education: '',
                    gulfExperience: '',
                    gulfLicense: '',
                    pakistaniLicense: '',
                    keySkills: '',
                    description: ''
                });
            }
        }
    };
    const [photoFile, setPhotoFile] = useState(null);
    const [cvFiles, setCvFiles] = useState([]);
    const [certificateFiles, setCertificateFiles] = useState([]);
    const removeFile = (type, index) => {
        if (type === "cv") {
            setCvFiles((prev) => prev.filter((_, i) => i !== index));
        } else if (type === "certificate") {
            setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", photoFile);
        cvFiles.forEach((file, index) => formData.append(`cv[${index}]`, file));
        certificateFiles.forEach((file, index) => formData.append(`certificates[${index}]`, file));

        // Use formData for API call
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === "photo") {
            setPhotoFile(files[0]);
        } else if (name === "cvDocuments") {
            setCvFiles((prev) => [...prev, ...Array.from(files)]);
        } else if (name === "certificates") {
            setCertificateFiles((prev) => [...prev, ...Array.from(files)]);
        }
    };

    return (
        <div className="min-h-screen bg-[#BADDD9] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] shadow-xl max-w-[1440px] p-6 md:p-20 w-[1274px] h-[1076px] my-10">
                {/* Header */}
                <div className="mb-8">
                    <p className="text-2xl md:text-[32px] font-semibold text-black mb-3">
                        Create Your Professional Profile
                    </p>
                    <p className="text-black text-[20px] md:text-base leading-relaxed">
                        Build a comprehensive profile to connect with agencies, agents, and Trade Test Centers
                        for international job opportunities.
                    </p>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-center md:justify-start mb-8 space-x-4 md:space-x-8">
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

                {/* Form Section */}
                <div className="mb-8">
                    {currentStep === 1 && (
                        <>
                            <p className="text-[26px] font-semibold text-black mb-16">Personal Details</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"

                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        CNIC number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="cnicNumber"
                                        value={formData.cnicNumber}
                                        onChange={handleInputChange}
                                        placeholder="00000-0000000-0"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        passport Number
                                    </label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        value={formData.passportNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter passport number"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Date of birth
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            placeholder="dd/mm/yyyy"
                                            className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 pr-12"
                                        />
                                        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email address"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Phone number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                        <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                                            <div className="w-5 h-4 bg-gradient-to-b from-black via-red-500 to-yellow-400 rounded-sm mr-2"></div>
                                            <span className="text-sm text-gray-600">+370</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="phone number"
                                            className="flex-1 !px-4 !py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter your City"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Complete Address
                                    </label>
                                    <input
                                        type="text"
                                        name="completeAddress"
                                        value={formData.completeAddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter complete address"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <p className="text-[26px] font-semibold text-black mb-16">Professional Details</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                {/* Applied Positions */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Applied Positions
                                    </label>
                                    <div className="bg-[#E8F4F3] !px-4 !py-3 rounded-[15px] border border-gray-300">
                                        <span className="text-gray-700">Electronic Technician</span>
                                    </div>
                                </div>

                                {/* Education */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Education
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="education"
                                            value={formData.education}
                                            onChange={handleInputChange}
                                            className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 appearance-none bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="High School">High School</option>
                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                            <option value="Master's Degree">Master's Degree</option>
                                            <option value="Diploma">Diploma</option>
                                            <option value="Certificate">Certificate</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Gulf Experience */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Gulf Experience
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="gulfExperience"
                                            value={formData.gulfExperience}
                                            onChange={handleInputChange}
                                            className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 appearance-none bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="No Experience">No Experience</option>
                                            <option value="1-2 Years">1-2 Years</option>
                                            <option value="3-5 Years">3-5 Years</option>
                                            <option value="5+ Years">5+ Years</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Gulf License */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Gulf License
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="gulfLicense"
                                            value={formData.gulfLicense}
                                            onChange={handleInputChange}
                                            className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 appearance-none bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Pakistani License */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Pakistani License
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="pakistaniLicense"
                                            value={formData.pakistaniLicense}
                                            onChange={handleInputChange}
                                            className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 appearance-none bg-white"
                                        >
                                            <option value="">Select</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Key Skills */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Key Skills
                                    </label>
                                    <input
                                        type="text"
                                        name="keySkills"
                                        value={formData.keySkills}
                                        onChange={handleInputChange}
                                        placeholder="Enter passport number"
                                        className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Description - Full Width */}
                            <div className="mt-6">
                                <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full !px-4 !py-3 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-[#309689] focus:border-transparent outline outline-gray-300 transition-all duration-200 resize-none"
                                />
                            </div>
                        </>
                    )}

                    {currentStep === 3 && (
                        <>
                            <p className="text-[26px] font-semibold text-black mb-10">Documents</p>

                            <div className="space-y-10">
                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Photo
                                    </label>
                                    <div className="!border border-gray-300 rounded-[15px] bg-white px-4 py-6 flex items-center justify-center text-center">
                                        <div>
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="text-gray-500 text-sm">
                                                    <span className="block">Upload photo</span>
                                                    <span className="block text-xs mt-1">Upload a professional photo with white background recommended</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="photo"
                                                    accept="image/*"
                                                    // onChange={handleFileChange}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CV Documents Upload */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        CV Documents
                                    </label>
                                    <div className="border border-gray-300 rounded-[15px] bg-white px-4 py-10 flex items-center justify-center text-center relative">
                                        <div className="text-gray-500 text-sm">
                                            Drag and drop files here
                                        </div>
                                        <input
                                            type="file"
                                            name="cvDocuments"
                                            accept=".pdf,.doc,.docx,image/*"
                                            multiple
                                            // onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>

                                    {/* Uploaded CV Files */}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {cvFiles.map((file, index) => (
                                            <div key={index} className="flex items-center bg-[#309689] text-white px-3 py-1 rounded-full text-sm">
                                                <span className="mr-2">{file.name}</span>
                                                <button
                                                    onClick={() => removeFile('cv', index)}
                                                    className="text-white ml-1"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Licenses / Certificates Upload */}
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700 mb-2">
                                        Licenses & Certificates
                                    </label>
                                    <div className="border border-gray-300 rounded-[15px] bg-white px-4 py-10 flex items-center justify-center text-center relative">
                                        <div className="text-gray-500 text-sm">
                                            Upload any licenses or certificates that may be relevant
                                        </div>
                                        <input
                                            type="file"
                                            name="certificates"
                                            multiple
                                            // onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>

                                    {/* Uploaded Certificate Files */}
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {certificateFiles.map((file, index) => (
                                            <div key={index} className="flex items-center bg-[#309689] text-white px-3 py-1 rounded-full text-sm">
                                                <span className="mr-2">{file.name}</span>
                                                <button
                                                    onClick={() => removeFile('certificate', index)}
                                                    className="text-white ml-1"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </>
                    )}

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 gap-4">
                    <button
                        onClick={handleCancel}
                        className="w-[255px] h-[50px] px-6 py-3 text-gray-700 !bg-[#F1F2F4] hover:bg-gray-300 rounded-[12px] font-medium transition-colors duration-200 order-2 sm:order-1"
                    >
                        {currentStep > 1 ? 'Previous Step' : 'Cancel'}
                    </button>
                    <button
                        onClick={handleNextStep}
                        className="w-[255px] h-[50px] px-8 py-3 !bg-[#309689] hover:bg-[#309689] !text-white rounded-[12px] font-medium transition-colors duration-200 order-1 sm:order-2"
                    >
                        {currentStep === 3 ? 'Save' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
}