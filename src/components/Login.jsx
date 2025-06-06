
export default function Login() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '25rem', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="text-center mb-4">Login</h1>
                    <form className="d-flex flex-column" style={{ flex: 1 }}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}