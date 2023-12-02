import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'Treasure Island Admin',
    description: 'Treasure Island Admin Dashboard'
}

const AdminLayout = ({children}:{children: React.ReactNode}) => {
    return ( <div>
        <div> <AdminNav/></div>
        {children}
    </div> );
}
 
export default AdminLayout;