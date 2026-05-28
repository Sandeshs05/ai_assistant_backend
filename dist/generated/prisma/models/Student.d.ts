import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StudentModel = runtime.Types.Result.DefaultSelection<Prisma.$StudentPayload>;
export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null;
    _min: StudentMinAggregateOutputType | null;
    _max: StudentMaxAggregateOutputType | null;
};
export type StudentMinAggregateOutputType = {
    id: string | null;
    admissionNo: string | null;
    grade: string | null;
    dateOfBirth: Date | null;
    userId: string | null;
    schoolId: string | null;
    parentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StudentMaxAggregateOutputType = {
    id: string | null;
    admissionNo: string | null;
    grade: string | null;
    dateOfBirth: Date | null;
    userId: string | null;
    schoolId: string | null;
    parentId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StudentCountAggregateOutputType = {
    id: number;
    admissionNo: number;
    grade: number;
    dateOfBirth: number;
    userId: number;
    schoolId: number;
    parentId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StudentMinAggregateInputType = {
    id?: true;
    admissionNo?: true;
    grade?: true;
    dateOfBirth?: true;
    userId?: true;
    schoolId?: true;
    parentId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StudentMaxAggregateInputType = {
    id?: true;
    admissionNo?: true;
    grade?: true;
    dateOfBirth?: true;
    userId?: true;
    schoolId?: true;
    parentId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StudentCountAggregateInputType = {
    id?: true;
    admissionNo?: true;
    grade?: true;
    dateOfBirth?: true;
    userId?: true;
    schoolId?: true;
    parentId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StudentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    cursor?: Prisma.StudentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StudentCountAggregateInputType;
    _min?: StudentMinAggregateInputType;
    _max?: StudentMaxAggregateInputType;
};
export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
    [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudent[P]> : Prisma.GetScalarType<T[P], AggregateStudent[P]>;
};
export type StudentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithAggregationInput | Prisma.StudentOrderByWithAggregationInput[];
    by: Prisma.StudentScalarFieldEnum[] | Prisma.StudentScalarFieldEnum;
    having?: Prisma.StudentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudentCountAggregateInputType | true;
    _min?: StudentMinAggregateInputType;
    _max?: StudentMaxAggregateInputType;
};
export type StudentGroupByOutputType = {
    id: string;
    admissionNo: string;
    grade: string | null;
    dateOfBirth: Date | null;
    userId: string;
    schoolId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: StudentCountAggregateOutputType | null;
    _min: StudentMinAggregateOutputType | null;
    _max: StudentMaxAggregateOutputType | null;
};
export type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudentGroupByOutputType[P]>;
}>>;
export type StudentWhereInput = {
    AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    OR?: Prisma.StudentWhereInput[];
    NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    id?: Prisma.StringFilter<"Student"> | string;
    admissionNo?: Prisma.StringFilter<"Student"> | string;
    grade?: Prisma.StringNullableFilter<"Student"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null;
    userId?: Prisma.StringFilter<"Student"> | string;
    schoolId?: Prisma.StringFilter<"Student"> | string;
    parentId?: Prisma.StringNullableFilter<"Student"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    school?: Prisma.XOR<Prisma.SchoolScalarRelationFilter, Prisma.SchoolWhereInput>;
    parent?: Prisma.XOR<Prisma.ParentNullableScalarRelationFilter, Prisma.ParentWhereInput> | null;
};
export type StudentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    admissionNo?: Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    schoolId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    school?: Prisma.SchoolOrderByWithRelationInput;
    parent?: Prisma.ParentOrderByWithRelationInput;
};
export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    schoolId_admissionNo?: Prisma.StudentSchoolIdAdmissionNoCompoundUniqueInput;
    AND?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    OR?: Prisma.StudentWhereInput[];
    NOT?: Prisma.StudentWhereInput | Prisma.StudentWhereInput[];
    admissionNo?: Prisma.StringFilter<"Student"> | string;
    grade?: Prisma.StringNullableFilter<"Student"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null;
    schoolId?: Prisma.StringFilter<"Student"> | string;
    parentId?: Prisma.StringNullableFilter<"Student"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    school?: Prisma.XOR<Prisma.SchoolScalarRelationFilter, Prisma.SchoolWhereInput>;
    parent?: Prisma.XOR<Prisma.ParentNullableScalarRelationFilter, Prisma.ParentWhereInput> | null;
}, "id" | "userId" | "schoolId_admissionNo">;
export type StudentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    admissionNo?: Prisma.SortOrder;
    grade?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    schoolId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StudentCountOrderByAggregateInput;
    _max?: Prisma.StudentMaxOrderByAggregateInput;
    _min?: Prisma.StudentMinOrderByAggregateInput;
};
export type StudentScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudentScalarWhereWithAggregatesInput | Prisma.StudentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Student"> | string;
    admissionNo?: Prisma.StringWithAggregatesFilter<"Student"> | string;
    grade?: Prisma.StringNullableWithAggregatesFilter<"Student"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Student"> | string;
    schoolId?: Prisma.StringWithAggregatesFilter<"Student"> | string;
    parentId?: Prisma.StringNullableWithAggregatesFilter<"Student"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Student"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Student"> | Date | string;
};
export type StudentCreateInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    school: Prisma.SchoolCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
};
export type StudentUncheckedCreateInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    schoolId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    school?: Prisma.SchoolUpdateOneRequiredWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
};
export type StudentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentCreateManyInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    schoolId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentNullableScalarRelationFilter = {
    is?: Prisma.StudentWhereInput | null;
    isNot?: Prisma.StudentWhereInput | null;
};
export type StudentListRelationFilter = {
    every?: Prisma.StudentWhereInput;
    some?: Prisma.StudentWhereInput;
    none?: Prisma.StudentWhereInput;
};
export type StudentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudentSchoolIdAdmissionNoCompoundUniqueInput = {
    schoolId: string;
    admissionNo: string;
};
export type StudentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    admissionNo?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    schoolId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    admissionNo?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    schoolId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    admissionNo?: Prisma.SortOrder;
    grade?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    schoolId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StudentCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    connect?: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentUpsertWithoutUserInput;
    disconnect?: Prisma.StudentWhereInput | boolean;
    delete?: Prisma.StudentWhereInput | boolean;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StudentUpsertWithoutUserInput;
    disconnect?: Prisma.StudentWhereInput | boolean;
    delete?: Prisma.StudentWhereInput | boolean;
    connect?: Prisma.StudentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StudentUpdateToOneWithWhereWithoutUserInput, Prisma.StudentUpdateWithoutUserInput>, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentCreateNestedManyWithoutSchoolInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput> | Prisma.StudentCreateWithoutSchoolInput[] | Prisma.StudentUncheckedCreateWithoutSchoolInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSchoolInput | Prisma.StudentCreateOrConnectWithoutSchoolInput[];
    createMany?: Prisma.StudentCreateManySchoolInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput> | Prisma.StudentCreateWithoutSchoolInput[] | Prisma.StudentUncheckedCreateWithoutSchoolInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSchoolInput | Prisma.StudentCreateOrConnectWithoutSchoolInput[];
    createMany?: Prisma.StudentCreateManySchoolInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUpdateManyWithoutSchoolNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput> | Prisma.StudentCreateWithoutSchoolInput[] | Prisma.StudentUncheckedCreateWithoutSchoolInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSchoolInput | Prisma.StudentCreateOrConnectWithoutSchoolInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutSchoolInput | Prisma.StudentUpsertWithWhereUniqueWithoutSchoolInput[];
    createMany?: Prisma.StudentCreateManySchoolInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutSchoolInput | Prisma.StudentUpdateWithWhereUniqueWithoutSchoolInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutSchoolInput | Prisma.StudentUpdateManyWithWhereWithoutSchoolInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput> | Prisma.StudentCreateWithoutSchoolInput[] | Prisma.StudentUncheckedCreateWithoutSchoolInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutSchoolInput | Prisma.StudentCreateOrConnectWithoutSchoolInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutSchoolInput | Prisma.StudentUpsertWithWhereUniqueWithoutSchoolInput[];
    createMany?: Prisma.StudentCreateManySchoolInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutSchoolInput | Prisma.StudentUpdateWithWhereUniqueWithoutSchoolInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutSchoolInput | Prisma.StudentUpdateManyWithWhereWithoutSchoolInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type StudentCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
};
export type StudentUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutParentInput | Prisma.StudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutParentInput | Prisma.StudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutParentInput | Prisma.StudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput> | Prisma.StudentCreateWithoutParentInput[] | Prisma.StudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.StudentCreateOrConnectWithoutParentInput | Prisma.StudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.StudentUpsertWithWhereUniqueWithoutParentInput | Prisma.StudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.StudentCreateManyParentInputEnvelope;
    set?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    disconnect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    delete?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    connect?: Prisma.StudentWhereUniqueInput | Prisma.StudentWhereUniqueInput[];
    update?: Prisma.StudentUpdateWithWhereUniqueWithoutParentInput | Prisma.StudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.StudentUpdateManyWithWhereWithoutParentInput | Prisma.StudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
};
export type StudentCreateWithoutUserInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    school: Prisma.SchoolCreateNestedOneWithoutStudentsInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
};
export type StudentUncheckedCreateWithoutUserInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    schoolId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentCreateOrConnectWithoutUserInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
};
export type StudentUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutUserInput, Prisma.StudentUncheckedCreateWithoutUserInput>;
    where?: Prisma.StudentWhereInput;
};
export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StudentWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutUserInput, Prisma.StudentUncheckedUpdateWithoutUserInput>;
};
export type StudentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    school?: Prisma.SchoolUpdateOneRequiredWithoutStudentsNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
};
export type StudentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    schoolId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentCreateWithoutSchoolInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    parent?: Prisma.ParentCreateNestedOneWithoutStudentsInput;
};
export type StudentUncheckedCreateWithoutSchoolInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentCreateOrConnectWithoutSchoolInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput>;
};
export type StudentCreateManySchoolInputEnvelope = {
    data: Prisma.StudentCreateManySchoolInput | Prisma.StudentCreateManySchoolInput[];
    skipDuplicates?: boolean;
};
export type StudentUpsertWithWhereUniqueWithoutSchoolInput = {
    where: Prisma.StudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentUpdateWithoutSchoolInput, Prisma.StudentUncheckedUpdateWithoutSchoolInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutSchoolInput, Prisma.StudentUncheckedCreateWithoutSchoolInput>;
};
export type StudentUpdateWithWhereUniqueWithoutSchoolInput = {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutSchoolInput, Prisma.StudentUncheckedUpdateWithoutSchoolInput>;
};
export type StudentUpdateManyWithWhereWithoutSchoolInput = {
    where: Prisma.StudentScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutSchoolInput>;
};
export type StudentScalarWhereInput = {
    AND?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
    OR?: Prisma.StudentScalarWhereInput[];
    NOT?: Prisma.StudentScalarWhereInput | Prisma.StudentScalarWhereInput[];
    id?: Prisma.StringFilter<"Student"> | string;
    admissionNo?: Prisma.StringFilter<"Student"> | string;
    grade?: Prisma.StringNullableFilter<"Student"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Student"> | Date | string | null;
    userId?: Prisma.StringFilter<"Student"> | string;
    schoolId?: Prisma.StringFilter<"Student"> | string;
    parentId?: Prisma.StringNullableFilter<"Student"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Student"> | Date | string;
};
export type StudentCreateWithoutParentInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutStudentInput;
    school: Prisma.SchoolCreateNestedOneWithoutStudentsInput;
};
export type StudentUncheckedCreateWithoutParentInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    schoolId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentCreateOrConnectWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput>;
};
export type StudentCreateManyParentInputEnvelope = {
    data: Prisma.StudentCreateManyParentInput | Prisma.StudentCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type StudentUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentUpdateWithoutParentInput, Prisma.StudentUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.StudentCreateWithoutParentInput, Prisma.StudentUncheckedCreateWithoutParentInput>;
};
export type StudentUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.StudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentUpdateWithoutParentInput, Prisma.StudentUncheckedUpdateWithoutParentInput>;
};
export type StudentUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.StudentScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyWithoutParentInput>;
};
export type StudentCreateManySchoolInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentUpdateWithoutSchoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    parent?: Prisma.ParentUpdateOneWithoutStudentsNestedInput;
};
export type StudentUncheckedUpdateWithoutSchoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentUncheckedUpdateManyWithoutSchoolInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentCreateManyParentInput = {
    id?: string;
    admissionNo: string;
    grade?: string | null;
    dateOfBirth?: Date | string | null;
    userId: string;
    schoolId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StudentUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutStudentNestedInput;
    school?: Prisma.SchoolUpdateOneRequiredWithoutStudentsNestedInput;
};
export type StudentUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    admissionNo?: Prisma.StringFieldUpdateOperationsInput | string;
    grade?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    schoolId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StudentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    admissionNo?: boolean;
    grade?: boolean;
    dateOfBirth?: boolean;
    userId?: boolean;
    schoolId?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    admissionNo?: boolean;
    grade?: boolean;
    dateOfBirth?: boolean;
    userId?: boolean;
    schoolId?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    admissionNo?: boolean;
    grade?: boolean;
    dateOfBirth?: boolean;
    userId?: boolean;
    schoolId?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
}, ExtArgs["result"]["student"]>;
export type StudentSelectScalar = {
    id?: boolean;
    admissionNo?: boolean;
    grade?: boolean;
    dateOfBirth?: boolean;
    userId?: boolean;
    schoolId?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StudentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "admissionNo" | "grade" | "dateOfBirth" | "userId" | "schoolId" | "parentId" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>;
export type StudentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
};
export type StudentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
};
export type StudentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    school?: boolean | Prisma.SchoolDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.Student$parentArgs<ExtArgs>;
};
export type $StudentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Student";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        school: Prisma.$SchoolPayload<ExtArgs>;
        parent: Prisma.$ParentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        admissionNo: string;
        grade: string | null;
        dateOfBirth: Date | null;
        userId: string;
        schoolId: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["student"]>;
    composites: {};
};
export type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudentPayload, S>;
export type StudentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudentCountAggregateInputType | true;
};
export interface StudentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Student'];
        meta: {
            name: 'Student';
        };
    };
    findUnique<T extends StudentFindUniqueArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StudentFindFirstArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StudentFindManyArgs>(args?: Prisma.SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StudentCreateArgs>(args: Prisma.SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StudentCreateManyArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StudentDeleteArgs>(args: Prisma.SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StudentUpdateArgs>(args: Prisma.SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StudentDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StudentUpdateManyArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StudentUpsertArgs>(args: Prisma.SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma.Prisma__StudentClient<runtime.Types.Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StudentCountArgs>(args?: Prisma.Subset<T, StudentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudentCountAggregateOutputType> : number>;
    aggregate<T extends StudentAggregateArgs>(args: Prisma.Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>;
    groupBy<T extends StudentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudentGroupByArgs['orderBy'];
    } : {
        orderBy?: StudentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StudentFieldRefs;
}
export interface Prisma__StudentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    school<T extends Prisma.SchoolDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SchoolDefaultArgs<ExtArgs>>): Prisma.Prisma__SchoolClient<runtime.Types.Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parent<T extends Prisma.Student$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Student$parentArgs<ExtArgs>>): Prisma.Prisma__ParentClient<runtime.Types.Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StudentFieldRefs {
    readonly id: Prisma.FieldRef<"Student", 'String'>;
    readonly admissionNo: Prisma.FieldRef<"Student", 'String'>;
    readonly grade: Prisma.FieldRef<"Student", 'String'>;
    readonly dateOfBirth: Prisma.FieldRef<"Student", 'DateTime'>;
    readonly userId: Prisma.FieldRef<"Student", 'String'>;
    readonly schoolId: Prisma.FieldRef<"Student", 'String'>;
    readonly parentId: Prisma.FieldRef<"Student", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Student", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Student", 'DateTime'>;
}
export type StudentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where: Prisma.StudentWhereUniqueInput;
};
export type StudentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where: Prisma.StudentWhereUniqueInput;
};
export type StudentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    cursor?: Prisma.StudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
export type StudentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    cursor?: Prisma.StudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
export type StudentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where?: Prisma.StudentWhereInput;
    orderBy?: Prisma.StudentOrderByWithRelationInput | Prisma.StudentOrderByWithRelationInput[];
    cursor?: Prisma.StudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentScalarFieldEnum | Prisma.StudentScalarFieldEnum[];
};
export type StudentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>;
};
export type StudentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StudentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    data: Prisma.StudentCreateManyInput | Prisma.StudentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StudentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StudentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>;
    where: Prisma.StudentWhereUniqueInput;
};
export type StudentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>;
    where?: Prisma.StudentWhereInput;
    limit?: number;
};
export type StudentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentUpdateManyMutationInput, Prisma.StudentUncheckedUpdateManyInput>;
    where?: Prisma.StudentWhereInput;
    limit?: number;
    include?: Prisma.StudentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StudentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where: Prisma.StudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentCreateInput, Prisma.StudentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StudentUpdateInput, Prisma.StudentUncheckedUpdateInput>;
};
export type StudentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
    where: Prisma.StudentWhereUniqueInput;
};
export type StudentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentWhereInput;
    limit?: number;
};
export type Student$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentSelect<ExtArgs> | null;
    omit?: Prisma.ParentOmit<ExtArgs> | null;
    include?: Prisma.ParentInclude<ExtArgs> | null;
    where?: Prisma.ParentWhereInput;
};
export type StudentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentSelect<ExtArgs> | null;
    omit?: Prisma.StudentOmit<ExtArgs> | null;
    include?: Prisma.StudentInclude<ExtArgs> | null;
};
