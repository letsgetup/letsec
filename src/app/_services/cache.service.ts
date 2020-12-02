import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  static setFormData(value: any) {
    throw new Error('Method not implemented.');
  }

  private formData: any;

  constructor() { }

  public setFormData(formData: any): void {
    this.formData = formData;
  }

  public getFormData(): any {
    return this.formData;  
  }
}
