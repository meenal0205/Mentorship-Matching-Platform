
import Sidebar from "@/components/sidebar/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-screen flex w-full bg-primary ">
            <div className="w-[20%] lg:w-[10%] h-screen sticky top-0">
                <Sidebar />
            </div>
            <div className="w-[80%] lg:w-[90%] h-screen overflow-y-auto rounded-s-3xl  bg-white">
                {children}
            </div>
        </main>

    );
}