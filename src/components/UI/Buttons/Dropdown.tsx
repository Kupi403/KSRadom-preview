import Image from 'next/image'
import dropdown from '@/assets/icons/dropdown.svg'
import dropdownDark from '@/assets/icons/dropdown-dark.svg'
type DropdownProps = React.HTMLAttributes<HTMLImageElement> & {
	dark?: boolean
}

const Dropdown = ({ dark, ...props }: DropdownProps) => {
	const imageSrc = dark ? dropdownDark.src : dropdown.src
	return (
		<Image
			src={imageSrc}
			width={13}
			height={6}
			alt=''
			{...props}
		/>
	)
}

export default Dropdown
