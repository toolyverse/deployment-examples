import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="container">Loading users...</div>;
    }

    return (
        <div className="container">
            <h1>Users</h1>
            <div className="user-grid">
                {users.map(user => (
                    <Link key={user.id} to={`/users/${user.id}`} className="user-card">
                        <h3>{user.name}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Company:</strong> {user.company.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
