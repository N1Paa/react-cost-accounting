import './Main.css'
import { TextField } from './../../components/Textfield';
import { Filter } from './../../components/Filter/Filter';
import React, {useState, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addHistory, historySelectors} from '../../features/history';
import store from '../../app/store';
import { clearCurrent } from '../../features/authentication';

const Main = () => {

    const [expenseState, setExpenceState] = useState({
        category: '',
        cost: '',
        date: '',
    })

    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.auth.currentUser);

    const [historyState, setHistoryState] = useState([])

    const [errorState, setErrorState] = useState({
        error: ''
    });

    const [filters, setFilters] = useState({
        dateStart: '',
        dateEnd: '',
        minCost: '',
        maxCost: '',
        costMonotone: '', // decreasing,  increasing
        categories: '',
    })

    const handleChange = useCallback((newValue, valueKey) => {
        setErrorState({error: ''});
        setExpenceState(prevState => ({
            ...prevState,
            [valueKey]: newValue,
        }))
    }, [])
    
    const addExpense = () => {
        if(!expenseState.category || !expenseState.cost || !expenseState.date) {
            setErrorState({error: 'Fill in all the fields!'})
        } else {
            const id = Date.now()
            dispatch(addHistory({id: currentUser, [id]: {id: id, ...expenseState}}));
            let history = historySelectors.selectById(store.getState(), currentUser);
            if(history) {
                let historyArr = Object.values(history)
                historyArr.shift()
                setHistoryState(historyArr)
            }
        }
}

    const logout = useCallback(() => {
        dispatch(clearCurrent())
    }, [dispatch])

    const getFilter = useCallback((filters) => {
        setFilters(filters)
    }, [])

        const numberValidate = useCallback(((ev) => {
             let value = ev.replace(/^0/, '') && ev.replace(/[^\d]/g, '')
             return value
        }), [])
        
        const noneNumberValidate = useCallback(((ev) => {
            return (ev.replace(/[\d]/g, ''));
        }), [])
        

        const runFilter = (dateStart, dateEnd, minCost, maxCost, monotone, historyState) => {
            let Arr = [...historyState];
            if (monotone === "none") {Arr = [...historyState]}
            if (dateStart && dateEnd) {
                Arr = Arr.filter(el => Date.parse(el.date) >= Date.parse(dateStart) && Date.parse(el.date) <= Date.parse(dateEnd))
            }
            if (minCost && maxCost) {
                Arr = Arr.filter(el => parseInt(el.cost) >= parseInt(minCost) && parseInt(el.cost) <= parseInt(maxCost))
            }
            if (monotone === "increasing") {Arr = Arr.sort(function(a, b) {return parseInt(a.cost) - parseInt(b.cost)})}
            if (monotone === "decreasing") {Arr = Arr.sort(function(a, b) {return parseInt(b.cost) - parseInt(a.cost)})}
            return Arr
        }

        const filteredArr = runFilter(filters.dateStart, filters.dateEnd, filters.minCost, filters.maxCost, filters.costMonotone, historyState);

        useEffect(() => {
            let history = historySelectors.selectById(store.getState(), currentUser);
            if(history) {
                let historyArr = Object.values(history)
                historyArr.shift()
                setHistoryState(historyArr)
            }
        }, [currentUser])

    return (
        <div className="main_wrapper">
            <div className="main_active_modules">
            <div className="history_control_wrapper">
            <div className="history_control_title">    
            <h2>Add expenses</h2>    
            <span>{errorState.error}</span>
            </div>
            <TextField
                valueKey="category"
                onChange={handleChange}
                value={expenseState.category}
                validate={noneNumberValidate}
                label="category"
            />       
            <TextField
                valueKey="cost"
                onChange={handleChange}
                value={expenseState.cost}
                validate={numberValidate}
                label="cost"
                
            />        
            <TextField
                valueKey="date"
                onChange={handleChange}
                value={expenseState.date}
                type="date"
                label="date"
            />
            <div className="control_button_wrapper">
            <button className="add_button" onClick={addExpense}>ADD</button>
            <button className="logout_button" onClick={logout}>LOGOUT</button>
            </div>
            </div>
            <Filter
            getFilter={getFilter}
            />
            </div>
            <div className="main_expenses_list_wrapper">
                <div className="expenses_title">
                <h2>Expenses</h2>
                </div>
                    <div className="expenses_titles_wrapper">
                        <div className="expense_item_text">
                            <span>category</span>
                        </div>
                        <div className="expense_item_text">
                            <span>cost</span> 
                        </div>
                        <div className="expense_item_text">
                            <span>date</span>
                        </div>
                    </div>

              { 
                filteredArr && filteredArr.map(el => {
                    return (
                        <div key={el.id} className="expense_item_wrapper">
                        <div className="expense_item_text">
                            <span>{el.category}</span>
                        </div>
                        <div className="expense_item_text">
                            <span>{el.cost}</span> 
                        </div>
                        <div className="expense_item_text">
                            <span>{el.date}</span>
                        </div>
                        </div>
                    )
                })
              }
            </div>
        </div>
    )
}

export default Main