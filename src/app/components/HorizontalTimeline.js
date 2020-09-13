export default function HorizontalTimeline(props) {
    const stage = props.stage
    var stage_int = 0
    switch(stage){
        case "REQUESTED":
            stage_int = 0
            break;
        case "CONFIRMED":
            stage_int = 1
            break;
        case "ONGOING":
            stage_int = 2
            break;
        case "COMPLETED":
            stage_int = 3
            break;
    }
    return (
        <div className="outerContainer">
            <div className="horizontal timeline">
                <div className="steps">
                    <div className={`step ${ stage_int==0 ? "current" : "" }`}>
                        <span>Requested</span>
                    </div>
                    <div className={`step ${ stage_int==1 ? "current" : "" }`}>
                        <span>Confirmed</span>
                    </div>
                    <div className={`step ${ stage_int==2 ? "current" : "" }`}>
                        <span>In progress</span>
                    </div>
                    <div className={`step ${ stage_int==3 ? "current" : "" }`}>
                        <span>Completed</span>
                    </div>
                </div>
                
                <div className="line"></div>
            </div>
            <style jsx>{`
                .outerContainer {
                    padding: 40px 40px;
                    max-width: 700px;
                    margin: auto;
                }
                @media(max-width: 576px){
                    .outerContainer {
                        padding: 20px 40px 30px 40px;
                        font-size: 0.7rem;
                    }
                }
                .horizontal.timeline {
                    display: flex;
                    position: relative;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1000px;
                    margin: auto;
                }   
                .horizontal.timeline:before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 0.2em;
                    background-color: #f2f2f2;
                }
                .horizontal.timeline .line {
                    display: block;
                    position: absolute;
                    width: ${ stage_int*33.33 }%;
                    height: 0.2em;
                    background-color: #8897ec;
                }
                .horizontal.timeline .steps {
                    display: flex;
                    position: relative;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                .horizontal.timeline .steps .step {
                    display: block;
                    position: relative;
                    bottom: calc(100% + 1em);
                    padding: 0.33em;
                    margin: 0 2em;
                    box-sizing: content-box;
                    color: #8897ec;
                    background-color: currentColor;
                    border: 0.25em solid white;
                    border-radius: 50%;
                    z-index: 500;
                }
                .horizontal.timeline .steps .step:first-child {
                    margin-left: 0;
                }
                .horizontal.timeline .steps .step:last-child {
                    margin-right: 0;
                    color: #71cb35;
                }
                .horizontal.timeline .steps .step span {
                    position: absolute;
                    top: calc(100% + 1em);
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    color: #000;
                    opacity: 0.4;
                }
                .horizontal.timeline .steps .step.current:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    padding: 1em;
                    background-color: currentColor;
                    border-radius: 50%;
                    opacity: 0;
                    z-index: -1;
                    animation-name: animation-timeline-current;
                    animation-duration: 2s;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease-out;
                }
                .horizontal.timeline .steps .step.current span {
                    opacity: 0.8;
                }
                @keyframes animation-timeline-current {
                    from {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    to {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}