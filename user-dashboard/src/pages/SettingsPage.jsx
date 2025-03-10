import BioForm from "../components/forms/BioForm"
import EmailForm from "../components/forms/EmailForm"
import PasswordForm from "../components/forms/PasswordForm"
import SocialLinksForm from "../components/forms/SocialLinksForm"
import Tabs from "../components/main/Tabs"

const SettingsPage = () => {
  return (
    <div className="flex-1 mt-1">
      <div
        role="tablist"
        className="relative tabs tabs-bordered justify-center w-full"
      >
        <Tabs name="tab_settings" ariaLabel="Bio" defaultChecked={false}>
          <BioForm />
        </Tabs>
        <Tabs name="tab_settings" ariaLabel="Email" defaultChecked={false}>
          <EmailForm />
        </Tabs>
        <Tabs name="tab_settings" ariaLabel="Password" defaultChecked={false}>
          <PasswordForm />
        </Tabs>
        <Tabs name="tab_settings" ariaLabel="Links" defaultChecked={false}>
          <SocialLinksForm />
        </Tabs>
      </div>
    </div>
  )
}
export default SettingsPage
