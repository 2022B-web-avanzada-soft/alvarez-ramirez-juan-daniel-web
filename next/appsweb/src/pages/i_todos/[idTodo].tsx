import Layout from "@/components/Layout";
import { Todo, TodoHttp } from "@/servicios/todo.http";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "node:querystring";
import {useRouter} from 'next/router'
// i_todo
//  - [idTodo].tsx

interface ParametrosTodos {
    error?: string;
    todo?: Todo;
}

export default function (params: ParametrosTodos) {
    const router = useRouter();
    console.log(router)
    return(
        <>
        <Layout title={"To do"}>
            <h1>To do {params?.todo?.title}</h1>
        </Layout>
        </>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    const paths = [
        { params: { idTodo: '1' } },
        { params: { idTodo: '2' } },
        { params: { idTodo: '3' } },
        { params: { idTodo: '4' } },
    ]
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (
    {params}
) => {
    try {
        // fetch
        const id = params?.idTodo as string;
        const resultado = await TodoHttp(id);
        return {props: {todo: resultado}}
    } catch (err: any) {
        return {props: {errors: err.message}}
    }
}