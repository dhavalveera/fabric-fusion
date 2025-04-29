import type { FC } from "react";

// Headless UI
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

// Heroicons
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

// types
import type { SelectProps } from "@/types";

const Select: FC<SelectProps> = props => {
  const { data, handleChange, selectLabel, selectedValue } = props;

  return (
    <div className="relative">
      <Listbox value={selectedValue} onChange={handleChange}>
        <Label className="font-della-respira block text-sm/6 font-medium text-gray-900">{selectLabel}</Label>

        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="block truncate">{data.find(id => id.value === selectedValue)?.label}</span>
            </span>
            <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {data.map((info, index) => {
              return (
                <ListboxOption
                  key={index}
                  value={info.value}
                  className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{info.label}</span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
