import {getWithAuth, patchWithAuth, postWithAuth, putWithAuth} from "@/util/http";
import type {Response} from "@/util/http";

export const ExampleService = {
    async list(): Promise<Response<Example>> {
        return await getWithAuth<Examples>( `/Examples`);
    },
    async list2(input: ExampleListInput): Promise<Response<ExampleList>> {
        return await postWithAuth<ExampleList>( `/Examplelist`, input);
    },
    async get(ExampleId: string): Promise<Response<Example>> {
        return await getWithAuth<Example>( `/Examples/${ExampleId}`);
    },
    async create(input: CreateExampleInput): Promise<Response<Example>> {
        return await postWithAuth<Example>( `/Examples`, input);
    },
}
