import { List } from './list';

export interface ObjetAlc {
    utilisateur: string,
    password: string,
    todoListes: List[]
}