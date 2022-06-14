import {
	Box,
	Divider,
	Flex,
	Table,
	TableContainer,
	Text,
	Thead,
	Th,
	Tbody,
	Tr,
	Td,
	Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import GradientButton from '../../components/button'

const MiningLand = () => {
	const router = useRouter()
	return (
		<Box>
			<Flex flexDir={'column'} p={3} bg={'#222222'} color={'white'}>
				<Text fontSize={['2xl']} pt={3}>
					IDO Event Details
				</Text>
				<Divider my={3} />

				<TableContainer>
					<Table variant="striped" colorScheme="blackAlpha">
						<Thead>
							<Tr>
								<Th>Days</Th>
								<Th>Mining Land</Th>
								<Th isNumeric>Fixed APY</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>20</Td>
								<Td>Diamond</Td>
								<Td isNumeric>485.269%</Td>
								<Td>
									<GradientButton
										text={'Start Mining'}
										onClick={() => {
											router.push('/mining-land')
										}}
									/>
								</Td>
							</Tr>
							<Tr>
								<Td>15</Td>
								<Td>Gold</Td>
								<Td isNumeric>106.836%</Td>
								<Td>
									<GradientButton
										text={'Start Mining'}
										onClick={() => {
											router.push('/mining-land')
										}}
									/>
								</Td>
							</Tr>
							<Tr>
								<Td>10</Td>
								<Td>Silver</Td>
								<Td isNumeric>35.526%</Td>
								<Td>
									<GradientButton
										text={'Start Mining'}
										onClick={() => {
											router.push('/mining-land')
										}}
									/>
								</Td>
							</Tr>
							<Tr>
								<Td>5</Td>
								<Td>Bronze</Td>
								<Td isNumeric>22.204%</Td>
								<Td>
									<GradientButton
										text={'Start Mining'}
										onClick={() => {
											router.push('/mining-land')
										}}
									/>
								</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Flex>
		</Box>
	)
}
export default MiningLand
