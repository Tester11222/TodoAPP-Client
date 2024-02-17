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
export const sendPostTodo = async (todoContext: string, todoUserName: string): Promise<boolean> => {
    let isSendResult: boolean = false;
    // 定義から実際に送信するボティを作る
    // 一応勉強のためにType作ったけどこれ必要だったかは怪しい
    const sendBody: RequestBody = {
        todo_context: todoContext,
        post_user_name: todoUserName
    }

    await fetch(APICONF.BASE_ENDPOINT + "create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : TOKEN
        },
        body: JSON.stringify(sendBody)
    }).then((response) => {
        if (!response.ok) {
            console.log(response);
        } else {
            console.log('クライアントから登録');
            isSendResult = true;
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        // internal serverエラーはこっちでキャッチする
        if (data.status == 500) {
            let message = "登録に失敗しました。"

            if (todoContext.length > 500) {
                message += "\nTODO内容は500文字以下で入力してください。"
            }
            if (todoUserName.length > 100) {
                message += "\nニックネームは100文字以下で入力してください。"
            }
            // alertで簡易エラー表示
            alert(message);
        }
    }).catch((error) => {
        console.log(error);
    });

    return isSendResult;
}

// 削除はシンプル
export const sendDeleteTodo = async (id: number): Promise<boolean> => {
    let isDeleteResult: boolean = false;

    await fetch(APICONF.BASE_ENDPOINT + "delete/" + id.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : 'APITOKEN'
        },
    }).then((response) => {
        if (!response.ok) {
            console.log(response);
        } else {
            console.log('クライアントから削除');
            isDeleteResult = true;
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        // internal serverエラーはこっちでキャッチする
        if (data.status == 500) {
            alert("登録に失敗しました");
        }
    }).catch((error) => {
        console.log(error);
    });

    return isDeleteResult;
}

// 編集追加 APIの仕様に合わせ
export const sendEditTodo = async (id: number, todoContext: string): Promise<boolean> => {
    let isSendResult: boolean = false;

    const sendBody: EditBody = {
        id: id,
        todo_context: todoContext,
    }

    await fetch(APICONF.BASE_ENDPOINT + "update", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization' : TOKEN
        },
        body: JSON.stringify(sendBody)
    }).then((response) => {
        if (!response.ok) {
            console.log(response);
        } else {
            console.log('クライアントから編集');
            isSendResult = true;
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        // internal serverエラーはこっちでキャッチする
        if (data.status == 500) {
            let message = "登録に失敗しました。"

            if (todoContext.length > 500) {
                message += "\nTODO内容は500文字以下で入力してください。"
            }
            // alertで簡易エラー表示
            alert(message);
        }
    }).catch((error) => {
        console.log(error);
    });

    return isSendResult;
}