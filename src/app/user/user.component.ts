import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserComponent>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.userForm = this.fb.group({
      personalData: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: [''],
        lastName: [''],
      }),
      billingData: this.fb.group({
        billingName: [''],
        postalCode: [''],
        city: [''],
        address: ['']
      })
    });

    // Figyeljük a kijelző méretét és frissítjük a dialog méretét
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Web]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        // Mobil eszköz esetén teljes képernyős megjelenés
        this.dialogRef.updateSize('100vw', '100vh');
      } else if (result.breakpoints[Breakpoints.Web]) {
        // Nagyobb kijelzőn normál méretre vált
        this.dialogRef.updateSize('600px', 'auto');  // Állítsd be az igény szerinti méretet
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.dialogRef.close();
    }
  }

  deleteData(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Biztosan törölni szeretnéd minden adatodat? Ezzel minden csevegési előzmény elveszik és a felhasználód törlésre kerül.` }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Törlés megerősítve:', user);
      } else {
        console.log('Törlés visszavonva');
      }
    });
  }
}