'use client';
import { create } from "zustand";
import { persist } from "zustand/middleware";

import _products from './products.json';

const removeKey = (map, key) => {
    let t_map = new Map(map);
    t_map.delete(key); return t_map;
}

const orderStore = (setState) => ({
    orders: new Map(),
    totalPrice: 0,
    orderCount: 0,
    addItem: (productId) => setState(currentState => ({
        orders: currentState.orders.has(productId) ?
            new Map(currentState.orders).set(productId, currentState.orders.get(productId) + 1) :
            new Map(currentState.orders).set(productId, 1),
        totalPrice: currentState.totalPrice + _products[productId].price,
        orderCount: currentState.orderCount + 1
    })),
    removeItem: (productId) => setState(currentState => (
        {
            orders: currentState.orders.get(productId) === 1 ?
                removeKey(currentState.orders, productId) :
                new Map(currentState.orders).set(productId, currentState.orders.get(productId) - 1),
            totalPrice: currentState.totalPrice - _products[productId].price,
            orderCount: currentState.orderCount - 1
        }))
});

const customStorage = {
    getItem: (name) => {
        const str = localStorage.getItem(name);
        if (!str) return null;
        return {
            state: {
                ...JSON.parse(str).state,
                orders: new Map(Object.entries(JSON.parse(str).state.orders)),
            }
        }
    },
    setItem: (name, newValue) => {
        const str = JSON.stringify({
            state: {
                ...newValue.state,
                totalPrice: newValue.state.totalPrice,
                orderCount: newValue.state.orderCount,
                orders: Object.fromEntries(newValue.state.orders.entries()),
            },
        })
        localStorage.setItem(name, str);
    },
    removeItem: (name) => localStorage.removeItem(name)
};

const useOrderStore = create(persist(orderStore, {
    name: 'orders',
    storage: customStorage
}));

export default useOrderStore;