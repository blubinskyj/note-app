import {Injectable} from "@angular/core";
import {StoreData} from "../interfaces";
import {BehaviorSubject, Subject} from "rxjs";

const initialStore: StoreData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  selectedGroupId: ""
}

@Injectable({
  providedIn: 'root'
})
export class StoreService{

  private dataSubject: BehaviorSubject<StoreData>;
  private data: StoreData = initialStore;

  constructor() {
    this.dataSubject = new BehaviorSubject(this.data)
  }

  public get store(){
    return this.dataSubject
  };

  public updateStore(update: Partial<StoreData>){
    const data = {...this.data, ...update}
    this.data = data
    this.dataSubject.next(data)
  };
}
