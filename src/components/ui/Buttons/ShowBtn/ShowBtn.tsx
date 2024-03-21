import { useTranslations } from 'next-intl';
import "./ShowBtn.scss";
import Arrow from '../../arrows/Arrow';

interface IShowBtnProps {
    showAllItems: boolean;
    setShowAllItems: (showAll: boolean) => void;
    shouldShowMoreButton: boolean;
}

const ShowBtn: React.FC<IShowBtnProps> = ({ showAllItems, setShowAllItems, shouldShowMoreButton }) => {
	const word = useTranslations("catalog");
    const buttonText = showAllItems ? word("show-less-button") : word("show-more-button");

    const handleClick = () => {
        setShowAllItems(!showAllItems);
    };

    if (shouldShowMoreButton) {
        return (
            <button className='show-button' onClick={handleClick} aria-label='show-more-button'>
                {buttonText}
                <Arrow state={showAllItems}/>
            </button>
        );
    } else {
        return null;
    }
};

export default ShowBtn;
