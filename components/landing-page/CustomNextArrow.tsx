import { Box } from '@chakra-ui/react'
export interface CustomArrowProps {
	className?: string | undefined
	style?: React.CSSProperties | undefined
	onClick?: React.MouseEventHandler<any> | undefined
	currentSlide?: number | undefined
	slideCount?: number | undefined
}

const CustomNextArrow = ({
	currentSlide,
	slideCount,
	...props
}: CustomArrowProps) => {
	return (
		<div
			{...props}
			className={
				(currentSlide ?? 0 >= 0) || (slideCount ?? 0 >= 0)
					? props?.className?.includes('slick-disabled')
						? 'slick-arrow slick-hidden'
						: props.className
					: props.className
			}
			style={{
				display:
					(currentSlide ?? 0 >= 0) || (slideCount ?? 0 >= 0)
						? props?.className?.includes('slick-disabled')
							? 'none'
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
					d="M13.2002 33L24.2002 22L13.2002 11L15.4002 6.6L30.8002 22L15.4002 37.4L13.2002 33Z"
					fill="url(#paint0_linear_57_3688)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_57_3688"
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

export default CustomNextArrow
