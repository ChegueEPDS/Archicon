import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UserComponent } from '../user/user.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule,  
    MatSortModule,       
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    CommonModule, 
    FormsModule, 
    UserComponent, 
    ConfirmDialogComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['email', 'username', 'name', 'license' , 'actions'];
  dataSource = new MatTableDataSource([
    { email: 'john@example.com', username: 'john_doe', name: 'John Doe', license: true },
    { email: 'jane@example.com', username: 'jane_doe', name: 'Jane Doe', license: false },
    { email: 'alex@example.com', username: 'alex123', name: 'Alex Johnson', license: true },
    { email: 'mary@example.com', username: 'mary_smith', name: 'Mary Smith', license: false },
    { email: 'tom@example.com', username: 'tommy', name: 'Tom Brown', license: true },
    { email: 'lisa@example.com', username: 'lisa_m', name: 'Lisa Martin', license: true },
    { email: 'paul@example.com', username: 'paul_w', name: 'Paul Walker', license: false },
    { email: 'anna@example.com', username: 'anna_b', name: 'Anna Baker', license: true },
    { email: 'lucas@example.com', username: 'lucas_g', name: 'Lucas Green', license: true },
    { email: 'sarah@example.com', username: 'sarah_k', name: 'Sarah King', license: false },
    { email: 'mike@example.com', username: 'michael_j', name: 'Michael Jordan', license: true },
    { email: 'emma@example.com', username: 'emma_w', name: 'Emma Watson', license: true },
    { email: 'daniel@example.com', username: 'daniel_c', name: 'Daniel Craig', license: false },
    { email: 'olivia@example.com', username: 'olivia_h', name: 'Olivia Harris', license: true },
    { email: 'jack@example.com', username: 'jack_w', name: 'Jack Wilson', license: true },
    { email: 'sophia@example.com', username: 'sophia_r', name: 'Sophia Robinson', license: false },
    { email: 'liam@example.com', username: 'liam_d', name: 'Liam Davis', license: true },
    { email: 'chloe@example.com', username: 'chloe_l', name: 'Chloe Lewis', license: true },
    { email: 'henry@example.com', username: 'henry_h', name: 'Henry Hill', license: false },
    { email: 'grace@example.com', username: 'grace_m', name: 'Grace Moore', license: true },
    { email: 'david@example.com', username: 'david_t', name: 'David Taylor', license: true },
    { email: 'ella@example.com', username: 'ella_s', name: 'Ella Scott', license: false },
    { email: 'sam@example.com', username: 'sam_j', name: 'Samuel Jackson', license: true },
    { email: 'mia@example.com', username: 'mia_w', name: 'Mia White', license: true },
    { email: 'noah@example.com', username: 'noah_r', name: 'Noah Reed', license: false },
    { email: 'ava@example.com', username: 'ava_c', name: 'Ava Carter', license: true },
    { email: 'ben@example.com', username: 'ben_p', name: 'Ben Parker', license: true },
    { email: 'ella@example.com', username: 'ella_g', name: 'Ella Gray', license: false },
    { email: 'jacob@example.com', username: 'jacob_n', name: 'Jacob Nelson', license: true },
    { email: 'lucy@example.com', username: 'lucy_b', name: 'Lucy Brooks', license: true }
  ]);

  searchQuery: string = '';  // A keresési mező tárolása

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(user: any) {
    this.dialog.open(UserComponent, {
      width: '800px',
      height: 'auto',
      data: user
    });
  }

  manageSubscription(user: any) {
    console.log('Előfizetés:', user);
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: `Biztosan törölni szeretnéd ${user.name} nevű felhasználót?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(u => u.email !== user.email);
        console.log('Törlés megerősítve:', user);
      } else {
        console.log('Törlés visszavonva');
      }
    });
  }
}