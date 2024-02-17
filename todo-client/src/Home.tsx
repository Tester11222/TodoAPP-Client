import { useEffect, useState } from 'react';
import './App.css';
import APICONF from './conf/APIConfig';
import { sendPostTodo } from './todo/function/todoFunction';
import Button from '@mui/material/Button';
import TodoItem from './todo/TodoItem';
import { Grid } from '@mui/material';
import TodoData from './types/TodoData';
import { inputFormStyle } from './style/styleVariable';


// ニックネームも同じ感じで
export const nickNameFormStyle = {
  height: 35,
  width: 300,
  borderRadius: 10,
  borderColor: "#f2f2f2",
  marginRight: 30
}

const TodoHome = () => {
  // todoデータの取得とセット。そして表示
  // アプリケーションとしてデータを保持する状態の管理を行う
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [todoContext, setTodoContext] = useState<string>("");
  const [todoUserName, setUserName] = useState<string>("");

  const getTodos = async () => {
    try {
      const response = await fetch(APICONF.BASE_ENDPOINT + 'list');

      if (!response.ok) {
        console.log(response)
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  // post呼び出し
  const callPost = async () => {
    console.log(todoContext)
    console.log(todoUserName)

    // 登録が成功したら一覧を更新して、入力フォームを初期化する
    const postIsSuccess = await sendPostTodo(todoContext, todoUserName)

    if (postIsSuccess) {
      getTodos();
      setTodoContext("");
      setUserName("");
    }
  }

  // TodoItem コンポーネントから呼び出される削除処理用のコールバック関数
  const handleDelete = (deletedTodoId: number) => {
    // 削除したID以外のTODOにする。
    const updatedTodos = todos.filter(todo => todo.id !== deletedTodoId);
    // 更新された一覧をセットする
    setTodos(updatedTodos);
  }

  // 画面表示のときに読み込む
  useEffect(() => {
    getTodos();
  }, []);

  // .map() 配列の要素に対して一つ一つ処理ができる
  return (
    <div className='todo-cotent' style={{ textAlign: "center" }}>
      <div className="post" style={{ paddingTop: 50, paddingBottom: 50 }}>
        <div>
          <h2>TODO LIST</h2>
          <textarea value={todoContext} onChange={(e) =>
            setTodoContext(e.target.value)}
            placeholder="TODO内容を書き込む(MAX500)"
            style={inputFormStyle}
          />
        </div>
        <div className='nickNameAndADDTodo' style={{ width: 550, marginLeft: "auto", marginRight: "auto" }} >
          <input value={todoUserName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="ニックネームをどうぞ(MAX100)"
            style={nickNameFormStyle}
          />
          <Button variant='contained' color="primary" onClick={callPost}>ADD TODO</Button>
        </div>
      </div>

      {/* 一覧表示部分 */}
      {todos.map(todo => (
        <Grid container justifyContent={"center"} key={todo.id}>
          <div>
            <TodoItem id={todo.id} todo={todo.todo_context} name={todo.post_user_name} onDelete={handleDelete} />
          </div>
        </Grid>
      ))}

    </div>
  );
};

export default TodoHome;