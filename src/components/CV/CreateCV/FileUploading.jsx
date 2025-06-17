'use client'
import { Box, Flex, Text, Button, Input, IconButton, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaFilePdf, FaFileImage, FaTimes } from "react-icons/fa";

const FileUpload = ({ setFormData }) => {
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const fileInputRef = useRef();
    const toast = useToast();
    const handleFileDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const validTypes = [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/webp',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        const maxFileSize = 10 * 1024 * 1024;
        const maxFiles = 10;

        let newFiles = [];

        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                toast({ title: `Invalid file type: ${file.name}`, status: "error", duration: 3000 });
                continue;
            }

            if (file.size > maxFileSize) {
                toast({ title: `${file.name} exceeds 10MB limit`, status: "error", duration: 3000 });
                continue;
            }

            newFiles.push(file);
        }

        const totalFiles = uploadedDocs.length + newFiles.length;

        if (totalFiles > maxFiles) {
            toast({
                title: `Cannot upload more than 10 files`,
                status: "warning",
                duration: 3000
            });
            const allowedCount = maxFiles - uploadedDocs.length;
            newFiles = newFiles.slice(0, allowedCount);
        }

        setUploadedDocs(prev => [...prev, ...newFiles]);
        setFormData(prev => [...prev, ...newFiles]);
    };


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const removeFile = (index) => {
        setUploadedDocs(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Box mt={6}>
            <Text mb={2} color="#2D3748">Uploads</Text>

            <Box
                border="2px solid #CBD5E0"
                borderRadius="12px"
                bg="#fff"
                p={10}
                textAlign="center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                cursor="pointer"
                onClick={() => fileInputRef.current.click()}
            >
                <Image src={'/Images/Icons/iwwa_upload.png'} alt="icon" width={50} height={50} className="!h-[50px] !w-[50px] mx-auto" />

                <Text>Drag and drop files here</Text>
                <Input
                    type="file"
                    ref={fileInputRef}
                    display="none"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                    onChange={handleFileChange}
                />
            </Box>

            {/* Uploaded files display */}
            {uploadedDocs.length > 0 && (
                <Box mt={4}>
                    <Text mb={2} color="#2D3748">Uploaded documents</Text>

                    <Flex wrap="wrap" gap={2}>
                        {uploadedDocs.map((file, index) => {
                            const ext = file.name.split('.').pop().toLowerCase();
                            const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
                            const isPDF = ext === 'pdf';

                            return (
                                <Flex
                                    key={index}
                                    align="center"
                                    bg="#319795"
                                    color="white"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                >
                                    {isPDF && <FaFilePdf style={{ marginRight: 6 }} />}
                                    {isImage && <FaFileImage style={{ marginRight: 6 }} />}
                                    {!isPDF && !isImage && <FaFileImage style={{ marginRight: 6 }} />}

                                    <Text fontSize="sm" noOfLines={1} maxW="120px">{file.name}</Text>

                                    <IconButton
                                        icon={<FaTimes />}
                                        ml={2}
                                        size="sm"
                                        variant="ghost"
                                        color="white"
                                        onClick={() => removeFile(index)}
                                        aria-label="Remove file"
                                    />
                                </Flex>
                            );
                        })}
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default FileUpload;
