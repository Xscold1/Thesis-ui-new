import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'

const iconColor = "white";

export const SidebarData = [
    {
        title: 'Logout',
        path: '/admin/logout',
        icon: <AiIcons.AiFillPieChart color={iconColor} />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened : <RiIcons.RiArrowUpSFill />,
    },
]