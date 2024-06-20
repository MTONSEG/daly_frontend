import { useTranslations } from 'next-intl';
import "./ShowBtn.scss";
import Arrow from '../../arrows/Arrow';

interface IShowBtnProps {
    showAllItems: boolean;
    setShowAllItems: () => void;
    shouldShowMoreButton: boolean;
}

const ShowBtn: React.FC<IShowBtnProps> = ({ showAllItems, setShowAllItems, shouldShowMoreButton }) => {
	const word = useTranslations("catalog");
    const buttonText = showAllItems ? word("show-less-button") : word("show-more-button");

    if (shouldShowMoreButton) {
        return (
            <button className='show-button' onClick={() => { setShowAllItems() }} aria-label='show-more-button'>
                {buttonText}
                <Arrow state={showAllItems}/>
            </button>
        );
    } else {
        return null;
    }
};

export default ShowBtn;
