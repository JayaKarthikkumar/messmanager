import { EmployeePortalModule } from './employee-portal.module';

describe('EmployeePortalModule', () => {
  let employeePortalModule: EmployeePortalModule;

  beforeEach(() => {
    employeePortalModule = new EmployeePortalModule();
  });

  it('should create an instance', () => {
    expect(employeePortalModule).toBeTruthy();
  });
});