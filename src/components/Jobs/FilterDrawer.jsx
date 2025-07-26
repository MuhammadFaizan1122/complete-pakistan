import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import FilterSection from './FilterSection';

const FilterDrawer = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategories,
  setSelectedCategories,
  selectedJobTypes,
  setSelectedJobTypes,
  selectedExperience,
  setSelectedExperience,
  selectedDatePosted,
  setSelectedDatePosted,
  salaryRange,
  setSalaryRange,
  selectedTags,
  setSelectedTags,
  selectedLicense,
  setSelectedLicense,
  selectedOvertime,
  setSelectedOvertime,
  selectedAccommodation,
  setSelectedAccommodation,
  selectedMedicalInsurance,
  setSelectedMedicalInsurance,
  selectedTransportation,
  setSelectedTransportation,
  selectedNavttc,
  setSelectedNavttc,
  applyFilters,
  clearAllFilters,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size={{ base: 'xs', sm: 'sm' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size={{ base: 'sm', md: 'md' }} />
        <DrawerHeader fontSize={{ base: 'md', md: 'lg' }}>
          Filters
        </DrawerHeader>
        <DrawerBody>
          <FilterSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedJobTypes={selectedJobTypes}
            setSelectedJobTypes={setSelectedJobTypes}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            selectedDatePosted={selectedDatePosted}
            setSelectedDatePosted={setSelectedDatePosted}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedLicense={selectedLicense}
            setSelectedLicense={setSelectedLicense}
            selectedOvertime={selectedOvertime}
            setSelectedOvertime={setSelectedOvertime}
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            selectedMedicalInsurance={selectedMedicalInsurance}
            setSelectedMedicalInsurance={setSelectedMedicalInsurance}
            selectedTransportation={selectedTransportation}
            setSelectedTransportation={setSelectedTransportation}
            selectedNavttc={selectedNavttc}
            setSelectedNavttc={setSelectedNavttc}
            applyFilters={applyFilters}
            clearAllFilters={clearAllFilters}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;