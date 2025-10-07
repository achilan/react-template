import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome — React + Vite + Redux + TypeScript</h1>
      <p>This sample includes a Posts CRUD using the public JSONPlaceholder API.</p>
      <Link to="/posts"><button style={{ marginTop: 12 }}>Go to Posts (CRUD)</button></Link>
    </div>
  )
}
