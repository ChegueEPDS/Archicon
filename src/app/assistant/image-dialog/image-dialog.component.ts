import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule]
})
export class ImageDialogComponent {
  isFullScreen = false; // Kezdetben nem teljes képernyős

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }
}