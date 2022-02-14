import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";

const App = () => {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([
		// {
		// 	id: 1,
		// 	text: "Doctor Appointment",
		// 	day: "Feb 5th at 2:00PM",
		// 	reminder: true,
		// },
		// {
		// 	id: 2,
		// 	text: "React Development",
		// 	day: "Feb 8th at 2:00PM",
		// 	reminder: true,
		// },
		// {
		// 	id: 3,
		// 	text: "Project Submission",
		// 	day: "Feb 8th at 10:00AM",
		// 	reminder: false,
		// },
	]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTasks();
	}, []);

	//Fetch Tasks
	const fetchTasks = async () => {
		// const res = await fetch("http://192.168.0.104:5000/tasks")
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();
		return data;
		// console.log(data)
	};
	//Fetch Single Task
	const fetchTask = async (id) => {
		// const res = await fetch("http://192.168.0.104:5000/tasks")
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();
		return data;
		// console.log(data)
	};
	//Add task
	const addTask = async (task) => {
		// console.log(task);
		// const id = Math.floor(Math.random()*10000)+1
		// const newTask = {id,...task}
		// setTasks([...tasks, newTask])
		const res = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});
		const data = await res.json();
		setTasks([...tasks, data]);
	};
	//Delete Tasks
	const deleteTask = async (id) => {
		// console.log('delete',id);
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE",
		});
		setTasks(tasks.filter((task) => task.id !== id));
	};
	//Reminder
	const toggleReminder = async (id) => {
		// console.log(id);
		//   setTasks(tasks.map((task)=> task.id === id ?{...task,reminder:!task.reminder} :task) );
		const taskToToggle = await fetchTask(id);
		const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "Application/json",
			},
			body: JSON.stringify(updTask),
		});
		const data = await res.json();
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};

	// const name= "Shashwat"
	return (
		<Router>
			<div className="container">
				<Header
					onAdd={() => setShowAddTask(!showAddTask)}
					showAdd={showAddTask}
				/>
				<Routes>
					<Route path="/" exact
						element={
							<React.Fragment>
								{showAddTask && <AddTask onAdd={addTask} />}
								{tasks.length > 0 ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={toggleReminder}
									/>
								) : (
									"No Tasks To Show"
								)}
							</React.Fragment>
						}
					/>
					<Route path="/about" element={<About/>} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
