'use client'
import { handleGetIndustry } from "../../../handlers/CV/industry";
import { Input, HStack, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const JobDetails = ({ formData, setFormData, setUserIndustry, setUserCategory, setUserSubCategory }) => {
    const [industryList, setIndustryList] = useState([
        {
            id: 1,
            name: 'Technical',
            categories: [
                {
                    id: 2,
                    name: 'IT',
                    subcategories: [
                        {
                            id: 3,
                            name: 'Software Engineer'
                        }
                    ]
                }
            ]
        }
    ])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const handleIndustryChange = (e) => {
        const industryName = e.target.value;
        const selectedIndustry = industryList.find(c => c.name === industryName);
        setUserIndustry(selectedIndustry);
        setCategoryList(selectedIndustry.categories);
    };
    const handleCategoryChange = (e) => {
        const categoryName = e.target.value;
        const selectedCategory = categoryList.find(c => c.name === categoryName);
        setUserCategory(selectedCategory);
        setSubCategoryList(selectedCategory.subcategories);
    };
    const handleSubCategoryChange = (e) => {
        const subCategoryName = e.target.value;
        const selectedSubCategory = categoryList.find(c => c.name === subCategoryName);
        setUserSubCategory(selectedSubCategory);
    };
    // const handleFetchIndustry = async () => {
    //     try {
    //         const response = await handleGetIndustry()
    //         if (response.status === 200) {
    //             setIndustryList(response.data.data)
    //         }
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    // }
    // useEffect(() => {
    //     handleFetchIndustry()
    // }, [])

    return (
        <>
            <label className="text-[#2D3748] pl-1 mt-2">Job Details</label>
            <HStack>
                <Select
                    placeholder="Industry"
                    value={formData.industry}
                    onChange={(e) => {
                        handleIndustryChange(e);
                        setFormData({ ...formData, industry: e.target.value });
                    }}
                    w="full"
                    h="50px"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                    }}
                    _active={{
                        outline: "none"
                    }}
                    transition="all 0.2s"
                >
                    {
                        industryList.map((item, i) => {
                            return (
                                <option key={i} value={item.name}>{item.name}</option>
                            )
                        })
                    }
                </Select>
                <Select
                    placeholder="Category"
                    value={formData.category}
                    onChange={e => { handleCategoryChange(e), setFormData({ ...formData, category: e.target.value }) }}
                    w="full"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    h="50px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                    }}
                    _active={{
                        outline: "none"
                    }}
                    transition="all 0.2s"
                >
                    {
                        categoryList.map((item, i) => {
                            return (
                                <option key={i} value={item.name}>{item.name}</option>
                            )
                        })
                    }
                </Select>
            </HStack>
            <HStack>
                <Select
                    placeholder="Subcategory"
                    value={formData.subcategory}
                    onChange={e => { handleSubCategoryChange(e), setFormData({ ...formData, subcategory: e.target.value }) }}
                    w="full"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    h="50px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                    }}
                    _active={{
                        outline: "none"
                    }}
                    transition="all 0.2s"
                >
                    {
                        subCategoryList.map((item, i) => {
                            return (
                                <option key={i} value={item.name}>{item.name}</option>
                            )
                        })
                    }
                </Select>
                <Input
                    placeholder="Job applied for"
                    value={formData.job}
                    onChange={e => setFormData({ ...formData, job: e.target.value })}
                    w="full"
                    px={4}
                    py={6}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="15px"
                    bg="white"
                    outline="1px solid"
                    outlineColor="gray.300"
                    _focus={{
                        ring: 2,
                        ringColor: "#309689",
                        borderColor: "transparent",
                        outline: "none"
                    }}
                    _active={{
                        outline: "none"
                    }}
                    transition="all 0.2s"
                />
            </HStack>
        </>
    );
};

export default JobDetails;
