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
} from '@chakra-ui/react'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { useState, useCallback, useEffect } from 'react'
import Pagination from '../../components/pagination'
import { API_ENDPOINT } from '../../constants'
import { formatDate, shortenAddress, fromWei, shortenTxHash } from '../../utils'

const TABLE_MAX_ROWS = 5

const MyHistory = () => {
	const [pageHistory, setPageHistory] = useState<any[]>([])
	const [totalPage, setTotalPage] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)

	const fetchICOHistory = useCallback(async () => {
		const resp = await axios.get(`${API_ENDPOINT}/ico-history?page=${currentPage}&limit=${TABLE_MAX_ROWS}`)
		setTotalPage(resp.data.data.meta.last_page)		
		setPageHistory(resp.data.data.data)
	}, [currentPage])

	useEffect(() => {
		fetchICOHistory()
	}, [currentPage])

	const onPageChange = (page) => {
		if (1 <= currentPage && currentPage <= totalPage) {
			setCurrentPage(page)
		}
	}

	return (
		<Flex
			flexDir={'column'}
			bg={'#222'}
			py={3}
			maxWidth={'100%'}
			overflow={'auto'}
		>
			<Text fontSize={'xl'} px={3}>
				Buy Transaction
			</Text>
			<Divider my={3} color={'whiteAlpha.300'} />

			<Box px={3} width={'100%'}>
				<TableContainer width={'100%'}>
					<Table variant="striped" colorScheme="blackAlpha">
						<Thead>
							<Tr>
								<Th>Wallet</Th>
								<Th isNumeric>Amount</Th>
								<Th>Date</Th>
								<Th>TxHash</Th>
							</Tr>
						</Thead>
						<Tbody color={'whiteAlpha.700'}>
							{
								pageHistory.map((v) =>
									<Tr key={v.id}>
										<Td>{shortenAddress(v.wallet)}</Td>
										<Td isNumeric>
											<Text color={'white'} as={'span'}>
												{fromWei({ amount: BigNumber.from(v.amount) })}
											</Text>{' '}
											VPR
										</Td>
										<Td>{formatDate(v.date, 'DD-MM-YYYY HH:mm')}</Td>
										<Td>{shortenTxHash(v.txhash)}</Td>
									</Tr>
								)
							}
						</Tbody>
					</Table>
				</TableContainer>
				<Flex justifyContent={'flex-end'} my={3}>
					<Pagination
						currentPage={currentPage}
						totalPage={totalPage}
						onPageChange={onPageChange}
					/>
				</Flex>
			</Box>
		</Flex>
	)
}
export default MyHistory
