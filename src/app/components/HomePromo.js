export default function(){
    return (
        <section className="px-2 border-top border-bottom bg-white py-5">
            <div className="container">
                <div className="heading mb-3">
                    <h2 className="font-weight-bold">GET YOUR GEARS READY TO WORK</h2>
                </div>
                <div className="subheading mb-4">
                    Every human needs to work; moreover, every human has a dream.
                    Are space constraints restraining you from achieving your dreams,
                    is your environment not conducing enough? We're here to help.
                    Dream more, with us.
                </div>
                <div className="button">
                    <button className="btn btn-solid-reg">Get Started</button>
                </div>
            </div>
            <style jsx>{`
                .subheading {
                    font-size: 1.1rem;
                }
            `}</style>
        </section>
    )
}
