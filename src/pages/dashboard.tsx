import { Link } from 'react-router-dom'
// import Calculator1 from './calculator1'
// import Calculator2 from './calculator2'

function Dashboard() {
    return (
        <div>
            <header>
                <h1>計算サイト</h1>
                <h2>このページでは以下の計算を行うことができます。</h2>
            </header>

            <nav>
                <ul>
                    <li>
                        <Link to="/calculator1">各成績計算</Link>
                    </li>
                    <li>
                        <Link to="/calculator2">GPA計算</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Dashboard
