import { HomeContentModule } from "./home-content-module"

interface HomeContentModuleWrapperProps {
  onScrollUp?: () => void
}

export default async function HomeContentModuleWrapper({ onScrollUp }: HomeContentModuleWrapperProps) {
  return <HomeContentModule onScrollUp={onScrollUp} />
}
