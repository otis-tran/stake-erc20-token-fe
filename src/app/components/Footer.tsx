export default function Footer() {
    return (
        <footer className="w-full px-6 py-4 bg-black/50 text-white border-t border-white/10 text-sm text-center backdrop-blur">
            © {new Date().getFullYear()}, StakeApp
            <span className="mx-2 h-4 border-l border-white/30"></span>
            Developed by <span className="font-semibold text-gray-300">Otis Tran</span>
        </footer>
    );
}
