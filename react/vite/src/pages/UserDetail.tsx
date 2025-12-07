import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching user:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="container">Loading user details...</div>;
    }

    if (!user) {
        return <div className="container">User not found</div>;
    }

    return (
        <div className="container">
            <Link to="/users" className="back-link">← Back to Users</Link>
            <div className="card">
                <h1>{user.name}</h1>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>

                <div style={{ marginTop: '1rem' }}>
                    <h3>Company</h3>
                    <p>{user.company.name}</p>
                    <p><em>"{user.company.catchPhrase}"</em></p>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <h3>Address</h3>
                    <p>{user.address.street}, {user.address.city}, {user.address.zipcode}</p>
                </div>
            </div>
        </div>
    );
}
