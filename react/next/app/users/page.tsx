import Link from 'next/link';

interface User {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) {
        throw new Error('Failed to fetch users');
    }
    return res.json();
}

export default async function UsersPage() {
    const users: User[] = await getUsers();

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Users (Server Fetched)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <Link
                        key={user.id}
                        href={`/users/${user.id}`}
                        className="block p-6 bg-gray-800 border border-gray-700 rounded-xl hover:border-blue-500 transition-transform hover:-translate-y-1"
                    >
                        <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                        <p className="text-gray-400 mb-1"><strong>Email:</strong> {user.email}</p>
                        <p className="text-gray-400"><strong>Company:</strong> {user.company.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
