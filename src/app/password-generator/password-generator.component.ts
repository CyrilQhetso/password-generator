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
  useUppercase: boolean = true;
  useLowercase: boolean = true;
  useNumbers: boolean = true;
  useSymbols: boolean = true;
  strength: number = 0;
  isGenerating: boolean = false;
  isCopying: boolean = false;
  

  private upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private numberChars = '0123456789';
  private symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  generatePassword(): void {
    this.isGenerating = true;
    setTimeout(() => {
      this.isGenerating = false;

      let chars = '';
      if (this.useUppercase) chars += this.upperCaseChars;
      if (this.useLowercase) chars += this.lowerCaseChars;
      if (this.useNumbers) chars += this.numberChars;
      if (this.useSymbols) chars += this.symbolChars;

      if (!chars) {
        this.snackBar.open('Please select at least one character type!', 'Close', { duration: 3000 });
        return;
      }

      let generatedPassword = '';
      for (let i = 0; i < this.length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += chars[randomIndex];
      }

      this.password = generatedPassword;
      this.calculateStrength();
    }, 500);
  }

  private calculateStrength(): void {
    let strengthPoints = 0;
    if (this.useUppercase) strengthPoints++;
    if (this.useLowercase) strengthPoints++;
    if (this.useNumbers) strengthPoints++;
    if (this.useSymbols) strengthPoints++;
    
    strengthPoints += Math.floor(this.length / 8);
    this.strength = Math.min(strengthPoints * 25, 100);
  }

  copyToClipboard(): void {
    if (this.password) {
      this.isCopying = true;
      this.clipboard.copy(this.password);
      setTimeout(() => {
        this.isCopying = false;
        this.snackBar.open('Password copied to clipboard!', 'Close', { duration: 3000 });
      }, 1000);
    }
  }

  getStrengthText(): string {
    if (this.strength < 40) return 'Weak';
    if (this.strength < 70) return 'Medium';
    return 'Strong';
  }

  getStrengthClass(): string {
    if (this.strength < 40) return 'strength-weak';
    if (this.strength < 70) return 'strength-medium';
    return 'strength-strong';
  }
}
