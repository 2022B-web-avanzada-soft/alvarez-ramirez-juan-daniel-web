// i_todos
//  - index.tsx

import Layout from "@/components/Layout";
import { Todo, TodoHttp } from "@/servicios/todo.http";
import { useEffect, useState } from "react";

export default function () {
    const [todos, setTodos] = useState([] as Todo[]);
    const consultarTodos = async () => {
        const todosRes = await TodoHttp();
        setTodos([...todos, ...todosRes]);
    }
    useEffect(() => {
        consultarTodos();
    }, []);
    return(
        <>
        <Layout title={"To do's"}>
            <h1>To do's</h1>
            {todos.map((todo, i) => {
                        return(
                            <li key={todo.id}>
                                {todo.id} - {todo.completed} - 
                                <a href={`/i_todos/${todo.id}`}>{todo.title}</a>
                            </li>
                        )
                    }
                )
            }
        </Layout>
        </>
    )
}