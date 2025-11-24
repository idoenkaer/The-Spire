import React from 'react';
import { SelectOption } from '../../types';
import { IconChevronDown } from '../Icons';

interface SelectGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id: string;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, value, onChange, options, id }) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative group">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer hover:bg-slate-800"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <IconChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
