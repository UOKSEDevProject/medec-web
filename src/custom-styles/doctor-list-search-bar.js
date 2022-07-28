export const customSearchStyles = {
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: 0,
        fontSize: '16px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 500,
        color: 'white',
        height: '100%',
        display: 'flex',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
    }),

    control: (styles) => ({
        ...styles,
        paddingTop: '0',
        paddingBottom: '.0',
        borderRadius: '25px 0 0 25px',
        boxShadow: '0',
        height: '50px',
        border: 0,
    }),

    input: (styles) => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        width: '100%',
        cursor: 'pointer',
    }),

    valueContainer: (styles) => ({
        ...styles,
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        marginLeft: '20px',
        width: '100%',
        cursor: 'pointer',
    }),
}

