import {
  Box,
  Divider,
  Table,
  TableContainer,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import { API_ENDPOINT } from "../../constants";
import { Referral } from "../../entities/referal";
import { formatDate, shortenAddress } from "../../utils";
import { fromWei } from "../../utils";

const TABLE_MAX_ROWS = 5;

const MyReferral = () => {
  const toast = useToast();
  const { active, account, library } = useWeb3React();
  const [myReferees, setMyReferees] = useState<Referral[]>([]);
  const [pageReferals, setPageReferals] = useState<Referral[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMyReferal = useCallback(async () => {
    if (account && account !== "") {
      // toast({
      // 	title: 'Loading referral...',
      // 	description: "My referral is still being loaded. Please keep patient.",
      // 	status: 'info',
      // 	duration: 6000,
      // 	isClosable: true,
      // })
      const resp = await axios.get(`${API_ENDPOINT}/referal/${account}`);
      const referral: Referral[] = resp.data.data.map((v) => ({
        address: v.address,
        date: BigNumber.from(v.date),
        bonusAirdrop: BigNumber.from(v.bonusAirdrop),
        bnbCashBonus: BigNumber.from(v.bnbCashBonus),
        busdCashBonus: BigNumber.from(v.busdCashBonus),
        tokenBonus: BigNumber.from(v.tokenBonus),
        miningBonus: BigNumber.from(v.miningBonus),
      }));
      setTotalPage(Math.ceil(referral.length / TABLE_MAX_ROWS));
      setMyReferees(referral);
      setPageReferals(
        referral.slice(
          (currentPage - 1) * TABLE_MAX_ROWS,
          currentPage * TABLE_MAX_ROWS
        )
      );
    }
  }, [account]);

  useEffect(() => {
    if (active && library && account) {
      fetchMyReferal();
    }
  }, [active, account, library]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setPageReferals(
      myReferees.slice((page - 1) * TABLE_MAX_ROWS, page * TABLE_MAX_ROWS)
    );
  };

  return (
    <Flex
      flexDir={"column"}
      bg={"#222"}
      py={3}
      maxWidth={"100%"}
      overflow={"auto"}
    >
      <Text fontSize={"xl"} px={3}>
        My Referral
      </Text>
      <Divider my={3} color={"whiteAlpha.300"} />

      <Box px={3} width={"100%"}>
        <TableContainer width={"100%"}>
          <Table variant="striped" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Wallet</Th>
                <Th>Date</Th>
                <Th isNumeric>Bonus Airdrop</Th>
                <Th isNumeric>Bonus Sale (10% Cash)</Th>
                <Th isNumeric>Bonus Sale (30% VPR)</Th>
                <Th isNumeric>Bonus Mining</Th>
              </Tr>
            </Thead>
            <Tbody color={"whiteAlpha.700"}>
              {pageReferals.map((v) => (
                <Tr key={v.address}>
                  <Td>{shortenAddress(v.address)}</Td>
                  <Td>
                    {formatDate(
                      new Date(v.date.toNumber() * 1000).toDateString(),
                      "DD-MM-YYYY"
                    )}
                  </Td>
                  <Td isNumeric>
                    <Text color={"white"} as={"span"}>
                      {fromWei({ amount: v.bonusAirdrop })}
                    </Text>{" "}
                    VPR
                  </Td>
                  <Td isNumeric>
                    <Text color={"white"} as={"span"}>
                      {fromWei({ amount: v.bnbCashBonus })}
                    </Text>{" "}
                    BNB/BUSD
                  </Td>
                  <Td isNumeric>
                    <Text color={"white"} as={"span"}>
                      {fromWei({ amount: v.tokenBonus })}
                    </Text>{" "}
                    VPR
                  </Td>
                  <Td isNumeric>
                    <Text color={"white"} as={"span"}>
                      {fromWei({ amount: v.miningBonus })}
                    </Text>{" "}
                    AKC
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent={"flex-end"} my={3}>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
export default MyReferral;
