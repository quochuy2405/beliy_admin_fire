"use client";
import { Table } from "../atoms";

const InvoiceManagers = ({ columns, datasets }) => {
	return (
		<div className="flex flex-col w-full h-full gap-2">
			<Table columns={columns} data={datasets} />
		</div>
	);
};

export default InvoiceManagers;
