import AsyncSelect from "react-select/async";
import React, {useEffect, useState, memo} from "react";
import {customSearchStyles} from "../../custom-styles/doctor-list-search-bar";
import {Button, Col, Row} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";

const Search = (props) => {
    const {
        placeHolder,
        onMounted,
        onCleanUp,
        onEveryRender,
        onSearchClick,
        onInputChange
    } = props;

    const [inputValue, setInputValue] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (typeof onMounted === 'function') {
            onMounted();
        }
    }, []);

    useEffect(() => {
        if (typeof onEveryRender === 'function') {
            onEveryRender();
        }

        return () => {
            if (typeof onCleanUp === 'function') {
                onCleanUp();
            }
        }
    });

    const handelSearchClick = (value) => {

    }

    const handelInputChange = (inputValue, actionMeta) => {
        if (actionMeta.action === 'input-change') {
            setInputValue(inputValue);
            setSelectedOption(null);
        }
    }

    const handleSelectOption = (option, actionMeta) => {
        if (typeof onSearchClick === 'function') {
            if (actionMeta.action === 'select-option') {
                onSearchClick([option]);
            } else if (actionMeta.action === 'clear') {
                onSearchClick([]);
            }
        }

        setSelectedOption(option);
        setInputValue(null);
    }

    const handleOnFocus = (event) => {
        if (inputValue) {

        }
    }

    const promiseOptions = (value) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve([]);
            }, 1000);
        });

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
                            loadOptions={typeof onInputChange === 'function' ? onInputChange : promiseOptions}
                            components={{DropdownIndicator, IndicatorSeparator}}
                            styles={customSearchStyles}
                            backspaceRemovesValue={true}
                            inputValue={inputValue ? inputValue : ''}
                            onFocus={handleOnFocus}
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