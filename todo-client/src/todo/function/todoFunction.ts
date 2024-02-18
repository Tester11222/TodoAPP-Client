import APICONF from "../../conf/APIConfig";

// リクエスト形式
type RequestBody = {
    todo_context: string,
    post_user_name: string,
}

type EditBody = {
    id: number,
    todo_context: string
}

// async awaitで処理完了後に次の処理に移れる
export const sendPostTodo = async (todoContext: string, todoUserName: string) => {
    let isSendResult: boolean = false;
    // 定義から実際に送信するボティを作る
    // 一応勉強のためにType作ったけどこれ必要だったかは怪しい
    const sendBody: RequestBody = {
        todo_context: todoContext,
        post_user_name: todoUserName
    }

    isSendResult = await sendRequest(APICONF.BASE_ENDPOINT + "create", "POST", sendBody);

    return isSendResult;
}

// 削除はシンプル
export const sendDeleteTodo = async (id: number) => {
    let isDeleteResult: boolean = false;

    isDeleteResult = await sendRequest(APICONF.BASE_ENDPOINT + "delete/" + id.toString(), "DELETE");
    return isDeleteResult;
}

// 編集追加 APIの仕様に合わせ
export const sendEditTodo = async (id: number, todoContext: string): Promise<boolean> => {
    let isSendResult: boolean = false;

    const sendBody: EditBody = {
        id: id,
        todo_context: todoContext,
    }

    isSendResult = await sendRequest(APICONF.BASE_ENDPOINT + "update", "POST", sendBody);

    return isSendResult;
}

// ? anyにすることでOption引数になる。型も任意になる。
const sendRequest = async (url: string, method: string, body?: any) => {
    let isSendResult: boolean = false;

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        // bodyがあれば送信に含める。
        body: body ? JSON.stringify(body) : undefined
    }).then((response) => {
        if (!response.ok) {
            console.log(response);
        } else {
            isSendResult = true;
        }
        // responseを返すことでdataに値が入っていく
        return response.json();

    }).then((data) => {
        console.log(data);
        // internal serverエラーはこっちでキャッチする
        if (data.status == 500) {
            handleAlertMessage(method, body);
        }
    }).catch((error) => {
        console.log(error);
    });

    return isSendResult;
}

// 簡易バリデーション的にalert
// サーバサイドAPIでもリクエストボディにバリデーションはかかる
const handleAlertMessage = (method: string, body?: any) => {
    let message = "処理に失敗しました。";

    if (method === "POST") {
        // POSTならBodyがあるので参照する
        const todoContext = body.todo_context;
        // 編集の場合は存在しないので空文字にしておく
        const todoUserName = body.post_user_name ?? "";
        if (todoContext.length > 500) {
            message += "\nTODO内容は500文字以下で入力してください。"
        }
        if (todoUserName.length > 100) {
            message += "\nニックネームは100文字以下で入力してください。"
        }
    } else if (method === "DELETE") {
        message = "削除に失敗しました。";
    }
    alert(message);
}
