import { EntitiesGlobal } from '../models/api.entities.model'

export class TransactionGlobal {
    id:number;
    amount:number;
    created_at:string;
    id_fest:number;
    name_fest:string;
    id_com:number;
    name_com:string;
    events_id:number;
    events_name:string;

    entities:EntitiesGlobal[];
}