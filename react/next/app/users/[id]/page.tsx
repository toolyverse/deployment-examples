import Link from 'next/link';
import { notFound } from 'next/navigation';

interface UserDetail {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
    };
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
}

async function getUser(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) {
        if (res.status === 404) return undefined;
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export default async function UserDetailPage({ params }: { params: { id: string } }) {
    // In Next.js 15+, params is a promise, but in 14 it's an object. 
    // Let's assume params is standard. If using latest canary, await params might be needed.
    // Checking package.json, next version is 16.0.7
    // In Next.js 15+, params is async.

    const { id } = await params;
    const user: UserDetail | undefined = await getUser(id);

    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto p-8">
            <Link href="/users" className="inline-block mb-6 text-blue-400 hover:text-blue-300">
                ← Back to Users
            </Link>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">{user.name}</h1>

                <div className="space-y-3 text-gray-300">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-semibold mb-3 text-white">Company</h3>
                    <p className="text-gray-300">{user.company.name}</p>
                    <p className="text-gray-400 italic">"{user.company.catchPhrase}"</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-semibold mb-3 text-white">Address</h3>
                    <p className="text-gray-300">{user.address.street}, {user.address.city}, {user.address.zipcode}</p>
                </div>
            </div>
        </div>
    );
}
