import type { Filter } from 'entities/book';

import {useEffect, useRef, useState} from 'react';

import s from './selectFilter.module.scss';

type Props = {
    onSelect: (filter: Filter) => void;
    value: Filter;
};

const FILTERS: Filter[] = ['ebooks', 'free-ebooks', 'full', 'paid-ebooks', 'partial'];

export const SelectFilter = ({onSelect, value }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
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
                {value}
            </button>

            {isOpen && (
                <ul className={s.dropdown}>
                    {FILTERS.map((filter) => (
                        <li
                            aria-selected={value === filter}
                            className={s.option}
                            key={filter}
                            onClick={() => handleSelect(filter)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelect(filter);
                                }
                            }}
                            role="option"
                            tabIndex={0}
                        >
                            {filter}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
