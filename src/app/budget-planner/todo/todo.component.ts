import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  toggleSelection:any;
   todoForm: any;
  selectedMonth: any;
  expense: { month: string, expenseAmount: number }[] = [
    { month: 'january',expenseAmount: 1500},
    { month: 'february', expenseAmount: 2000},
    { month: 'march', expenseAmount: 1800}
  ];
monthSelected: boolean = false;
januaryExpense: any[] = [
  { expenseType: 'Rechage', expenseAmount: 1000},
  { expenseType: 'Light Bills', expenseAmount: 500},
];

februaryExpense: any[] = [
  {expenseType: 'Essentials', expenseAmount: 1000},
  {expenseType: 'Light Bills', expenseAmount: 400}
];
marchExpense: any[] = [
  {expenseType: 'Recharge', expenseAmount: 1100},
  {expenseType: 'Essentials', expenseAmount: 250}
];

constructor(private fb: FormBuilder, private router: Router ) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  this.selectedMonth = currentMonth;
  
}

ngOnInit(): void {
  this.todoForm = this.fb.group({
    month: [''],
    expenseType: ['',Validators.required],
    expenseAmount: ['',Validators.required]
  });
}

onSubmitExpense() {
  if (this.todoForm.valid) {
    const newExpense =  this.todoForm.value;
    switch (this.selectedMonth){
      case 'january':
        this.januaryExpense.push(newExpense);
        break;
      case 'february':
        this.februaryExpense.push(newExpense);
        break;
      case 'march':
        this.marchExpense.push(newExpense);
        break;
      
    }
    this.todoForm.reset();
    this.todoForm.patchValue({ month: '', expenseType: '', expenseAmount:''});
    
  }
}

onChangeExpense(event: any) {
  this.selectedMonth = event.target.value;
  this.monthSelected = true;
  this.getFilteredExpenses();
}

getFilteredExpenses() {
  let filteredExpense: any[] = [];
  switch (this.selectedMonth) {
    case 'january':
      filteredExpense = [...this.januaryExpense];
      break;
    case 'february':
      filteredExpense = [...this.februaryExpense];
      break;
    case 'march':
      filteredExpense = [...this.marchExpense];
      break;
    default:
        break;
  }
  return filteredExpense;
}

calculateTotalExpense(month: string): number {
  let totalExpense = 0;
  for (const income of this.gettodoFormonth(month)){
    totalExpense += income.expenseAmount;
  }
  return totalExpense;
  
}

gettodoFormonth(month: string): any[] {
  switch (month) {
    case 'january':
      return this.januaryExpense;
    case 'february':
        return this.februaryExpense;
    case 'march':
          return this.marchExpense;
    default:
      return [];
  }
}

onSave() {
  if ( this.todoForm.valid) {
    this.todoForm.reset({ month: this.selectedMonth });
    this.getFilteredExpenses();
  }
}

saveForm() {
  console.log("Form saved!");
}

onBack() {
  this.router.navigate(['/budget-planner/dashboard']);
}




}

