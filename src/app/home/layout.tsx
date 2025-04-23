import Header from "../components/Header";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col bg-black">
            <div className="h-16">
                <Header />
            </div>

            <div className="flex-grow overflow-y-auto  p-6">
                {children}
            </div>
        </div>
    );
}
