import { Container, VStack } from "@chakra-ui/react";
import { PancakeButton } from "../../components/button";
import Badges from "./Badges";
import MyHistory from "./MyHistory";
import Overview from "./Overview";

const MiningLand = () => {
  return (
    <Container
      maxW={"8xl"}
      py={8}
      mr={0}
      ml={0}
      px={8}
      bgImage={"url(/images/container-bg.svg)"}
      bgPos={"center"}
      bgSize={"cover"}
      color={"white"}
    >
      <VStack p={0} spacing={8}>
        {/* <Overview /> */}

        <PancakeButton
          text={"BUY AKC ON PANCAKESWAP"}
          link={
            "https://pancakeswap.finance/swap?outputCurrency=0x0fa73D350E5e5bf63863f49Bb4bA3e87A20c93Fb"
          }
          isClipPath
        />

        <MyHistory />

        <Badges />
      </VStack>
    </Container>
  );
};
export default MiningLand;
