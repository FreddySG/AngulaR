import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guid } from "guid-typescript";
import { Todo } from 'src/models/todo.model';
import {JsonService } from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(public json: JsonService){
    this.json.getJson('https://demo6193376.mockable.io/todos').subscribe((res: any)=>{
      console.log(res);
    });
  }

  onSubmit(form: NgForm){
    let todo = new Todo(Guid.create(),form.value.title, false);
    this.todos.push(todo);
    form.resetForm();
  }

  onComplete(id: Guid){
    let todo  = this.todos.filter(x=>x.id === id)[0];
    todo.isComplete = true;
  }

  onDelete(id: Guid){
    let todo  = this.todos.filter(x=>x.id === id)[0];
    let index = this.todos.indexOf(todo,0);
    if(index > -1){
      this.todos.splice(index,1);
    }
  }
}
