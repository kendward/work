import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import SheetLayout from '../../layout/sheet-layout';

function AccountHistory() {
    const invoices = [
        {
            date: "19.Jan.2023",
            description: "Team (Monthly)",
            seats: "01",
            total: "$32.43",
            status: "Paid",
            view: "View invoice",
        },
        {
            date: "19.Jan.2023",
            description: "Team (Monthly)",
            seats: "01",
            total: "$32.43",
            status: "Paid",
            view: "View invoice",
        },
        {
            date: "19.Jan.2023",
            description: "Team (Monthly)",
            seats: "01",
            total: "$32.43",
            status: "Paid",
            view: "View invoice",
        },
        {
            date: "19.Jan.2023",
            description: "Team (Monthly)",
            seats: "01",
            total: "$32.43",
            status: "Paid",
            view: "View invoice",
        },
    ];

    return (
        <SheetLayout classNames='max-w-full'>
            <Table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-gray-700">
                <TableHeader>
                    <TableRow>
                        <TableHead className='font-bold text-md text-black'>
                            <Checkbox className='cursor-pointer rounded-md' />
                        </TableHead>
                        <TableHead className='font-bold text-md text-black'>Date</TableHead>
                        <TableHead className='font-bold text-md text-black'>Description</TableHead>
                        <TableHead className='font-bold text-md text-black'>Seats</TableHead>
                        <TableHead className='font-bold text-md text-black'>Invoice total</TableHead>
                        <TableHead className='font-bold text-md text-black'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice, index) => (
                        <React.Fragment key={index}>
                            <TableRow key={index} className="border-b-1 border-blue-600  text-md text-black">
                                <TableCell className="border-b-1 border-blue-600" >
                                    <Checkbox className='cursor-pointer rounded-md' />
                                </TableCell>
                                <TableCell className="border-b-1 border-blue-600">
                                    {invoice.date}
                                </TableCell>
                                <TableCell className="border-b-1 border-blue-600">
                                    {invoice.description}
                                </TableCell>
                                <TableCell className="border-b-1 border-blue-600">
                                    {invoice.seats}
                                </TableCell>
                                <TableCell className="border-b-1 border-blue-600">
                                    {invoice.total}
                                </TableCell>
                                <TableCell className="border-b-1 border-blue-600">
                                    <span className="text-black font-medium text-md">{invoice.status}

                                    </span>
                                    <Link href="#" className="block text-[#4A7BF6] font-medium text-md hover:underline">
                                        {invoice.view}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </SheetLayout>
    )
}

export default AccountHistory