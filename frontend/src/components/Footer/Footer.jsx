const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <div className=" text-center fixed-bottom">
                    <div className="-footer text-muted">
                        <h6> © {new Date().getFullYear()}</h6>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer