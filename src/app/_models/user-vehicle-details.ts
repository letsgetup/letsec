export class UserVehicleDetails {
    vehicleType: string;
    rtoRegistrationNo?: string;
    state?: string;
    city?: string;
    rtoCode?: string;
    vehicleMenufacturer?: string;
    vehicleModel?: string;
    vehicleVariant?: string;
    fuelType?: string;
    year?: string;
    user: UserDetails;
}

export class UserDetails {
    name?: string;
    email?: string;
    contactNo?: string;
}