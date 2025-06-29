import type React from 'react';
import { useNavigate } from 'react-router-dom'

const ExitDemoButton: React.FC<{ color: string }> = ({ color }) => {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate("/projects", { state: { direction: "left" } });
    }
    return (
        <button className={`flex w-full justify-start items-center text-${color} h-[2vh] px-1 font-outfit cursor-pointer`} onClick={clickHandler}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>Exit Demo</button>
    )
}

export default ExitDemoButton


