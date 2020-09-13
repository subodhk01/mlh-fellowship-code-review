export default function HomeHero({children}){
    return (
      <header id="header" className="header">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="text-container">
                            <h1><span className="turquoise">NestIn Spaces<br/></span> Nurture Your Dreams</h1>
                            <p className="p-large">Now choose from several cafes, dining places, restaurants for your startup's office space, for your creativity, for everything you love.</p>
                            {/*<a className="btn-solid-lg page-scroll" href="#services">DISCOVER</a>*/}
                            {children}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image-container">
                            <img className="img-fluid" src="images/testimonials-2-men-talking.svg" alt="alternative" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
