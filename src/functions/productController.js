'use client';
import { create } from "zustand";
import { slice, filter } from "lodash";
import _products from './products.json';

const getLastTrack = (b, a) => (b%a == 0)?parseInt(b/a) - 1: Math.floor(b/a);

const productStore = (setState) => {
    return {
        fullProductList: _products,
        products: slice(_products, 0, 3),
        currentPage: 1,
        productsPerPage: 3,
        totalPages: getLastTrack(_products.length, 3),
        isNextPossible: true,
        isPrevPossible: false,

        updateProductPerPage: (productPerPage) =>
            setState(currentState => {
                let t_value = slice(currentState.fullProductList, 0, productPerPage);
                return {
                    productsPerPage: productPerPage,
                    currentPage: 1,
                    fullProductList: currentState.fullProductList,
                    products: t_value,
                    totalPages: currentState.fullProductList.length < productPerPage ? 0: getLastTrack(currentState.fullProductList.length, productPerPage),
                    isPrevPossible: false,
                    isNextPossible: t_value.length === productPerPage
                }
            }),

        nextPage: () => setState(currentState => {
            let firstIndex = currentState.currentPage * currentState.productsPerPage;
            let lastIndex = firstIndex + currentState.productsPerPage;

            let t_data = slice(currentState.fullProductList, firstIndex, lastIndex);

            return {
                products: t_data,
                fullProductList: currentState.fullProductList,
                currentPage: currentState.currentPage + 1,
                productsPerPage: currentState.productsPerPage,
                totalPages: currentState.totalPages,
                isNextPossible: t_data.length === currentState.productsPerPage &&
                    currentState.currentPage !== getLastTrack(currentState.fullProductList.length, currentState.productsPerPage),
                isPrevPossible: true
            }
        }),

        prevPage: () => setState(currentState => {
            let firstIndex = (currentState.currentPage - 2) * currentState.productsPerPage;
            let lastIndex = firstIndex + currentState.productsPerPage;

            let t_data = slice(currentState.fullProductList, firstIndex, lastIndex);

            return {
                products: t_data,
                fullProductList: currentState.fullProductList,
                currentPage: currentState.currentPage - 1,
                productsPerPage: currentState.productsPerPage,
                isNextPossible: true,
                totalPages: currentState.totalPages,
                isPrevPossible: firstIndex !== 0 && currentState.currentPage !== 1
            }
        }),

        search: (searchQuery) => setState(currentState => {
            let filtered_list = filter(_products,
                e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));

            let t_value = slice(filtered_list, 0, currentState.productsPerPage);

            return {
                fullProductList: filtered_list,
                isPrevPossible: false,
                currentPage: 1,
                products: t_value,
                totalPages: filtered_list.length < currentState.productsPerPage ? 0: getLastTrack(filtered_list.length, currentState.productsPerPage),
                productsPerPage: currentState.productsPerPage,
                isNextPossible: t_value.length === currentState.productsPerPage
            }
        })
    }
}

const useProductStore = create(productStore);
export default useProductStore;