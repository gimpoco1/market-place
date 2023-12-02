'use client';

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import Container from "../Container";

const AdminNav = () => {
    const pathname = usePathname();

    return ( <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
        <Container>
            <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                <Link href='/admin'>
                <AdminNavItem selected={pathname === '/admin'} icon={MdDashboard} label="Summary"/>
                </Link>
                <Link href='/admin/add-products'>
                <AdminNavItem selected={pathname === '/admin/add-products'} icon={MdLibraryAdd} label="Add Products"/>
                </Link>
                <Link href='/admin/manage-products'>
                <AdminNavItem selected={pathname === '/admin/manage-products'} icon={MdDns} label="Manage Products"/>
                </Link>
                <Link href='/admin/manage-orders'>
                <AdminNavItem selected={pathname === '/admin/manage-orders'} icon={MdFormatListBulleted} label="Manage Orders"/>
                </Link>

            </div>
        </Container>
    </div> );
}
 
export default AdminNav;