'use client'
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { IProduct } from '@/types/types';
import { useParams } from 'next/navigation';
import { fetchAllFilters } from '@/store/filters/slice/filters.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks';
import { filtersQueryBuilder } from '@/utils/filtersQueryBuilder';
import { fetchFilteredProducts } from '@/store/catalog/slice/catalog.slice';
import CatalogContent from './CatalogContent';

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const dispatch: any = useAppDispatch();
    const { locale } = useParams();
    const filters = useAppSelector((state) => state.filters.filtersData);

    useEffect(() => {
        dispatch(fetchAllFilters(locale));
        console.log("Fetched the filters");
    }, [locale]);

    return (
        <>
            <CatalogContent filters={filters} locale={locale} />
        </>
    );
};

export default Catalog;
