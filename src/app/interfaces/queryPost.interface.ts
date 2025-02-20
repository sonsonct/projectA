export interface PostQuery {
    category?: string;
    categoryId?: number;
    hashtagId?: number;
    hashtag?: string;
    role?: string;
    language?: string;
    authorId?: number;
    page?: number;
    pageSize?: number;
    status?: string | number;
    searchKey?: string;
    sortField?: string;
    sortType?: 1 | -1;
}