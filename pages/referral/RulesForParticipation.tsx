import { Divider, Text, Flex, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import GradientButton from '../../components/button'
const RulesForParticipation = () => {
	const { account, active } = useWeb3React()
	const toast = useToast()
	return (
		<Flex
			flexDir={'column'}
			bg={'#222'}
			py={3}
			width={'100%'}
			overflow={'auto'}
		>
			<Text fontSize={'xl'} px={3}>
				Rules for participating in the Token Sale
			</Text>
			<Divider my={3} color={'whiteAlpha.300'} />

			<Flex flexDir={'column'} px={3} gap={3} width={'100%'}>
				<Text>Rewards</Text>

				<Flex flexDir={'column'} p={3} gap={3} bg={'blackAlpha.700'}>
					<Flex justifyContent={'space-between'}>
						<Text>Silver</Text>
						<Text>1%</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text>Gold</Text>
						<Text>2%</Text>
					</Flex>
					<Flex justifyContent={'space-between'}>
						<Text>Diamond</Text>
						<Text>3%</Text>
					</Flex>
				</Flex>

				<Flex
					p={3}
					gap={3}
					alignItems={'center'}
					justifyContent={['center', 'space-between']}
					bg={'blackAlpha.700'}
					flexDir={['column', 'row']}
				>
					<Text
						mr={3}
						fontSize={'sm'}
						textAlign={['center', 'left']}
						color={'whiteAlpha.700'}
					>
						{active
							? `${window.location.host}/buy-ido?ref=${account}`
							: 'Connect wallet to see your referral link'}
					</Text>
					<GradientButton
						text={'Copy'}
						onClick={() => {
							navigator.clipboard
								.writeText(`${window.location.host}/buy-ido?ref=${account}`)
								.then(
									function () {
										toast({
											title: 'Copied!',
											description: 'Referral link copied to clipboard',
											status: 'success',
											duration: 5000,
										})
									},
									function () {
										toast({
											title: 'Error!',
											description: 'Unable to copy referral link',
											status: 'error',
											duration: 5000,
										})
									}
								)
						}}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default RulesForParticipation
