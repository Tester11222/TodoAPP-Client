import Button from "@mui/material/Button";
import { sendDeleteTodo } from "./function/todoFunction";
import { Grid, Paper} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// これでAPIからどういうデータが返ってくるかがわからなくてもある程度安全な開発が可能
type Todo = {
    id: number,
    todo: string,
    name: string,
    onDelete: (id: number) => void; // 削除イベントを処理するコールバック関数
}

export const TodoItem = (props: Todo) => {
    const { id, todo, name, onDelete } = props;

    const callDelete = async () => {
        const isDeleteSuccess = await sendDeleteTodo(id);
        if (isDeleteSuccess) {
            // 削除が完了したら親コンポーネントから渡されたコールバック関数を呼び出す
            // HOME画面のstate更新に必要となる
            onDelete(id);
        }
    }

    let viewTodo = todo;
    const partOfTodo = todo.substring(0, 10) + "...";

    // 10文字超えたら部分表示
    if (todo.length > 10) {
        viewTodo = partOfTodo;
    }

    return (
        // グリッド内でさらに横並びにしたいのでコンテナ
        <Grid item xs={12} justifyContent={"center"}>
            <Paper style={{ width: 550, textAlign: 'center', marginTop: 20, backgroundColor: "#e6f5ff" }}>
                <Grid container style={{ height: 100 }}>
                    <Grid item xs={6} style={{}}>
                        <p>{viewTodo}</p>
                        <Button variant='outlined' href={"/todo/" + id}>詳細を見る</Button>
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: 20 }}>BY {name}</Grid>
                    <Grid item xs={2} style={{ marginTop: 20 }}><a href={"/todo/edit/" + id}><EditIcon></EditIcon></a></Grid>
                    <Grid item xs={2} style={{ marginTop: 20 }}><Button variant='contained' color="primary" onClick={callDelete}>DONE</Button></Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default TodoItem;


