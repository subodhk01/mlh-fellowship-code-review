import React from 'react'
import { loadFirebase } from '../lib/firebase'
import withAuth from '../lib/withAuth'
import { Modal } from 'react-bootstrap'
import Rating from 'react-rating'
import { FaTimes } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa'
import Loader from '../lib/loader'

function RatingPopup(props) {
    const [ show, setShow ] = React.useState(false);
    const [ rating, setRating ] = React.useState(0);
    const [ message, setMessage ] = React.useState("");
    const [ success, setSuccess ] = React.useState('');
    const [ error, setError ] = React.useState('');
    const [ loading, setLoading ] = React.useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRating = (value) => setRating(value);
    const handleMessage = (event) => setMessage(event.target.value);

    async function handleSubmit(){
        setLoading(true);
        setError("");
        if (rating == 0){
            setError("You need to provide a rating before submitting.");
            setLoading(false)
            return;
        }
        let firebase = await loadFirebase();
        firebase.firestore().collection('restaurants').doc(props.restaurantId).collection('ratings')
            .add({
                rating: rating,
                review: message,
                orderId: props.orderId,
                userId: props.userId,
                name: props.user.displayName,
                timestamp: new Date(),
                status: null
            })
            .then(doc => {
                setSuccess("Review submitted successfully")
                setLoading(false)
                setTimeout( function(){
                    setShow(false)
                } ,1400)
            })
            .catch(error => {
                setError(error)
                console.log(error)
            });

    }

    return (
        <>
            <button className="btn btn-solid-reg mb-2" onClick={handleShow}>
                Rate Order
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                centered
            >
                <div className="p-3 text-center">
                    <div className="closeButton p-2 position-absolute" onClick={handleClose}>
                        <FaTimes color="silver" size="25" />
                    </div>
                    <div className="p-3">
                        <h5>
                            Review your experience at {props.restaurantName}
                        </h5>
                    </div>
                    <div className="py-3">
                        <Rating
                            onChange={handleRating}
                            initialRating={rating}
                            emptySymbol={<FaStar size="30" color="silver" />}
                            fullSymbol={<FaStar size="30" color="orange" />}
                        />
                    </div>
                    <div className="p-3">
                        <textarea className="form-control" rows="5" placeholder="Message" onChange={handleMessage} />
                    </div>
                    <div className="p-2 text-danger">
                        {error}
                    </div>
                    <div className="p-2 text-success">
                        {success}
                    </div>
                    <div className="p-3">
                        { loading ? <Loader /> : <div className="btn btn-solid-reg" onClick={handleSubmit}>Submit</div> }
                    </div>
                </div>
            </Modal>
            <style jsx>{`
                .closeButton {
                    cursor: pointer;
                    top: 5px;
                    right: 5px;
                }
            `}</style>
        </>
    );

}

export default withAuth(RatingPopup)
