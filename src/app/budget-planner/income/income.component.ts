import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
incomeForm:any;
selectedMonth:any;
Sevent:any;
januaryIncomes: any[] = [
  { source: 'Salary', amount: 5000, investements: '401(k)'},
  { source: 'Freelancing', amount: 1000, investements: 'Stocks'},

];
februaryIncomes: any[] = [
  { source: 'Salary', amount: 5500, investements: '401(k)'},
  { source: 'Rental Income', amount: 700, investements: 'Real Estate'},
];
marchIncomes: any[] = [
  { source: 'Salary', amount: 5200, investements: '401(k)'},
  { source: 'Freelancing', amount: 1200, investements: 'Stocks'},
  { source: 'Rental Income', amount: 600, investements: 'Real Estate'},
];

monthSelected:boolean=false;
constructor(public fb:FormBuilder, public router:Router){
  const currentDate = new Date();
  this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });

}
ngOnInit():void {
  this.incomeForm = this.fb.group({
    month: [''],
    source: ['',Validators.required],
    amount: ['',Validators.required],
    investments: ['',Validators.required]
});

}

onChange(event:any){
  this.selectedMonth=event.target.value
  this.monthSelected=true;
  this.getFilteredIncomes();

}

calculateTotalIncome(month: string): number {
  let totalIncome = 0;
  for (const income of this.getIncomeForMonth(month)) {
    totalIncome += income.amount;
  }
  return totalIncome;

}

getIncomeForMonth(month: string): any[] {
  switch (month) {
    case 'january':
      return this.januaryIncomes;
    case 'february':
      return this.februaryIncomes;
    case 'march':
      return this.marchIncomes;
    default:
      return [];
  }
 }

getFilteredIncomes(){
  let filteredIncomes: any[] = [];
  switch (this.selectedMonth) {
    case 'january':
      filteredIncomes = [...this.januaryIncomes];
      break;
    case 'february':
      filteredIncomes = [...this.februaryIncomes];
      break;
    case 'march':
      filteredIncomes = [...this.marchIncomes];
      break;
    default:
        break;
  }
  return filteredIncomes;
}

// newIncome.source!=""&&newIncome.amount!=""&&newIncome.source!="disabled"&&newIncome.investements!=""&&newIncome.investements!="disabled"

onSubmit(){ 
  // console.log(this.incomeForm);
  
  if (this.incomeForm.valid){
    const newIncome = this.incomeForm.value;
    switch (this.selectedMonth) {
    case 'january':
      this.januaryIncomes.push(newIncome);
      break;
    case 'february':
      this.februaryIncomes.push(newIncome);
      break;
    case 'march':
      this.marchIncomes.push(newIncome);
      break;
    default:
      console.error('Invalid month selected:', this.selectedMonth);
      break;
   }
   this.incomeForm.reset();
   this.incomeForm.patchValue({ month:'', source:'', amount:'', investments:''});
}
else {
  console.error('Form is invalid:', this.incomeForm.errors);
}
  
}


saveForm() {
  console.log("Form saved!");
}

onBack() {
  this.router.navigate(['/budget-planner/dashboard']);
}

}

