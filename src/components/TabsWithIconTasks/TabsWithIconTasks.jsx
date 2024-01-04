import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import {
	ClipboardDocumentListIcon,
	CheckCircleIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setChanges } from "../../store/slices/TasksSlice/TasksSlice";

export function TabsWithIconTasks() {
	const { tab } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();
	const data = [
		{
			label: "Tareas",
			value: "tasks",
			icon: ClipboardDocumentListIcon,
		},
		{
			label: "Terminadas",
			value: "finished",
			icon: CheckCircleIcon,
		},
		{
			label: "Eliminadas",
			value: "deleted",
			icon: TrashIcon,
		},
	];
	return (
		<Tabs className='sm:w-full md:w-3/4 xl:w-8/12 mx-auto mb-3' value={tab}>
			<TabsHeader>
				{data.map(({ label, value, icon }) => (
					<Tab
						key={value}
						value={value}
						onClick={() => {
							dispatch(setChanges(value));
						}}>
						<div className='flex items-center gap-2'>
							{React.createElement(icon, {
								className: "w-5 h-5",
							})}
							{label}
						</div>
					</Tab>
				))}
			</TabsHeader>
		</Tabs>
	);
}
