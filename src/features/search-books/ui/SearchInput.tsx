import debounce from 'lodash/debounce'
import {Search} from "lucide-react";
import {type ChangeEvent, useEffect, useMemo, useState} from "react";

import s from './searchInput.module.scss'

type Props = {
    onSearch: (searchTerm: string) => void;
    value: string;
}
export const SearchInput = ({onSearch, value}: Props) => {
    const [localValue, setLocalValue] = useState<string>(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleSearch = useMemo(
        () => debounce(onSearch, 500),
        [onSearch]

    )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setLocalValue(value)
        handleSearch(value)
    }

    return (
        <div className={s.inputContainer}>
            <input className={s.input} onChange={handleInputChange} placeholder={'Search books'}  type="text" value={localValue}/>
            <Search className={s.logo}/>
        </div>
    )
}