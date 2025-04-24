import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import CreateBrandModal from "@/features/brands/components/create-brand-modal";
import CreateCategoryModal from "@/features/categories/components/create-category-modal";
import CreateUserModal from "@/features/members/components/create-user-modal";
import ChangePasswordModal from "@/features/settings/components/change-password-modal";
import CreateSupplierModal from "@/features/suppliers/components/create-supplier-modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateCategoryModal />
      <CreateBrandModal />
      <CreateSupplierModal />
      <CreateUserModal />
      <ChangePasswordModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
