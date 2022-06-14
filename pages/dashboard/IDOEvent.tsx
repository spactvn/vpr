import { Box, Divider, Flex, Progress, Text } from "@chakra-ui/react";

const ProgressBar = ({ value = 0 }: { value?: number }) => {
  return (
    <Box position="relative">
      <Progress
        bg={value === 0 && "whiteAlpha.800"}
        colorScheme={"green"}
        height="28px"
        value={value}
      />
      <Text
        position="absolute"
        top={0}
        left={"50%"}
        transform={"translateX(-50%)"}
        color={"black"}
      >
        {value}%
      </Text>
    </Box>
  );
};
const IDOEvent = () => {
  return (
    <Box width={"100%"}>
      <Flex flexDir={"column"} bg={"#222222"} p={3} color={"white"}>
        <Text fontSize={{ base: "xl", lg: "2xl" }} pt={3}>
          IDO Event Details
        </Text>
        <Divider my={3} />

        <Flex flexDir={"column"} color={"whiteAlpha.700"} mb={6}>
          <Flex flexDir={"column"} mb={2}>
            <Text>Fund Raise</Text>
            <ProgressBar value={100} />
          </Flex>
          <Flex flexDir={"column"} mb={2}>
            <Text>Round 1</Text>
            <ProgressBar value={0} />
          </Flex>
          <Flex flexDir={"column"} mb={2}>
            <Text>Round 2</Text>
            <ProgressBar value={0} />
          </Flex>
          <Flex flexDir={"column"} mb={2}>
            <Text>Round 3</Text>
            <ProgressBar value={0} />
          </Flex>
          <Flex flexDir={"column"}>
            <Text>Round 4</Text>
            <ProgressBar value={0} />
          </Flex>
        </Flex>

        <Flex
          flexDir={"column"}
          color={"white"}
          textAlign={"center"}
          fontSize={{ base: "sm", xl: "md" }}
        >
          <Flex flexDir={"column"} mb={3}>
            <Text>Fund Raise</Text>
            <Text>
              We have completed seed round and successfully raised $5 million
              from major investment funds
            </Text>
          </Flex>
          <Flex flexDir={"column"} mb={3}>
            <Text>Round 1</Text>
            <Text color={"whiteAlpha.700"}>MAY 6 - JUNE 5</Text>
            <Text>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Amount:
              </Text>{" "}
              1,000,000,000 VPR
            </Text>
            <Text color={"white"}>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Unit Price:
              </Text>{" "}
              MIN 0.02 BNB - 50.000 VPR
            </Text>
          </Flex>
          <Flex flexDir={"column"} mb={3}>
            <Text>Round 2</Text>
            <Text color={"whiteAlpha.700"}>JUnE 5 - JULY 5</Text>
            <Text>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Amount:
              </Text>{" "}
              1,333,333,333 VPR
            </Text>
            <Text color={"white"}>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Unit Price:
              </Text>{" "}
              MIN 0.02 BNB - 45.000 VPR
            </Text>
          </Flex>
          <Flex flexDir={"column"} mb={3}>
            <Text>Round 3</Text>
            <Text color={"whiteAlpha.700"}>JULY 5 - AUGUST 4</Text>
            <Text>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Amount:
              </Text>{" "}
              1,333,333,333 VPR
            </Text>
            <Text color={"white"}>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Unit Price:
              </Text>{" "}
              MIN 0.02 BNB - 40.000 VPR
            </Text>
          </Flex>
          <Flex flexDir={"column"} mb={3}>
            <Text>Round 4</Text>
            <Text color={"whiteAlpha.700"}>AUGUST 4 - SEPTEMBER 3</Text>
            <Text>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Amount:
              </Text>{" "}
              1,333,333,333 VPR
            </Text>
            <Text color={"white"}>
              <Text display={"inline-block"} color={"whiteAlpha.700"}>
                Unit Price:
              </Text>{" "}
              MIN 0.02 BNB - 35.000 VPR
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
export default IDOEvent;
