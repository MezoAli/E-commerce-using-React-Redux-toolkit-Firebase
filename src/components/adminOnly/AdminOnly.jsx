import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function AdminOnlyLink({ children }) {
	const email = useSelector((state) => state.auth.email);
	if (email === process.env.REACT_APP_ADMIN_EMAIL) {
		return children;
	}
	return null;
}

function AdminOnly({ children }) {
	const email = useSelector((state) => state.auth.email);
	if (email === process.env.REACT_APP_ADMIN_EMAIL) {
		return children;
	}
	return (
		<div className="my-5">
			<h2 className="text-danger">Permission Denied</h2>
			<p>This Route Is Only For Admin Level User</p>
			<Link to="/" className="btn btn-dark">
				Back To Home
			</Link>
		</div>
	);
}

export default AdminOnly;
