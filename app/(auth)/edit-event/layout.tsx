import { Suspense } from "react";

export default function EditEventLayout({ children }: { children: React.ReactNode }) {
    return <Suspense>
              {children}
           </Suspense>
}