import Header from "@/components/header";
import Sidebar from "../components/sidebar";

const ClientLayout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <div className="w-64 bg-gray-100 text-black">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Uncomment if Header is needed */}
        <Header />
        <main className="p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
