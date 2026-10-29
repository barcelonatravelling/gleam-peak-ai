import SiteShell, { rootMetadata, viewport } from "@/components/site/SiteShell";
import "@/app/globals.css";

export const metadata = rootMetadata("es");
export { viewport };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
