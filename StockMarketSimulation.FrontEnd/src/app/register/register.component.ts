import { Component, OnInit } from '@angular/core';
import { BankAccount } from '../models/bankaccount';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BankAccountService } from '../shared/services/bankaccount.service';
import { BrokerService } from '../shared/services/broker.service';
import { RouterModule, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    regForm: FormGroup;
    logForm: FormGroup;
    bankAccount: BankAccount = new BankAccount();
    submitted: boolean = false;
    error: string = "";
    isReg: boolean = false;
    isMatchPassW = true;
    constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private router: Router, private bankAccountService: BankAccountService, private brokerService: BrokerService) {

    }

    ngOnInit() {
        this.regForm = this.fb.group({
            name: ['', [Validators.required as any]],
            address: [''],
            contact: [''],
            accountno: ['', [Validators.required as any]]
        });

        this.logForm = this.fb.group({
            username: ['', [Validators.required as any]],
            password: ['', [Validators.required as any]],
            password2: ['', [Validators.required as any]],
        });
        this.getMaxAccountNumber();
    }

    getMaxAccountNumber(): void {
        this.spinner.show();
        this.bankAccountService.getMaxAccountNumber()
            .subscribe((data: number) => {
                this.bankAccount.AccountNumber = data + 1;
                this.spinner.hide();
            },
            (error: Response) => {
                this.spinner.hide();
            });
    }

    validPass(): boolean {
        if (this.bankAccount.Password.trim() != this.bankAccount.Password2.trim()) {
            this.isMatchPassW = false;
            return false;
        } else {
            this.isMatchPassW = true;
            return true;
        }
    }

    save(model: BankAccount, isValid: boolean, isValid2: boolean) {
        this.error = "";
        this.submitted = true;
        if (isValid && isValid2 && this.validPass()) {
            this.spinner.show();
            this.bankAccountService.create(this.bankAccount)
                .subscribe((data: BankAccount) => {
                    this.isReg = true;
                    this.spinner.hide();
                    localStorage.setItem('loginUserId', data.Id.toString());
                },
                (error: any) => {
                    this.spinner.hide();
                    if (error.status === 400) {
                        this.error = error._body;
                        window.scrollTo(0, 0);
                    } else {
                        window.scrollTo(0, 0);
                        this.error = error.statusText;
                    }
                });
        }
    }

    saveBroker() {
        this.error = "";
        this.submitted = true;
        var bankAccountId = +localStorage.getItem('loginUserId');
        if (bankAccountId != undefined) {
            this.spinner.show();
            this.brokerService.create(bankAccountId)
                .subscribe((data: number) => {
                    this.spinner.hide();
                    localStorage.setItem('BrokerId', data.toString());
                    this.router.navigate(['login']);
                },
                (error: any) => {
                    this.spinner.hide();
                    if (error.status === 400) {
                        this.error = error._body;
                        window.scrollTo(0, 0);
                    } else {
                        window.scrollTo(0, 0);
                        this.error = error.statusText;
                    }
                });
        } else {
            this.error = "Bank Account Cannot find";
        }
    }
}
