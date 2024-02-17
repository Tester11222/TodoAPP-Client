import { useEffect, useState } from "react";
import TodoData from "../../types/TodoData";
import APICONF from "../../conf/APIConfig";
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import Markdown from "react-markdown";

// TODOの個別選択
export const SelectTodo = () => {
    const [todo, setTodo] = useState<TodoData>({ id: 0, todo_context: "", post_user_name: "", created_at: "", updated_at: "" });
    const { id } = useParams<{ id: string }>();

    // 選択
    const selectTodoById = async (id: string) => {
        try {
            const response = await fetch(APICONF.BASE_ENDPOINT + id);

            if (!response.ok) {
                console.log(response)
            }

            const data = await response.json();
            setTodo(data);
        } catch (error) {
            console.error(error);
        }
    }

    // idがstringとして取得できない場合は空文字で
    useEffect(() => {
        selectTodoById(id ?? "");
    }, []);

    return (
        <div key={todo.id} className="todoById">
            <div style={{marginLeft:30}}>
                <h2>{todo.id} NICKNAME:{todo.post_user_name}</h2>
                <Markdown>{todo.todo_context}</Markdown>
                <Button variant='outlined' href="/">BACK</Button>
            </div>
        </div>
    );
}