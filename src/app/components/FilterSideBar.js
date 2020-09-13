import InputRange from 'react-input-range'
import Form from 'react-bootstrap/Form'
import { getSliderLabel } from '../utils/functions'

export default function FilterSideBar() {
    const [time, setTime] = React.useState({ min: 600, max: 900 })
    const [distance, setDistance] = React.useState(3)
    const [price, setPrice] = React.useState({
        price50: false,
        price100: false,
        any: false
    })
    const [offer, setOffer] = React.useState({
        freecoffee: false,
        percentoff20: false
    })
    const [location, setLocation] = React.useState({
        location1: false,
        location2: false
    })
    const handlePrice = (event) => {
        setPrice({ ...price, [event.target.name]: event.target.checked });
    }
    const handleOffer = (event) => {
        setOffer({ ...offer, [event.target.name]: event.target.checked });
    }
    const handleLocation = (event) => {
        setLocation({ ...location, [event.target.name]: event.target.checked });
    }
    return (
        <div>
            <div className="border-top px-4 pt-5 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                <h4 className="m-0">Filters</h4>
            </div>
            <div className="px-4 pb-5 pt-3 filterContainer">
                <div className="py-3 mb-4">
                    <div>
                        <h5>Time</h5>
                    </div>
                    {/* <div className="text-center d-flex align-items-center justify-content-center">
                        <div className="p-2">
                            <h6 className="m-0">{getSliderLabel(time.min)}</h6>
                        </div> 
                        <div className="p-2">to</div>
                        <div className="p-2">
                            <h6 className="m-0">{getSliderLabel(time.max)}</h6>
                        </div>
                    </div> */}
                    <div className="px-3 py-3">
                        <InputRange
                            formatLabel={getSliderLabel.bind(time)}
                            maxValue={1320}
                            minValue={540}
                            step={30}
                            onChange={value => setTime(value)}
                            value={time}
                        />
                    </div>
                </div>
                <div className="pt-3">
                    <div>
                        <h5>Distance</h5>
                    </div>
                    <div className="px-3 pt-3">
                        {/* <InputRange
                            maxValue={8}
                            minValue={0}
                            step={0.5}
                            onChange={value => setDistance(value)}
                            value={distance}
                        /> */}
                        <Form.Label>Range</Form.Label>
                        <Form.Control type="range" />
                        <div className="d-flex justify-content-between">
                            <Form.Label>0km</Form.Label>
                            <Form.Label>2km</Form.Label>
                            <Form.Label>4km</Form.Label>
                            <Form.Label>6km</Form.Label>
                            <Form.Label>8km</Form.Label>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    <div>
                        <h5>Price</h5>
                    </div>
                    <div className="p-1">
                        <Form>
                            <Form.Check inline type="checkbox" id="price50" label="&#8377;50/hour" checked={price.price50} onChange={handlePrice} name="price50" />
                            <Form.Check inline type="checkbox" id="price100" label="&#8377;100/hour" checked={price.price100} onChange={handlePrice} name="price100" />
                            <Form.Check inline type="checkbox" id="any" label="any" checked={price.any} onChange={handlePrice} name="any" />
                        </Form>
                    </div>
                </div>
                <div className="pt-3">
                    <div>
                        <h5>Offers</h5>
                    </div>
                    <div className="p-1">
                        <Form>
                            <Form.Check inline type="checkbox" id="freecoffee" label="Free Unlimited Coffee" checked={offer.freecoffee} onChange={handleOffer} name="freecoffee" />
                            <Form.Check inline type="checkbox" id="percentoff20" label="20% off on Food" checked={offer.percentoff20} onChange={handleOffer} name="percentoff20" />
                        </Form>
                    </div>
                </div>
                <div className="pt-3">
                    <div>
                        <h5>Location</h5>
                    </div>
                    <div className="p-1">
                        <Form>
                            <Form.Check inline type="checkbox" id="location1" label="Koramangala" checked={location.location1} onChange={handleLocation} name="location1" />
                            <Form.Check inline type="checkbox" id="location2" label="Bannerghatta Road" checked={location.location2} onChange={handleLocation} name="location2" />
                        </Form>
                    </div>
                </div>
                <div className="pt-3 text-center">
                    <div className="btn btn-solid-reg">Apply</div>
                </div>
            </div>
            <style jsx>{`
                .filterContainer{
                    font-size: 0.9rem;
                    color: rgba(50,50,50, 0.9);
                }
            `}</style>
        </div>
    )
}