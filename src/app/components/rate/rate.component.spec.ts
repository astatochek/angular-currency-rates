import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComponent } from './rate.component';
import { By } from '@angular/platform-browser';

describe('RateComponent', () => {
  let component: RateComponent;
  let fixture: ComponentFixture<RateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateComponent],
    });
    fixture = TestBed.createComponent(RateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect positive rate value', () => {
    component.rate = 1.23;
    component.ngOnChanges();
    expect(component.value()).toEqual(component.rate);
    expect(component.arrow()).toEqual('up');
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.query(By.css('div'));
    expect(htmlElement.classes['bg-misty-rose']).toBeTruthy();
    expect(htmlElement.classes['text-ruby-red']).toBeTruthy();
  });

  it('should reflect negative rate value', () => {
    component.rate = -1.23;
    component.ngOnChanges();
    expect(component.value()).toEqual(Math.abs(component.rate));
    expect(component.arrow()).toEqual('down');
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.query(By.css('div'));
    expect(htmlElement.classes['bg-nyanza']).toBeTruthy();
    expect(htmlElement.classes['text-dark-spring-green']).toBeTruthy();
  });

  it('should reflect null rate value', () => {
    component.rate = 0;
    component.ngOnChanges();
    expect(component.value()).toEqual(component.rate);
    expect(component.arrow()).toEqual('none');
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.query(By.css('div'));
    expect(htmlElement.classes['bg-anti-flash-white']).toBeTruthy();
    expect(htmlElement.classes['text-auro-metal-saurus']).toBeTruthy();
  });

  it('should render rate value', () => {
    component.rate = 1.23;
    component.ngOnChanges();
    fixture.detectChanges();
    const htmlElement = fixture.nativeElement as HTMLElement;
    expect(htmlElement.textContent).toContain(`${component.value()}`);
  });
});
