'use client'
import { useState, useRef, useEffect } from 'react';
import { 
  Box, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, Input, Text, Flex, Tag, TagLabel, TagCloseButton, 
  Image, useDisclosure, useToast, 
  FormLabel
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { FaFilePdf, FaFileImage } from 'react-icons/fa';

const FileUpload = ({ setFormData, resetTrigger }) => {
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [fileTitles, setFileTitles] = useState({});
  const [tempFiles, setTempFiles] = useState([]);
  const [tempTitles, setTempTitles] = useState({});
  const fileInputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

    const totalFiles = tempFiles.length + newFiles.length;

    if (totalFiles > maxFiles) {
      toast({
        title: `Cannot upload more than 10 files`,
        status: "warning",
        duration: 3000
      });
      const allowedCount = maxFiles - tempFiles.length;
      newFiles = newFiles.slice(0, allowedCount);
    }

    setTempFiles(prev => [...prev, ...newFiles]);
    setTempTitles(prev => ({
      ...prev,
      ...Object.fromEntries(newFiles.map((file, index) => [`${tempFiles.length + index}`, '']))
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleTitleChange = (index, value) => {
    setTempTitles(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const handleSave = () => {
    setUploadedDocs(tempFiles);
    setFileTitles(tempTitles);
    setFormData('attachments', tempFiles);
    setTempFiles([]);
    setTempTitles({});
    onClose();
  };

  const handleDiscard = () => {
    setTempFiles([]);
    setTempTitles({});
    onClose();
  };

  const removeTempFile = (index) => {
    setTempFiles(prev => prev.filter((_, i) => i !== index));
    setTempTitles(prev => {
      const newTitles = { ...prev };
      delete newTitles[index];
      return newTitles;
    });
  };

  const removeFile = (index) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
    setFileTitles(prev => {
      const newTitles = { ...prev };
      delete newTitles[index];
      return newTitles;
    });
    setFormData('attachments', uploadedDocs.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (resetTrigger) {
      setUploadedDocs([]);
      setFileTitles({});
      setTempFiles([]);
      setTempTitles({});
      setFormData('attachments', []);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  }, [resetTrigger]);

  return (
    <Box>
              <FormLabel className="text-[#2D3748] pl-1 mt-2">Upload Documentss</FormLabel>
        
      <HStack
        border="1px solid"
        borderColor="gray.300"
        rounded="15px"
        bg="white"
        outline="1px solid"
        outlineColor="gray.300"
        px={5}
        py={3}
        flexWrap="wrap"
      >
        {uploadedDocs.map((file, idx) => (
          <Tag
            key={idx}
            bg="#309689"
            color="white"
            m={1}
            rounded="8px"
            px={2}
          >
            <TagLabel>{fileTitles[idx] || file.name}</TagLabel>
            <TagCloseButton onClick={() => removeFile(idx)} />
          </Tag>
        ))}
        <Button
          onClick={onOpen}
          rounded="15px"
          border="1px dashed"
          borderColor="gray.400"
          bg="white"
          color="black"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <MdAdd size={24} />
          Add
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Files</ModalHeader>
          <ModalBody>
            {tempFiles.length === 0 ? (
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="12px"
                bg="gray.50"
                p={8}
                textAlign="center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                cursor="pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <Image 
                  src={'/Images/Icons/iwa_upload.png'} 
                  alt="icon" 
                  width={50} 
                  height={50} 
                  className="!h-[50px] !w-[50px] mx-auto" 
                />
                <Text mt={2} color="gray.600">Drag and drop files here or click to upload</Text>
                <Input
                  type="file"
                  ref={fileInputRef}
                  display="none"
                  multiple
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                  onChange={handleFileChange}
                />
              </Box>
            ) : (
              <Box>
                <Text mb={2} color="gray.600">Uploaded Documents</Text>
                <Flex direction="column" gap={3}>
                  {tempFiles.map((file, index) => {
                    const ext = file.name.split('.').pop().toLowerCase();
                    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
                    const isPDF = ext === 'pdf';

                    return (
                      <Flex
                        key={index}
                        align="center"
                        bg="gray.100"
                        p={3}
                        borderRadius="8px"
                        justifyContent="space-between"
                      >
                        <Flex align="center" gap={2}>
                          {isPDF && <FaFilePdf size={20} color="#309689" />}
                          {isImage && <FaFileImage size={20} color="#309689" />}
                          {!isPDF && !isImage && <FaFileImage size={20} color="#309689" />}
                          <Box>
                            <Input
                              value={tempTitles[index] || ''}
                              onChange={(e) => handleTitleChange(index, e.target.value)}
                              placeholder="Enter document title"
                              size="sm"
                              bg="white"
                              width="200px"
                              mb={1}
                            />
                            <Text fontSize="sm" color="gray.600" noOfLines={1} maxW="200px">
                              {file.name}
                            </Text>
                          </Box>
                        </Flex>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => removeTempFile(index)}
                        >
                          Remove
                        </Button>
                      </Flex>
                    );
                  })}
                </Flex>
              </Box>
            )}
          </ModalBody>
          {tempFiles.length > 0 && (
            <ModalFooter>
              <Button variant="outline" mr={3} onClick={handleDiscard}>
                Discard
              </Button>
              <Button colorScheme="teal" onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FileUpload;