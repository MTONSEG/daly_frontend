import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import './PriceRange.scss';

interface PriceRangeSliderProps {
    minPrice: number;
    maxPrice: number;
    values: number[];
    onChange: (newValues: number[]) => void;
}

const PriceRange: React.FC<PriceRangeSliderProps> = ({ values, onChange }) => {
    const [inputValues, setInputValues] = useState<number[]>(values);

    useEffect(() => {
        setInputValues(values);
    }, [values]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = Number(event.target.value);
        setInputValues(newInputValues);
        onChange(newInputValues);
    };

    return (
        <div className='price-range'>
            <div className='price-range__inputs'>
                <input
                    type='number'
                    value={inputValues[0]}
                    className='price-range__input'
                    onChange={(e) => handleInputChange(0, e)}
                />
                <input
                    type='number'
                    value={inputValues[1]}
                    className='price-range__input'
                    onChange={(e) => handleInputChange(1, e)}
                />
            </div>
            <ReactSlider
                className='price-range__slider'
                thumbClassName='price-range__thumb'
                trackClassName='price-range__track'
                pearling
                minDistance={10}
                value={values}
                onChange={onChange}
                min={0}
                max={10000}
            />
        </div>
    );
};

export default PriceRange;
