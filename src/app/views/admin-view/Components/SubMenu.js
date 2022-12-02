import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// Styling
import './SidebarStyling.scss'

const textColor = "#a3a5b2";
const hoverColor = "#252831";

const subCategoryBackground = "#363740";
// const subCategoryBackground = "#3e4049";

const SidebarLink = styled(Link)`
    display: flex;
    // color: #a1a3af;
    color: ${textColor};
    justify-content: space-between;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        text-decoration: none;
        color: white;
        // color: ${textColor};
        // background: ${hoverColor};
        border-left: 4px solid lightgray;
        cursor: pointer;
    }
    // &:focus {
    //     // color: ${textColor};
    //     color: white;
    //     // background: ${hoverColor};
    //     border-left: 4px solid lightgray;
    //     cursor: pointer;
    // }
`

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

// Eto naman yung mga text ng mga sub-categories
const DropdownLink = styled(Link)`
    background: ${subCategoryBackground};
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${textColor};
    font-size: 18px;

    &:hover {
        text-decoration: none;
        color: white;
        // color: ${textColor};
        // background: ${hoverColor};
        border-left: 4px solid lightgray;
        cursor: pointer;
    }
    // &:focus {
    //     // color: ${textColor};
    //     color: white;
    //     // background: ${hoverColor};
    //     border-left: 4px solid lightgray;
    //     cursor: pointer;
    // }
`;

function SubMenu({ item }) {
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

    const history = useHistory();

    return (
        <>
            <SidebarLink className={ history.location.pathname === item.path || history.location.pathname.includes(item.group) ? `sidebar__active` : ``} to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav 
                        ? item.iconClosed 
                        : null}
                </div>

            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink className={ history.location.pathname === item.path ? `sidebar__active` : ``} to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    );
};

export default SubMenu