import { MdPlace, MdAccountBalance, MdContentCopy } from 'react-icons/md'

export const STAFF_MEMBERS = [
	{ name: 'Daniel', surname: 'Maciejewski', phone: '608 490 122', role: 'Przewodniczący Komisji Sędziowskiej' },
	{ name: 'Norbert', surname: 'Chrząstek', phone: '517 027 739', role: 'Przewodniczący Komisji Szkoleniowej' },
	{ name: 'Łukasz', surname: 'Wrochna', phone: '606 703 865', role: 'Referent ds. obsady' },
	{ name: 'Artur', surname: 'Badowski', phone: '660 787 001', role: 'Referent ds. finansowych' },
]
export const BANK_ACC_NUMBER = '86 1090 2688 0000 0001 3690 8649'

export const BASIC_INFO = {
	PLACE: { TEXT: '26-600 Radom, ul. Chrobrego 52 (siedziba MZPN Delegatury Radom)', ICON: MdPlace },
	MAIL: { TEXT: 'info@ksradom.pl' },
	ACC_NUMBER: { TEXT: BANK_ACC_NUMBER, ICON: MdAccountBalance, COPY_ICON: MdContentCopy },
}

export const GOOGLE_MAPS_URL =
	'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7037.033533873541!2d21.161411732017598!3d51.422031625197796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47185f2d38e02b81%3A0x1e0bd113a05165b1!2sBoles%C5%82awa%20Chrobrego%2052%2C%2026-605%20Radom!5e0!3m2!1spl!2spl!4v1749326535528!5m2!1spl!2spl'
