export default function TextImage({ heading, image, contentHeading, children, reverse=false}) {
    return (
        <div className="container m-auto py-3 py-md-3">
            <div className="text-center">
                <h1 className="m-0">{heading}</h1>
            </div>
            <div className="row no-gutter align-items-center pt-5">
                <div className="col-sm-12 col-md-5 pb-5 pb-md-0 image text-center order-1">
                    <img src={image} className="w-100 rounded" />
                </div>
                <div className={`col-sm-12 col-md-7 content ${ reverse ? "order-0" : "order-2" }`}>
                    <div>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
