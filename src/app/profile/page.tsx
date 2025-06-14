

import ProfileModal from "@/components/ProfileModal";

export default function Profile() {
  return <ProfileModal onClose={function (): void {
      throw new Error("Function not implemented.");
  } } onLogout={function (): void {
      throw new Error("Function not implemented.");
  } } />;
}
