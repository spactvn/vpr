import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Radio,
	RadioGroup,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CURRENCY_TYPE, filterOptions } from '../../constants/data'

const Filters = ({
	resultCount,
	onFilterChange,
	showCurrencyFilter = true,
	showSort = true,
}: {
	resultCount: number,
	onFilterChange: (filterBoxType?: number, filterCurrency?: CURRENCY_TYPE) => void
	showCurrencyFilter?: boolean,
	showSort?: boolean,
}) => {
	const [selectedBoxType, setSelectedBoxType] = useState(filterOptions[0]) // 0 is all types
	const [currency, setCurrency] = useState(CURRENCY_TYPE.VPR)

	return (
		<Box width="100%">
			{/* <Flex
				flexDir={'column'}
				alignItems={{ base: 'flex-start', sm: 'flex-end' }}
				mt={12}
			>
				<InputGroup maxW={'250px'}>
					<Input
						placeholder="Cypod ID"
						color={useColorModeValue('white', 'whiteAlpha.800')}
						variant={'filled'}
						bg={'#222'}
						_hover={{ bg: '#333' }}
						_focus={{ borderColor: 'gray.600' }}
						fontSize={'sm'}
					/>
					<InputRightElement
						children={<SearchIcon color={'whiteAlpha.600'} />}
					/>
				</InputGroup>
			</Flex> */}
			<Flex
				gap={{ base: 4, lg: 8 }}
				my={4}
				justifyContent={'space-between'}
				alignItems={{ base: 'flex-start', lg: 'center' }}
				flexDir={{ base: 'column', lg: 'row' }}
			>
				<Text order={{ base: 3, lg: 0 }}>{resultCount} Result(s)</Text>

				<Flex
					gap={{ base: 4, sm: 8 }}
					alignItems={{ base: 'flex-start', sm: 'center' }}
					flexDir={{ base: 'column', sm: 'row' }}
				>
					{showCurrencyFilter &&
						<RadioGroup
							onChange={(x) => {
								setCurrency(x as CURRENCY_TYPE)
								onFilterChange(selectedBoxType.boxType, x as CURRENCY_TYPE)
							}}
							value={currency}
							colorScheme={'orange'}
						>
							<Stack direction="row" spacing={{ base: 4, md: 8 }}>
								<Radio value={CURRENCY_TYPE.VPR}>VPR</Radio>
								<Radio value={CURRENCY_TYPE.BUSD}>BUSD</Radio>
							</Stack>
						</RadioGroup>
					}


					<Flex gap={{ base: 4, lg: 8 }}>
						{showSort && <Flex
							alignItems={{ base: 'flex-start', sm: 'center' }}
							flexDir={{ base: 'column', sm: 'row' }}
						>
							<Text
								mr={{ base: 0, sm: 2 }}
								mb={{ base: 2, sm: 0 }}
								color={'whiteAlpha.700'}
								fontSize={'sm'}
							>
								Sort
							</Text>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon color={'whiteAlpha.700'} />}
									bg={'#222'}
									_hover={{ bg: '#333' }}
									_focus={{ bg: '#333' }}
									_active={{ bg: '#333' }}
								>
									Latest
								</MenuButton>
								<MenuList
									bg={'#222'}
									_hover={{ bg: '#333' }}
									_focus={{ bg: '#333' }}
								>
									<MenuItem>Latest</MenuItem>
									<MenuItem>Oldest</MenuItem>
								</MenuList>
							</Menu>
						</Flex>}

						<Flex
							alignItems={{ base: 'flex-start', sm: 'center' }}
							flexDir={{ base: 'column', sm: 'row' }}
						>
							<Text
								mr={{ base: 0, sm: 2 }}
								mb={{ base: 2, sm: 0 }}
								color={'whiteAlpha.700'}
								fontSize={'sm'}
							>
								Types of land
							</Text>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon color={'whiteAlpha.700'} />}
									bg={'#222'}
									_hover={{ bg: '#333' }}
									_focus={{ bg: '#333' }}
									_active={{ bg: '#333' }}
								>
									{selectedBoxType.title}
								</MenuButton>
								<MenuList
									bg={'#222'}
									_hover={{ bg: '#333' }}
									_focus={{ bg: '#333' }}
								>
									{filterOptions.map((v) =>
										<MenuItem
											key={v.title}
											value={v.boxType}
											onClick={() => {
												setSelectedBoxType(v);
												onFilterChange(v.boxType, currency);
											}}
										>{v.title}</MenuItem>)
									}
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
export default Filters
