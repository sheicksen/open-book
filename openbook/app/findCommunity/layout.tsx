import Navbar from "../components/nav"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar></Navbar>
            <main>{children}</main>
        </div>);
    };
export default Layout;
    