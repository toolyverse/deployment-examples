import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/about">About</Link>
        </nav>
    )
}
