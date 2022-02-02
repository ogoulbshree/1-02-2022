export class FieldDetail {
    field_id: string;
    component_id: string;
    /* field_language: string; */
    field_name: string;
    /* field_value: string; */
    // selected_language_value: string;//the value of this field would be fieldDetail.ar or fieldDetail .en etc. based on which language is selected
    field_details: string;
    is_required: boolean = false;
    ar: string;//arabic
    en: string;//english
    fr: string;//french
    ja: string;//japanese
    ko: string;//korean
    ru: string;//russian
    es: string;// spanish 
    tr: string;//  turkish
    zh:string;// chinese 
}
