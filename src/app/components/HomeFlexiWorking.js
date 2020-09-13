export default function HomeFlexiWorking({children}){
  return (
    <div id="services" className="cards-1 bg-white">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h2>Flexi-working places</h2>
                    <p className="p-heading p-large">We provide flexible working and meeting areas, mostly out of cafes.Wi-Fi, power, and coffee are on us, while you focus on your dreams.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">

                    <div className="card">
                        <img className="card-image" src="images/services-icon-1.svg" alt="alternative" />
                        <div className="card-body">
                            <h4 className="card-title">Startups</h4>
                            <p>Budding entrepreneurs and their employees - dream big!</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-image" src="images/services-icon-2.svg" alt="alternative" />
                        <div className="card-body">
                            <h4 className="card-title">Individuals</h4>
                            <p>Write, draw, read, work, click or code - but don't stop!</p>
                        </div>
                    </div>

                    <div className="card">
                        <img className="card-image" src="images/services-icon-3.svg" alt="alternative" />
                        <div className="card-body">
                            <h4 className="card-title">Corporates</h4>
                            <p>A corporate package that all employees can use - we've got you covered!</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
