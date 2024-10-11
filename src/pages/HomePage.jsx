import { Link } from "react-router-dom";

const HomePage = () => {
    return <>
        <h1>Hello World</h1>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
    </>
}

export default HomePage;