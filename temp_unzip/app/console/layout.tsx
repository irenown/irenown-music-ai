import type React from "react"
import { ConsoleLayout } from "@/components/console/console-layout"

export default function ConsoleRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConsoleLayout>{children}</ConsoleLayout>
}
