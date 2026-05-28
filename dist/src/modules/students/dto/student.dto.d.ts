export declare class CreateStudentDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    admissionNo: string;
    grade?: string;
    dateOfBirth?: string;
    schoolId: string;
    parentId?: string;
}
export declare class UpdateStudentDto {
    firstName?: string;
    lastName?: string;
    grade?: string;
    dateOfBirth?: string;
    parentId?: string;
}
