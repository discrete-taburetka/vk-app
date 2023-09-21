const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#1A1A1A',
    borderColor: state.isFocused ? '#7289DA' : '#333',
    color: '#F5F5F5',
    boxShadow: state.isFocused ? '0 0 0 1px #7289DA' : null,
    '&:hover': {
      borderColor: state.isFocused ? '#7289DA' : '#555',
    }
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7289DA' : null,
    color: '#F5F5F5',
  }),

  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1A1A1A',
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: '#F5F5F5',
  }),

  input: (provided: any) => ({
    ...provided,
    color: '#F5F5F5',
  }),
};

export default customStyles;