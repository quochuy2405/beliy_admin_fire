"use client";

import { columnTableAccountManagers } from "@/components/makecolumns";
import { EmployeeManagers } from "@/components/templates";

const EmployeeManagersPage = () => {
    const columns = columnTableAccountManagers()
    const datasets = [
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            status: 'Đang giao'
        },
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            status: 'Đang giao'
        },
        {
            username: 'huy2121',
            fullName: 'Bùi Quốc Huy',
            region: 'Ho Chi Minh',
            addressCityProvince: 'Ho Chi Minh',
            phoneNumber: '093282783239',
            status: 'Đang giao'
        }
    ]
    const props = {
        columns,
        datasets
    }

    return <EmployeeManagers {...props} />
}

export default EmployeeManagersPage