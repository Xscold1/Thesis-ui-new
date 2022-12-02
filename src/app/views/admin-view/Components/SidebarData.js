import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'
import * as BiIcons from 'react-icons/bi'
import * as ImIcons from 'react-icons/im'

// const iconColor = "#6a6c7a";
const iconColor = "white";

export const SidebarData = [
    {
        title: 'Overview',
        path: '/admin/overview',
        icon: <AiIcons.AiFillPieChart color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  />,
    },
    {
        title: 'Machine Learning',
        path: '/admin/machine-learning',
        icon: <GiIcons.GiComputing color={iconColor} />,
    },
    {
        title: 'Analytics',
        path: '#',
        group: 'analytics',
        icon: <FaIcons.FaChartBar color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  />,
        subNav: [
            {
                title: 'Demographics',
                path: '/admin/analytics/demographic-reports',
                group: 'analytics',
                icon: <MdIcons.MdShareLocation color={iconColor} />,
            },
            {
                title: 'Symptoms',
                path: '/admin/analytics/common-symptoms',
                group: 'analytics',
                icon: <MdIcons.MdPersonSearch color={iconColor} />,
            },
            {
                title: 'Conditions',
                path: '/admin/analytics/matched-conditions',
                group: 'analytics',
                icon: <FaIcons.FaUserInjured color={iconColor} />,
            },
            {
                title: 'Hotspots',
                path: '/admin/analytics/symptoms-hotspot',
                group: 'analytics',
                icon: <ImIcons.ImTarget color={iconColor} />,
            },
            {
                title: 'Lifestyles',
                path: '/admin/analytics/lifestyles',
                group: 'analytics',
                icon: <BiIcons.BiRun color={iconColor} />,
            },
            {
                title: 'Datasets',
                path: '/admin/analytics/datasets',
                group: 'analytics',
                icon: <AiIcons.AiFillDatabase color={iconColor} />,
            },
        ]
    },
    {
        title: 'Doctors',
        path: '#',
        group: 'doctor',
        icon: <FaIcons.FaStethoscope color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown color={iconColor} />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  color={iconColor} />,
        subNav: [
            {
                title: 'Insert Doctor',
                path: '/admin/insert-doctor',
                group: 'doctor',
                icon: <AiIcons.AiOutlineUsergroupAdd color={iconColor} />,
            },
            {
                title: 'View Doctors',
                path: '/admin/view-doctors',
                group: 'doctor',
                icon: <AiIcons.AiFillEye color={iconColor} />,
            },
        ]
    },
    {
        title: 'Hospitals',
        path: '#',
        group: 'hospital',
        icon: <RiIcons.RiHospitalLine color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown color={iconColor} />,
        iconOpened : <MdIcons.MdKeyboardArrowUp color={iconColor} />,
        subNav: [
            {
                title: 'Insert Hospital',
                path: '/admin/insert-hospital',
                group: 'hospital',
                icon: <MdIcons.MdLocalHospital  color={iconColor} />,
                
            },
            {
                title: 'View Hospitals',
                path: '/admin/view-hospitals',
                group: 'hospital',
                icon: <AiIcons.AiFillEye color={iconColor} />,
            },
        ]
    },
    {
        title: 'Diseases',
        path: '#',
        group: 'disease',
        icon: <FaIcons.FaDisease color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown color={iconColor} />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  color={iconColor} />,
        subNav: [
            {
                title: 'Insert Disease',
                path: '/admin/insert-disease',
                group: 'disease',
                icon: <AiIcons.AiFillFileAdd  color={iconColor} />,
            },
            {
                title: 'View Diseasess',
                path: '/admin/view-diseases',
                group: 'disease',
                icon: <IoIcons.IoIosPaper color={iconColor} />,
            },
        ]
    },
    {
        title: 'Datasets',
        path: '#',
        group: '-dataset',
        icon: <AiIcons.AiFillDatabase color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown color={iconColor} />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  color={iconColor} />,
        subNav: [
            {
                title: 'Insert Dataset',
                path: '/admin/insert-dataset',
                group: '-dataset',
                icon: <AiIcons.AiFillFileAdd  color={iconColor} />,
            },
            {
                title: 'View Datasets',
                path: '/admin/view-datasets',
                group: '-dataset',
                icon: <IoIcons.IoIosPaper  color={iconColor} />,
            },
        ]
    },
    {
        title: 'Users',
        path: '#',
        group: 'user',
        icon: <FaIcons.FaUserCircle color={iconColor} />,
        iconClosed: <MdIcons.MdKeyboardArrowDown color={iconColor} />,
        iconOpened : <MdIcons.MdKeyboardArrowUp  color={iconColor} />,
        subNav: [
            {
                title: 'Add Admin',
                path: '/admin/add-admin',
                group: 'user',
                icon: <AiIcons.AiOutlineUsergroupAdd color={iconColor} />,
            },
            {
                title: 'View Users',
                path: '/admin/view-users',
                group: 'user',
                icon: <AiIcons.AiFillEye color={iconColor} />,
            },
        ]
    },
]