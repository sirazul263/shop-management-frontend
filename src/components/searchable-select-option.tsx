"use client";

import ReactSelect, { StylesConfig } from "react-select";
import { DefaultAvatar } from "@/components/default-avatar";
import { Control, Controller } from "react-hook-form";

interface SearchableSelectOption {
  id: string;
  name: string;
  imageUrl?: string;
}

interface SearchableSelectProps {
  name: string;
  control: Control<any>;
  options: SearchableSelectOption[];
  placeholder?: string;
  isClearable?: boolean;
}

export const SearchableSelect = ({
  name,
  control,
  options,
  placeholder = "Select...",
  isClearable = true,
}: SearchableSelectProps) => {
  const customStyles: StylesConfig<SearchableSelectOption, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#4f46e5" : "#d1d5db", // focus vs normal
      boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : "none",
      minHeight: "3.1rem",
      padding: "0 0.25rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#eef2ff" : "#fff",
      color: "#111827",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 0.75rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#111827",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "0 0.25rem",
      cursor: "pointer",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 0.25rem",
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactSelect
          value={options.find((opt) => opt.id === field.value) || null}
          onChange={(val) => field.onChange(val ? val.id : "")}
          options={options}
          getOptionLabel={(opt) => opt.name}
          getOptionValue={(opt) => opt.id}
          isClearable={isClearable}
          placeholder={placeholder}
          styles={customStyles}
          formatOptionLabel={(option, { context }) => (
            <div
              className={`flex items-center gap-2 ${
                context === "value" ? "truncate" : ""
              }`}
            >
              <DefaultAvatar className="size-6" name={option.name} />
              <span>{option.name}</span>
            </div>
          )}
        />
      )}
    />
  );
};
