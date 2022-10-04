import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useCategoryStore } from '../../../hooks';

export const MyPagination = () => {
    const { categories, startLoadingCategories } = useCategoryStore();
    const { totalDocs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = categories;

    const firstPagination = () => {
        startLoadingCategories(1);
    }
    
    const paginatePrevious = () => {
        startLoadingCategories( prevPage );
    }

    const paginateNext = () => {
        startLoadingCategories( nextPage );
    }

    const lastPagination = () => {
        startLoadingCategories( totalPages );
    }
    
    const paginateNumber = ( page ) => {
        startLoadingCategories( page );
    }

    const numberPagination = ( pageNumber ) => {
        return (
            <PaginationItem key={pageNumber}>
                <PaginationLink 
                    onClick={ () => paginateNumber( pageNumber ) } 
                    className={`bg-dark text-white ${ (pageNumber === page) ? 'bg-opacity-50' : ''}`} 
                    disabled={ pageNumber === page }
                >
                    { pageNumber }
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <div className="">
            <Pagination size="sm">
                <PaginationItem>
                    <PaginationLink 
                        onClick={ firstPagination } 
                        className={`bg-dark text-white ${!hasPrevPage ? 'bg-opacity-50' : ''}`}
                        disabled={ !hasPrevPage } first
                    />
                </PaginationItem>
                <PaginationItem >
                    <PaginationLink 
                        onClick={ paginatePrevious } 
                        className={`bg-dark text-white ${!hasPrevPage ? 'bg-opacity-50' : ''}`} 
                        disabled={ !hasPrevPage } previous 
                    />
                </PaginationItem>
                { 
                    [ ...Array(totalPages) ].map( ( e, page ) => numberPagination(page + 1) )
                }
                <PaginationItem>
                    <PaginationLink 
                        onClick={ paginateNext } 
                        className={`bg-dark text-white ${!hasNextPage ? 'bg-opacity-50' : ''}`} 
                        disabled={ !hasNextPage } next 
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink 
                        onClick={ lastPagination } 
                        className={`bg-dark text-white ${!hasNextPage ? 'bg-opacity-50' : ''}`} 
                        disabled={ !hasNextPage } last 
                    />
                </PaginationItem>
            </Pagination>
            <span>Resultados: { pagingCounter } - { pagingCounter + limit - 1 } de { totalDocs }</span>
        </div>
    )
}
