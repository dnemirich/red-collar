import debounce from 'lodash/debounce'
import {Search} from "lucide-react";
import {type ChangeEvent, useMemo, useState} from "react";

import s from './searchInput.module.scss'

type Props = {
    onSearch: (searchTerm: string) => void;
}
export const SearchInput = ({onSearch}: Props) => {
    const [value, setValue] = useState<string>('JavaScript');

    const handleSearch = useMemo(
        () => debounce(onSearch, 500),
        [onSearch]

    )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setValue(value)
        handleSearch(value)
    }

    return (
        <div className={s.inputContainer}>
            <input className={s.input} onChange={handleInputChange} placeholder={'Search books'}  type="text" value={value}/>
            <Search className={s.logo}/>
        </div>
    )
}