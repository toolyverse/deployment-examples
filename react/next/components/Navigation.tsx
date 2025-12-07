import Link from 'next/link';

export function Navigation() {
    return (
        <nav className="p-6 bg-gray-900 border-b border-gray-800 flex gap-6 text-white mb-8">
            <Link href="/" className="hover:text-blue-400 font-bold">Home</Link>
            <Link href="/about" className="hover:text-blue-400 font-bold">About</Link>
            <Link href="/users" className="hover:text-blue-400 font-bold">Users</Link>
        </nav>
    );
}
