import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoHome from './Home';
import { SelectTodo } from './todo/page/SelectTodoCheck';
import { AppBar, Grid, Toolbar, Typography, colors } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditTodo from './todo/page/EditTodo';

const App = () => {
    return (
        <BrowserRouter>
            <AppBar position="static" style={{ backgroundColor: "#102c42" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" align="center">
                        TODO LIST
                    </Typography>
                    <CheckCircleIcon></CheckCircleIcon>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route index element={<TodoHome />} />
                <Route path="todo/:id" element={<SelectTodo />} />
                <Route path="todo/edit/:id" element={<EditTodo />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
