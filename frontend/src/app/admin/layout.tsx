import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutrals-10">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-neutrals-20 h-16 flex items-center px-8 sticky top-0 z-10">
          <div className="ml-auto flex items-center gap-4">
            <span className="text-body-sm text-neutrals-60">Welcome, Admin</span>
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
