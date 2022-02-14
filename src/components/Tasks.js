import React from "react";
import Task from "./Task";
// const tasks = [
//     {
//         id:1,
//         text: 'Doctor Appointment',
//         day: 'Feb 5th at 2:00PM',
//         reminder:true,
//     },
//     {
//         id:2,
//         text: 'React Development',
//         day: 'Feb 8th at 2:00PM',
//         reminder:true,
//     },
//     {
//         id:3,
//         text: 'Project Submission',
//         day: 'Feb 8th at 10:00AM',
//         reminder:true,
//     }
// ];
export const Tasks = ({tasks,onDelete,onToggle}) => {

	return (
		<div>
			{tasks.map((task) => (
				<Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
			))}
		</div>
	);

};
