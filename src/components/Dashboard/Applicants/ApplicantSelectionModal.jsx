'use client';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormErrorMessage, VStack, HStack
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from 'react';
import StyledSelect from '../../CV/CvDirectory/StyledSelect';
import StyledInput from '../../CV/StyledInput';
import StyledButton from '../../../utils/StyledButton';
import { Tag, TagLabel, TagCloseButton, Wrap } from '@chakra-ui/react';
import { handleUpload } from '../../../handlers/contentUploading/contentUploading';
import { handleCreateOrUpdateJobApplication } from '../../../handlers/JobApplicants/JobApplicants';


// Validation schema using Yup
const selectionSchema = Yup.object().shape({
    applicant_user_id: Yup.string().required('Applicant ID is required'),
    job_id: Yup.string().required('Job ID is required'),
    status: Yup.string().oneOf(['pending', 'shortlisted', 'rejected'], 'Invalid status').required('Status is required'),
    selection_type: Yup.string().default('interview'),
    map_link: Yup.string().url('Must be a valid URL').default(''),
    contact: Yup.string().default(''),
    form: Yup.mixed()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            return !value || (value && value[0]?.size <= 5 * 1024 * 1024);
        })
        .test('fileType', 'Only JPG, PNG, WebP, or JPEG files are allowed', (value) => {
            return !value || (value && ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type));
        })
        .default(null),
    detail: Yup.mixed()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            return !value || (value && value[0]?.size <= 5 * 1024 * 1024);
        })
        .test('fileType', 'Only JPG, PNG, WebP, or JPEG files are allowed', (value) => {
            return !value || (value && ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type));
        })
        .default(null),
    notice: Yup.mixed()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            return !value || (value && value[0]?.size <= 5 * 1024 * 1024);
        })
        .test('fileType', 'Only JPG, PNG, WebP, or JPEG files are allowed', (value) => {
            return !value || (value && ['image/jpeg', 'image/png', 'image/webp'].includes(value[0]?.type));
        })
        .default(null),
    interview_timings: Yup.string().default(''),
    address: Yup.string().default(''),
    city: Yup.string().default(''),
    interview_type: Yup.string().oneOf(['onsite', 'online'], 'Invalid interview type').default(''),
    must_have: Yup.array().of(Yup.string()).default([]),
    benefits: Yup.array().of(Yup.string()).default([]),
    requirements: Yup.array().of(Yup.string()).default([]),
    license: Yup.string()
        .matches(/^\d{12,16}$/, 'License must be 12-16 digits')
        .default(''),
});

// Generate 24-hour time slots
const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'AM' : 'PM';
    const nextHour = (i + 1) % 12 || 12;
    const nextPeriod = i + 1 < 12 ? 'AM' : 'PM';
    return `${hour.toString().padStart(2, '0')}:00 ${period} to ${nextHour.toString().padStart(2, '0')}:00 ${nextPeriod}`;
});

const ApplicantSelectionModal = ({ isOpen, onClose, applicant }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(selectionSchema),
        defaultValues: {
            status: applicant.status,
            selection_type: 'interview',
            map_link: '',
            contact: '',
            form: null,
            detail: null,
            notice: null,
            interview_timings: '',
            address: '',
            city: '',
            interview_type: '',
            must_have: [],
            benefits: [],
            requirements: [],
            license: '',
        },
    });

    const [mustHaveInput, setMustHaveInput] = useState('');
    const [benefitsInput, setBenefitsInput] = useState('');
    const [requirementsInput, setRequirementsInput] = useState('');

    useEffect(() => {
        reset({
            status: applicant.status,
            selection_type: 'interview',
            map_link: '',
            contact: '',
            form: null,
            detail: null,
            notice: null,
            interview_timings: '',
            address: '',
            city: '',
            interview_type: '',
            must_have: [],
            benefits: [],
            requirements: [],
            license: '',
        });
    }, [applicant, reset]);

    const onSubmit = async (data) => {
        try {
            const uploadFile = async (file) =>
                file && file[0] ? (await handleUpload(file[0]))?.data?.url || '' : '';

            const [formUrl, detailUrl, noticeUrl] = await Promise.all([
                uploadFile(data.form),
                uploadFile(data.detail),
                uploadFile(data.notice),
            ]);

            const finalPayload = {
                ...data,
                status: 'shortlisted',
                form: formUrl,
                detail: detailUrl,
                notice: noticeUrl,
            };

            const response = await handleCreateOrUpdateJobApplication(applicant._id, finalPayload);
            if (response.status === 201 || response.status === 200) {
                onClose();
            } else {
                console.error('Error saving application:', response.data);
            }
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleTagInput = (field, value, currentTags) => {
        if (value.trim() && !currentTags.includes(value.trim())) {
            setValue(field, [...currentTags, value.trim()]);
            if (field === 'must_have') setMustHaveInput('');
            if (field === 'benefits') setBenefitsInput('');
            if (field === 'requirements') setRequirementsInput('');
        }
    };

    const removeTag = (field, tag, currentTags) => {
        setValue(field, currentTags.filter(t => t !== tag));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '5xl' }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Applicant Selection Form</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <VStack spacing={4}>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.selection_type}>
                                    <FormLabel>Selection Type</FormLabel>
                                    <StyledSelect {...register('selection_type')}>
                                        <option value="interview">Interview</option>
                                        <option value="self selection">Self Selection</option>
                                    </StyledSelect>
                                    <FormErrorMessage>{errors.selection_type?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.map_link}>
                                    <FormLabel>Map Link</FormLabel>
                                    <StyledInput placeholder='Enter google map url' {...register('map_link')} />
                                    <FormErrorMessage>{errors.map_link?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.contact}>
                                    <FormLabel>Contact Number</FormLabel>
                                    <Controller
                                        name="contact"
                                        control={control}
                                        render={({ field }) => (
                                            <PhoneInput
                                                country={'pk'}
                                                inputStyle={{
                                                    width: '100%',
                                                    height: '50px',
                                                    border: '1px solid #D1D5DB',
                                                    borderRadius: '15px',
                                                    outline: '1px solid #D1D5DB',
                                                    fontSize: '16px',
                                                    paddingLeft: '48px',
                                                    paddingRight: '16px',
                                                    paddingTop: '24px',
                                                    paddingBottom: '24px',
                                                    backgroundColor: 'white',
                                                    transition: 'all 0.2s',
                                                }}
                                                buttonStyle={{
                                                    border: 'none',
                                                    background: 'none',
                                                    borderRadius: '15px 0 0 15px',
                                                }}
                                                containerStyle={{
                                                    width: '100%',
                                                    position: 'relative',
                                                }}
                                                inputClass="phone-input-custom"
                                                onChange={(value) => field.onChange(value)}
                                                value={field.value}
                                                inputProps={{
                                                    name: 'contact',
                                                    placeholder: 'Enter phone number',
                                                }}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>{errors.contact?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.form}>
                                    <FormLabel>Form</FormLabel>
                                    <StyledInput className='!py-3 !h-[50px]' type="file" accept="image/jpeg,image/png,image/webp" {...register('form')} />
                                    <FormErrorMessage>{errors.form?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.detail}>
                                    <FormLabel>Details</FormLabel>
                                    <StyledInput className='!py-3 !h-[50px]' type="file" accept="image/jpeg,image/png,image/webp" {...register('detail')} />
                                    <FormErrorMessage>{errors.detail?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.notice}>
                                    <FormLabel>Notice</FormLabel>
                                    <StyledInput className='!py-3 !h-[50px]' type="file" accept="image/jpeg,image/png,image/webp" {...register('notice')} />
                                    <FormErrorMessage>{errors.notice?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.interview_timings}>
                                    <FormLabel>Interview Timings</FormLabel>
                                    <StyledSelect {...register('interview_timings')}>
                                        <option value="">Select time slot</option>
                                        {timeSlots.map((slot, index) => (
                                            <option key={index} value={slot}>{slot}</option>
                                        ))}
                                    </StyledSelect>
                                    <FormErrorMessage>{errors.interview_timings?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.address}>
                                    <FormLabel>Address</FormLabel>
                                    <StyledInput placeholder='Enter address' {...register('address')} />
                                    <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.city}>
                                    <FormLabel>City</FormLabel>
                                    <StyledInput placeholder='Enter city' {...register('city')} />
                                    <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.interview_type}>
                                    <FormLabel>Interview Type</FormLabel>
                                    <StyledSelect {...register('interview_type')}>
                                        <option value="">Select interview type</option>
                                        <option value="onsite">Onsite</option>
                                        <option value="online">Online</option>
                                    </StyledSelect>
                                    <FormErrorMessage>{errors.interview_type?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.must_have}>
                                    <FormLabel>Must Have</FormLabel>
                                    <Wrap>
                                        {watch('must_have')?.map((tag, index) => (
                                            <Tag key={index} size="md" variant="solid" colorScheme="teal">
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => removeTag('must_have', tag, watch('must_have'))} />
                                            </Tag>
                                        ))}
                                    </Wrap>
                                    <StyledInput
                                        placeholder='Enter must have requirements and press Enter'
                                        value={mustHaveInput}
                                        onChange={(e) => setMustHaveInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleTagInput('must_have', mustHaveInput, watch('must_have'));
                                            }
                                        }}
                                    />
                                    <FormErrorMessage>{errors.must_have?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.benefits}>
                                    <FormLabel>Benefits</FormLabel>
                                    <Wrap>
                                        {watch('benefits')?.map((tag, index) => (
                                            <Tag key={index} size="md" variant="solid" colorScheme="teal">
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => removeTag('benefits', tag, watch('benefits'))} />
                                            </Tag>
                                        ))}
                                    </Wrap>
                                    <StyledInput
                                        placeholder='Enter benefits and press Enter'
                                        value={benefitsInput}
                                        onChange={(e) => setBenefitsInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleTagInput('benefits', benefitsInput, watch('benefits'));
                                            }
                                        }}
                                    />
                                    <FormErrorMessage>{errors.benefits?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <HStack w={'full'}>
                                <FormControl isInvalid={!!errors.requirements}>
                                    <FormLabel>Requirements</FormLabel>
                                    <Wrap>
                                        {watch('requirements')?.map((tag, index) => (
                                            <Tag key={index} size="md" variant="solid" colorScheme="teal">
                                                <TagLabel>{tag}</TagLabel>
                                                <TagCloseButton onClick={() => removeTag('requirements', tag, watch('requirements'))} />
                                            </Tag>
                                        ))}
                                    </Wrap>
                                    <StyledInput
                                        placeholder='Enter requirements and press Enter'
                                        value={requirementsInput}
                                        onChange={(e) => setRequirementsInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleTagInput('requirements', requirementsInput, watch('requirements'));
                                            }
                                        }}
                                    />
                                    <FormErrorMessage>{errors.requirements?.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.license}>
                                    <FormLabel>License</FormLabel>
                                    <StyledInput placeholder='Enter License (12-16 digits)' type='number' {...register('license')} />
                                    <FormErrorMessage>{errors.license?.message}</FormErrorMessage>
                                </FormControl>
                            </HStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <StyledButton title="Submit" mr={3} type="submit" />
                        <StyledButton title="Cancel" variant="ghost" onClick={onClose} />
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ApplicantSelectionModal;