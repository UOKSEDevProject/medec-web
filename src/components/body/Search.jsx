import AsyncSelect from "react-select/async";
import React, {useEffect} from "react";
import {customSearchStyles} from "../../custom-styles/doctor-list-search-bar";
import {Button, Col, Row} from "react-bootstrap";
import {components} from "react-select";
import {searchList} from "../../temp/data-store";
import {BsSearch} from "react-icons/bs";

const Search = (props) => {
    const {
        placeHolder,
        onMounted,
        onCleanUp,
        onEveryRender,
        onSearchClick,
        onInputChange,
    } = props;

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

    const handelSearchClick = () => {
        if (typeof onSearchClick === 'function') {
            onSearchClick();
        }
    }

    const handelInputChange = (value) => {
        if (typeof onInputChange === 'function') {
            onInputChange(value);
        }
    }

    const handleSelectOption = (option) => {

    }

    const promiseOptions = (value) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(searchList);
            }, 1000);
        });

    // Add search components here - [Ovindu] Start
    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <Button className='search-btn' onClick={handelSearchClick}>
                    <span>Search</span>
                    <BsSearch size={25}/>
                </Button>
            </components.DropdownIndicator>
        );
    };

    const IndicatorSeparator = () => {
        return null;
    };

    // end

    return (
        <Row className='justify-content-center'>
            <Col xs={12} md={5} className='mt-3'>
                <AsyncSelect
                    cacheOptions={true}
                    placeholder={placeHolder ? placeHolder : ''}
                    isMulti={false}
                    isSearchable={true}
                    isClearable={false}
                    isLoading={false}
                    onInputChange={handelInputChange}
                    onChange={handleSelectOption}
                    loadOptions={promiseOptions}
                    components={{DropdownIndicator, IndicatorSeparator}}
                    styles={customSearchStyles}
                />
            </Col>
        </Row>
    );
};

export default Search;