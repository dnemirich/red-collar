import s from './searchInput.module.scss'
import {Search} from "lucide-react";
import {type ChangeEvent, useMemo, useState} from "react";
import debounce from 'lodash/debounce'

type Props = {
    onSearch: (searchTerm: string) => void;
}
export const SearchInput = ({onSearch}: Props) => {
    const [value, setValue] = useState<string>('Java script');

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
            <input type="text" className={s.input} placeholder={'Search books'}  value={value} onChange={handleInputChange}/>
            <Search className={s.logo}/>
        </div>
    )
}