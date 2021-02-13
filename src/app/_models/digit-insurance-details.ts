export interface DigitInsuranceDetails {
    enquiryId:           string;
    contract:            Contract;
    vehicle:             Vehicle;
    previousInsurer:     PreviousInsurer;
    pospInfo:            PospInfo;
    motorTransits:       any[];
    pincode:             string;
    netPremium:          string;
    grossPremium:        string;
    discounts:           Discounts;
    loadings:            Loadings;
    serviceTax:          ServiceTax;
    cesses:              any[];
    informationMessages: any[];
    error:               Error;
    motorBreakIn:        MotorBreakIn;
}

export interface Contract {
    insuranceProductCode:    string;
    subInsuranceProductCode: string;
    startDate:               Date;
    endDate:                 Date;
    policyHolderType:        string;
    quotationDate:           Date;
    coverages:               Coverages;
}

export interface Coverages {
    thirdPartyLiability:           ThirdPartyLiability;
    ownDamage:                     OwnDamage;
    fire:                          Fire;
    theft:                         Fire;
    personalAccident:              PersonalAccident;
    accessories:                   Accessories;
    addons:                        Addons;
    legalLiability:                LegalLiability;
    unnamedPA:                     UnnamedPA;
    isGeoExt:                      boolean;
    isTheftAndConversionRiskIMT43: boolean;
    isIMT23:                       boolean;
    isOverturningExclusionIMT47:   boolean;
}

export interface Accessories {
    cng:           CNG;
    electrical:    CNG;
    nonElectrical: CNG;
}

export interface CNG {
    selection:     boolean;
    insuredAmount: number;
    minAllowed:    number;
    maxAllowed:    number;
}

export interface Addons {
    partsDepreciation:  PersonalAccident;
    roadSideAssistance: PersonalAccident;
    engineProtection:   PersonalAccident;
    tyreProtection:     PersonalAccident;
    rimProtection:      PersonalAccident;
    returnToInvoice:    PersonalAccident;
    consumables:        PersonalAccident;
}

export interface PersonalAccident {
    selection:         boolean;
    coverAvailability: string;
    netPremium:        string;
    claimsCovered?:    string;
    coverTerm?:        number;
}

export interface Fire {
}

export interface LegalLiability {
    paidDriverLL:          Ll;
    employeesLL:           Ll;
    unnamedPaxLL:          Ll;
    cleanersLL:            Fire;
    nonFarePaxLL:          Fire;
    workersCompensationLL: Fire;
}

export interface Ll {
    selection:    boolean;
    netPremium:   string;
    insuredCount: number;
}

export interface OwnDamage {
    discount:                  OwnDamageDiscount;
    surcharge:                 Surcharge;
    netPremium:                string;
    traiffPremium:             string;
    withZeroDepNetPremium:     string;
    ncbDiscountWithZeroDep:    string;
    withoutZeroDepNetPremium:  string;
    ncbDiscountWithoutZeroDep: string;
}

export interface OwnDamageDiscount {
    userSpecialDiscountPercent:      number;
    defaultSpecialDiscountPercent:   number;
    effectiveSpecialDiscountPercent: number;
    minSpecialDiscountPercent:       number;
    maxSpecialDiscountPercent:       number;
    discounts:                       DiscountElement[];
}

export interface DiscountElement {
    discountType:    string;
    discountPercent: number;
    discountAmount:  string;
}

export interface Surcharge {
    loadings: any[];
}

export interface ThirdPartyLiability {
    netPremium: string;
    isTPPD:     boolean;
}

export interface UnnamedPA {
    unnamedPax:          UnnamedPa;
    unnamedPaidDriver:   UnnamedPa;
    unnamedHirer:        Fire;
    unnamedPillionRider: Fire;
    unnamedCleaner:      Fire;
    unnamedConductor:    Fire;
}

export interface UnnamedPa {
    selection:     boolean;
    insuredAmount: number;
    netPremium:    string;
}

export interface Discounts {
    specialDiscountAmount: string;
    otherDiscounts:        any[];
}

export interface Error {
    errorCode:          number;
    httpCode:           number;
    validationMessages: any[];
    errorLink:          null;
    errorStackTrace:    null;
}

export interface Loadings {
    totalLoadingAmount: string;
    otherLoadings:      any[];
}

export interface MotorBreakIn {
    isBreakin:                boolean;
    isPreInspectionWaived:    boolean;
    isPreInspectionCompleted: boolean;
}

export interface PospInfo {
    isPOSP: boolean;
}

export interface PreviousInsurer {
    isPreviousInsurerKnown:   boolean;
    previousPolicyExpiryDate: Date;
    previousNoClaimBonus:     string;
}

export interface ServiceTax {
    cgst:     string;
    sgst:     string;
    igst:     string;
    utgst:    string;
    totalTax: string;
    taxType:  string;
}

export interface Vehicle {
    isVehicleNew:       boolean;
    vehicleMaincode:    string;
    licensePlateNumber: string;
    manufactureDate:    Date;
    registrationDate:   Date;
    vehicleIDV:         VehicleIDV;
    trailers:           any[];
    make:               string;
    model:              string;
}

export interface VehicleIDV {
    idv:        number;
    defaultIdv: number;
    minimumIdv: number;
    maximumIdv: number;
}
