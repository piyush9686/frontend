import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function AppLayout({ children }) {

    return (

        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <div className="mx-auto flex max-w-7xl">

                <Sidebar />

                <main className="flex-1 p-4 pb-24 md:p-6">

                    {children}

                </main>

            </div>

            <MobileNav />

        </div>

    );

}

export default AppLayout;