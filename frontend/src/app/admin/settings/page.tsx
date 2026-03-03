export default function AdminSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h3 font-bold text-neutrals-100">Settings</h1>
        <p className="text-body-md text-neutrals-60 mt-1">Manage your account and platform preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-white border border-neutrals-20 rounded-md p-6">
          <h2 className="text-h4 font-semibold text-neutrals-100 mb-1">Profile</h2>
          <p className="text-body-sm text-neutrals-60 mb-5">Manage your admin profile information.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">Full Name</label>
              <input type="text" className="input-field" defaultValue="Admin User" readOnly />
            </div>
            <div>
              <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">Email Address</label>
              <input type="email" className="input-field" defaultValue="admin@quickhire.com" readOnly />
            </div>
          </div>
          <p className="text-body-sm text-neutrals-60 mt-4 italic">Profile management is coming in a future release.</p>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-neutrals-20 rounded-md p-6">
          <h2 className="text-h4 font-semibold text-neutrals-100 mb-1">Notifications</h2>
          <p className="text-body-sm text-neutrals-60 mb-5">Configure your notification preferences.</p>
          <div className="space-y-3">
            {['New job application received', 'Job listing created', 'Job listing deleted', 'Weekly summary report'].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" readOnly />
                <span className="text-body-md text-neutrals-80">{item}</span>
              </label>
            ))}
          </div>
          <p className="text-body-sm text-neutrals-60 mt-4 italic">Notification management is coming in a future release.</p>
        </div>

        {/* API Keys */}
        <div className="bg-white border border-neutrals-20 rounded-md p-6">
          <h2 className="text-h4 font-semibold text-neutrals-100 mb-1">API Keys</h2>
          <p className="text-body-sm text-neutrals-60 mb-5">Manage API access to the QuickHire platform.</p>
          <div>
            <label className="block text-body-sm font-semibold text-neutrals-100 mb-2">API Key</label>
            <div className="flex gap-3">
              <input
                type="password"
                className="input-field flex-1"
                defaultValue="qh_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                readOnly
              />
              <button className="btn-secondary text-sm px-5 whitespace-nowrap" disabled>Reveal</button>
            </div>
          </div>
          <p className="text-body-sm text-neutrals-60 mt-4 italic">API key management is coming in a future release.</p>
        </div>
      </div>
    </div>
  );
}
