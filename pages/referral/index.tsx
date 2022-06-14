import { Container, VStack } from "@chakra-ui/react";
import MyReferral from "./MyReferral";
import RulesForParticipation from "./RulesForParticipation";

const Referral = () => {
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
        <RulesForParticipation />
      </VStack>
    </Container>
  );
};
export default Referral;
