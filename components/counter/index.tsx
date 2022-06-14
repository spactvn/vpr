import { Flex, HStack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { useEffect, useMemo, useState } from 'react'

export const getCountdownSeconds = (time: number, now: number) =>
	Math.floor((time - now ?? Date.now()) / 1000)

export const getDurationFromSeconds = (duration: number) => {
	let days: number | string = Math.floor(duration / (3600 * 24))
	let hours: number | string = Math.floor(
		(duration - days * (3600 * 24)) / 3600
	)
	let minutes: number | string = Math.floor(
		(duration - days * (3600 * 24) - hours * 3600) / 60
	)
	let seconds: number | string =
		duration - days * (3600 * 24) - hours * 3600 - minutes * 60
	let endCountdown = false
	if (days < 10) {
		days = '0' + days
	}
	if (hours < 10) {
		hours = '0' + hours
	}
	if (minutes < 10) {
		minutes = '0' + minutes
	}
	if (seconds < 10) {
		seconds = '0' + seconds
	}
	if (days === '00' && hours === '00' && minutes === '00' && seconds === '00') {
		endCountdown = true
	}
	return { days, hours, minutes, seconds, endCountdown }
}

const useCountdown = (startDate?: Date, endDate?: Date) => {
	const [startTime, setStartTime] = useState(startDate ?? new Date())
	const seconds = useMemo(() => {
		if (endDate) {
			return getCountdownSeconds(
				new Date(endDate).getTime(),
				new Date(startTime).getTime()
			)
		}
		return
	}, [endDate, startTime])

	const timer = useMemo(() => {
		if (!seconds || seconds <= 0) return
		return getDurationFromSeconds(seconds)
	}, [seconds])

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date()
			setStartTime(now)
		}, 1000)
		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return timer
}

const Counter = ({
	startTime = dayjs().toDate(),
	endTime,
	showDay = true,
	showHour = true,
	showMinute = true,
	showSecond = true,
}: {
	startTime?: Date
	endTime: Date
	showDay?: boolean
	showHour?: boolean
	showMinute?: boolean
	showSecond?: boolean
}) => {
	const timer = useCountdown(startTime, endTime)

	return (
		<Flex
			gap={2}
			alignItems={'center'}
			justifyContent={'center'}
			color={'white'}
		>
			{showDay && (
				<>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
						lineHeight={{ base: '20px', lg: '27px' }}
					>
						{timer?.days?.toString().charAt(0) ?? '0'}
					</Text>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.days?.toString().charAt(1) ?? '0'}
					</Text>
					<Text>:</Text>
				</>
			)}
			{showHour && (
				<>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.hours?.toString().charAt(0) ?? '0'}
					</Text>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.hours?.toString().charAt(1) ?? '0'}
					</Text>
					<Text>:</Text>
				</>
			)}
			{showMinute && (
				<>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.minutes?.toString().charAt(0) ?? '0'}
					</Text>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.minutes?.toString().charAt(1) ?? '0'}
					</Text>
				</>
			)}
			{showMinute && showSecond && <Text>:</Text>}
			{showSecond && (
				<>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.seconds?.toString().charAt(0) ?? '0'}
					</Text>
					<Text
						p={2}
						bg={'#191919'}
						borderRadius={'md'}
						fontSize={{ base: '14px', lg: '20px' }}
					>
						{timer?.seconds?.toString().charAt(1) ?? '0'}
					</Text>
				</>
			)}
		</Flex>
	)
}
export default Counter
