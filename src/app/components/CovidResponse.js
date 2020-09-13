export default function CovidResponse() {
    return (
        <div className="container py-5">
            <div className="row no-gutters align-items-center">
                <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <img src="/images/covid.jpg" />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 pt-4 p-md-0">
                    <h4>Covid-19 Response</h4>
                    <h2><span style={{color: "#00c5ca"}}>Safety </span> Promised</h2>
                    <p>
                        Your safety is our priority, and irrespective of the current pandemic, we make sure that all our spaces show the utmost level of cleanliness. However, with the changing times and current guidelines by the Government and health authorities, we have made sure that the guidelines are followed and the safety level is highest.
                    </p>
                </div>
            </div>
            <div className="pt-5 mt-md-5">
                <h3>Redesigned for the new normal</h3>
                <p>We’ve reorganized our spaces to ensure sufficient distancing & redesigned it to ensure restrictive & guided movement across all areas.</p>
                <div className="row no-gutters">
                    <div className="col-12 col-md-4 p-3">
                        <div className="item p-3">
                            <div className="p-3"><img src="/images/covid1.svg" /></div>
                            <h6>Spaced out Seating</h6>
                            <p className="text-muted">The seating arrangement has been updated to match the minimum distance guidelines.</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-3">
                        <div className="item p-3">
                            <div className="p-3"><img src="/images/covid2.svg" /></div>
                            <h6>Limited Occupancy</h6>
                            <p className="text-muted">The spaces have reduced the seats to ensure reduced crowd and sustain hygiene</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-3">
                        <div className="item p-3">
                            <div className="p-3"><img src="/images/covid3.svg" /></div>
                            <h6>Sanitisation Occupied</h6>
                            <p className="text-muted">The resources are furnished so that your needs for sanitisation are well maintained.</p>
                        </div>
                    </div>
                </div>

            </div>
            <style jsx>{`
                img {
                    max-width: 90%;
                    border-radius: 10px;
                }
                .item {
                    box-shadow: 0px 0px 20px -2px rgba(0,0,0,0.18);
                    border-radius: 10px
                }
            `}</style>
        </div>
    )
}