'use client'
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box, Icon } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import CandidateFilterForm from "./CandidateFilterForm";
import AgentFilterForm from "./AgentFilterForm";

const SearchTabs = ({ candidates, agents }) => {
  return (
    <Box mb={6} bg="white" maxW="1440px" mx="auto" rounded="lg" p={{ base: 2, md: 2 }}>
      <Tabs variant="soft-rounded" colorScheme="gray" w="100%">
        <TabList
          w="100%"
          gap={{ base: 2, md: 2 }}
          mb={{ base: 4, md: 10 }}
          flexWrap={{ base: "wrap", md: "nowrap" }}
          overflowX={{ base: "auto", md: "visible" }}
        >
          <Tab
            flex={{ base: "1 1 45%", md: "1" }}
            rounded="lg"
            bg="white"
            fontSize={{ base: "sm", md: "md" }}
            p={{ base: 2, md: 3 }}
          >
            <Icon as={FaRegUser} mr={2} /> Search Candidates
          </Tab>
          <Tab
            flex={{ base: "1 1 45%", md: "1" }}
            rounded="lg"
            bg="white"
            fontSize={{ base: "sm", md: "md" }}
            p={{ base: 2, md: 3 }}
          >
            <Icon as={LuBuilding2} mr={2} /> Search Agents
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <CandidateFilterForm candidates={candidates} />
          </TabPanel>
          <TabPanel p={0}>
            <AgentFilterForm agents={agents} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SearchTabs;