import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModuleHistoryComponent } from './student-module-history.component';

describe('StudentModuleHistoryComponent', () => {
  let component: StudentModuleHistoryComponent;
  let fixture: ComponentFixture<StudentModuleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentModuleHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentModuleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
