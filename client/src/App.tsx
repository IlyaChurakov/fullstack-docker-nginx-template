import { Link, Route, Routes } from 'react-router-dom'
import Users from './Users'

function App() {
	return (
		<Routes>
			<Route path='/' element={<Link to={'users'}>to users</Link>} />
			<Route path='/users' element={<Users />} />
			<Route
				path='*'
				element={
					<div>
						<p>Page not found</p>
						<Link to={'/'}>Back to home</Link>
					</div>
				}
			/>
		</Routes>
	)
}

export default App
