import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
            <Link to="/users">Users</Link>
        </nav>
    )
}
