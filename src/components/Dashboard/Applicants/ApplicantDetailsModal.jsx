'use client';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import Preview from '../../CV/CreateCV/Preview';
import { useState } from 'react';

const ApplicantDetailsModal = ({ isOpen, onClose, applicant }) => {
    if (!applicant) return null;
    const [imgPreview, setImgPreview] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent borderRadius="lg">
                <ModalHeader>{applicant.cvProfile.name}'s CV</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Preview formData={applicant.cvProfile} imgPreview={imgPreview} watch={''} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ApplicantDetailsModal;
