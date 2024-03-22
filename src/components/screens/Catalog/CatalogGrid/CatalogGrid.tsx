import React, { useState } from 'react';
import './CatalogGrid.scss';
import { IMetaData, IProduct } from '@/types/types';
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard';
import { setPagination } from '@/store/filters/slice/filters.slice';
import { useAppDispatch } from '@/hooks/useReduxHooks';
import Loader from '@/components/ui/loaders/Loader';
import Pagination from '@/components/widgets/fragments/Pagination/Pagination';
import ShowBtn from '@/components/ui/buttons/ShowBtn/ShowBtn';

interface ICatalogGridProps {
    products: IProduct[];
    gridMode: 'card' | 'row';
    meta?: IMetaData;
}

const CatalogGrid: React.FC<ICatalogGridProps> = ({
    products,
    gridMode,
    meta,
}) => {
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(meta?.pagination?.page ?? 1);
    const [visibleProducts, setVisibleProducts] = useState<boolean>(false);

    const paginate = (pageNumber: number) => {
        if (meta && meta.pagination && pageNumber > 0 && pageNumber <= meta.pagination.pageCount) {
            setCurrentPage(pageNumber);
            dispatch(setPagination({ page: pageNumber, limit: meta.pagination.pageSize }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className='catalog-grid'>
            <div className={`catalog-grid__products ${gridMode === 'row' && 'row'}`}>
                {products.length > 0 ? (
                    products
                        .slice(0, visibleProducts ? 20 : 12)
                        .map((product, index) => (
                            <ProductCard product={product} variant={gridMode} key={index} />
                        ))
                ) : (
                    <Loader />
                )}
            </div>
            {products.length > 0 && meta &&(
                <div className='catalog-grid__show-button'>
                    <ShowBtn
                        showAllItems={visibleProducts}
                        setShowAllItems={setVisibleProducts}
                        shouldShowMoreButton={true}
                    />
                </div>
            )}
            {products.length > 0 && meta && meta.pagination && (
                <Pagination
                    currentPage={currentPage}
                    pageCount={meta.pagination.pageCount}
                    paginate={paginate}
                />
            )}
        </div>
    );
};

export default React.memo(CatalogGrid);
