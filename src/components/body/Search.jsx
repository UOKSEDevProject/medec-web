import AsyncSelect from "react-select/async";
import React, {useEffect, useState, memo} from "react";
import {customSearchStyles} from "../../custom-styles/doctor-list-search-bar";
import {Button, Col, Row} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";

const Search = (props) => {
    const {
        placeHolder,
        onSearchClick,
        onInputChange,
        onSelectOption
    } = props;

    const [inputValue, setInputValue] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchOptions, setSearchOptions] = useState(null);

    useEffect(() => {
        if (inputValue === '') {
            setSearchOptions(null)
        }
    }, [inputValue]);

    const handelSearchClick = () => {
        if (typeof onSearchClick === 'function') {
            onSearchClick(searchOptions);
        }
    };

    const handelInputChange = (inputValue, actionMeta) => {
        if (actionMeta.action === 'input-change') {
            setInputValue(inputValue);
            setSelectedOption(null);
        }
    };

    const handleSelectOption = (option, actionMeta) => {
        if (typeof onSelectOption === 'function') {
            if (actionMeta.action === 'select-option') {
                onSelectOption([option]);
            } else if (actionMeta.action === 'clear') {
                onSelectOption([]);
            }
        }

        setSelectedOption(option);
        setInputValue(null);
    };

    const promiseOptions = (value) => {
        return new Promise((resolve) => {
            if (typeof onInputChange === 'function') {
                onInputChange(value).then(options => {
                    resolve(options);
                    setSearchOptions(options);
                });
            }
        });
    };

    const DropdownIndicator = () => {
        return null;
    };

    const IndicatorSeparator = () => {
        return null;
    };

    return (
        <Row className='justify-content-center'>
            <Col xs={12} md={5} className='mt-3'>
                <Row className='px-2 px-md-0'>
                    <Col className='m-0 p-0'>
                        <AsyncSelect
                            cacheOptions={false}
                            placeholder={placeHolder ? placeHolder : ''}
                            isMulti={false}
                            isSearchable={true}
                            isClearable={true}
                            value={selectedOption}
                            isLoading={false}
                            onInputChange={handelInputChange}
                            onChange={handleSelectOption}
                            loadOptions={promiseOptions}
                            components={{DropdownIndicator, IndicatorSeparator}}
                            styles={customSearchStyles}
                            backspaceRemovesValue={true}
                            inputValue={inputValue ? inputValue : ''}
                            defaultOptions={searchOptions}
                        />
                    </Col>
                    <Button className='search-btn' onClick={handelSearchClick}>
                        <span>Search</span>
                        <BsSearch size={25}/>
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default memo(Search);