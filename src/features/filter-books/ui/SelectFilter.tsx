import type { Filter } from 'entities/book';

import {useEffect, useRef, useState} from 'react';

import s from './selectFilter.module.scss';

type Props = {
    onSelect: (filter: Filter) => void;
};

const FILTERS: Filter[] = ['ebooks', 'free-ebooks', 'full', 'paid-ebooks', 'partial'];

export const SelectFilter = ({ onSelect }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Filter>('ebooks');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (filter: Filter) => {
        setSelected(filter);
        onSelect(filter);
        setIsOpen(false);
    };

    return (
        <div className={s.wrapper} ref={ref}>
            <button
                className={s.select}
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
            >
                {selected}
            </button>

            {isOpen && (
                <ul className={s.dropdown}>
                    {FILTERS.map((filter) => (
                        <li
                            className={s.option}
                            key={filter}
                            onClick={() => handleSelect(filter)}
                        >
                            {filter}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
