"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import {
	MdInventory,
	MdOutlineLocalActivity,
	MdPersonSearch,
	MdSupervisorAccount,
} from "react-icons/md";

import { RiBillFill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
const USERS = [
	{
		key: "/admin/stock",
		icon: (active) => (
			<MdInventory
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý kho hàng",
	},
	{
		key: "/admin/products",
		icon: (active) => (
			<GiClothes
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý sản phẩm",
	},
	{
		key: "/admin/account_managers",
		icon: (active) => (
			<MdSupervisorAccount
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý tài khoản",
	},
	{
		key: "/admin/invoice_managers",
		icon: (active) => (
			<RiBillFill
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý đơn hàng",
	},
	{
		key: "/admin/employee_managers",
		icon: (active) => (
			<MdPersonSearch
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý nhân viên",
	},
];

const POCS = [
	{
		key: "/admin/revenue",
		icon: (active) => (
			<FaMoneyCheckAlt
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Thông kê công nợ",
	},
	{
		key: "/admin/discount",
		icon: (active) => (
			<MdOutlineLocalActivity
				size={20}
				color={active ? "orange" : "black"}
				className="w-5 h-5"
			/>
		),
		title: "Quản lý ưu đãi, marketing",
	},
];

const AdminLayout = ({ children }) => {
	const { push } = useRouter();
	const pathname = usePathname();
	const handleLogout = async () => {
		push("/");
	};
	return (
		<div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
			{/* <!-- Desktop sidebar --> */}
			<input id="hamburger" type="checkbox" className="hidden" defaultChecked />
			<header className="z-10 bg-white border-b-[1px] h-14 min-h-[56px] flex items-center justify-between px-6">
				<Link href="/admin" className="h-16 w-16 md:block hidden " passHref>
					<div className="bg-[url('/logo.png')] bg-cover bg-no-repeat w-full h-full" />
				</Link>

				<div className="container flex items-center justify-between h-full mx-auto  dark:text-purple-300">
					{/* <!-- Mobile hamburger --> */}

					<label
						className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
						aria-label="Menu"
						htmlFor="hamburger"
					>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
					</label>
					<div />
					<ul className="flex items-centers flex-shrink-0 space-x-6 h-full">
						{/* <!-- Theme toggler --> */}
						<li className="flex">
							<button
								className="rounded-md focus:outline-none focus:shadow-outline-purple"
								aria-label="Toggle color mode"
							></button>
						</li>
						{/* <!-- Notifications menu --> */}
						<li className="relative h-full flex items-center">
							<button
								className="relative align-middle rounded-md focus:outline-none 
                m-auto focus:shadow-outline-purple"
								aria-label="Notifications"
								aria-haspopup="true"
							>
								<svg
									className="w-5 h-5 m-auto block"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
								</svg>
								{/* <!-- Notification badge --> */}
								<span
									aria-hidden="true"
									className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
								></span>
							</button>
						</li>
						{/* <!-- Profile menu --> */}
						<li className="relative h-full flex items-center">
							<button
								className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
								aria-label="Account"
								aria-haspopup="true"
								onClick={handleLogout}
							>
								<Image
									className="object-cover w-8 h-8 rounded-full"
									src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
									alt=""
									unoptimized
									width={32}
									height={32}
									aria-hidden="true"
								/>
							</button>
							<span className="text-sm font-bold ml-3">Quốc Huy</span>
						</li>
					</ul>
				</div>
			</header>
			<div className="flex flex-1 w-full h-full relative">
				<aside
					id="bar-mobile"
					className="z-20 h-full absolute top-0 w-[40%] flex-shrink-0 md:w-64 overflow-y-auto bg-white md:block shadow-lg md:relative md:!translate-x-0"
				>
					<div className="text-gray-500">
						<div className="p-4 w-full">
							<ul className="pb-4">
								<li className="relative py">
									<Link
										className={clsx(
											"flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md",
											{
												"bg-[#F2F2F2] text-black": pathname === "/admin",
											}
										)}
										href="/admin"
										passHref
									>
										<HiHome
											size={20}
											color={pathname === "/admin" ? "orange" : "black"}
											className="w-5 h-5"
										/>
										<span className="ml-2">Trang chủ</span>
									</Link>
								</li>
							</ul>
							<ul className="pb-4 flex flex-col gap-2">
								<li className="relative py-1 px-2 text-sm font-bold text-gray-default">
									QUẢN LÝ
								</li>
								{USERS.map((item) => (
									<li className="relative py" key={item.key}>
										<Link
											className={clsx(
												"flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md",
												{
													"bg-[#F2F2F2] text-black": pathname === item.key,
												}
											)}
											href={item.key}
											passHref
										>
											{item.icon(pathname === item.key)}
											<span className="ml-2">{item.title}</span>
										</Link>
									</li>
								))}
							</ul>
							<ul className="pb-4 flex flex-col gap-0.5">
								<li className="relative py-1 px-2 text-sm font-bold text-gray-default">
									QUẢN LÝ KHÁC
								</li>
								{POCS.map((item) => (
									<li className="relative py" key={item.key}>
										<Link
											className={clsx(
												"flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md",
												{
													"bg-[#F2F2F2] text-black": pathname === item.key,
												}
											)}
											href={item.key}
											passHref
										>
											{item.icon(pathname === item.key)}
											<span className="ml-2">{item.title}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</aside>
				<main className="h-full flex-1 overflow-x-auto bg_admin p-6">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
