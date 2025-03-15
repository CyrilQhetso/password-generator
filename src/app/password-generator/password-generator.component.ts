import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-generator',
  standalone: false,
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css'
})
export class PasswordGeneratorComponent {

  password: string = '';
  length: number = 12;
  useUpperCase: boolean = true;
  useLowerCase: boolean = true;
  useNumbers: boolean = true;
  useSymbols: boolean = true;
  passeordStrength: number = 0;

  private upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private numberChars = '0123456789';
  private symbolsChars = '!@#$%^&*()_+-[]|;:,.<>?';

  constructor(private _clipboard: Clipboard, private _snackBar: MatSnackBar) {}

  private calculateStrength() {
    let strength = 0;
    if (this.useUpperCase) strength++;
    if (this.useLowerCase) strength++;
    if (this.useNumbers) strength++;
    if (this.useSymbols) strength++;
    
    strength += Math.floor(this.length / 8);
    this.passeordStrength = Math.min(strength * 25, 100);
  }
  
  generatePassword() {
    let chars = '';
    if (this.useUpperCase) chars += this.upperCaseChars;
    if (this.useLowerCase) chars += this.lowerCaseChars;
    if (this.useNumbers) chars += this.numberChars;
    if (this.useSymbols) chars += this.symbolsChars;

    if (!chars) {
      this._snackBar.open('Please select at least one character type!', 'Close', { duration: 3000 });
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    this.password = generatedPassword;
    this.calculateStrength();
  }
}
