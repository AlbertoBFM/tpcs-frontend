import { Alert, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useProviderStore } from '../../../hooks';

export const MyPagination = () => {
    const { providers, startLoadingProviders } = useProviderStore();
    const { totalDocs, docs, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = providers;

    const providerLength = docs?.length || 0;

    const firstPagination = () => {
        startLoadingProviders({ pageNumber: 1 });
    }
    
    const paginatePrevious = () => {
        startLoadingProviders({ pageNumber: prevPage });
    }

    const paginateNext = () => {
        startLoadingProviders({ pageNumber: nextPage });
    }

    const lastPagination = () => {
        startLoadingProviders({ pageNumber: totalPages });
    }
    
    const paginateNumber = ( page ) => {
        startLoadingProviders({ pageNumber: page });
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
        <>
            { 
                providerLength !== 0 
                ?            
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
                    <span>Resultados: { pagingCounter } - { pagingCounter + providerLength - 1 } de { totalDocs }</span>
                </div>
                :
                <Alert className="text-center" color="danger">
                    Ningun proveedor encontrado
                </Alert>
            }
        </>
    )
}
