import withAuth from '../lib/withAuth'

const textPrimary = {
    color: "#58b8c2",
    fontWeight: "bold"
}

function Profile(props) {
    return (
        <div>
            <div className="imageContainer p-3">
                <div className=" pt-5">
                    <h3 className="pt-5 pb-3 text-white">
                        { props.user ? props.user.displayName : "Please Sign In" }
                    </h3>
                </div>
            </div>
            <div className="position-relative px-3 pb-5" style={{top: "-10px"}}>
                <div className="box px-3 py-4 text-muted d-flex justify-content-between">
                    <div>Uh Oh! No upcoming booking.</div>
                    <div style={textPrimary}>
                        BOOK NOW!
                    </div>
                </div>
                <div className="box">
                    <div className="p-3 border-bottom">
                        Offer Zone
                    </div>
                    <div className="p-3 border-bottom">
                        View Past Bookings
                    </div>
                    <div className="p-3">
                        Support
                    </div>
                </div>
                <div className="box">
                    <div className="p-3 border-bottom">
                        About Us
                    </div>
                    <div className="p-3">
                        Privacy Policy
                    </div>
                </div>
                <div className="box">
                    <div className="p-3 text-danger font-weight-bold">
                        Logout
                    </div>
                </div>
            </div>
            <style jsx>{`
                .imageContainer {
                    background: url('/images/aftermenu.jpg');
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center center;
                }
                .box {
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.2), 0px 1px 20px -5px rgba(0,0,0,0.2);
                    margin-bottom: 1.5rem;
                }
            `}</style>
        </div>
    )
}

export default withAuth(Profile)