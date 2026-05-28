export declare class CreateTeacherDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    department?: string;
    schoolId: string;
}
export declare class UpdateTeacherDto {
    firstName?: string;
    lastName?: string;
    department?: string;
}
