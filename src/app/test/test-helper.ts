import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper {
  static setInputText(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  static getInputElement(fixture: ComponentFixture<any>, elementSelector: string): HTMLInputElement {
    const input: HTMLInputElement = fixture.debugElement.query(By.css(elementSelector)).nativeElement;
    return input;
  }

}

