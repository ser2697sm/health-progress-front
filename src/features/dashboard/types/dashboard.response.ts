export interface DashboardResponse {
    profile: Profile;
    generalData: GeneralDatum[];
}

export interface GeneralDatum {
    weight: number;
    height: number;
    gender: string;
    imc: number;
    age: number;
    recordedAt: Date;
}

export interface Profile {
    firstName: string;
    lastName: string;
    secondName: string;
    email: string;
    role: string;
}
