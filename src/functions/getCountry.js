'use client';
import { isNull, isUndefined } from "lodash";

export default async function getCountryCurrency() {
    let currency_code = localStorage.getItem('CODE');
    const exchange_api_key = 'c6242a36e5dbd84caa77adbaf560df39';

    if (isNull(currency_code) || isUndefined(currency_code)) {
        let response = await fetch('https://api.ipregistry.co/?key=tryout');
        let payload = await response.json();

        let currency_code = payload.currency.code;
        localStorage.setItem('CODE', currency_code);
        localStorage.setItem('CODE_SYMBOL', payload.currency.symbol);

        if (currency_code === 'USD') return { 'rate': 1.00, 'symbol': '$' }

        let exchange_rates = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchange_api_key}&symbols=USD,${payload.currency.code}`);
        exchange_rates = await exchange_rates.json();

        return {
            'rate': (exchange_rates.rates[currency_code] / exchange_rates.rates['USD']).toFixed(2),
            'symbol': payload.currency.symbol
        }
    }
    else {
        if (currency_code === 'USD') return { 'rate': 1.00, 'symbol': '$' }

        let exchange_rates = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchange_api_key}&symbols=USD,${localStorage.getItem('CODE')}`);
        exchange_rates = await exchange_rates.json();

        return {
            'rate': (exchange_rates.rates[currency_code] / exchange_rates.rates['USD']).toFixed(2),
            'symbol': localStorage.getItem('CODE_SYMBOL')
        }
    }
}