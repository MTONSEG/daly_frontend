import React, { useState, useEffect, useRef } from 'react';
import './CatalogGridHeadSorter.scss';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import { setSorting } from '@/store/filters/slice/filters.slice';
import { useTranslations } from 'next-intl';

type SortingOption = 'publishedAt' | 'price' | 'rating';
type SortingMethod = 'asc' | 'desc';

interface ICatalogGridHeadSorterProps {
    sortingOptions: SortingOption[];
    sortingMethods: SortingMethod[];
}

const CatalogGridHeadSorter: React.FC<ICatalogGridHeadSorterProps> = ({
    sortingOptions,
    sortingMethods,
}) => {
    const word = useTranslations('sorting');
    const dispatch = useAppDispatch();
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [sortingOption, setSortingOption] = useState<SortingOption>(
        sortingOptions[0]
    );
    const [sortingMethod, setSortingMethod] = useState<SortingMethod>(
        sortingMethods[0]
    );
    const sorterRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: SortingOption) => {
        if (option === sortingOption) {
            // If the same option is clicked again, toggle the sorting method
            setSortingMethod(sortingMethod === 'asc' ? 'desc' : 'asc');
        } else {
            // If a different option is clicked, reset the sorting method to 'asc'
            setSortingMethod('asc');
            setSortingOption(option);
        }
        dispatch(setSorting({ sortingOption, sortingMethod }));
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sorterRef.current && !sorterRef.current.contains(event.target as Node)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='sorter' ref={sorterRef}>
            <div
                className='sorter__head'
                onClick={() => setShowOptions(!showOptions)}
            >
                {word(sortingOption)}
                <div
                    className={`sorter__arrow ${
                        sortingMethod === 'asc' ? 'asc' : 'desc'
                    }`}
                ></div>
            </div>
            <div className={`sorter__options ${showOptions && 'active'}`}>
                {sortingOptions.map((option, index) => (
                    <div
                        key={index}
                        className='sorter__option'
                        onClick={() => handleOptionClick(option)}
                    >
                        {word(option)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatalogGridHeadSorter;
