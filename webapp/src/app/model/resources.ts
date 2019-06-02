export interface Resources<T> {
    _embedded: T;
    page: {
        'size'
        'totalElements'
        'totalPages'
        'number'
    };
}
