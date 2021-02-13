export interface VehicleDetails {
    enquiryId: string;
    make: string;
    vehiclemodel: string;
    variant: string;
    fueltype: string;
    insuranceProductCode: string;
    subInsuranceProductCode: string;
    policyHolderType: string;
    isVehicleNew: boolean;
    licensePlateNumber: string;
    manufactureDate: string;
    registrationDate: string;
    vehicleIDV?: null;
    permitType?: null;
    motorType?: null;
    isPreviousInsurerKnown: boolean;
    previousPolicyExpiryDate?: null;
    isClaimInLastYear: boolean;
    originalPreviousPolicyType?: null;
    previousPolicyType?: null;
    previousNoClaimBonus?: null;
    currentThirdPartyPolicy?: null;
    pincode: string;
    isTPPD: boolean;

}