import { TAG_COLOR } from "../utils/constants";

export function Tag({isActive, children, fontSize = 0.8}){
    const color = TAG_COLOR;
    return (
        <div className="d-inline-block">
            <button className={`btn btn-tag ${isActive ? "active text-white" : ""} m-2`}>
                {children}
            </button>
            <style jsx>{`
                .btn-tag {
                    border-radius: 50px;
                    border: 2px solid ${color};
                    color: ${color};
                    font-size: ${fontSize}rem;
                }
                @media(min-width: 578px){
                    .btn:hover {
                        color: white;
                        background: ${color};
                    }
                }
                .active {
                    background: ${color};
                }
            `}</style>
        </div>
    )
}
