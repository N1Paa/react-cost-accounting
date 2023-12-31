import React, { memo, useState, useCallback, useEffect } from 'react';



const TextFieldImpl = ({value: propsValue, valueKey, onChange, type, validate, label}) => {

    const [value, setValue] = useState(propsValue);

    const onBlur = useCallback(() => {
        let newValue = value;
        onChange(newValue, valueKey);
    }, [value, valueKey, onChange]);

    const onKeyDown = (ev) => {
        if(ev.key === "Enter") {
            onBlur()
        } 
    }

    useEffect(() => {
        setValue(propsValue)
    }, [propsValue]);

    return (    
        <div className="form-group">
            <label htmlFor={type} className="label_control">{label}</label>
            <input className="input_text form_input"
            type={type || "text"} 
            id={valueKey}
            value = {value}
            onChange={(ev) => {if(validate) {setValue(validate(ev.target.value))} else {setValue((ev.target.value))}}}
            onBlur={onBlur}
            onKeyDown={onKeyDown} 
            />
        </div>
    )
}

export const TextField = memo(TextFieldImpl);