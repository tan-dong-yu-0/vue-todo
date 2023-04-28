import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userEmail: {
		type: String,
		required: false,
	}
});

const Todo = model("Todos", TodoSchema);

export default Todo;