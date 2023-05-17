"use client";

import { columnTableInvoiceManagers } from "@/components/makecolumns"
import { InvoiceManagers } from "@/components/templates"

const InvoiceManagersPage = () => {
    const columns = columnTableInvoiceManagers()
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

    return <InvoiceManagers {...props} />
}

export default InvoiceManagersPage