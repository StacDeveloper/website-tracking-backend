"useClient"

import { accentColors, settingsNav } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { FieldLabel, SelectInput, TextInput, Toggle } from "@/lib/Reusable-Components/Settings";


interface SettingsViewProps {
    setSettingsTab: React.Dispatch<React.SetStateAction<string>>
    settingsTab: string
    fullName: string
    setFullName: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    accentColor: (typeof accentColors)[number]
    setAccentColor: React.Dispatch<React.SetStateAction<typeof accentColors[number]>>
    defaultTestType: string
    setDefaultTestType: React.Dispatch<React.SetStateAction<string>>
    requestTimeout: string
    setRequestTimeout: React.Dispatch<React.SetStateAction<string>>
    maxConcurrency: string
    setMaxConcurrency: React.Dispatch<React.SetStateAction<string>>
    followRedirects: boolean
    setFollowRedirects: React.Dispatch<React.SetStateAction<boolean>>
    notifyScanCompleted: boolean
    setNotifyScanCompleted: React.Dispatch<React.SetStateAction<boolean>>
    notifyCritical: boolean
    setNotifyCritical: React.Dispatch<React.SetStateAction<boolean>>
    notifyWeekly: boolean
    setNotifyWeekly: React.Dispatch<React.SetStateAction<boolean>>

}

const SettingsView = (
    {
        setSettingsTab, settingsTab, fullName, setFullName, email, setEmail, accentColor, setAccentColor, defaultTestType, setDefaultTestType, requestTimeout, setRequestTimeout, maxConcurrency, setMaxConcurrency,
        followRedirects, setFollowRedirects, notifyScanCompleted, setNotifyScanCompleted, notifyCritical, setNotifyCritical, notifyWeekly, setNotifyWeekly
    }:

        SettingsViewProps) => {


    const { c, isDark } = useColorContext()

    return (
        <div className="px-8 pb-16">
            <h1 className="mb-1 text-xl font-bold">Settings</h1>
            <p className="mb-5 text-sm" style={{ color: c.textMuted }}>Manage your account, preferences and configuration.</p>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr]">
                <CardShell className="h-fit p-2">
                    <div className="flex flex-col gap-1">
                        {settingsNav.map((item) => {
                            const active = settingsTab === item.label;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setSettingsTab(item.label)}
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
                                    style={{
                                        backgroundColor: active ? c.activeNavBg : "transparent",
                                        color: active ? c.accent : item.label === "Danger Zone" ? "#f87171" : c.textSecondary,
                                    }}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </CardShell>

                <div className="flex flex-col gap-4">
                    {settingsTab === "General" && (
                        <CardShell className="p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <SectionLabel>General Settings</SectionLabel>
                                <button className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: c.accent }}>
                                    Save Changes
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <TextInput value={fullName} onChange={setFullName} />
                                </div>
                                <div>
                                    <FieldLabel>Email Address</FieldLabel>
                                    <TextInput value={email} onChange={setEmail} />
                                </div>
                            </div>
                        </CardShell>
                    )}

                    {(settingsTab === "General" || settingsTab === "Appearance") && (
                        <CardShell className="p-5">
                            <SectionLabel>Appearance</SectionLabel>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <FieldLabel>Theme</FieldLabel>
                                    <SelectInput value={isDark ? "Dark" : "Light"} />
                                </div>
                                <div>
                                    <FieldLabel>Accent Color</FieldLabel>
                                    <div className="flex items-center gap-2 pt-1">
                                        {accentColors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setAccentColor(color)}
                                                className="h-6 w-6 rounded-full"
                                                style={{ backgroundColor: color, outline: accentColor === color ? `2px solid ${color}` : "none", outlineOffset: "2px" }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardShell>
                    )}

                    {(settingsTab === "General" || settingsTab === "Testing") && (
                        <CardShell className="p-5">
                            <SectionLabel>Testing Preferences</SectionLabel>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <FieldLabel>Default Test Type</FieldLabel>
                                    <SelectInput value={defaultTestType} />
                                </div>
                                <div>
                                    <FieldLabel>Request Timeout</FieldLabel>
                                    <SelectInput value={requestTimeout} />
                                </div>
                                <div>
                                    <FieldLabel>Max Concurrency</FieldLabel>
                                    <SelectInput value={maxConcurrency} />
                                </div>
                            </div>
                            <label className="mt-4 flex items-start gap-2.5">
                                <input type="checkbox" checked={followRedirects} onChange={(e) => setFollowRedirects(e.target.checked)} className="mt-0.5 h-4 w-4" />
                                <span>
                                    <span className="text-sm font-medium">Follow Redirects</span>
                                    <p className="text-xs" style={{ color: c.textFaint }}>Follow HTTP redirects during scanning.</p>
                                </span>
                            </label>
                        </CardShell>
                    )}

                    {(settingsTab === "General" || settingsTab === "Notifications") && (
                        <CardShell className="p-5">
                            <SectionLabel>Notifications</SectionLabel>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {[
                                    { label: "Scan Completed", desc: "Receive notification when a scan is completed.", checked: notifyScanCompleted, set: setNotifyScanCompleted },
                                    { label: "Critical Vulnerabilities", desc: "Get notified about critical issues immediately.", checked: notifyCritical, set: setNotifyCritical },
                                    { label: "Weekly Summary", desc: "Receive weekly summary reports.", checked: notifyWeekly, set: setNotifyWeekly },
                                ].map((n) => (
                                    <div key={n.label} className="flex items-start justify-between gap-2 rounded-lg p-3" style={{ backgroundColor: c.inputBg }}>
                                        <div>
                                            <p className="text-xs font-medium">{n.label}</p>
                                            <p className="mt-0.5 text-[11px]" style={{ color: c.textFaint }}>{n.desc}</p>
                                        </div>
                                        <Toggle checked={n.checked} onChange={() => n.set(!n.checked)} />
                                    </div>
                                ))}
                            </div>
                        </CardShell>
                    )}

                    {!["General", "Appearance", "Testing", "Notifications"].includes(settingsTab) && (
                        <CardShell className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-sm font-medium">{settingsTab}</p>
                            <p className="mt-1 text-xs" style={{ color: c.textMuted }}>This section is coming soon.</p>
                        </CardShell>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsView