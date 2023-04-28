import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import session, { Session } from 'express-session'
import { config } from "dotenv";
import Todo from "./model/Todo"
import User from "./model/User"
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken')

const KEY = 'asasdlfkjhakdfjhslkjdf';

declare module 'express-session' {
  interface Session {
    userEmail: string;
  }
}

config({ path: "./.env" })

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: 'keyboat-cat',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.MONGO_URI ?? "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get('/test', (req: Request, res: Response) => {
  const userid = req.cookies.fromlogin
  res.send(userid)
})

app.get('/', async (req: Request, res: Response) => {
  const userEmail = req.cookies.userEmail;
  const id = req.params;
  console.log(userEmail)
  try {
    const UserList = await User.find(id)
    if (!UserList) {
      throw Error('No items')
    }
  } catch (error: any) {
    console.log("Data not found")
    res.status(500).json({ message: error })
  }
  // if (userEmail) {
  //   res.status(200).json({ email: userEmail })
  // } else {
  //   res.status(401).json({ message: "User not logged in" })
  // }
})

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "Email Not Found" })
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Password Not Found" })
  }

  if (user.password === password) {
    await res.cookie('userEmail', user.email, { httpOnly: true })
    return res.status(200).json({ email })
  }
})

app.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    // 409 means conflict
    return res.status(409).json({ message: "User already exists" })
  }

  const newUser = new User({ email, password })
  await newUser.save()
    .then(() => {
      res.status(200).json({ message: "User created successfully" })
    })
    .catch((err) => {
      res.status(500).json({ message: err })
    })
})

// create a signout route
app.get('/signout', (req: Request, res: Response) => {
  res.clearCookie('userEmail')
  res.status(200).json({ message: "User signed out" })
})

app.get('/todo', async (req: Request, res: Response) => {
  const userEmail = req.cookies.userEmail;
  const id = req.params
  try {
    if (!userEmail) {
      throw Error("User not logged in")
    }
    const TodoList: any = await Todo.find({ ...id, userEmail: userEmail })
    if (!TodoList) {
      throw Error('No items')
    }
    res.status(200).json({ TodoList, userEmail })
  } catch (error: any) {
    console.log("Data not found")
    if (error.message === 401) {
      res.status(401).json({ message: error.message })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

app.post('/todo', async (req: Request, res: Response) => {
  const newTodo = new Todo(req.body)
  console.log("New Todo", newTodo)
  try {
    const Todo = await newTodo.save()
    if (!Todo) {
      throw Error('Something went wrong saving the Todo')
    }
    res.status(200).json(Todo)
  } catch (error: any) {
    // res.status(500)
    console.log("Data is empty")
    res.status(500).json({ message: error.message })
  }
})

app.delete('/todo/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log("Delete Todo ID", id)
  try {
    const removed = await Todo.findByIdAndDelete(id)
    if (!removed) {
      throw Error('Something went wrong deleting the Todo')
    }
    res.status(200).json({ success: true })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
