import React, { memo, useState, useCallback } from 'react';
import { TextField } from './../Textfield';
import './Filter.css'

const InitialState = {
    dateStart: '',
    dateEnd: '',
    minCost: '',
    maxCost: '',
    costMonotone: 'none',
    categories: '',
}

const FilterIMPL = (getFilter) => {

    const [filterState, setFilterState] = useState(InitialState);

    const [color, setColor] = useState('grey');

    const [errorState, setErrorState] = useState({
        error: ''
    });

    const addFilters = useCallback(() => {
        if(
            (parseInt(filterState.minCost) <= parseInt(filterState.maxCost) || (!filterState.minCost && !filterState.maxCost)) 
            && (Date.parse(filterState.dateStart) <= Date.parse(filterState.dateEnd) || (!filterState.dateStart && !filterState.dateEnd))
        ) {
            let filters = filterState
            getFilter.getFilter(filters)

        } else {
            setErrorState({error: 'Uncorrent dates!'})
        }
    },[filterState, getFilter])

    const removeFilters = useCallback(() => {
        setErrorState({error: ''})
        setColor('grey')
        setFilterState(InitialState)
        let filters = InitialState
        getFilter.getFilter(filters)
    },[getFilter])

    const handleChange = useCallback((newValue, valueKey) => {
        setErrorState({error: ''})
        setFilterState(prevState => ({
            ...prevState,
            [valueKey]: newValue,
        }))
    }, [])

    const numberValidate = useCallback(((ev) => {
        let value = ev.replace(/^0/, '') && ev.replace(/[^\d]/g, '')
        return value
    }), [])

    const monotoneControl = () => {
        let monotone = filterState.costMonotone
        setColor('grey')
        if(monotone === 'none') {
            setFilterState({...filterState, costMonotone: 'decreasing'})
            setColor('green')
        }
        if(monotone === 'decreasing') {
            setFilterState({...filterState, costMonotone: 'increasing'})
            setColor('red')
        }
        if(monotone === 'increasing') {
            setFilterState({...filterState, costMonotone: 'none'})
            setColor('grey')
        }
    }

    return (
    <div className="filter_wrapper">
        <div className="filter_title"> 
            <h2>Filters</h2>
            <span>{errorState.error}</span>
        </div>
        <div className="filter_list">
            <div className="filter_item">
                <span>Cost</span>
                <TextField
                    valueKey="minCost"
                    onChange={handleChange}
                    value={filterState.minCost}
                    validate={numberValidate}
                    label="min"
                />
                <TextField
                    valueKey="maxCost"
                    onChange={handleChange}
                    value={filterState.maxCost}
                    validate={numberValidate}  
                    label="max"
                />
                <div>
                    <span>Cost decreasing/increasing:</span>
                    <button className="monotone_button" style={{background: color}} onClick={monotoneControl}>{filterState.costMonotone}</button>
                </div>
            </div>
            <div className="filter_item">
                <span>Period</span>
                <TextField 
                    valueKey="dateStart"
                    onChange={handleChange}
                    value={filterState.dateStart}
                    type="date"
                    label='start'
                />
                <TextField 
                    valueKey="dateEnd"
                    onChange={handleChange}
                    value={filterState.dateEnd}
                    type="date"
                    label='end'
                />
            </div>
        </div>
        <div className="filter_button_wrapper">
            <button className="sort_button" onClick={addFilters}>sort</button>
            <button className="remove_button" onClick={removeFilters}>remove filter</button>
        </div>
    </div>
)
}

export const Filter = memo(FilterIMPL);