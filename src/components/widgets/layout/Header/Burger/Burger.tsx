import "./Burger.scss";
import { useState } from "react";


interface PropsTypes {
    stateBurger: boolean,
    toggleBurger: () => void
}

const Burger = ({toggleBurger, stateBurger}: PropsTypes) => {
// const dispatch = useAppDispatch();

// const burgerRedux = useAppSelector((state) => state.header.burger)

// const [stateBurger, setStateBurger] = useState(false);
// const clickBurger = () => {
// setStateBurger(!stateBurger)
// dispatch(getBurgerInfo(!stateBurger))
// }

// useEffect(() => {
// setStateBurger(burgerRedux)
// },[burgerRedux])


    return (
        <div className="burger" onClick={toggleBurger}>
            <div className={stateBurger ? "burger--upperLine" : "burger-line"}></div>
            <div className={stateBurger ? "burger--middleLine" : "burger-line"}></div>
            <div className={stateBurger ? "burger--lowerLine" : "burger-line"}></div>
        </div>
    )
}
export default Burger;