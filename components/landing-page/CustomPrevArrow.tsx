import { Box } from '@chakra-ui/react'
export interface CustomArrowProps {
	className?: string | undefined
	style?: React.CSSProperties | undefined
	onClick?: React.MouseEventHandler<any> | undefined
	currentSlide?: number | undefined
	slideCount?: number | undefined
}

const CustomPrevArrow = ({
	currentSlide,
	slideCount,
	isHidden = true,
	...props
}: CustomArrowProps & { isHidden?: boolean }) => {
	return (
		<div
			{...props}
			className={
				currentSlide === 0 || slideCount === 0
					? isHidden
						? // ? 'slick-arrow slick-hidden'
						  props.className
						: props.className
					: props.className
			}
			style={{
				display:
					currentSlide === 0 || slideCount === 0
						? isHidden
							? // ? 'none'
							  'block'
							: 'block'
						: 'block',
			}}
		>
			<svg
				width="44"
				height="44"
				viewBox="0 0 44 44"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M30.8002 11L19.8002 22L30.8002 33L28.6002 37.4L13.2002 22L28.6002 6.6L30.8002 11Z"
					fill="url(#paint0_linear_57_3690)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_57_3690"
						x1="13.2062"
						y1="22.0601"
						x2="30.8006"
						y2="22.0601"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#DA9917" />
						<stop offset="0.3198" stopColor="#FFCF25" />
						<stop offset="0.6802" stopColor="#FFFF90" />
						<stop offset="1" stopColor="#ECBF26" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	)
}

export default CustomPrevArrow
