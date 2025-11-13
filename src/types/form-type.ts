export interface FormErrors {
    [key: string]: string | undefined;
}


export enum AddDealRoutes {
    INFORMATIONS_REPONDANT = "/form/01",
    NIVEAU_AUTOMATISATION = "/form/02",
    EFFETS_AUTOMATISATION = "/form/03",
    LIMITES_AUTOMATISATION = "/form/04",
    RECOMMENDATIONS_AUTOMATISATION = "/form/05",
}