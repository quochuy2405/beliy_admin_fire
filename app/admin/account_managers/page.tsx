"use client";

import { columnTableAccountManagers } from "@/components/makecolumns"
import { AccountManagers } from "@/components/templates"
import { useState } from "react";

const AccountManagersPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    };
    const openModel = (id) => {
        setIsOpen(true)
    }
    const columns = columnTableAccountManagers(openModel)

    const datasets = [
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            valid: 'invalid'
        },
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            valid: 'invalid'
        },
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            valid: 'invalid'
        }
    ]
    const props = {
        columns,
        datasets,
        isOpen,
        handleClose
    }

    return <AccountManagers {...props} />
}

export default AccountManagersPage