import { FaCar } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { RiProjector2Line, RiHomeHeartLine} from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";
import { IoGiftOutline } from "react-icons/io5";
import { GiCctvCamera } from "react-icons/gi";



export const Categories = [
    {
        label: 'All',
        icon: MdStorefront
    },
    {
        label: 'CCTV Cameras',
        icon: GiCctvCamera
    },
    {
        label: 'LCD Projectors',
        icon: RiProjector2Line
    },
    {
        label: 'Car Accessories',
        icon: FaCar
    },
    {
        label: 'Sport Watches',
        icon: BsSmartwatch
    },
    {
        label: 'Home & Leisure',
        icon: RiHomeHeartLine
    },
    {
        label: 'Gift Ideas',
        icon: IoGiftOutline
    },
]