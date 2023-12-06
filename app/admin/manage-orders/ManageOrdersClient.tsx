"use client";

import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
	MdAccessTimeFilled,
	MdDeliveryDining,
	MdDone,
	MdRemoveRedEye,
} from "react-icons/md";

interface ManageOrdersClientProps {
	orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
	user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, [router]);

	let rows: any = [];

	if (orders) {
		rows = orders.map((order) => {
			return {
				id: order.id,
				customer: order.user.name,
				amount: formatPrice(order.amount / 100),
				paymentStatus: order.status,
				date: moment(order.createDate).fromNow(),
				deliveryStatus: order.deliveryStatus,
			};
		});
	}

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 120 },
		{ field: "customer", headerName: "Customer Name", width: 170 },
		{
			field: "amount",
			headerName: "Amount",
			width: 130,
			renderCell: (params) => {
				return (
					<div className="font-bold text-slate-800">{params.row.amount}</div>
				);
			},
		},
		{
			field: "paymentStatus",
			headerName: "Payment Status",
			width: 130,
			renderCell: (params) => {
				return (
					<div>
						{params.row.paymentStatus === "pending" ? (
							<Status
								text="pending"
								icon={MdAccessTimeFilled}
								bg="bg-slate-200"
								color="text-slate-700"
							/>
						) : params.row.paymentStatus === "complete" ? (
							<Status
								text="completed"
								icon={MdDone}
								bg="bg-green-200"
								color="text-green-700"
							/>
						) : (
							<></>
						)}
					</div>
				);
			},
		},
		{
			field: "deliveryStatus",
			headerName: "Delivery Status",
			width: 130,
			renderCell: (params) => {
				return (
					<div>
						{params.row.deliveryStatus === "pending" ? (
							<Status
								text="pending"
								icon={MdAccessTimeFilled}
								bg="bg-slate-200"
								color="text-slate-700"
							/>
						) : params.row.deliveryStatus === "dispatched" ? (
							<Status
								text="dispatched"
								icon={MdDeliveryDining}
								bg="bg-green-200"
								color="text-green-700"
							/>
						) : params.row.deliveryStatus === "delivered" ? (
							<Status
								text="delivered"
								icon={MdDone}
								bg="bg-purple-200"
								color="text-black-700"
							/>
						) : (
							<></>
						)}
					</div>
				);
			},
		},
		{
			field: "date",
			headerName: "Date",
			width: 130,
		},
		{
			field: "action",
			headerName: "Actions",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="flex justify-between gap-4 w-full">
						<ActionBtn
							icon={MdDeliveryDining}
							disabled={params.row.paymentStatus === "pending"}
							onClick={() => {
								handleDispatch(params.row.id , params.row.deliveryStatus);
								
							}}
						/>
						<ActionBtn
							icon={MdDone}
							disabled={params.row.paymentStatus === "pending"}
							onClick={() => {
								handleDeliver(params.row.id, params.row.deliveryStatus);
							}}
						/>
						<ActionBtn
							icon={MdRemoveRedEye}
							onClick={() => router.push(`/order/${params.row.id}`)}
						/>
					</div>
				);
			},
		},
	];

	const handleDispatch = useCallback(
		(id: string, currentStatus: string) => {
		  const newStatus = currentStatus === "dispatched" ? "pending" : "dispatched";
	  
		  axios
			.put("/api/order", {
			  id,
			  deliveryStatus: newStatus,
			})
			.then((res) => {
			  toast.success(`Order ${newStatus}`);
			  router.refresh();
			})
			.catch((err) => {
			  toast.error("Something went wrong");
			  console.log(err);
			});
		},
		[router]
	  );

	  const handleDeliver = useCallback(
		(id: string, currentStatus: string) => {
		  const newStatus = currentStatus === "delivered" ? "pending" : "delivered";
	  
		  axios
			.put("/api/order", {
			  id,
			  deliveryStatus: newStatus,
			})
			.then((res) => {
			  toast.success(`Order ${newStatus}`);
			  router.refresh();
			})
			.catch((err) => {
			  toast.error("Oops! Something went wrong");
			  console.log(err);
			});
		},
		[router]
	  );

	  const handleBulkStatusUpdate = useCallback(
		(id: string, currentStatus: string) => {
			const newStatus = currentStatus === "delivered" ? "pending" : "delivered";
		
			axios
			  .put("/api/order", {
				id,
				deliveryStatus: newStatus,
			  })
			  .then((res) => {
				toast.success(`Order ${newStatus}`);
				router.refresh();
			  })
			  .catch((err) => {
				toast.error("Oops! Something went wrong");
				console.log(err);
			  });
		  },
		  [router]
		);
	
	  const handleBulkDispatch = useCallback(() => {
		handleBulkStatusUpdate("dispatched", "deliveryStatus");
	  }, [handleBulkStatusUpdate]);
	
	  const handleBulkDeliver = useCallback(() => {
		handleBulkStatusUpdate("delivered", "deliveryStatus");
	  }, [handleBulkStatusUpdate]);
	
	  
	return (
		<div className="max-w-[1150px] m-auto text-xl">
			<div className="mb-4 mt-8">
				<Heading title="Manage Orders" center />
			</div>
			<div style={{ height: 600, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 9 },
						},
					}}
					pageSizeOptions={[9, 20]}
					checkboxSelection
					disableRowSelectionOnClick
				/>
			</div>
			{/* <button onClick={handleBulkDispatch} >Dispatch Selected</button>
    <button onClick={handleBulkDeliver} >Deliver Selected</button> */}
		</div>

	);
};

export default ManageOrdersClient;
