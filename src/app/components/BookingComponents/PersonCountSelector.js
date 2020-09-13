import React from 'react'
import { range } from '../../utils/functions'

export default function PersonCountSelector(props) {
    const paxStep = props.paxStep || 1
    return (
        <>
            <div className="row text-center px-3 wrap-x-scroll">
                { [...range(props.paxMin, props.paxMax + 1, paxStep)].map((item,index) =>
                    <div onClick={() => props.setPerson(item)}>
                        <NumberOfPerson active={item==props.numberOfPerson ? true : false}>
                            {item}
                        </NumberOfPerson>
                    </div>
                )}
            </div>
        </>
    )
}

function NumberOfPerson({children, active=false}) {
    return (
        <div className="px-1 py-2 align-self-stretch">
            <div className={`py-3 px-4 rounded d-flex align-items-center justify-content-center cursor-pointer ${active ? "active" : "normal"}`}>
                {children}
            </div>
            <style jsx>{`
                .active {
                    background: #d81b60;
                    color: white;
                }
                .normal {
                    background: white;
                    transition: 0.2s;
                }
                .normal:hover {
                    background: #d81b60;
                    color: white;
                }
            `}</style>
        </div>
    )
}