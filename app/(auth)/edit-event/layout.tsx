import { Suspense } from "react";

export default function EditEventLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback= {<div className="flex justify-center items-center h-screen">Loading...</div>}>
              {children}
           </Suspense>
}