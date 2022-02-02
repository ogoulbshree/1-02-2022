import { FieldDetail } from 'src/app/models/utils/FieldDetail.model';

import { Injector, OnInit, Component } from '@angular/core';

import { CustomLogger } from './CustomLogger';
import { DBService } from 'src/app/services/dbservice.service';
import { GlobalConstants } from './GlobalConstants';
import { LandingPage } from './Landingpage.model';

export class DynamicComponent {

    isUpdate: boolean = true;


/*landing page*/

nav_home:string="";
products:string="";
login:string="";
features:string="";
service:string="";
aboutus: string="";
pricing:string="";



home_headding: string="";

	/*website navbar*/
    website_home:string="";
    products_marketing:string="";
    products_service :string="";
    products_sales:string="";
    website_about_us:string="";
    website_resources:string="";
    website_support:string="";
    website_fetures:string="";
    website_pricing:string="";
    website_service: string="";
    website_survey : string="";
    website_products: string="";
    /*website home page*/
    top_home_headding: string="";
    top_home_subheadding: string="";
    top_home_30days_trial: string="";
    top_home_request_demo: string="";
    home_crm_benefits: string="";
    home_single_repository: string="";
    home_single_repository_subheadding : string="";
    home_activity_management_subheadding: string="";
    home_obtain_useful_subheadding: string="";
    home_obtain_useful: string="";
    home_activity_management: string="";
    home_learn_more: string="";
    home_improve_your_productivity: string="";
    home_explore_all_our_solution: string="";
    home_solution_small_bussiness: string="";
    home_solution_marketing: string="";
    home_solution_sales: string="";
    home_solution_service: string="";
    home_contact_qatar: string="";
    home_contact_india: string="";
    home_contact_us: string="";
    home_contact_us_call: string="";
    home_contact_us_mon_friday: string="";
    home_contact_us_email: string="";
    home_contact_us_web: string="";
    home_contact_us_location: string="";
    home_contact_us_sendmsg: string="";
    all_right_reserved: string="";
    organisation_enroll_form: string="";
    organisation_name: string="";
    organisation_first_name: string="";
    organisation_password: string="";
    organisation_currency: string="";
    organisation_email: string="";
    organisation_last_name: string="";
    organisation_phone: string="";
    create_account: string="";
    /*website marketing*/
    marketing_hedding: string="";
    marketing_subhedding: string="";
    marketing_freetrial: string="";
    marketing_crm_benefits: string="";
    marketing_request_demo: string="";
    marketing_single_repository: string="";
    marketing_obtain_useful: string="";
    website_activity_management: string="";
    marketing_single_repository_subheadding: string="";
    marketing_obtain_useful_subheadding: string="";
    website_activity_management_subheadding: string="";
    /*website sales*/
    sales_hedding: string="";
    sales_subhedding: string="";
    sales_freetrial: string="";
    sales_explore_ogoul_crm: string="";
    sales_increases_efficiency: string="";
    sales_real_time_update_on_sales : string="";
    sales_deals_by_capturing_leads : string="";
    sales_request_demo: string="";
    sales_increases_efficiency_subheadding: string="";
    sales_real_time_update_on_sales_subheadding : string="";
    sales_deals_by_capturing_leads_subheadding: string="";
    /*website service*/
    service_hedding: string="";
    service_subhedding: string="";
    service_freetrial: string="";
    service_explore_ogoul_crm: string="";
    service_automated_lead: string="";
    service_enhance_customer_engagement: string="";
    service_launch_campaigns: string="";
    service_request_demo: string="";
    service_automated_lead_subheadding: string="";
    service_enhance_customer_engagement_subheadding : string="";
    service_launch_campaigns_subheadding: string="";
    /*website aboutus*/
    aboutus_hedding: string="";
    aboutus_subhedding: string="";
    aboutus_freetrial: string="";
    aboutus_crm_benefits: string="";
    aboutus_single_repository: string="";
    aboutus_obtain_useful: string="";
    aboutus_activity_management: string="";
    aboutus_request_demo: string="";
    aboutus_single_repository_subheadding: string="";
    aboutus_obtain_useful_subheadding : string="";
    aboutus_activity_management_subheadding: string="";
    /*website resources*/
    /*website features*/
    ogoul_features_hedding: string="";
    ogoul_features_one: string="";
    ogoul_features_two: string="";
    ogoul_features_three: string="";
    ogoul_features_four: string="";
    ogoul_features_five: string="";
    ogoul_features_six: string="";
    ogoul_features_seven:string="";
    ogoul_features_one_subheadding: string="";
    ogoul_features_two_subheadding: string="";
    ogoul_features_three_subheadding: string="";
    ogoul_features_four_subheadding: string="";
    ogoul_features_five_subheadding: string="";
    ogoul_features_six_subheadding: string="";
    ogoul_features_seven_subheadding:string="";
    /*website support*/
    support_hedding: string="";
    resources_faq: string="";
    /*website services*/
    ogoul_services_hedding: string="";
    ogoul_services_one: string="";
    ogoul_services_two: string="";
    ogoul_services_three: string="";
    ogoul_services_four: string="";
    ogoul_services_five: string="";
    ogoul_services_six: string="";
    ogoul_services_seven: string="";
    ogoul_services_one_subheadding: string="";
    ogoul_services_two_subheadding: string="";
    ogoul_services_three_subheadding: string="";
    ogoul_services_four_subheadding: string="";
    ogoul_services_five_subheadding: string="";
    ogoul_services_six_subheadding: string="";
    ogoul_services_seven_subheadding: string="";





    /*navigationbar*/
    sales_dashboard: string ="";
    sales_customer: string ="";
    sales_leads: string ="";
    sales_quotation: string ="";
    sales_deals: string ="";
    sales_addvisits: string ="";
    sales_schedulevisits: string ="";
    sales_settings:string ="";
    sales_products:string= "";

    service_dashboard : string ="";
    service_customer : string ="";
    service_cases : string ="";
    service_faq : string ="";
    service_settings: string ="";

    marketing_dashboard: string ="";
    marketing_customer: string ="";
    marketing_contacts: string="";
    marketing_leads: string ="";
    marketing_activity: string="";
    marketing_campaigns: string ="";
    marketing_settings: string="";



    /*-Userdetails Marketing--*/
    field_name_adduser:string ="";
    field_name_updateuser:string =" "
    field_name_username: string= "";
    field_name_usertype: string = "";
    field_name_password: string = "";
    field_name_email: string = "";
    field_name_salutation: string = "";
    field_name_first_name: string = " ";
    field_name_last_name: string =" ";
    field_name_phone: string ="";
    field_name_dob: string =""
    field_name_created_by: string = "  ";
    field_name_created_time: string = "";
    field_name_updated_by: string = "";
    field_name_updated_time :string = "";
    field_name_todate: string ="";
    field_name_fromdate:string ="";
    field_name_addusersdetail:string ="";
    field_name_actions:string= "";
    field_name_search:string="";
    field_name_csv:string="";
    field_name_pdf:string="";
    field_name_excel:string="";
    field_name_import:string="";
    field_name_print : string = "";
    field_name_btnuploadcsv :string ="";
    field_name_upload_csv :string="";
    field_name_please_upload_csv: string ="";
    field_name_upload_files  :string ="";




    field_username_required: boolean = false;
    field_password_required: boolean = false;
    field_email_required: boolean = false;
    field_salutation_required: boolean = false;
    field_first_name_required: boolean = false;
    field_usertype_required: boolean = false;
    field_last_name_required: boolean = false;

/* Marketing Dasbboard*/
field_name_marketing_dashboard : string = "";
field_name_marketing_contacts : string = "";
field_name_marketing_customers : string = "";
field_name_marketing_campaigns : string = "";
field_name_marketing_leads : string = "";
field_name_marketing_activities : string = "";
field_name_marketing_users : string = "";
field_name_marketing_fromdate : string = "";
field_name_marketing_todate : string = "";



/* service Dasbboard*/
field_name_service_dashboard : string = "";
field_name_service_cases : string = "";
field_name_service_customers : string = "";
field_name_service_faq : string = "";
field_name_service_Users: string = "";
field_name_service_fromdate : string = "";
field_name_service_todate : string = "";


/* sales Dasbboard*/

field_name_sales_deals : string = "";
field_name_sales_customers : string = "";
field_name_sales_products : string = "";
field_name_sales_users: string = "";
field_name_sales_quotes: string = "";
field_name_sales_leads: string = "";
field_name_sales_visits: string = "";
field_name_sales_Shedule_visits: string = "";
field_name_sales_fromdate : string = "";
field_name_sales_todate : string = "";
field_name_quotes_quotation_id : string = "";
field_name_products_table: string = "";
field_name_invoice_table: string = "";
field_name_return_table: string = "";
field_name_purchases_table: string = "";
field_name_supplier_table: string = "";
field_name_quotes_table : string = "";
field_name_users_table : string = "";
field_name_faq_table: string = "";
field_name_ticketing_table: string = "";
field_name_leads_table : string = "";
field_name_schedule_table: string = "";
field_name_visits_table : string = "";




field_name_inventory_customers : string = "";
field_name_inventory_stock_products : string = "";
field_name_inventory_users: string = "";
field_name_inventory_suppliers: string = "";
field_name_inventory_purchase: string = "";
field_name_inventory_returns: string = "";
field_name_inventory_expenses: string = "";
field_name_inventory_invoices: string = "";
field_name_inventory_fromdate: string="";
field_name_inventory_todate:string="";

/* marketing Contacts*/
                field_name_marketing_salutation: string =""
                field_name_marketing_first_name :string =""
                field_name_marketing_last_name : string =""
                field_name_marketing_phone :string =""
                field_name_marketing_email :string =""
                field_name_marketing_home_phone :string =""
                 field_name_marketing_account_number :string =""
                 field_name_marketing_title : string =""
                field_name_marketing_department : string= ""
                field_name_marketing_Fax : string =""
                field_name_marketing_DOB: string ="";
                 field_name_marketing_source :string ="";
                 field_name_marketing_mailing_address : string =""
                 field_name_marketing_other_address :string =""
                 field_name_marketing_mailing_city : string =""
                field_name_marketing_mailing_state : string =""
                 field_name_marketing_mailing_Postal_code : string =""
                field_name_marketing_mailing_country :string ="";
                field_name_marketing_description : string ="";
                field_name_marketing_type_of_contacts: string= "" ;
                field_name_marketing_files : string ="";
              
                field_name_marketing_addcontacts : string ="";
                field_name_marketing_actions : string ="";
                field_name_marketing_search : string ="";
                 field_name_marketing_csv : string ="";
                field_name_marketing_pdf : string ="";
                field_name_marketing_excel : string ="";
                field_name_marketing_import : string ="";
                field_name_marketing_print : string ="";
                field_name_marketing_created_by: string = "  ";
                 field_name_marketing_created_time: string = "";
                 field_name_marketing_updated_by: string = "";
                 field_name_marketing_updated_time :string = "";
                 field_name_marketing_contactdetails : string ="";
                 field_name_marketing_add : string = "";
                 field_name_marketing_update : string = "";
                 field_name_marketing_contact_info : string ="" 
                 field_name_marketing_address_info : string ="" 
                 field_name_marketing_other_info : string ="" 
                 field_name_marketing_activity_info : string ="" 
                 field_name_marketing_convert_to_lead : string ="" 
                 field_name_marketing_activity_type: string =""
                 field_name_marketing_subject: string =""
                 field_name_marketing_due_date: string = "";
                 field_name_marketing_activity_actions: string =""
                 field_name_marketing_btnuploadCsv: string=""
                field_name_marketing_opportunity_percentage :string =""
                field_name_marketing_company_name :string =""
                field_name_marketing_linked_in_url :string =""
                field_name_marketing_upload_Csv :string =""
                field_name_marketing_upload_Csvfile :string =""
                field_name_marketing_pleaseupload_Csvfile :string =""

/*Marketing Leads */   

field_name_leads_salutation: string =""
field_name_leads_first_name :string =""
field_name_leads_last_name : string =""
field_name_leads_phone :string =""
field_name_leads_email :string =""
field_name_leads_home_phone :string =""
 field_name_leads_account_number :string =""
 field_name_leads_title : string =""
field_name_leads_department : string= ""
field_name_leads_Fax : string =""
field_name_leads_DOB: string ="";
 field_name_leads_source :string ="";
 field_name_leads_mailing_address : string =""
 field_name_leads_other_address :string =""
 field_name_leads_mailing_city : string =""
field_name_leads_mailing_state : string =""
 field_name_leads_mailing_Postal_code : string =""
field_name_leads_mailing_country :string ="";
field_name_leads_description : string ="";

field_name_leads_files : string ="";
field_name_leads_todate : string ="";
field_name_leads_fromdate : string ="";
field_name_leads_addleads : string ="";
field_name_leads_actions : string ="";
field_name_leads_search : string ="";
 field_name_leads_csv : string ="";
field_name_leads_pdf : string ="";
field_name_leads_excel : string ="";
field_name_leads_import : string ="";
field_name_leads_print : string ="";
field_name_leads_created_by: string = "  ";
 field_name_leads_created_time: string = "";
 field_name_leads_updated_by: string = "";
 field_name_leads_updated_time :string = "";
 field_name_leads_leaddetails : string ="";
 field_name_leads_add : string = "";
 field_name_leads_update : string = "";
 field_name_leads_contact_info : string ="" 
 field_name_leads_address_info : string ="" 
 field_name_leads_other_info : string ="" 
 field_name_leads_activity_info : string ="" 
 field_name_marketing_convert_to_customer : string ="" 
 field_name_leads_activity_type: string =""
 field_name_leads_subject: string =""
 field_name_leads_due_date: string = "";
 field_name_leads_activity_actions: string =""
 field_name_leads_notes_attachments: string ="" 
 field_name_leads_btnuploadCsv :string= "";
 field_name_leads_opportunity_percentage: string="";
 field_name_leads_upload_Csv : string ="";
 field_name_leads_upload_Csvfile : string ="";
 field_name_leads_pleaseupload_Csvfile : string ="";
 field_name_leads_company_name:string ="";
 field_name_leads_linked_in_url:string ="";

/*Service ticketing */




field_name_service_ticketing_escalation_to_email: string ="";
field_name_service_ticketing_comments: string ="";
field_name_service_ticketing_add_escalation: string ="";
field_name_service_ticketing_add_btn_escalation: string ="";
field_name_service_ticketing_file_upload: string ="";
field_name_service_ticketing_description: string ="";
field_name_service_ticketing_subject: string ="";
field_name_service_ticketing_name: string ="";
field_name_service_ticketing_email:string ="";
field_name_service_ticketing_Assigned_Users: string ="";
field_name_service_ticketing_Escalation: string ="";
field_name_service_ticketing_update: string ="";
field_name_service_ticketing_created_by: string ="";
field_name_service_ticketing_created_time: string ="";
field_name_service_ticketing_updated_by: string ="";
field_name_service_ticketing_updated_time : string ="";
field_name_service_ticketing_todate : string ="";
field_name_service_ticketing_fromdate : string ="";
field_name_service_ticketing_add_ticketing : string ="";
field_name_service_ticketing_actions : string ="";
field_name_service_ticketing_search : string ="";
field_name_service_ticketing_csv : string ="";
field_name_service_ticketing_pdf : string ="";
field_name_service_ticketing_excel : string ="";
field_name_service_ticketing_import : string ="";
field_name_service_ticketing_print : string ="";
field_name_service_ticketing_details : string ="";
field_name_service_ticketing_service_info : string ="";
field_name_service_ticketing_status  : string ="";
field_name_service_ticketing_Closed : string ="";
field_name_service_ticketing_On_Hold : string ="";
field_name_service_ticketing_Created  : string ="";
field_name_service_ticketing_In_Progress  : string ="";

/*Marketing customers */   

field_name_customers_salutation: string =""
field_name_customers_first_name :string =""
field_name_customers_last_name : string =""
field_name_customers_phone :string =""
field_name_customers_email :string =""
field_name_customers_home_phone :string ="";
 field_name_customers_account_number :string ="";
 field_name_customers_title : string ="";
field_name_customers_department : string= "";
field_name_customers_Fax : string =""
field_name_customers_DOB: string ="";
 field_name_customers_source :string ="";
 field_name_customers_mailing_address : string ="";
 field_name_customers_other_address :string ="";
 field_name_customers_mailing_city : string ="";
field_name_customers_mailing_state : string ="";
 field_name_customers_mailing_Postal_code : string ="";
field_name_customers_mailing_country :string ="";
field_name_customers_description : string ="";

field_name_customers_files : string ="";
field_name_customers_todate : string ="";
field_name_customers_fromdate : string ="";
field_name_customers_addcustomers : string ="";
field_name_customers_actions : string ="";
field_name_customer_table : string= "";
field_name_activity_table: string ="";
field_name_campaign_table: string= "";
field_name_contact_table: string="";
field_name_deals_table: string ="";
field_name_customers_search : string ="";
 field_name_customers_csv : string ="";
field_name_customers_pdf : string ="";
field_name_customers_excel : string ="";
field_name_customers_import : string ="";
field_name_customers_print : string ="";
field_name_customers_created_by: string = "  ";
 field_name_customers_created_time: string = "";
 field_name_customers_updated_by: string = "";
 field_name_customers_updated_time :string = "";
 field_name_customers_customersdetails : string ="";
 field_name_customers_add : string = "";
 field_name_customers_update : string = "";
 field_name_customers_contact_info : string ="" 
 field_name_customers_address_info : string ="" 
 field_name_customers_other_info : string ="" 
 field_name_customers_activity_info : string ="" 
 field_name_customers_convert_to_leads : string ="" 
 field_name_customers_activity_type: string =""
 field_name_customers_subject: string =""
 field_name_customers_due_date: string = "";
 field_name_customers_activity_actions: string =""
 field_name_customers_notes_attachments: string =""
 field_name_customers_opportunity_percentage: string =""
 field_name_customers_btnuploadcsv :string ="";
 field_name_customers_upload_csv :string="";
 field_name_customers_please_upload_csv: string ="";

 field_name_customers_upload_files  :string ="";
 field_name_customers_upload_attachments:string =""
 field_name_customers_file:string ="";
 field_name_customers_file_title:string ="";
 field_name_customers_Id:string ="";
 field_name_customers_size:string ="";
 field_name_customers_file_name:string ="";
 field_name_customers_download:string ="";
 field_name_customers_company_name:string ="";
 field_name_customers_linked_in_url:string ="";
 


/*---campaign details */
field_name_campaign_info: string ="";
field_name_campaign_campaign_owner:string ="";
field_name_campaign_campaign_name:string ="";
field_name_campaign_active:string ="";
field_name_campaign_files:string ="";
field_name_campaign_type: string ="";
field_name_campaign_status:string ="";
field_name_campaign_start_date:string =""
field_name_campaign_end_date:string ="";
field_name_campaign_expected_revenue_in_campaign:string ="";
field_name_campaign_budgeted_cost_in_campaign:string ="";
field_name_campaign_actual_cost_in_campaign:string ="";
field_name_campaign_expected_response_percent:string ="";
field_name_campaign_description_info:string ="";
field_name_campaign_todate : string ="";
field_name_campaign_fromdate : string ="";
field_name_campaign_addcampaign : string ="";
field_name_campaign_actions : string ="";
field_name_campaign_search : string ="";
 field_name_campaign_csv : string ="";
field_name_campaign_pdf : string ="";
field_name_campaign_excel : string ="";
field_name_campaign_import : string ="";
field_name_campaign_print : string ="";
field_name_campaign_created_by: string = "  ";
 field_name_campaign_created_time: string = "";
 field_name_campaign_updated_by: string = "";
 field_name_campaign_updated_time :string = "";
 field_name_campaign_campaigndetails : string ="";
 field_name_campaign_add : string = "";
 field_name_campaign_update : string = "";
 field_name_campaign_activity_info : string ="" ;
 field_name_campaign_activity_type: string ="";
 field_name_campaign_subject: string ="";
 field_name_campaign_due_date: string = "";
 field_name_campaign_activity_actions: string ="";
 field_name_campaign_notes_attachments: string ="";
 field_name_campaign_btnuploadcsv: string ="";
field_name_campaign_upload_files : string ="";
field_name_campaign_upload_attachments : string ="";
field_name_campaign_upload_csv : string ="";
 field_name_campaign_please_upload_csv: string ="";
 field_name_campaign_file: string ="";
 field_name_campaign_file_title: string ="";
 field_name_campaign_Id: string ="";
 field_name_campaign_size: string ="";
 field_name_campaign_file_name: string ="";
 field_name_campaign_download : string ="";
 field_name_campaign_closed : string ="";
 field_name_campaign_on_hold : string ="";
 field_name_campaign_in_progress: string ="";
 field_name_campaign_created : string ="";
 

/*Marketing Activities*/
field_name_activities_subject: string ="";
field_name_activities_due_date: string ="";
field_name_activities_task_name: string ="";

field_name_activities_status: string ="";
field_name_activities_comments: string ="";
field_name_activities_call_dec: string ="";
field_name_activities_activity_type: string ="";
field_name_activities_selectedActivityType:string ="";
field_name_activities_record_type:string ="";
field_name_activities_add : string = "";
field_name_activities_created_by: string = " ";
field_name_activities_created_time: string = "";
field_name_activities_updated_by: string = "";
field_name_activities_updated_time :string = "";
field_name_activities_todate : string ="";
field_name_activities_fromdate : string ="";
field_name_activities_addactivity : string ="";
field_name_activities_actions : string ="";
field_name_activities_search : string ="";
field_name_activities_csv : string ="";
field_name_activities_pdf : string ="";
field_name_activities_excel : string ="";
field_name_activities_import : string ="";
field_name_activities_print : string ="";
field_name_activities_update : string ="";
field_name_activities_activities_details : string = "";
field_name_activities_end_date : string = "";


/*Marketing history*/
field_name_marketing_history_todate :string ="";
field_name_marketing_history_fromdate :string ="";
field_name_marketing_history_search :string ="";
field_name_marketing_history_email :string ="";
field_name_marketing_history_date :string ="";
field_name_marketing_history_action :string ="";
field_name_marketing_history_csv :string ="";

/*pRoducts details*/
field_name_product_name: string ="";
field_name_product_currency: string ="";
field_name_cost: string = "";
field_name_code:string="";
field_name_supplier_name: string;
field_name_category_name: string; 
field_name_weight:string = "";
field_name_stock:string = "";
field_name_availability:string = "";
field_name_files:string;
field_name_product_update:string=""
field_name_product_created_by: string = "  ";
field_name_product_created_time: string = "";
field_name_product_updated_by: string = "";
field_name_product_updated_time :string = "";
field_name_product_todate : string ="";
field_name_product_fromdate : string ="";
field_name_product_addproduct : string ="";
field_name_product_actions : string ="";
field_name_product_search : string ="";
field_name_product_csv : string ="";
field_name_product_pdf : string ="";
field_name_product_excel : string ="";
field_name_product_import : string ="";
field_name_product_print : string ="";
field_name_product_details : string ="";
field_name_product_productinfo : string ="";

field_name_product_uploadcsv : string ="";
field_product_name_required: boolean = false;
field_cost_required: boolean = false;
field_supplier_name_required: boolean = false;
field_category_name_required: boolean = false;
field_files_required: boolean = false;


/*Add visits*/
field_name_visits_phone:string="";
field_name_visits_last_name:string="";
field_name_visits_user_email:string="";
field_name_visits_notes:string="";
field_name_visits_address:string="";
field_name_visits_email:string="";
field_name_visits_customer_name:string="";
field_name_visits_update:string="";
field_name_visits_created_by: string = "  ";
field_name_visits_created_time: string = "";
field_name_visits_updated_by: string = "";
field_name_visits_updated_time :string = "";
field_name_visits_todate : string ="";
field_name_visits_fromdate : string ="";
field_name_visits_addvisits : string ="";
field_name_visits_actions : string ="";
field_name_visits_search : string ="";
field_name_visits_csv : string ="";
field_name_visits_pdf : string ="";
field_name_visits_excel : string ="";
field_name_visits_import : string ="";
field_name_visits_print : string ="";
field_name_visits_details : string ="";
field_name_visits_visitsinfo : string ="";
field_name_visits_Search_Visits  : string ="";
field_name_visits_Know_your_location  : string ="";
field_name_visits_company_name  : string="";
field_name_visits_department : string="";
field_name_visits_follow_update  : string="";



/*Shedule visits*/
field_name_shedule_visits_phone:string="";
field_name_shedule_visits_date:string="";
field_name_shedule_visits_time:string="";
field_name_shedule_visits_address:string="";
field_name_shedule_visits_salesemail:string="";
field_name_shedule_visits_customer_name:string="";
field_name_shedule_visits_update:string="";
field_name_shedule_visits_created_by: string = "  ";
field_name_shedule_visits_created_time: string = "";
field_name_shedule_visits_updated_by: string = "";
field_name_shedule_visits_updated_time :string = "";
field_name_shedule_visits_todate : string ="";
field_name_shedule_visits_fromdate : string ="";
field_name_shedule_visits_addshedule_visits : string ="";
field_name_shedule_visits_actions : string ="";
field_name_shedule_visits_search : string ="";
field_name_shedule_visits_csv : string ="";
field_name_shedule_visits_pdf : string ="";
field_name_shedule_visits_excel : string ="";
field_name_shedule_visits_import : string ="";
field_name_shedule_visits_print : string ="";
field_name_shedule_visits_details : string ="";
field_name_shedule_visitsinfo : string ="";
/*deals*/

field_name_deals_phone:string="";
field_name_deals_product_name:string="";
field_name_deals_close_date:string="";
field_name_deals_deal_name:string="";
field_name_deals_amount:string="";
field_name_deals_product_category:string="";
field_name_deals_product_rate:string="";
field_name_deals_product_total:string="";
field_name_deals_product_actual_rate:string="";
field_name_deals_product_quantity:string="";
field_name_deals_product_discount:string="";
field_name_deals_customer_name:string="";
field_name_deals_expected_date:string="";
field_name_deals_pipeline:string="";
field_name_deals_sales_stage:string="";
field_name_deals_assigned_to:string="";
field_name_deals_lead_source:string="";
field_name_deals_probability:string="";
field_name_deals_update:string="";
field_name_deals_created_by: string = "  ";
field_name_deals_created_time: string = "";
field_name_deals_updated_by: string = "";
field_name_deals_updated_time :string = "";
field_name_deals_todate : string ="";
field_name_deals_fromdate : string ="";
field_name_deals_adddeals : string ="";
field_name_deals_actions : string ="";
field_name_deals_search : string ="";
field_name_deals_csv : string ="";
field_name_deals_pdf : string ="";
field_name_deals_excel : string ="";
field_name_deals_import : string ="";
field_name_shedule_deals_print : string ="";
field_name_deals_details : string ="";
field_name_deals_dealsinfo : string ="";
field_name_deals_customer_info : string ="";
field_name_deals_status : string ="";
field_name_deals_Closed :string ="";
field_name_deals_On_Hold: string ="";
field_name_deals_Created: string ="";
field_name_deals_In_Progress:string =""

/*return*/
field_name_return_mobile:string="";
field_name_return_type:string="";
field_name_return_purchase_id:string="";
field_name_return_invoice_id:string="";
field_name_return_warehouse:string="";
field_name_return_supplier_name:string="";
field_name_return_customer_name:string="";
field_name_return_productname:string="";
field_name_return_date:string="";
field_name_return_product_category:string="";
field_name_return_product_rate:string="";
field_name_return_product_total:string="";
field_name_return_product_actual_rate:string="";
field_name_return_product_quantity:string="";
field_name_return_product_discount:string="";
field_name_return_update:string="";
field_name_return_created_by: string = "  ";
field_name_return_created_time: string = "";
field_name_return_updated_by: string = "";
field_name_return_updated_time :string = "";
field_name_return_todate : string ="";
field_name_return_fromdate : string ="";
field_name_return_addreturn : string ="";
field_name_return_actions : string ="";
field_name_return_search : string ="";
field_name_return_csv : string ="";
field_name_return_pdf : string ="";
field_name_return_excel : string ="";
field_name_return_import : string ="";
field_name_return_print : string ="";
field_name_return_details : string ="";
field_name_return_returninfo : string ="";
field_name_return_btnuploadcsv:string ="";
field_name_return_upload_csv :string ="";
field_name_return_upload_files:string ="";
field_name_return_please_upload_csv :string ="";
field_name_return_product_returned : string ="";
field_name_return_purchases_returned : string="";
field_name_return_purchases_amount: string="";
field_name_return_invoices_returned : string="";
field_name_return_invoices_amount: string="";
/* purchase*/

field_name_purchase_mobile:string="";
field_name_purchase_warehouse:string="";
field_name_purchase_supplier_name:string="";
field_name_purchase_productname:string="";
field_name_purchase_date:string="";
field_name_purchase_product_category:string="";
field_name_purchase_product_rate:string="";
field_name_purchase_product_total:string="";
field_name_purchase_product_actual_rate:string="";
field_name_purchase_product_quantity:string="";
field_name_purchase_product_discount:string="";
field_name_purchase_update:string="";
field_name_purchase_created_by: string = "  ";
field_name_purchase_created_time: string = "";
field_name_purchase_updated_by: string = "";
field_name_purchase_updated_time :string = "";
field_name_purchase_todate : string ="";
field_name_purchase_fromdate : string ="";
field_name_purchase_addpurchase : string ="";
field_name_purchase_btnuploadcsv :string = "";
field_name_purchase_actions : string ="";
field_name_purchase_search : string ="";
field_name_purchase_csv : string ="";
field_name_purchase_pdf : string ="";
field_name_purchase_excel : string ="";
field_name_purchase_import : string ="";
field_name_purchase_print : string ="";
field_name_purchase_details : string ="";
field_name_purchase_purchaseinfo : string ="";
field_name_purchase_upload_csv:string ="";
field_name_purchase_upload_files:string="";
field_name_purchase_please_upload_csv:string ="";
field_name_purchase_availability:string ="";
field_name_purchase_total_purchases :string ="";
field_name_purchase_total_amount :string ="";
/*Quotes Details*/
field_name_quotes_mobile:string="";
field_name_quotes_customername:string="";
field_name_quotes_productname:string="";
field_name_quotes_quotationdate:string="";
field_name_quotes_product_category:string="";
field_name_quotes_product_rate:string="";
field_name_quotes_product_total:string="";
field_name_quotes_product_actual_rate:string="";
field_name_quotes_product_quantity:string="";
field_name_quotes_product_discount:string="";
field_name_quotes_update:string="";
field_name_quotes_created_by: string = "  ";
field_name_quotes_created_time: string = "";
field_name_quotes_updated_by: string = "";
field_name_quotes_updated_time :string = "";
field_name_quotes_todate : string ="";
field_name_quotes_fromdate : string ="";
field_name_quotes_addquotes : string ="";
field_name_quotes_actions : string ="";
field_name_quotes_search : string ="";
field_name_quotes_csv : string ="";
field_name_quotes_pdf : string ="";
field_name_quotes_excel : string ="";
field_name_quotes_import : string ="";
field_name_quotes_print : string ="";
field_name_quotes_details : string ="";
field_name_quotes_quotesinfo : string ="";
field_name_quotes_btnuploadcsv:string="";
field_name_quotes_upload_csv:string="";
field_name_quotes_upload_files:string="";
field_name_quotes_please_upload_csv:string="";
/*Cases details*/
field_name_cases_case_name: string = "";
field_name_cases_description:string ="";
field_name_cases_priority:string ="";
field_name_cases_update:string ="";
field_name_cases_customer_name:string ="";
field_name_cases_mobile:string ="";
field_name_cases_email:string ="";
field_name_cases_activity_type:string ="";
field_name_cases_created_by: string = "  ";
field_name_cases_created_time: string = "";
field_name_cases_updated_by: string = "";
field_name_cases_updated_time :string = "";
field_name_cases_todate : string ="";
field_name_cases_fromdate : string ="";
field_name_cases_addcases : string ="";
field_name_cases_actions : string ="";
field_name_cases_search : string ="";
field_name_cases_csv : string ="";
field_name_cases_pdf : string ="";
field_name_cases_excel : string ="";
field_name_cases_import : string ="";
field_name_cases_print : string ="";
field_name_cases_details : string ="";
field_name_cases_casesinfo : string ="";

/*Faq details*/
field_name_faq_questions: string = "";
field_name_faq_answers:string ="";
field_name_faq_status:string ="";
field_name_faq_update:string=""
field_name_faq_created_by: string = "  ";
field_name_faq_created_time: string = "";
field_name_faq_updated_by: string = "";
field_name_faq_updated_time :string = "";
field_name_faq_todate : string ="";
field_name_faq_fromdate : string ="";
field_name_faq_addfaq : string ="";
field_name_faq_actions : string ="";
field_name_faq_search : string ="";
field_name_faq_csv : string ="";
field_name_faq_pdf : string ="";
field_name_faq_excel : string ="";
field_name_faq_import : string ="";
field_name_faq_print : string ="";
field_name_faq_details : string ="";
field_name_faq_faqinfo : string ="";
field_name_faq_btnuploadCsv : string ="";
field_name_faq_upload_Csv : string ="";
field_name_faq_upload_Csvfile : string ="";
field_name_faq_pleaseupload_Csvfile : string ="";

/*product category*/ 


field_name_pro_category_name:string ="";
field_name_pro_category_update:string=""
field_name_pro_category_created_by: string = "  ";
field_name_pro_category_created_time: string = "";
field_name_pro_category_updated_by: string = "";
field_name_pro_category_updated_time :string = "";
field_name_pro_category_todate : string ="";
field_name_pro_category_fromdate : string ="";
field_name_pro_category_addpro_category : string ="";
field_name_pro_category_actions : string ="";
field_name_pro_category_search : string ="";
field_name_pro_category_csv : string ="";
field_name_pro_category_pdf : string ="";
field_name_pro_category_excel : string ="";
field_name_pro_category_import : string ="";
field_name_pro_category_print : string ="";
field_name_pro_category_details : string ="";
field_name_pro_category_categoryinfo : string ="";


/*pipline*/

field_name_pipeline_name:string ="";
field_name_pipeline_update:string=""
field_name_pipeline_created_by: string = "  ";
field_name_pipeline_created_time: string = "";
field_name_pipeline_updated_by: string = "";
field_name_pipeline_updated_time :string = "";
field_name_pipeline_todate : string ="";
field_name_pipeline_fromdate : string ="";
field_name_pipeline_addpipeline : string ="";
field_name_pipeline_actions : string ="";
field_name_pipeline_search : string ="";
field_name_pipeline_csv : string ="";
field_name_pipeline_pdf : string ="";
field_name_pipeline_excel : string ="";
field_name_pipeline_import : string ="";
field_name_pipeline_print : string ="";
field_name_pipeline_details : string ="";
field_name_pipeline_pipelineinfo : string ="";


/* sales stage*/
field_name_sales_stage_name:string ="";
field_name_sales_stage_update:string=""
field_name_sales_stage_created_by: string = "  ";
field_name_sales_stage_created_time: string = "";
field_name_sales_stage_updated_by: string = "";
field_name_sales_stage_updated_time :string = "";
field_name_sales_stage_todate : string ="";
field_name_sales_stage_fromdate : string ="";
field_name_sales_stage_addsales_stage : string ="";
field_name_sales_stage_actions : string ="";
field_name_sales_stage_search : string ="";
field_name_sales_stage_csv : string ="";
field_name_sales_stage_pdf : string ="";
field_name_sales_stage_excel : string ="";
field_name_sales_stage_import : string ="";
field_name_sales_stage_print : string ="";
field_name_sales_stage_details : string ="";
field_name_sales_stage_stageinfo : string ="";
/* lead sorce*/


field_name_lead_source_name:string ="";
field_name_lead_source_update:string=""
field_name_lead_source_created_by: string = "  ";
field_name_lead_source_created_time: string = "";
field_name_lead_source_updated_by: string = "";
field_name_lead_source_updated_time :string = "";
field_name_lead_source_todate : string ="";
field_name_lead_source_fromdate : string ="";
field_name_lead_source_addlead_source : string ="";
field_name_lead_source_actions : string ="";
field_name_lead_source_search : string ="";
field_name_lead_source_csv : string ="";
field_name_lead_source_pdf : string ="";
field_name_lead_source_excel : string ="";
field_name_lead_source_import : string ="";
field_name_lead_source_print : string ="";
field_name_lead_source_details : string ="";
field_name_lead_source_leadsourceinfo : string ="";

/*source*/

field_name_source_name:string ="";
field_name_source_update:string=""
field_name_source_created_by: string = "  ";
field_name_source_created_time: string = "";
field_name_source_updated_by: string = "";
field_name_source_updated_time :string = "";
field_name_source_todate : string ="";
field_name_source_fromdate : string ="";
field_name_source_addsource : string ="";
field_name_source_actions : string ="";
field_name_source_search : string ="";
field_name_source_csv : string ="";
field_name_source_pdf : string ="";
field_name_source_excel : string ="";
field_name_source_import : string ="";
field_name_source_print : string ="";
field_name_source_details : string ="";
field_name_source_sourceinfo : string ="";
/*Warehouse*/



field_name_warehouse_name:string ="";
field_name_warehouse_update:string=""
field_name_warehouse_created_by: string = "  ";
field_name_warehouse_created_time: string = "";
field_name_warehouse_updated_by: string = "";
field_name_warehouse_updated_time :string = "";
field_name_warehouse_todate : string ="";
field_name_warehouse_fromdate : string ="";
field_name_warehouse_addwarehouse : string ="";
field_name_warehouse_actions : string ="";
field_name_warehouse_search : string ="";
field_name_warehouse_csv : string ="";
field_name_warehouse_pdf : string ="";
field_name_warehouse_excel : string ="";
field_name_warehouse_import : string ="";
field_name_warehouse_print : string ="";
field_name_warehouse_details : string ="";
field_name_warehouse_info : string ="";
/*currency*/
field_name_currency_name:string ="";
field_name_currency_update:string=""
field_name_currency_created_by: string = "  ";
field_name_currency_created_time: string = "";
field_name_currency_updated_by: string = "";
field_name_currency_updated_time :string = "";
field_name_currency_todate : string ="";
field_name_currency_fromdate : string ="";
field_name_currency_addcurrency : string ="";
field_name_currency_actions : string ="";
field_name_currency_search : string ="";
field_name_currency_csv : string ="";
field_name_currency_pdf : string ="";
field_name_currency_excel : string ="";
field_name_currency_import : string ="";
field_name_currency_print : string ="";
field_name_currency_details : string ="";
field_name_currency_info : string ="";
/* invoice*/

field_name_invoice_name:string ="";
field_name_invoice_date:string ="";
field_name_invoice_customer_name: string ="";
field_name_invoice_product_name:string = "";
field_name_invoice_mobile:string ="";
field_name_invoice_product_category: string="";
field_name_invoice_product_rate: string="";
field_name_invoice_product_total: string="";
field_name_invoice_product_actual_rate: string="";
field_name_invoice_product_quantity: string="";
field_name_invoice_product_discount: string="";
field_name_invoice_update:string="";
field_name_invoice_created_by: string = "  ";
field_name_invoice_created_time: string = "";
field_name_invoice_updated_by: string = "";
field_name_invoice_updated_time :string = "";
field_name_invoice_todate : string ="";
field_name_invoice_fromdate : string ="";
field_name_invoice_addinvoice : string ="";
field_name_invoice_btnuploadcsv : string ="";
field_name_invoice_please_upload_csv:string ="";
field_name_invoice_upload_files: string ="";
field_name_invoice_actions : string ="";
field_name_invoice_search : string ="";
field_name_invoice_csv : string ="";
field_name_invoice_pdf : string ="";
field_name_invoice_excel : string ="";
field_name_invoice_import : string ="";
field_name_invoice_print : string ="";
field_name_invoice_details : string ="";
field_name_invoice_invoiceinfo : string ="";
field_name_invoice_total_invoices : string ="";
field_name_invoice_total_amount : string ="";

/*department*/

field_name_department_name:string ="";
field_name_department_update:string=""
field_name_department_created_by: string = "  ";
field_name_department_created_time: string = "";
field_name_department_updated_by: string = "";
field_name_department_updated_time :string = "";
field_name_department_todate : string ="";
field_name_department_fromdate : string ="";
field_name_department_adddepartment : string ="";
field_name_department_actions : string ="";
field_name_department_search : string ="";
field_name_department_csv : string ="";
field_name_department_pdf : string ="";
field_name_department_excel : string ="";
field_name_department_import : string ="";
field_name_department_print : string ="";
field_name_department_details : string ="";
field_name_department_departmentinfo : string ="";
/* Stock manage*/


field_name_stock_stock:string ="";
field_name_stock_code:string ="";
field_name_stock_stock_status:string ="";
field_name_stock_manage_stock:string ="";
field_name_stock_weight:string ="";
field_name_stock_update:string=""
field_name_stock_created_by: string = "  ";
field_name_stock_created_time: string = "";
field_name_stock_updated_by: string = "";
field_name_stock_updated_time :string = "";
field_name_stock_todate : string ="";
field_name_stock_fromdate : string ="";
field_name_stock_addstock : string ="";
field_name_stock_actions : string ="";
field_name_stock_search : string ="";
field_name_stock_csv : string ="";
field_name_stock_pdf : string ="";
field_name_stock_excel : string ="";
field_name_stock_import : string ="";
field_name_stock_print : string ="";
field_name_stock_details : string ="";
field_name_stock_stockinfo : string ="";
field_name_stock_availability: string ="";
field_name_stock_product_name: string=""
field_name_stock_currency: string="";
field_name_stock_phone :string ="";
field_name_stock_cost:string= "";
field_name_stock_supplier_name= "";
field_name_stock_category_name ="";


/*expenses_item*/

field_name_expense_item_name:string ="";
field_name_expense_item_update:string=""
field_name_expense_item_created_by: string = "  ";
field_name_expense_item_created_time: string = "";
field_name_expense_item_updated_by: string = "";
field_name_expense_item_updated_time :string = "";
field_name_expense_item_todate : string ="";
field_name_expense_item_fromdate : string ="";
field_name_expense_item_addexpense_item : string ="";
field_name_expense_item_actions : string ="";
field_name_expense_item_search : string ="";
field_name_expense_item_csv : string ="";
field_name_expense_item_pdf : string ="";
field_name_expense_item_excel : string ="";
field_name_expense_item_import : string ="";
field_name_expense_item_print : string ="";
field_name_expense_item_details : string ="";
field_name_expense_item_info : string ="";

/*add expenses*/

field_name_add_expense_user_email:string ="";
field_name_add_expense_update:string ="";
field_name_add_expense_date:string ="";
field_name_add_expense_amount:string ="";
field_name_add_expense_upload_files:string ="";
field_name_add_expense_add_expense_item:string ="";
field_name_add_expense_name:string ="";
field_name_add_expense_created_by: string = "  ";
field_name_add_expense_created_time: string = "";
field_name_add_expense_updated_by: string = "";
field_name_add_expense_updated_time :string = "";
field_name_add_expense_todate : string ="";
field_name_add_expense_fromdate : string ="";
field_name_add_expense_addadd_expense : string ="";
field_name_add_expense_actions : string ="";
field_name_add_expense_search : string ="";
field_name_add_expense_csv : string ="";
field_name_add_expense_pdf : string ="";
field_name_add_expense_excel : string ="";
field_name_add_expense_import : string ="";
field_name_add_expense_print : string ="";
field_name_add_expense_details : string ="";
field_name_add_expense_info : string ="";

/*campaing active*/


field_name_campaign_active_name:string ="";
field_name_campaign_active_update:string=""
field_name_campaign_active_created_by: string = "  ";
field_name_campaign_active_created_time: string = "";
field_name_campaign_active_updated_by: string = "";
field_name_campaign_active_updated_time :string = "";
field_name_campaign_active_actions : string ="";
field_name_campaign_active_add: string ="";


/*campaing type*/

field_name_campaign_type_name:string ="";
field_name_campaign_type_update:string=""
field_name_campaign_type_created_by: string = "  ";
field_name_campaign_type_created_time: string = "";
field_name_campaign_type_updated_by: string = "";
field_name_campaign_type_updated_time :string = "";
field_name_campaign_type_actions : string ="";
field_name_campaign_type_add: string ="";

/*supplier*/


field_name_supplier_email:string ="";
field_name_supplier_phone:string ="";
field_name_supplier_product_name:string ="";
field_name_supplier_address:string ="";
field_name_supplier_pricing:string ="";
field_name_supplier_payment:string ="";
field_name_supplier_update:string=""
field_name_supplier_created_by: string = "  ";
field_name_supplier_created_time: string = "";
field_name_supplier_updated_by: string = "";
field_name_supplier_updated_time :string = "";
field_name_supplier_todate : string ="";
field_name_supplier_fromdate : string ="";
field_name_supplier_addsupplier : string ="";
field_name_supplier_actions : string ="";
field_name_supplier_search : string ="";
field_name_supplier_csv : string ="";
field_name_supplier_pdf : string ="";
field_name_supplier_excel : string ="";
field_name_supplier_import : string ="";
field_name_supplier_print : string ="";
field_name_supplier_details : string ="";
field_name_supplier_btnuploadcsv:string ="";
field_name_supplier_supplierinfo : string ="";
field_name_supplier_upload_files: string="";


/*Change passwrd*/
field_name_change_password:string ="";
field_name_old_password:string ="";
field_name_new_password:string ="";
field_name_confirm_password:string ="";
field_name_change_password_btn:string ="";
/*add prodcut category*/
/* 


/*report*/
field_name_report_headding:string ="";
field_name_report_section:string=""
field_name_report_select_dropdown : string ="";
field_name_report_select_section: string = "  ";
field_name_report_view_as: string = "";
field_name_report_select_chart: string = "";
field_name_report_search :string = "";

field_name_Organisation_details:string ="";
field_name_subscription_status:string=""
field_name_expires_on : string ="";
field_name_currency_selected: string = " ";
field_name_free_trial: string = "  ";

/*calendar popup */
field_name_calendar_popup_notice_details:string ="";
field_name_calendar_popup_notice_type:string ="";
field_name_calendar_popup_notice_date:string ="";
field_name_calendar_popup_notice_by:string ="";
field_name_calendar_popup_notice_attachment:string ="";
field_name_calendar_popup_notice_description:string ="";
/*candidates info */

field_name_candidates_addcomments :string = "";
field_name_candidates_update_leaves: string = "";
field_name_candidates_details: string = "";
field_name_candidates_candidate_name :string = "";
field_name_candidates_candidate_phone :string = "";
field_name_candidates_email :string = "";
field_name_candidates_candidate_resume :string = "";
field_name_candidates_candidate_status :string = "";
field_name_candidates_hiring_manager_comments :string = "";
field_name_candidates_feedback_comments :string = "";
field_name_candidates_review_comments :string = "";
field_name_candidates_interview_comments :string = "";
field_name_candidates_offer_comments :string = "";
field_name_candidates_rejected_comments :string = "";
field_name_candidates_created_by: string = "";
field_name_candidates_created_time: string = "";
field_name_candidates_updated_by: string = "";
field_name_candidates_updated_time :string = "";


/*hrms dashboard */
field_name_hrms_dashboard : string = "";
field_name_hrms_employee : string = "";
field_name_hrms_holidays : string = "";
field_name_hrms_projects : string = "";
field_name_hrms_leaves: string = "";
field_name_hrms_notice: string = "";
field_name_hrms_fromdate : string = "";
field_name_hrms_todate : string = "";
field_name_hrms_trainings : string = "";
field_name_hrms_search : string = "";
field_name_hrms_notices: string = "";
field_name_hrms_candidates: string = "";
field_name_hrms_interviews: string = "";
field_name_hrms_policy: string = "";
field_name_hrms_expenses: string = "";
field_name_hrms_candidate_table: string = "";
field_name_hrms_payroll_table:string ="";
field_name_hrms_travel_table:string ="";
field_name_hrms_attendance_table:string ="";
field_name_hrms_task_management_table:string ="";
field_name_hrms_policy_table: string = "";
field_name_hrms_expenses_table: string = "";
field_name_hrms_employee_table: string = "";
field_name_hrms_leaves_table: string = "";
field_name_hrms_training_table: string = "";
field_name_hrms_holiday_table: string = "";
field_name_hrms_project_table: string = "";
field_name_hrms_notice_table: string = "";
field_name_hrms_actons: string = "";
field_name_hrms_leave_type: string = "";
field_name_hrms_leave_form: string = "";
field_name_hrms_leave_to: string = "";
field_name_hrms_leave_reason: string = "";
field_name_hrms_attendence_name: string = "";
field_name_hrms_attendence_days: string = "";       
field_name_hrms_leave_days: string = "";



/*emyloyee list */
field_name_hrms_employee_first_name: string = "";
field_name_hrms_employee_email_id: string = "";
field_name_hrms_employee_designation: string = "";
field_name_hrms_employee_last_name: string = "";
field_name_hrms_employee_mobile: string = "";
field_name_hrms_employee_join_date: string = "";
field_name_hrms_employee_role: string = "";
field_name_hrms_employee_from_date: string = "";
field_name_hrms_employee_to_date: string = "";
field_name_hrms_employee_search: string = "";
field_name_hrms_employee_status: string = "";
field_name_hrms_employee_pdf: string = "";
field_name_hrms_employee_csv: string = "";
field_name_hrms_employee_Add_employee: string = "";
field_name_hrms_employee_update_leaves: string = "";
field_name_hrms_employee_details: string = "";
field_name_hrms_employee_assigned_to: string = "";
field_name_hrms_employee_leaves_avaialable: string = "";
field_name_hrms_employee_uploaded_picture: string = "";
field_name_hrms_employee_bank_name: string = "";
field_name_hrms_employee_account_number: string = "";
field_name_hrms_employee_created_by: string = "";
field_name_hrms_employee_created_time: string = "";
field_name_hrms_employee_updated_by: string = "";
field_name_hrms_employee_updated_time :string = "";



/*event pop up */
field_name_hrms_event_title: string = "";
field_name_hrms_event_start_time: string = "";
field_name_hrms_event_end_time: string = "";
field_name_hrms_event_type: string = "";
field_name_hrms_event_urgency: string = "";
field_name_hrms_event_agenda: string = "";
field_name_hrms_event_add_participants: string = "";
field_name_hrms_event_add_email: string = "";
field_name_hrms_event_remove_email: string = "";
field_name_hrms_event_list_email: string = "";

/*holidaylist */
field_name_hrms_holiday_fromdate: string = "";
field_name_hrms_holiday_todate: string = "";
field_name_hrms_holiday_search: string = "";
field_name_hrms_holiday_pdf: string = "";
field_name_hrms_holiday_csv: string = "";
field_name_hrms_holiday_add_holiday: string = "";
field_name_hrms_holiday_update_holiday: string = "";
field_name_hrms_holiday_details: string = "";
field_name_hrms_holiday_name: string = "";
field_name_hrms_holiday_date: string = "";
field_name_hrms_holiday_day: string = "";
field_name_hrms_holiday_created_by: string = "";
field_name_hrms_holiday_created_time: string = "";
field_name_hrms_holiday_updated_by: string = "";
field_name_hrms_holiday_updated_time :string = "";



/*leaveslist */
field_name_hrms_leaves_fromdate: string = "";
field_name_hrms_leaves_todate: string = "";
field_name_hrms_leaves_search: string = "";
field_name_hrms_leaves_pdf: string = "";
field_name_hrms_leaves_csv: string = "";
field_name_hrms_add_leaves: string = "";
field_name_hrms_leaves_update_leaves: string = "";
field_name_hrms_leaves_details: string = "";
field_name_hrms_leaves_status: string = "";
field_name_hrms_leaves_annual: string = "";
field_name_hrms_leaves_medical: string = "";
field_name_hrms_leaves_other: string = "";
field_name_hrms_leaves_remaining: string = "";
field_name_hrms_leaves_type: string = "";
field_name_hrms_leaves_from: string = "";
field_name_hrms_leaves_to: string = "";
field_name_hrms_leaves_reason: string = "";
field_name_hrms_leaves_employee_email: string = "";
field_name_hrms_leaves_created_by: string = "";
field_name_hrms_leaves_created_time: string = "";
field_name_hrms_leaves_updated_by: string = "";
field_name_hrms_leaves_updated_time :string = "";

/*noticetab */

field_name_hrms_notice_details: string = "";
field_name_hrms_notice_update: string = "";
field_name_hrms_notice_add_notice: string = "";
field_name_hrms_notice_type: string = "";
field_name_hrms_notice_date: string = "";
field_name_hrms_notice_by: string = "";
field_name_hrms_notice_attchmnet: string = "";
field_name_hrms_notice_description: string = "";
field_name_hrms_notice_created_by: string = "  ";
field_name_hrms_notice_created_time: string = "";
field_name_hrms_notice_updated_by: string = "";
field_name_hrms_notice_updated_time :string = "";
field_name_hrms_notice_fromdate: string = "";
field_name_hrms_notice_todate: string = "";
field_name_hrms_notice_search: string = "";
field_name_hrms_notice_pdf: string = "";
field_name_hrms_notice_csv: string = "";
field_name_hrms_notice_uploadcsv: string = "";
field_name_hrms_notice_uploadcsvfile: string = "";


/*projectlist*/
field_name_hrms_project_details: string = "";
field_name_hrms_project_fromdate: string = "";
field_name_hrms_project_todate: string = "";
field_name_hrms_project_search: string = "";
field_name_hrms_project_pdf: string = "";
field_name_hrms_project_csv: string = "";
field_name_hrms_project_add_project: string = "";
field_name_hrms_project_name: string = "";
field_name_hrms_project_description: string = "";
field_name_hrms_project_team: string = "";
field_name_hrms_project_created_by: string = "  ";
field_name_hrms_project_created_time: string = "";
field_name_hrms_project_updated_by: string = "";
field_name_hrms_project_updated_time :string = "";



/*traininglist*/

field_name_hrms_training_details: string = "";
field_name_hrms_training_fromdate: string = "";
field_name_hrms_training_startdate: string = "";
field_name_hrms_training_enddate: string = "";
field_name_hrms_training_todate: string = "";
field_name_hrms_training_search: string = "";
field_name_hrms_training_status: string = "";
field_name_hrms_training_pdf: string = "";
field_name_hrms_training_csv: string = "";
field_name_hrms_training_add_training: string = "";
field_name_hrms_training_update: string = "";
field_name_hrms_training_type: string = "";
field_name_hrms_training_trainer: string = "";
field_name_hrms_training_employee: string = "";
field_name_hrms_training_cost: string = "";
field_name_hrms_training_description: string = "";
field_name_hrms_training_created_by: string = "  ";
field_name_hrms_training_created_time: string = "";
field_name_hrms_training_updated_by: string = "";
field_name_hrms_training_updated_time :string = "";


/*attendencelist*/


field_name_hrms_attendence_details: string = "";
field_name_hrms_attendence_fromdate: string = "";
field_name_hrms_attendence_todate: string = "";
field_name_hrms_attendence_employee_name: string = "";
field_name_hrms_attendence_phone: string = "";
field_name_hrms_attendence_from: string = "";
field_name_hrms_attendence_to: string = "";
field_name_hrms_attendence_search: string = "";
field_name_hrms_attendence_pdf: string = "";
field_name_hrms_attendence_csv: string = "";
field_name_hrms_attendence_add_attendence: string = "";
field_name_hrms_attendence_update: string = "";
field_name_hrms_attendence_leave_type: string = "";
field_name_hrms_attendence_leave_from: string = "";
field_name_hrms_attendence_leave_to: string = "";
field_name_hrms_attendence_leave_reason: string = "";
field_name_hrms_attendence_created_by: string = "  ";
field_name_hrms_attendence_created_time: string = "";
field_name_hrms_attendence_updated_by: string = "";
field_name_hrms_attendence_updated_time :string = "";




/*leavelist*/
field_name_hrms_leave_approve_details: string = "";
field_name_hrms_leave_approve_fromdate: string = "";
field_name_hrms_leave_approve_todate: string = "";
field_name_hrms_leave_approve_from: string = "";
field_name_hrms_leave_approve_to: string = "";
field_name_hrms_leave_approve_search: string = "";
field_name_hrms_leave_approve_pdf: string = "";
field_name_hrms_leave_approve_csv: string = "";
field_name_hrms_leave_approve_add_leave_approve: string = "";
field_name_hrms_leave_approve_update: string = "";
field_name_hrms_leave_approve_type: string = "";
field_name_hrms_leave_approve_leave_to: string = "";
field_name_hrms_leave_approve_reason: string = "";
field_name_hrms_leave_approve_status: string = "";
field_name_hrms_leave_approve_alert: string = "";
field_name_hrms_leave_approve_created_by: string = "  ";
field_name_hrms_leave_approve_created_time: string = "";
field_name_hrms_leave_approve_updated_by: string = "";
field_name_hrms_leave_approve_updated_time :string = "";



/*payroll*/
field_name_hrms_payroll_details: string = "";
field_name_hrms_payroll_fromdate: string = "";
field_name_hrms_payroll_todate: string = "";
field_name_hrms_payroll_search: string = "";
field_name_hrms_payroll_pdf: string = "";
field_name_hrms_payroll_csv: string = "";
field_name_hrms_payroll_add_payroll: string = "";
field_name_hrms_payroll_emplyee_info: string = "";
field_name_hrms_payroll_update: string = "";
field_name_hrms_payroll_salary_info: string = "";
field_name_hrms_payroll_employee_name: string = "";
field_name_hrms_payroll_last_name: string = "";
field_name_hrms_payroll_email: string = "";
field_name_hrms_payroll_phone: string = "";
field_name_hrms_payroll_designation: string = "";
field_name_hrms_payroll_basic_salary: string = "";
field_name_hrms_payroll_transportaion_allowance: string = "";
field_name_hrms_payroll_food_allowance: string = "";
field_name_hrms_payroll_acccomadation_allowance: string = "";
field_name_hrms_payroll_net_salary: string = "";
field_name_hrms_payroll_created_by: string = "  ";
field_name_hrms_payroll_created_time: string = "";
field_name_hrms_payroll_updated_by: string = "";
field_name_hrms_payroll_updated_time :string = "";

/*payslip*/
field_name_hrms_payslip_details: string = "";
field_name_hrms_payslip_generate: string = "";
field_name_hrms_payslip_fromdate: string = "";
field_name_hrms_payslip_todate: string = "";
field_name_hrms_payslip_search: string = "";
field_name_hrms_payslip_pdf: string = "";
field_name_hrms_payslip_csv: string = "";
field_name_hrms_payslip_info: string = "";
field_name_hrms_payslip_update: string = "";
field_name_hrms_payslip_select_year_month: string = "";
field_name_hrms_payslip_employee_name: string = "";
field_name_hrms_payslip_account_number: string = "";
field_name_hrms_payslip_bank_name: string = "";
field_name_hrms_payslip_designation: string = "";
field_name_hrms_payslip_assigned_to: string = "";
field_name_hrms_payslip_join_date: string = "";
field_name_hrms_payslip_payments: string = "";
field_name_hrms_payslip_amount: string = "";
field_name_hrms_payslip_deduction: string = "";
field_name_hrms_payslip_basic_salary: string = "";
field_name_hrms_payslip_transportaion_allowance: string = "";
field_name_hrms_payslip_food_allowance: string = "";
field_name_hrms_payslip_acccomadation_allowance: string = "";
field_name_hrms_payslip_send_email_employee :string = "";
field_name_hrms_payslip_created_by: string = "  ";
field_name_hrms_payslip_total_payments: string = "  ";
field_name_hrms_payslip_total_deduction: string = "  ";
field_name_hrms_payslip_created_time: string = "";
field_name_hrms_payslip_updated_by: string = "";
field_name_hrms_payslip_updated_time :string = "";


/*policylist*/
field_name_hrms_policy_details: string = "";
field_name_hrms_policy_fromdate: string = "";
field_name_hrms_policy_todate: string = "";
field_name_hrms_policy_search: string = "";
field_name_hrms_policy_pdf: string = "";
field_name_hrms_policy_csv: string = "";
field_name_hrms_policy_add_policy: string = "";
field_name_hrms_policy_update: string = "";
field_name_hrms_policy_id: string = "";
field_name_hrms_policy_name: string = "";
field_name_hrms_policy_size: string = "";
field_name_hrms_policy_file: string = "";
field_name_hrms_policy_download: string = "";
field_name_hrms_policy_description: string = "";
field_name_hrms_policy_created_by: string = "  ";
field_name_hrms_policy_created_time: string = "";
field_name_hrms_policy_updated_by: string = "";
field_name_hrms_policy_updated_time :string = "";

/*tasklist*/
field_name_hrms_task_details: string = "";
field_name_hrms_task_fromdate: string = "";
field_name_hrms_task_todate: string = "";
field_name_hrms_task_search: string = "";
field_name_hrms_task_pdf: string = "";
field_name_hrms_task_csv: string = "";
field_name_hrms_task_add_task: string = "";
field_name_hrms_task_update: string = "";
field_name_hrms_task_record_type: string = "";
field_name_hrms_task_name: string = "";
field_name_hrms_task_subject: string = "";
field_name_hrms_task_due_date: string = "";
field_name_hrms_task_employee_name: string = "";
field_name_hrms_task_phone: string = "";
field_name_hrms_task_follow_update: string = "";
field_name_hrms_task_comments: string = "";
field_name_hrms_task_status: string = "";
field_name_hrms_task_created_by: string = "  ";
field_name_hrms_task_created_time: string = "";
field_name_hrms_task_updated_by: string = "";
field_name_hrms_task_updated_time :string = "";


/*candidatelist*/
field_name_hrms_candidate_details: string = "";
field_name_hrms_candidate_fromdate: string = "";
field_name_hrms_candidate_todate: string = "";
field_name_hrms_candidate_search: string = "";
field_name_hrms_candidate_pdf: string = "";
field_name_hrms_candidate_csv: string = "";
field_name_hrms_candidate_add_candidate: string = "";
field_name_hrms_candidate_update: string = "";
field_name_hrms_candidate_name: string = "";
field_name_hrms_candidate_email: string = "";
field_name_hrms_candidate_phone: string = "";
field_name_hrms_candidate_resume: string = "";
field_name_hrms_candidate_created_by: string = "  ";
field_name_hrms_candidate_created_time: string = "";
field_name_hrms_candidate_updated_by: string = "";
field_name_hrms_candidate_updated_time :string = "";


/*configureleavelist*/
field_name_hrms_configureleave_details: string = "";
field_name_hrms_configureleave_fromdate: string = "";
field_name_hrms_configureleave_todate: string = "";
field_name_hrms_configureleave_search: string = "";
field_name_hrms_configureleave_pdf: string = "";
field_name_hrms_configureleave_csv: string = "";
field_name_hrms_configureleave_add_leavetype: string = "";
field_name_hrms_configureleave_update: string = "";
field_name_hrms_configureleave_leavetype: string = "";
field_name_hrms_configureleave_leavedays: string = "";
field_name_hrms_configureleave_created_by: string = "  ";
field_name_hrms_configureleave_created_time: string = "";
field_name_hrms_configureleave_updated_by: string = "";
field_name_hrms_configureleave_updated_time :string = "";

/*designationlist*/
field_name_hrms_designation_details: string = "";
field_name_hrms_designation_fromdate: string = "";
field_name_hrms_designation_todate: string = "";
field_name_hrms_designation_search: string = "";
field_name_hrms_designation_pdf: string = "";
field_name_hrms_designation_csv: string = "";
field_name_hrms_designation_add_designation: string = "";
field_name_hrms_designation_update: string = "";
field_name_hrms_designation_name: string = "";
field_name_hrms_designation_department: string = "";
field_name_hrms_designation_created_by: string = "  ";
field_name_hrms_designation_created_time: string = "";
field_name_hrms_designation_updated_by: string = "";
field_name_hrms_designation_updated_time :string = "";

/*emyployeestatuslist*/
field_name_hrms_emyployeestatus_details: string = "";
field_name_hrms_emyployeestatus_fromdate: string = "";
field_name_hrms_emyployeestatus_todate: string = "";
field_name_hrms_emyployeestatus_search: string = "";
field_name_hrms_emyployeestatus_pdf: string = "";
field_name_hrms_emyployeestatus_csv: string = "";
field_name_hrms_emyployeestatus_add_emyployeestatus: string = "";
field_name_hrms_emyployeestatus_update: string = "";

field_name_hrms_emyployeestatus_status: string = "";
field_name_hrms_emyployeestatus_created_by: string = "  ";
field_name_hrms_emyployeestatus_created_time: string = "";
field_name_hrms_emyployeestatus_updated_by: string = "";
field_name_hrms_emyployeestatus_updated_time :string = "";

/*organisationinfolist*/
field_name_hrms_organisationinfo_details: string = "";
field_name_hrms_organisationinfo_fromdate: string = "";
field_name_hrms_organisationinfo_todate: string = "";
field_name_hrms_organisationinfo_search: string = "";
field_name_hrms_organisationinfo_pdf: string = "";
field_name_hrms_organisationinfo_csv: string = "";
field_name_hrms_organisationinfo_add_organisationinfo: string = "";
field_name_hrms_organisationinfo_update: string = "";
field_name_hrms_organisationinfo_name: string = "";
field_name_hrms_organisationinfo_address: string = "";
field_name_hrms_organisationinfo_phone: string = "";
field_name_hrms_organisationinfo_created_by: string = "  ";
field_name_hrms_organisationinfo_created_time: string = "";
field_name_hrms_organisationinfo_updated_by: string = "";
field_name_hrms_organisationinfo_updated_time :string = "";


/*travellist*/
field_name_hrms_travel_details: string = "";
field_name_hrms_travel_fromdate: string = "";
field_name_hrms_travel_todate: string = "";
field_name_hrms_travel_search: string = "";
field_name_hrms_travel_pdf: string = "";
field_name_hrms_travel_info: string = "";
field_name_hrms_travel_csv: string = "";
field_name_hrms_travel_add_travel: string = "";
field_name_hrms_travel_update: string = "";
field_name_hrms_travel_employee_name: string = "";
field_name_hrms_travel_date: string = "";
field_name_hrms_travel_ticket_info: string = "";
field_name_hrms_travel_return_date: string = "";
field_name_hrms_travel_created_by: string = "  ";
field_name_hrms_travel_created_time: string = "";
field_name_hrms_travel_updated_by: string = "";
field_name_hrms_travel_updated_time :string = "";

/* hrms settings*/

field_name_hrms_settings_user_management:string = "";
field_name_hrms_settings_user_management_headings:string = "";
field_name_hrms_settings_history:string = "";
field_name_hrms_settings_history_heading:string = "";
field_name_hrms_settings_configuration_management:string = "";
field_name_hrms_settings_configuration_management_heading:string = "";
field_name_hrms_settings_addexpenses:string = "";
field_name_hrms_settings_addexpenses_heading:string = "";
field_name_hrms_settings_leave_approve_heading:string = "";
field_name_hrms_settings_leave_approve:string = "";
field_name_hrms_settings_edit_profile:string = "";
field_name_hrms_settings_edit_profile_heading:string = "";
field_name_hrms_settings_change_password:string = "";
field_name_hrms_settings_change_password_heading:string = "";
field_name_hrms_settings_attendance:string = "";
field_name_hrms_settings_attendance_heading:string = "";
field_name_hrms_settings_policy:string = "";
field_name_hrms_settings_policy_heading:string = "";
field_name_hrms_settings_payroll:string = "";
field_name_hrms_settings_payroll_heading:string = "";
field_name_hrms_settings_organisation_chart:string = "";
field_name_hrms_settings_organisation_chart_heading:string = "";
field_name_hrms_settings_task_management:string = "";
field_name_hrms_settings_task_management_heading:string = "";
field_name_hrms_settings_pay_slip:string = "";
field_name_hrms_settings_pay_slip_heading:string = "";
field_name_hrms_settings_interview:string = "";
field_name_hrms_settings_interview_heading:string = "";
field_name_hrms_settings_edit_form_fields:string = "";
field_name_hrms_settings_edit_form_fields_heading:string = "";


/* hrms dynamic fields*/
field_name_hrms_dynamic_fields_designation_heading:string = "";
field_name_hrms_dynamic_fields_designation:string = "";
field_name_hrms_dynamic_fields_department_heading:string = "";
field_name_hrms_dynamic_fields_department:string = "";
field_name_hrms_dynamic_fields_travel_reimbursement_heading:string = "";
field_name_hrms_dynamic_fields_travel_reimbursement:string = "";
field_name_hrms_dynamic_fields_candidate_heading:string = "";
field_name_hrms_dynamic_fields_candidate:string = "";
field_name_hrms_dynamic_fields_employee_status_heading:string = "";
field_name_hrms_dynamic_fields_employee_status:string = "";
field_name_hrms_dynamic_fields_configure_leavetype_heading:string = "";
field_name_hrms_dynamic_fields_configure_leavetype:string = "";
field_name_hrms_dynamic_fields_organisation_info_heading:string = "";
field_name_hrms_dynamic_fields_organisation_info:string = "";


/* sales dynamic fields*/
field_name_sales_dynamic_fields_product_category:string = "";
field_name_sales_dynamic_fields_product_category_heading:string = "";
field_name_sales_dynamic_fields_pipeline:string = "";
field_name_sales_dynamic_fields_pipeline_heading:string = "";
field_name_sales_dynamic_fields_sales_stage:string = "";
field_name_sales_dynamic_fields_sales_stage_heading:string = "";
field_name_sales_dynamic_fields_lead_source:string = "";
field_name_sales_dynamic_fields_lead_source_heading:string = "";
field_name_sales_dynamic_fields_source:string = "";
field_name_sales_dynamic_fields_source_heading:string = "";
field_name_sales_dynamic_fields_department:string = "";
field_name_sales_dynamic_fields_department_heading:string = "";
field_name_sales_dynamic_fields_expenses_item:string = "";
field_name_sales_dynamic_fields_expenses_item_heading:string = "";
field_name_sales_dynamic_fields_supplier:string = "";
field_name_sales_dynamic_fields_supplier_heading:string = "";
field_name_sales_dynamic_fields_currency:string = "";
field_name_sales_dynamic_fields_currency_heading:string = "";

/* sales settings*/
field_name_sales_settings_edit_form_fields:string = "";
field_name_sales_settings_edit_form_fields_heading:string = "";
field_name_sales_settings_user_management:string = "";
field_name_sales_settings_user_management_headings:string = "";
field_name_sales_settings_history:string = "";
field_name_sales_settings_history_heading:string = "";
field_name_sales_settings_configuration_management:string = "";
field_name_sales_settings_configuration_management_heading:string = "";
field_name_sales_settings_addexpenses:string = "";
field_name_sales_settings_addexpenses_heading:string = "";
field_name_sales_settings_edit_profile:string = "";
field_name_sales_settings_edit_profile_heading:string = "";
field_name_sales_settings_change_password:string = "";
field_name_sales_settings_change_password_heading:string = "";
field_name_sales_settings_organisation_heading:string = "";
field_name_sales_settings_organisation:string = "";


/* service settings*/
field_name_service_settings_edit_form_fields:string = "";
field_name_service_settings_edit_form_fields_heading:string = "";
field_name_service_settings_user_management:string = "";
field_name_service_settings_user_management_headings:string = "";
field_name_service_settings_history:string = "";
field_name_service_settings_history_heading:string = "";
field_name_service_settings_configuration_management:string = "";
field_name_service_settings_configuration_management_heading:string = "";
field_name_service_settings_edit_profile:string = "";
field_name_service_settings_edit_profile_heading:string = "";
field_name_service_settings_change_password:string = "";
field_name_service_settings_change_password_heading:string = "";

/* service dynamic settings*/

field_name_service_dynamic_fields_source:string = "";
field_name_service_dynamic_fields_source_heading:string = "";
field_name_service_dynamic_fields_department:string = "";
field_name_service_dynamic_fields_department_heading:string = "";



/* marketing settings*/
field_name_marketing_settings_edit_form_fields:string = "";
field_name_marketing_settings_edit_form_fields_heading:string = "";
field_name_marketing_settings_user_management:string = "";
field_name_marketing_settings_user_management_headings:string = "";
field_name_marketing_settings_history:string = "";
field_name_marketing_settings_history_heading:string = "";
field_name_marketing_settings_configuration_management:string = "";
field_name_marketing_settings_configuration_management_heading:string = "";
field_name_marketing_settings_edit_profile:string = "";
field_name_marketing_settings_edit_profile_heading:string = "";
field_name_marketing_settings_change_password:string = "";
field_name_marketing_settings_change_password_heading:string = "";

/* marketing dynamic settings*/

field_name_marketing_dynamic_fields_source:string = "";
field_name_marketing_dynamic_fields_source_heading:string = "";
field_name_marketing_dynamic_fields_department:string = "";
field_name_marketing_dynamic_fields_department_heading:string = "";
field_name_marketing_dynamic_fields_campaignactive_heading:string = "";
field_name_marketing_dynamic_fields_campaignactive:string = "";
field_name_marketing_dynamic_fields_campaigntype_heading:string = "";
field_name_marketing_dynamic_fields_campaigntype:string = "";


/* inventory settings*/

field_name_inventory_settings_edit_form_fields:string = "";
field_name_inventory_settings_edit_form_fields_heading:string = "";
field_name_inventory_settings_user_management:string = "";
field_name_inventory_settings_user_management_headings:string = "";
field_name_inventory_settings_history:string = "";
field_name_inventory_settings_history_heading:string = "";
field_name_inventory_settings_configuration_management:string = "";
field_name_inventory_settings_configuration_management_heading:string = "";
field_name_inventory_settings_edit_profile:string = "";
field_name_inventory_settings_edit_profile_heading:string = "";
field_name_inventory_settings_change_password:string = "";
field_name_inventory_settings_change_password_heading:string = "";



/* inventory dynamic settings*/
field_name_inventory_dynamic_fields_product_category:string = "";
field_name_inventory_dynamic_fields_product_category_heading:string = "";
field_name_inventory_dynamic_fields_source:string = "";
field_name_inventory_dynamic_fields_source_heading:string = "";
field_name_inventory_dynamic_fields_department:string = "";
field_name_inventory_dynamic_fields_department_heading:string = "";
field_name_inventory_dynamic_fields_currency:string = "";
field_name_inventory_dynamic_fields_currency_heading:string = "";
field_name_inventory_dynamic_fields_warehouse:string = "";
field_name_inventory_dynamic_fields_warehouse_heading:string = "";
field_name_inventory_dynamic_fields_expenses_item:string = "";
field_name_inventory_dynamic_fields_expenses_item_heading:string = "";


initializeHtmlFields() {
    switch (this.component_name) {

        
        case GlobalConstants.CRM_LANDING_PAGE.NAVBAR:

            this.website_home = this.getFieldValue("home");
            this.website_products = this.getFieldValue("products");
            this.products_marketing = this.getFieldValue("product marketing");
            this.products_service  = this.getFieldValue("product service");
            this.products_sales = this.getFieldValue("product sales");
            this.website_about_us = this.getFieldValue("about us");
            this.website_resources = this.getFieldValue("resources");
            this.website_support = this.getFieldValue("support");
            this.website_fetures = this.getFieldValue("fetures");
            this.website_pricing = this.getFieldValue("pricing");
            this.website_service = this.getFieldValue("service");
            this.login = this.getFieldValue("login");
            this.website_survey = this.getFieldValue("survey");
            this.all_right_reserved=this.getFieldValue("all rights reserved");
          


        break;


        case GlobalConstants.CRM_LANDING_PAGE.HOMEPAGE:

          
            this.top_home_headding = this.getFieldValue("Connect With Your Customers");
            this.top_home_subheadding = this.getFieldValue("Ogoul Customer Relationship Management Solution Is One-Stop Solution For All Your Marketing And Sales Needs. Built On The Latest Technologies. Ogoul Is Envisioned To Empower Organizations’s Interaction With It’s Current And Potential Customers.");
            this.top_home_30days_trial = this.getFieldValue("30 days free trial");
            this.top_home_request_demo=this.getFieldValue("request demo");
            this.home_crm_benefits=this.getFieldValue("Explore Ogoul CRM Benefits");
            this.home_single_repository=this.getFieldValue("Single Repository Of All Customer Data");
            this.home_single_repository_subheadding=  this.getFieldValue("Ogoul CRM Offers A Single Repository Of All The Customer Information To Facilitate Growth Through Improved Business Relationships And Increased Retentions.");
            this.home_obtain_useful=this.getFieldValue("Obtain Useful Insights");
            this.home_obtain_useful_subheadding=this.getFieldValue("The Data Obtained Through The Ogoul CRM Software Can Be Instrumental In Taking Data Driven Decisions Which Can Optimize Marketing And Sales. They Help Organizations Enhance Their Marketing Campaigns, Improve Their Sales Performance, And Develop Meaningful Interactions With Customers.");
            this.home_activity_management=this.getFieldValue("Activity Management System");
            this.home_activity_management_subheadding=this.getFieldValue("This Feature Allows Adding Tasks, Updating Tasks, Follow-Up, Appointment, Calls Etc. Activity Management Lets The Company Control All The Activities Taking Place.");
            this.home_learn_more=this.getFieldValue("learn more");
            this.home_improve_your_productivity=this.getFieldValue("Improve your productivity through oguol CRM");
            this.home_explore_all_our_solution=this.getFieldValue("Explore All Our Solutions In Ogoul Customer 360 Platform");
            this.home_solution_small_bussiness=this.getFieldValue("small bussiness");
            this.home_solution_marketing=this.getFieldValue("marketing");
            this.home_solution_sales=this.getFieldValue("sales");
            this.home_solution_service=this.getFieldValue("service");
            this.home_contact_qatar=this.getFieldValue("qatar");
            this.home_contact_india=this.getFieldValue("india");
            this.home_contact_us=this.getFieldValue("contact us");
            this.home_contact_us_call=this.getFieldValue("call");
            this.home_contact_us_mon_friday=this.getFieldValue("mon to friday");
            this.home_contact_us_email=this.getFieldValue("email");
            this.home_contact_us_web=this.getFieldValue("web");
            this.home_contact_us_location=this.getFieldValue("location");
            this.home_contact_us_sendmsg=this.getFieldValue("send message");
            this.organisation_enroll_form=this.getFieldValue("organisation enroll form");
            this.organisation_name=this.getFieldValue("organisation name");
            this.organisation_first_name=this.getFieldValue("first name");
            this.organisation_password=this.getFieldValue("password");
            this.organisation_currency=this.getFieldValue("currency");
            this.organisation_email=this.getFieldValue("email");
            this.organisation_last_name=this.getFieldValue("last name");
            this.organisation_phone=this.getFieldValue("phone");
            this.create_account=this.getFieldValue("create account");
          
          


        break;
        case GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_MARKETING:
        this.marketing_hedding=this.getFieldValue("marketing");
        this.marketing_subhedding=this.getFieldValue("Automated Lead Acquisition, Lead Score, Lead Nurture And Lead Assignment.");
        this.marketing_freetrial=this.getFieldValue("30 days free trial");
        this.marketing_request_demo=this.getFieldValue("request demo");
        this.marketing_crm_benefits=this.getFieldValue("Explore Ogoul CRM Benefits");
        this.marketing_single_repository=this.getFieldValue("Single Repository Of All Customer Data");
        this.marketing_obtain_useful=this.getFieldValue("Obtain Useful Insights");
        this.website_activity_management=this.getFieldValue("Activity Management System");
        this.marketing_single_repository_subheadding=this.getFieldValue("Ogoul CRM Offers A Single Repository Of All The Customer Information To Facilitate Growth Through Improved Business Relationships And Increased Retentions.");
        this.marketing_obtain_useful_subheadding=this.getFieldValue("The Data Obtained Through The Ogoul CRM Software Can Be Instrumental In Taking Data Driven Decisions Which Can Optimize Marketing And Sales. They Help Organizations Enhance Their Marketing Campaigns, Improve Their Sales Performance, And Develop Meaningful Interactions With Customers.");
        this.website_activity_management_subheadding=this.getFieldValue("This Feature Allows Adding Tasks, Updating Tasks, Follow-Up, Appointment, Calls Etc. Activity Management Lets The Company Control All The Activities Taking Place.");
        break;
        case GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_SERVICE:
            this.service_hedding=this.getFieldValue("service");
            this.service_subhedding=this.getFieldValue("Automated Lead Acquisition, Lead Score, Lead Nurture And Lead Assignment.");
            this.service_freetrial=this.getFieldValue("30 days free trial");
            this.service_request_demo=this.getFieldValue("request demo");
            this.service_explore_ogoul_crm=this.getFieldValue("Explore Ogoul CRM Services");
            this.service_automated_lead=this.getFieldValue("Automated Lead Acquisition,");
            this.service_enhance_customer_engagement=this.getFieldValue("Enhance Customer Engagement In A Smart And Cost-Effective Manner");
            this.service_launch_campaigns=this.getFieldValue("Launch, And Track Campaigns");
            this.service_automated_lead_subheadding=this.getFieldValue("Ogoul CRM Marketing Automation Feature Combines Advanced Automation Technologies, Skilful Business Strategies And Efficient Implementation Of Marketing Processes That Helps An Organisation To Acquire, Score And Nurture Leads.");
            this.service_enhance_customer_engagement_subheadding=this.getFieldValue("Deliver Meaningful Customer Experiences At Every Customer Touchpoint Through Customer Journey Automation.");
            this.service_launch_campaigns_subheadding=this.getFieldValue("Ogoul CRM Marketing Automation Feature Allows Businesses To Develop, Launch, And Track Campaigns As Well As Other Promotional Offers To Customers.");
    
            break;
            case GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_SALES:
                this.sales_hedding=this.getFieldValue("Sales Automation And Tracking System");
                this.sales_subhedding=this.getFieldValue("Ogoul Sales Is Focused On Increasing Sales, Tracking Field Work, Enhancing Employees’ Capabilities In A Quick, Transparent And Efficient Way. Ogoul Sales Ensures Systematically Tracking The Vendor’s Needs., Collaborating With Team And Partners And Offering Excellent Customer Service.");
                this.sales_freetrial=this.getFieldValue("30 days free trial");
                this.sales_request_demo=this.getFieldValue("request demo");
                this.sales_explore_ogoul_crm=this.getFieldValue("Explore Ogoul CRM Sales");
                this.sales_increases_efficiency=this.getFieldValue("Ogoul Sales Increases Efficiency, Reduces Cost And Time.");
                this.sales_real_time_update_on_sales=this.getFieldValue("Real-Time Update On Sales Tasks");
                this.sales_deals_by_capturing_leads=this.getFieldValue("Close Deals By Capturing Leads From Various Sources");
                this.sales_increases_efficiency_subheadding=this.getFieldValue("Knowing Where Your Field Staff Are Is Easier Now With Ogoul Sales Tracking Module It Lets You Drill Down To The Present Location Of Every Single Member Of The Field Force Along With Pertinent Information On Their Day’s Schedule And Accomplishments.");
                this.sales_real_time_update_on_sales_subheadding=this.getFieldValue("An App That Can Be Used On The Go With Real Time Updates Would Facilitate Easy Collaboration Among Sales Team, Vendors And The Management. Your Sales Persons Can Document, Edit, And Send Approvals Even From The Vendors Location Or While Waiting For The Next Vendor Meeting To Commence. So, The Management Doesn’t Have To Wait For The Sales Persons To Return To Office And Then Carry Out These Tasks.");
                this.sales_deals_by_capturing_leads_subheadding=this.getFieldValue("Capture Leads From All Sources – Website, Facebook, Google, Referrals – Onto One Platform With Zero Leakage.");
        
                break;
                case GlobalConstants.CRM_LANDING_PAGE.ABOUTUS:
                    this.aboutus_hedding=this.getFieldValue("Enhance Productivity Through Improved Business Processes");
                    this.aboutus_subhedding=this.getFieldValue("Ogoul CRM Software Is Envisioned To Empower An Organization’s Interaction With Its Current And Potential Customers.");
                    this.aboutus_freetrial=this.getFieldValue("30 days free trial");
                    this.aboutus_request_demo=this.getFieldValue("request demo");
                    this.aboutus_crm_benefits=this.getFieldValue("Explore Ogoul CRM Benefits");
                    this.aboutus_single_repository=this.getFieldValue("Single Repository Of All Customer Data");
                    this.aboutus_obtain_useful=this.getFieldValue("Obtain Useful Insights");
                    this.aboutus_activity_management=this.getFieldValue("Activity Management System");
                    this.aboutus_single_repository_subheadding=this.getFieldValue("Ogoul CRM Offers A Single Repository Of All The Customer Information To Facilitate Growth Through Improved Business Relationships And Increased Retentions.");
                    this.aboutus_obtain_useful_subheadding=this.getFieldValue("The Data Obtained Through The Ogoul CRM Software Can Be Instrumental In Taking Data Driven Decisions Which Can Optimize Marketing And Sales. They Help Organizations Enhance Their Marketing Campaigns, Improve Their Sales Performance, And Develop Meaningful Interactions With Customers.");
                    this.aboutus_activity_management_subheadding=this.getFieldValue("This Feature Allows Adding Tasks, Updating Tasks, Follow-Up, Appointment, Calls Etc. Activity Management Lets The Company Control All The Activities Taking Place.");
            
                    break;
                    case GlobalConstants.CRM_LANDING_PAGE.FEATURES:
                    this.ogoul_features_hedding= this.getFieldValue("ogoul crm features");
                    this.ogoul_features_one= this.getFieldValue("multilingual support");
                    this.ogoul_features_two= this.getFieldValue("lead management");
                    this.ogoul_features_three= this.getFieldValue("activity management");
                    this.ogoul_features_four= this.getFieldValue("report management");
                    this.ogoul_features_five= this.getFieldValue("document management");
                    this.ogoul_features_six= this.getFieldValue("proposal management");
                    this.ogoul_features_seven= this.getFieldValue("campaign Management");
                    this.ogoul_features_one_subheadding= this.getFieldValue("The Ogoul CRM Software has multilingual support system. It will initially be available in Arabic and English Languages.");
                    this.ogoul_features_two_subheadding= this.getFieldValue("Manage the entire process of converting prospects into potential customers (leads) by identifying, scoring, and moving leads through the sales pipeline.");
                    this.ogoul_features_three_subheadding= this.getFieldValue("Allows Adding tasks, updating tasks, follow-up, appointment, calls etc.");
                    this.ogoul_features_four_subheadding= this.getFieldValue("Reporting show important insights on an organization’s performances. Instrumental in taking data driven decisions which can optimize marketing and sales.");
                    this.ogoul_features_five_subheadding= this.getFieldValue("Collect, upload, store, and share documents in a centralized location.");
                    this.ogoul_features_six_subheadding= this.getFieldValue("Create and send quotes or proposals to customers.");
                    this.ogoul_features_seven_subheadding= this.getFieldValue("Develop, launch, and track campaigns.");
                    break;
                    case GlobalConstants.CRM_LANDING_PAGE.SERVICES:
                        this.ogoul_services_hedding=this.getFieldValue("ogoul crm services");
                        this.ogoul_services_one=this.getFieldValue("custom-made sales automation");
                        this.ogoul_services_two=this.getFieldValue("marketing automation");
                        this.ogoul_services_three=this.getFieldValue("automation of customer services");
                        this.ogoul_services_four=this.getFieldValue("campaign management");
                        this.ogoul_services_five=this.getFieldValue("contact management");
                        this.ogoul_services_six=this.getFieldValue("lead management");
                        this.ogoul_services_seven=this.getFieldValue("activity Management");
                        this.ogoul_services_one_subheadding=this.getFieldValue("The Ogoul CRM provides real-time updates on the sales team’s location, visits made, vendors contacted, quotes and expense details. It eliminates delays and hindrances as the team can take approvals from anywhere through the use of Ogoul CRM Software.");
                        this.ogoul_services_two_subheadding=this.getFieldValue("The Ogoul CRM software stores contact information such as names, addresses, and social media accounts in a searchable database. Automation of Marketing functions saves resources and helps reach out to new prospects, nurture leads, improve business relationships and increase customer retentions.");
                        this.ogoul_services_three_subheadding=this.getFieldValue("Ogoul CRM software facilitates personalised communication with every customer by automating the customer service process such as trouble-ticketing, customer case tracking, responding to customer enquiry and so on.");
                        this.ogoul_services_four_subheadding=this.getFieldValue("Ogoul CRM’s marketing automation allows businesses to develop, launch, and track campaigns and other marketing offers to customers.");
                        this.ogoul_services_five_subheadding=this.getFieldValue("contact management subheadding");
                        this.ogoul_services_six_subheadding=this.getFieldValue("This feature helps manage the entire process of converting prospects into potential customers (leads) by identifying, scoring, and moving leads through the sales pipeline.");
                        this.ogoul_services_seven_subheadding=this.getFieldValue("The Activity Management feature allows Adding tasks, updating tasks, follow-up, appointment, calls etc. Activity Management lets the company control all the activities taking place.");
    
                        break;
                        case GlobalConstants.CRM_LANDING_PAGE.SUPPORT:
                            this.support_hedding= this.getFieldValue("hello, how we can help you?");
                            this.resources_faq= this.getFieldValue("our frequently asked questions here.");
                            
                            break;
    


        case GlobalConstants.COMPONENT_NAME.CRUD_USER:
            this.field_name_username = this.getFieldValue("username");
            this.field_name_first_name = this.getFieldValue("first_name");
            this.field_name_password = this.getFieldValue("password");
            this.field_name_email = this.getFieldValue("email");
            this.field_name_salutation = this.getFieldValue("salutation");
            this.field_name_usertype = this.getFieldValue("usertype");
            this.field_name_last_name = this.getFieldValue("last_name");
            this.field_name_phone = this.getFieldValue("phone");
            this.field_name_dob = this.getFieldValue("dob");
            this.field_name_created_by =this.getFieldValue("created_by");
            this.field_name_created_time = this.getFieldValue("created_time");
            this.field_name_updated_by = this.getFieldValue("updated_by");
            this.field_name_updated_time = this.getFieldValue("modified_time");
            this.field_name_todate = this.getFieldValue("toDate");
            this.field_name_fromdate = this.getFieldValue("fromDate");
            this.field_name_addusersdetail = this.getFieldValue("addusers");
            this.field_name_actions = this.getFieldValue("actions");
            this.field_name_search = this.getFieldValue("search");
            this.field_name_csv = this.getFieldValue("csv");
            this.field_name_pdf = this.getFieldValue("pdf");
            this.field_name_excel = this.getFieldValue("excel");
            this.field_name_import = this.getFieldValue("import");
            this.field_name_print = this.getFieldValue("print");

            this.field_name_btnuploadcsv = this.getFieldValue("Upload csv btn");
            this.field_name_upload_csv = this.getFieldValue("Upload csv");
            this.field_name_please_upload_csv = this.getFieldValue("Please Upload csv");
             this.field_name_upload_files = this.getFieldValue("Upload files");

            this.field_username_required = this.getFieldRequired("username");
            this.field_usertype_required = this.getFieldRequired("usertype");
            this.field_password_required = this.getFieldRequired("password");
            this.field_email_required = this.getFieldRequired("email");
            this.field_salutation_required = this.getFieldRequired("salutation");
            this.field_first_name_required = this.getFieldRequired("first_name");
            this.field_last_name_required = this.getFieldRequired("last_name");

            break;
            
            case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_DASHBOARD:
            this.field_name_service_Users = this.getFieldValue("Users")
            this.field_name_service_cases = this.getFieldValue("Cases")
            this.field_name_service_customers = this.getFieldValue("Customers")
            this.field_name_service_faq = this.getFieldValue("Faq");
            this.field_name_service_fromdate = this.getFieldValue("fromdate");
            this.field_name_service_todate = this.getFieldValue("todate");
            this.field_name_search= this.getFieldValue("search");
            this.field_name_customers_first_name = this.getFieldValue("first name");
            this.field_name_customers_last_name = this.getFieldValue("last name");
            this.field_name_customers_email= this.getFieldValue("email");
            this.field_name_customers_phone = this.getFieldValue("phone");
            this.field_name_customers_actions = this.getFieldValue("actions");
            this.field_name_faq_questions= this.getFieldValue("questions");
            this.field_name_faq_answers = this.getFieldValue("answers");
            this.field_name_faq_status= this.getFieldValue("status");
            this.field_name_customer_table= this.getFieldValue("customer table");
            this.field_name_faq_table= this.getFieldValue("faq table");
            this.field_name_users_table= this.getFieldValue("users table");
           
            break;





          /*   this.field_username_required = this.getFieldRequired("username");
            this.field_user_type_required = this.getFieldRequired("user_type");
            this.field_password_required = this.getFieldRequired("password");
            this.field_email_required = this.getFieldRequired("email");
            this.field_salutation_required = this.getFieldRequired("salutation");
            this.field_first_name_required = this.getFieldRequired("first_name");
            this.field_middle_name_required = this.getFieldRequired("middle_name");
            this.field_last_name_required = this.getFieldRequired("last_name");
            this.field_full_name_required = this.getFieldRequired("full_name");
            this.field_facebook_id_required = this.getFieldRequired("facebook_id");
            this.field_google_id_required = this.getFieldRequired("google_id");
            this.field_phone_required = this.getFieldRequired("phone");
            this.field_dob_required = this.getFieldRequired("dob");
            this.field_profile_link_required = this.getFieldRequired("profile_link");
            this.field_role_id_required = this.getFieldRequired("role_id");
            this.field_is_otp_required_required = this.getFieldRequired("is_otp_required"); */
          

            case GlobalConstants.COMPONENT_NAME.MARKETING_DASHBOARD:
            this.field_name_marketing_dashboard  = this.getFieldValue("marketing_dashboard");
            this.field_name_marketing_contacts = this.getFieldValue("contacts");
            this.field_name_marketing_customers = this.getFieldValue("customers");
            this.field_name_marketing_campaigns = this.getFieldValue("campaigns");
            this.field_name_marketing_leads = this.getFieldValue("leads");
            this.field_name_marketing_activities = this.getFieldValue("activities");
            this.field_name_marketing_users = this.getFieldValue("users");
            this.field_name_marketing_fromdate = this.getFieldValue("fromdate");
            this.field_name_marketing_todate = this.getFieldValue("todate");
            this.field_name_search= this.getFieldValue("search");

            this.field_name_customers_first_name= this.getFieldValue("first name");
            this.field_name_customers_last_name = this.getFieldValue("last name");
            this.field_name_customers_email= this.getFieldValue("email");
            this.field_name_customers_phone = this.getFieldValue("phone");
            this.field_name_customers_actions= this.getFieldValue("actions");
            this.field_name_campaign_campaign_owner = this.getFieldValue("campaign owner");
            this.field_name_campaign_campaign_name  = this.getFieldValue("campaign name");
            this.field_name_campaign_active = this.getFieldValue("active");
            this.field_name_campaign_status  = this.getFieldValue("status");
            this.field_name_campaign_type  = this.getFieldValue("type");
            this.field_name_activities_record_type = this.getFieldValue("record type");
            this.field_name_activities_subject = this.getFieldValue("subject");
            this.field_name_activities_due_date  = this.getFieldValue("due date");
            this.field_name_contact_table  = this.getFieldValue("contacts table");
            this.field_name_customer_table  = this.getFieldValue("customer table");
            this.field_name_leads_table  = this.getFieldValue("leads table");
            this.field_name_campaign_table  = this.getFieldValue("campaign table");
            this.field_name_activity_table  = this.getFieldValue("activity table");
            this.field_name_users_table  = this.getFieldValue("users table");


            break;

            case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_CASES:
             this.field_name_cases_case_name=this.getFieldValue("case_name")
            this.field_name_cases_description=this.getFieldValue("description")
            this.field_name_cases_priority=this.getFieldValue("priority")
            
            this.field_name_cases_customer_name=this.getFieldValue("customer_name")
            this.field_name_cases_mobile=this.getFieldValue("mobile")
            this.field_name_cases_email=this.getFieldValue("email")
            this.field_name_cases_activity_type=this.getFieldValue("activity type")
            this.field_name_cases_created_by=this.getFieldValue("created_by")
            this.field_name_cases_created_time=this.getFieldValue("created_time")
            this.field_name_cases_updated_by=this.getFieldValue("updated_by")
            this.field_name_cases_updated_time =this.getFieldValue("modified_time")
            this.field_name_cases_todate =this.getFieldValue("toDate");
            this.field_name_cases_fromdate =this.getFieldValue("fromDate");
            this.field_name_cases_addcases =this.getFieldValue("add cases");
            this.field_name_cases_actions =this.getFieldValue("actions");
            this.field_name_cases_search =this.getFieldValue("search");
            this.field_name_cases_csv =this.getFieldValue("csv");
            this.field_name_cases_pdf =this.getFieldValue("pdf");
            this.field_name_cases_excel =this.getFieldValue("excel");
            this.field_name_cases_import =this.getFieldValue("import");
            this.field_name_cases_print =this.getFieldValue("print");
            this.field_name_cases_details =this.getFieldValue("case details");
            this.field_name_cases_casesinfo =this.getFieldValue("case info");

            break; 


case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_TICKETING:

    this.field_name_service_ticketing_escalation_to_email= this.getFieldValue("escalation to email");
    this.field_name_service_ticketing_comments= this.getFieldValue("comments");
    this.field_name_service_ticketing_add_escalation= this.getFieldValue("Add escalation");
    this.field_name_service_ticketing_add_btn_escalation= this.getFieldValue("btn_escalation");
    this.field_name_service_ticketing_file_upload= this.getFieldValue("file upload");
    this.field_name_service_ticketing_description= this.getFieldValue("description");
    this.field_name_service_ticketing_subject= this.getFieldValue("subject");
    this.field_name_service_ticketing_name= this.getFieldValue("name");
    this.field_name_service_ticketing_email= this.getFieldValue("email");
    this.field_name_service_ticketing_Assigned_Users= this.getFieldValue("Assigned_Users");
this.field_name_service_ticketing_Escalation= this.getFieldValue("Escalation");
this.field_name_service_ticketing_update= this.getFieldValue("update");
this.field_name_service_ticketing_created_by= this.getFieldValue("created_by");
this.field_name_service_ticketing_created_time= this.getFieldValue("created_time");
this.field_name_service_ticketing_updated_by= this.getFieldValue("updated_by");
this.field_name_service_ticketing_updated_time = this.getFieldValue("modified_time");
this.field_name_service_ticketing_todate = this.getFieldValue("todate");
this.field_name_service_ticketing_fromdate = this.getFieldValue("fromdate");
this.field_name_service_ticketing_add_ticketing = this.getFieldValue("add service ticketing");
this.field_name_service_ticketing_actions = this.getFieldValue("actions");
this.field_name_service_ticketing_search = this.getFieldValue("search");
this.field_name_service_ticketing_csv = this.getFieldValue("csv");
this.field_name_service_ticketing_pdf = this.getFieldValue("pdf");
this.field_name_service_ticketing_excel = this.getFieldValue("excel");
this.field_name_service_ticketing_import = this.getFieldValue("import");
this.field_name_service_ticketing_print = this.getFieldValue("print");
this.field_name_service_ticketing_details = this.getFieldValue("details");
this.field_name_service_ticketing_service_info = this.getFieldValue("service_ticketing_info");

this.field_name_service_ticketing_status  = this.getFieldValue("status");
this.field_name_service_ticketing_Closed = this.getFieldValue("closed");
this.field_name_service_ticketing_On_Hold = this.getFieldValue("on hold");
this.field_name_service_ticketing_Created  = this.getFieldValue("created");
this.field_name_service_ticketing_In_Progress  = this.getFieldValue("In progress");


            case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_FAQ:

            this.field_name_faq_questions=this.getFieldValue("questions")
            this.field_name_faq_answers=this.getFieldValue("answers")
            this.field_name_faq_status=this.getFieldValue("status")
            this.field_name_faq_update=this.getFieldValue("update")
            this.field_name_faq_created_by=this.getFieldValue("created_by")
            this.field_name_faq_created_time=this.getFieldValue("created_time")
            this.field_name_faq_updated_by=this.getFieldValue("updated_by")
            this.field_name_faq_updated_time =this.getFieldValue("modified_time")
            this.field_name_faq_todate =this.getFieldValue("toDate")
            this.field_name_faq_fromdate =this.getFieldValue("fromDate")
            this.field_name_faq_addfaq =this.getFieldValue("add faq")
            this.field_name_faq_actions =this.getFieldValue("actions")
            this.field_name_faq_search =this.getFieldValue("search")
            this.field_name_faq_csv =this.getFieldValue("csv")
            this.field_name_faq_pdf =this.getFieldValue("pdf")
            this.field_name_faq_excel =this.getFieldValue("excel")
            this.field_name_faq_import =this.getFieldValue("import")
            this.field_name_faq_print =this.getFieldValue("print")
            this.field_name_faq_details =this.getFieldValue("faq details")
            this.field_name_faq_faqinfo =this.getFieldValue("faq info")
            this.field_name_faq_btnuploadCsv =this.getFieldValue("upload csv")
            this.field_name_faq_upload_Csv =this.getFieldValue("Upload csv")
            this.field_name_faq_upload_Csvfile =this.getFieldValue("Upload csv file")
            this.field_name_faq_pleaseupload_Csvfile=this.getFieldValue("Please Upload file")
            break;

     /*    case CustomGlobalConstants.COMPONENT_NAME.CRUD_PERMISSION:
            this.field_permission_id = this.getFieldValue("permission_id");
            this.field_permission_name = this.getFieldValue("permission_name");
            this.field_details = this.getFieldValue("details");
            this.field_remarks = this.getFieldValue("remarks");

            this.field_permission_id_required = this.getFieldRequired("permission_id");
            this.field_permission_name_required = this.getFieldRequired("permission_name");
            this.field_details_required = this.getFieldRequired("details");
            this.field_remarks_required = this.getFieldRequired("remarks");
            break; */


            case GlobalConstants.COMPONENT_NAME.MARKETING_CONTACTS:
                    this.field_name_marketing_salutation= this.getFieldValue("salutation");
                    this.field_name_marketing_first_name =this.getFieldValue("first_name");
                    this.field_name_marketing_last_name =this.getFieldValue("last_name");
                    this.field_name_marketing_phone =this.getFieldValue("phone");
                     this.field_name_marketing_email =this.getFieldValue("email");
                    this.field_name_marketing_home_phone =this.getFieldValue("home_phone");
                    this.field_name_marketing_account_number =this.getFieldValue("account_number");
                    this.field_name_marketing_title =this.getFieldValue("title");
                    this.field_name_marketing_department =this.getFieldValue("department");
                    this.field_name_marketing_Fax =this.getFieldValue("fax");
                    this.field_name_marketing_DOB =this.getFieldValue("DOB");
                    this.field_name_marketing_source =this.getFieldValue("source");
                    this.field_name_marketing_mailing_address =this.getFieldValue("mailing_address");
                    this.field_name_marketing_other_address =this.getFieldValue("other_address");
                    this.field_name_marketing_mailing_city =this.getFieldValue("mailing_city");
                    this.field_name_marketing_mailing_state =this.getFieldValue("mailing_state");
                    this.field_name_marketing_mailing_Postal_code =this.getFieldValue("mailing_Postal_code");
                    this.field_name_marketing_mailing_country =this.getFieldValue("mailing_country");
                    this.field_name_marketing_description =this.getFieldValue("description");
                    this.field_name_marketing_type_of_contacts =this.getFieldValue("type_of_contacts");
                    this.field_name_marketing_files = this.getFieldValue("files");
                    this.field_name_marketing_todate = this.getFieldValue("toDate");
                    this.field_name_marketing_fromdate = this.getFieldValue("fromDate");
                    this.field_name_marketing_addcontacts = this.getFieldValue("addcontacts");
                    this.field_name_marketing_actions = this.getFieldValue("actions");
                    this.field_name_marketing_search = this.getFieldValue("search");
                    this.field_name_marketing_csv = this.getFieldValue("csv");
                    this.field_name_marketing_pdf = this.getFieldValue("pdf");
                    this.field_name_marketing_excel = this.getFieldValue("excel");
                    this.field_name_marketing_import = this.getFieldValue("import");
                    this.field_name_marketing_print = this.getFieldValue("print");
                    this.field_name_marketing_created_by = this.getFieldValue("created_by");
                    this.field_name_marketing_created_time = this.getFieldValue("created_time");
                    this.field_name_marketing_updated_by = this.getFieldValue("updated_by");
                    this.field_name_marketing_updated_time  = this.getFieldValue("modified_time");
                  
                    this.field_name_marketing_contactdetails = this.getFieldValue("contactdetails");
                    this.field_name_marketing_add = this.getFieldValue("add");
                    this.field_name_marketing_update = this.getFieldValue("update");
                    this.field_name_marketing_contact_info = this.getFieldValue("contact_info");
                    this.field_name_marketing_address_info= this.getFieldValue("address_info");
                    this.field_name_marketing_other_info = this.getFieldValue("other_info");
                    this.field_name_marketing_activity_info= this.getFieldValue("activity_info");
                    this.field_name_marketing_convert_to_lead = this.getFieldValue("convert_to_lead");
                    this.field_name_marketing_activity_type =this.getFieldValue("activity_type");
                    this.field_name_marketing_subject =this.getFieldValue("subject");
                   this.field_name_marketing_due_date = this.getFieldValue("due_date");
                    this.field_name_marketing_activity_actions = this.getFieldValue("activity_actions");

                    this.field_name_marketing_btnuploadCsv= this.getFieldValue("Upload csv btn");
                    this.field_name_marketing_opportunity_percentage = this.getFieldValue("opportunity percentage");
                   this.field_name_marketing_company_name  = this.getFieldValue("company_name");
                   this.field_name_marketing_linked_in_url  = this.getFieldValue("linked_in_url");
                    this.field_name_marketing_upload_Csv = this.getFieldValue("Upload Csv");
                    this.field_name_marketing_upload_Csvfile = this.getFieldValue("Upload csv file");
                    this.field_name_marketing_pleaseupload_Csvfile = this.getFieldValue("Please Upload file");
                    break;
    



case GlobalConstants.COMPONENT_NAME.MARKETING_LEADS:
this.field_name_leads_salutation = this.getFieldValue("salutation");
this.field_name_leads_first_name  = this.getFieldValue("first_name");
this.field_name_leads_last_name  = this.getFieldValue("last_name");
this.field_name_leads_phone  = this.getFieldValue("phone");
this.field_name_leads_email  = this.getFieldValue("email");
this.field_name_leads_home_phone  = this.getFieldValue("home_phone");
this.field_name_leads_account_number = this.getFieldValue("account_number");
this.field_name_leads_title  = this.getFieldValue("title");
this.field_name_leads_department  = this.getFieldValue("department");
this.field_name_leads_Fax  = this.getFieldValue("fax");
this.field_name_leads_DOB  = this.getFieldValue("DOB");
this.field_name_leads_source  = this.getFieldValue("source");
this.field_name_leads_mailing_address  = this.getFieldValue("mailing_address");
this.field_name_leads_other_address = this.getFieldValue("other_address");
this.field_name_leads_mailing_city = this.getFieldValue("mailing_city");
this.field_name_leads_mailing_state  = this.getFieldValue("mailing_state");
this.field_name_leads_mailing_Postal_code  = this.getFieldValue("mailing_Postal_code");
this.field_name_leads_mailing_country  = this.getFieldValue("mailing_country");
this.field_name_leads_description  = this.getFieldValue("description");
this.field_name_leads_files  = this.getFieldValue("files");
this.field_name_leads_todate  = this.getFieldValue("todate");
this.field_name_leads_fromdate  = this.getFieldValue("fromdate");
this.field_name_leads_addleads  = this.getFieldValue("addleads");
this.field_name_leads_actions = this.getFieldValue("actions");
this.field_name_leads_search  = this.getFieldValue("search");
this.field_name_leads_csv  = this.getFieldValue("csv");
this.field_name_leads_pdf  = this.getFieldValue("pdf");
this.field_name_leads_excel  = this.getFieldValue("excel");
this.field_name_leads_import = this.getFieldValue("import");
this.field_name_leads_print  = this.getFieldValue("print");
this.field_name_leads_created_by  = this.getFieldValue("created_by");
this.field_name_leads_created_time  = this.getFieldValue("created_time");
this.field_name_leads_updated_by  = this.getFieldValue("updated_by");
this.field_name_leads_updated_time  = this.getFieldValue("modified_time");
this.field_name_leads_leaddetails  = this.getFieldValue("leaddetails");
this.field_name_leads_add  = this.getFieldValue("add");
this.field_name_leads_update  = this.getFieldValue("update");
this.field_name_leads_contact_info = this.getFieldValue("contact_info");
this.field_name_leads_address_info  = this.getFieldValue("address_info");
this.field_name_leads_other_info  = this.getFieldValue("other_info");
this.field_name_leads_activity_info = this.getFieldValue("activity_info");
this.field_name_marketing_convert_to_customer  = this.getFieldValue("convert_to_customer");
this.field_name_leads_activity_type  = this.getFieldValue("activity_type");
this.field_name_leads_subject  = this.getFieldValue("subject");
this.field_name_leads_due_date  = this.getFieldValue("due_date");
this.field_name_leads_activity_actions  = this.getFieldValue("activity_actions");
this.field_name_leads_notes_attachments  = this.getFieldValue("notes_attachments");
this.field_name_leads_btnuploadCsv= this.getFieldValue("Upload Csv");
 this.field_name_leads_opportunity_percentage= this.getFieldValue("opportunity percentage");
 this.field_name_leads_upload_Csv = this.getFieldValue("Upload Csv files");
 this.field_name_leads_upload_Csvfile = this.getFieldValue("Upload files");
 this.field_name_leads_pleaseupload_Csvfile  = this.getFieldValue("Please Upload file");
 this.field_name_leads_company_name= this.getFieldValue("company_name");
 this.field_name_leads_linked_in_url = this.getFieldValue("linked_in_url");

break;


case GlobalConstants.COMPONENT_NAME.MARKETING_CUSTOMER:
this.field_name_customers_salutation = this.getFieldValue("salutation");
this.field_name_customers_first_name  = this.getFieldValue("first_name");
this.field_name_customers_last_name  = this.getFieldValue("last_name");
this.field_name_customers_phone  = this.getFieldValue("phone");
this.field_name_customers_email  = this.getFieldValue("email");
this.field_name_customers_home_phone  = this.getFieldValue("home_phone");
this.field_name_customers_account_number = this.getFieldValue("account_number");
this.field_name_customers_title  = this.getFieldValue("title");
this.field_name_customers_department  = this.getFieldValue("department");
this.field_name_customers_Fax  = this.getFieldValue("fax");
this.field_name_customers_DOB  = this.getFieldValue("DOB");
this.field_name_customers_source  = this.getFieldValue("source");
this.field_name_customers_mailing_address  = this.getFieldValue("mailing_address");
this.field_name_customers_other_address = this.getFieldValue("other_address");
this.field_name_customers_mailing_city = this.getFieldValue("mailing_city");
this.field_name_customers_mailing_state  = this.getFieldValue("mailing_state");
this.field_name_customers_mailing_Postal_code  = this.getFieldValue("mailing_Postal_code");
this.field_name_customers_mailing_country  = this.getFieldValue("mailing_country");
this.field_name_customers_description  = this.getFieldValue("description");

this.field_name_customers_files  = this.getFieldValue("files");
this.field_name_customers_todate  = this.getFieldValue("todate");
this.field_name_customers_fromdate  = this.getFieldValue("fromdate");
this.field_name_customers_addcustomers  = this.getFieldValue("addcustomers");
this.field_name_customers_actions = this.getFieldValue("actions");
this.field_name_customers_search  = this.getFieldValue("search");
this.field_name_customers_csv  = this.getFieldValue("csv");
this.field_name_customers_pdf  = this.getFieldValue("pdf");
this.field_name_customers_excel  = this.getFieldValue("excel");
this.field_name_customers_import = this.getFieldValue("import");
this.field_name_customers_print  = this.getFieldValue("print");
this.field_name_customers_created_by  = this.getFieldValue("created_by");
this.field_name_customers_created_time  = this.getFieldValue("created_time");
this.field_name_customers_updated_by  = this.getFieldValue("updated_by");
this.field_name_customers_updated_time  = this.getFieldValue("modified_time");
this.field_name_customers_customersdetails  = this.getFieldValue("customersdetails");
this.field_name_customers_add  = this.getFieldValue("add");
this.field_name_customers_update  = this.getFieldValue("update");
this.field_name_customers_contact_info = this.getFieldValue("contact_info");
this.field_name_customers_address_info  = this.getFieldValue("address_info");
this.field_name_customers_other_info  = this.getFieldValue("other_info");
this.field_name_customers_activity_info = this.getFieldValue("activity_info");

this.field_name_customers_activity_type  = this.getFieldValue("activity_type");
this.field_name_customers_subject  = this.getFieldValue("subject");
this.field_name_customers_due_date  = this.getFieldValue("due_date");
this.field_name_customers_activity_actions  = this.getFieldValue("activity_actions");
this.field_name_customers_notes_attachments  = this.getFieldValue("notes_attachments");

this.field_name_customers_opportunity_percentage =this.getFieldValue("opportunity_percentage");
this.field_name_customers_btnuploadcsv =this.getFieldValue("upload csv");
this.field_name_customers_upload_files =this.getFieldValue("upload files");
this.field_name_customers_upload_attachments =this.getFieldValue("upload attachments");
this.field_name_customers_upload_csv =this.getFieldValue("upload csv");
 this.field_name_customers_please_upload_csv=this.getFieldValue("please upload csv");
 this.field_name_customers_file=this.getFieldValue("file");
 this.field_name_customers_file_title=this.getFieldValue("file title");
 this.field_name_customers_Id=this.getFieldValue("Id");
 this.field_name_customers_size=this.getFieldValue("size");
 this.field_name_customers_file_name=this.getFieldValue("file name");
 this.field_name_customers_download=this.getFieldValue("download");
 this.field_name_customers_company_name =this.getFieldValue("company_name");
 this.field_name_customers_linked_in_url=this.getFieldValue("linked_in_url");



break

case GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS:
    this.field_name_campaign_info= this.getFieldValue("campaign_info")
    this.field_name_campaign_campaign_owner= this.getFieldValue("campaign_owner");
    this.field_name_campaign_campaign_name= this.getFieldValue("campaign_name");
    this.field_name_campaign_active= this.getFieldValue("active");
    this.field_name_campaign_files = this.getFieldValue("files");
    this.field_name_campaign_type = this.getFieldValue("type");
    this.field_name_campaign_status= this.getFieldValue("status");
    this.field_name_campaign_start_date = this.getFieldValue("start_date");
    this.field_name_campaign_end_date = this.getFieldValue("end_date");
    this.field_name_campaign_expected_revenue_in_campaign = this.getFieldValue("expected_revenue_in_campaign");
    this.field_name_campaign_budgeted_cost_in_campaign = this.getFieldValue("budgeted_cost_in_campaign");
    this.field_name_campaign_actual_cost_in_campaign = this.getFieldValue("actual_cost_in_campaign");
    this.field_name_campaign_expected_response_percent = this.getFieldValue("expected_response_percent");
    this.field_name_campaign_description_info = this.getFieldValue("description_info");
    this.field_name_campaign_todate = this.getFieldValue("todate");
    this.field_name_campaign_fromdate = this.getFieldValue("fromdate");
this.field_name_campaign_addcampaign = this.getFieldValue("addcampaign");
this.field_name_campaign_actions = this.getFieldValue("actions");
this.field_name_campaign_search = this.getFieldValue("search");
this.field_name_campaign_csv = this.getFieldValue("csv");
this.field_name_campaign_pdf = this.getFieldValue("pdf");
this.field_name_campaign_excel = this.getFieldValue("excel");
this.field_name_campaign_import = this.getFieldValue("import");
this.field_name_campaign_print = this.getFieldValue("print");
this.field_name_campaign_created_by = this.getFieldValue("created_by");
this.field_name_campaign_created_time = this.getFieldValue("created_time");
this.field_name_campaign_updated_by = this.getFieldValue("updated_by");
this.field_name_campaign_updated_time  = this.getFieldValue("modified_time");
this.field_name_campaign_campaigndetails= this.getFieldValue("campaigndetails");
this.field_name_campaign_add = this.getFieldValue("add");
this.field_name_campaign_update = this.getFieldValue("update");
this.field_name_campaign_activity_info= this.getFieldValue("activity_info");
this.field_name_campaign_activity_type =this.getFieldValue("activity_type");
this.field_name_campaign_subject =this.getFieldValue("subject");
this.field_name_campaign_due_date = this.getFieldValue("due_date");
this.field_name_campaign_activity_actions = this.getFieldValue("activity_actions");
this.field_name_campaign_notes_attachments  = this.getFieldValue("notes_attachments");
this.field_name_campaign_btnuploadcsv =this.getFieldValue("upload csv");
this.field_name_campaign_upload_files =this.getFieldValue("upload files");
this.field_name_campaign_upload_attachments =this.getFieldValue("upload attachments");
this.field_name_campaign_upload_csv =this.getFieldValue("upload csv");
 this.field_name_campaign_please_upload_csv=this.getFieldValue("please upload csv");
 this.field_name_campaign_file=this.getFieldValue("file");
 this.field_name_campaign_file_title=this.getFieldValue("file title");
 this.field_name_campaign_Id=this.getFieldValue("Id");
 this.field_name_campaign_size=this.getFieldValue("size");
 this.field_name_campaign_file_name=this.getFieldValue("file name");
 this.field_name_campaign_download=this.getFieldValue("download");
 this.field_name_campaign_closed=this.getFieldValue("closed");
 this.field_name_campaign_on_hold=this.getFieldValue("on hold");
 this.field_name_campaign_in_progress=this.getFieldValue("in progress");
 this.field_name_campaign_created=this.getFieldValue("created");

break;


case GlobalConstants.COMPONENT_NAME.MARKETING_ACTIVITIES:
    this.field_name_activities_subject= this.getFieldValue("subject");
    this.field_name_activities_due_date = this.getFieldValue("due_date");
    this.field_name_activities_task_name = this.getFieldValue("task_name");
    this.field_name_customers_first_name  = this.getFieldValue("customer first name");

this.field_name_customers_phone  = this.getFieldValue("customer phone");
this.field_name_customers_email  = this.getFieldValue("customer email");
this.field_name_leads_first_name  = this.getFieldValue("lead first name");

this.field_name_leads_phone  = this.getFieldValue("lead phone");
this.field_name_leads_email  = this.getFieldValue("lead email");
    this.field_name_activities_status = this.getFieldValue("status");
    this.field_name_activities_comments = this.getFieldValue("comments") ;
    this.field_name_activities_call_dec = this.getFieldValue("call_dec");
    this.field_name_activities_activity_type = this.getFieldValue("activity_type");
    this.field_name_activities_selectedActivityType = this.getFieldValue("selectedActivityType");
    this.field_name_activities_record_type = this.getFieldValue("record_type");
    this.field_name_activities_add = this.getFieldValue("add");
    this.field_name_activities_update = this.getFieldValue("update");
    this.field_name_activities_created_by  = this.getFieldValue("created_by");
    this.field_name_activities_created_time  = this.getFieldValue("created_time");
    this.field_name_activities_updated_by  = this.getFieldValue("updated_by");
    this.field_name_activities_updated_time  = this.getFieldValue("modified_time");
    this.field_name_activities_todate = this.getFieldValue("todate");
    this.field_name_activities_fromdate = this.getFieldValue("fromdate");
    this.field_name_activities_addactivity = this.getFieldValue("addactivity");
    this.field_name_activities_actions = this.getFieldValue("actions");
    this.field_name_activities_search = this.getFieldValue("search");
    this.field_name_activities_csv = this.getFieldValue("csv");
    this.field_name_activities_pdf = this.getFieldValue("pdf");
    this.field_name_activities_excel = this.getFieldValue("excel");
    this.field_name_activities_import = this.getFieldValue("import");
    this.field_name_activities_print = this.getFieldValue("print");
    this.field_name_activities_activities_details = this.getFieldValue("activities_details");
    this.field_name_activities_end_date = this.getFieldValue("end_date");

break;


case GlobalConstants.SALES_COMPONENT_NAME.SALES_DASHBOARD:

this.field_name_sales_deals = this.getFieldValue("deals");
this.field_name_sales_customers = this.getFieldValue("customers");
this.field_name_sales_products= this.getFieldValue("products");
this.field_name_sales_users= this.getFieldValue("users");
this.field_name_sales_quotes= this.getFieldValue("quotes");
this.field_name_sales_leads= this.getFieldValue("leads");
this.field_name_sales_visits= this.getFieldValue("add visits");
this.field_name_sales_Shedule_visits= this.getFieldValue("schedule visits");
this.field_name_sales_fromdate= this.getFieldValue("fromdate");
this.field_name_sales_todate= this.getFieldValue("todate");
this.field_name_search= this.getFieldValue("search");

this.field_name_customers_first_name =  this.getFieldValue("first name");
this.field_name_customers_last_name =  this.getFieldValue("last name");
this.field_name_customers_email =  this.getFieldValue("email");
this.field_name_customers_phone=  this.getFieldValue("phone");
this.field_name_customers_actions=  this.getFieldValue("actions");
this.field_name_customer_table =  this.getFieldValue("customer table");
this.field_name_deals_deal_name =  this.getFieldValue("deal name");
this.field_name_deals_amount =  this.getFieldValue("deal amount ");
this.field_name_deals_expected_date =  this.getFieldValue("expected close date");
this.field_name_deals_sales_stage =  this.getFieldValue("sales stage");
this.field_name_deals_assigned_to =  this.getFieldValue("deals assigned");
this.field_name_deals_status =  this.getFieldValue("deals status");
this.field_name_deals_product_name =  this.getFieldValue("deals product name");
this.field_name_cost =  this.getFieldValue("cost");
this.field_name_supplier_name =  this.getFieldValue("supplier name");
this.field_name_quotes_customername =  this.getFieldValue("customer name");
this.field_name_quotes_quotationdate =  this.getFieldValue("quotation date");
this.field_name_quotes_quotation_id =this.getFieldValue("quote id");
this.field_name_quotes_productname =  this.getFieldValue("quotes product name");
this.field_name_product_name=  this.getFieldValue("product name");
this.field_name_product_currency=  this.getFieldValue("currency");
this.field_name_shedule_visits_salesemail =  this.getFieldValue("sales email");
this.field_name_shedule_visits_customer_name=  this.getFieldValue("visit customer name");
this.field_name_shedule_visits_created_by =  this.getFieldValue("created by");
this.field_name_shedule_visits_date =  this.getFieldValue("visits date");
this.field_name_shedule_visits_time =  this.getFieldValue("visits time");
this.field_name_deals_table =  this.getFieldValue("deals table");
this.field_name_products_table =  this.getFieldValue("products table");
this.field_name_quotes_table =  this.getFieldValue("quotes table");
this.field_name_users_table =  this.getFieldValue("users table");
this.field_name_leads_table =  this.getFieldValue("leads table");
this.field_name_schedule_table =  this.getFieldValue("schedule visits table");
this.field_name_visits_table =  this.getFieldValue("visits table");


break;



case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_DASHBOARD:

    this.field_name_inventory_customers = this.getFieldValue("customers");
    this.field_name_inventory_stock_products= this.getFieldValue("stock_products");
    this.field_name_inventory_users= this.getFieldValue("users");
    this.field_name_inventory_suppliers= this.getFieldValue("suppliers");
    this.field_name_inventory_returns= this.getFieldValue("returns");
    this.field_name_inventory_expenses= this.getFieldValue("expenses");
    this.field_name_inventory_purchase= this.getFieldValue("purchase");
    this.field_name_inventory_invoices= this.getFieldValue("invoices");
    this.field_name_inventory_fromdate= this.getFieldValue("fromdate");
    this.field_name_inventory_todate= this.getFieldValue("todate");
    this.field_name_search = this.getFieldValue("search");
    this.field_name_customers_first_name =  this.getFieldValue("first name");
    this.field_name_customers_last_name =  this.getFieldValue("last name");
    this.field_name_customers_email =  this.getFieldValue("email");
    this.field_name_customers_phone=  this.getFieldValue("phone");
    this.field_name_customers_actions=  this.getFieldValue("actions");
    this.field_name_deals_deal_name=  this.getFieldValue("deal name");
    this.field_name_deals_amount=  this.getFieldValue("amount");
    this.field_name_deals_expected_date  =  this.getFieldValue("expected close date");
    this.field_name_deals_sales_stage =  this.getFieldValue("salesstage name");
    this.field_name_deals_assigned_to =  this.getFieldValue("assigned to");
    this.field_name_deals_status =  this.getFieldValue("status");
    this.field_name_deals_product_name =  this.getFieldValue("product name");
    this.field_name_cost=  this.getFieldValue("cost");
    this.field_name_supplier_name  =  this.getFieldValue("supplier name");
    this.field_name_quotes_customername =  this.getFieldValue("customer name");
    this.field_name_quotes_quotationdate =  this.getFieldValue("date");
    this.field_name_quotes_productname =  this.getFieldValue("product name");
    this.field_name_product_name =  this.getFieldValue("product name");
    this.field_name_shedule_visits_salesemail =  this.getFieldValue("sales mail");
    this.field_name_shedule_visits_customer_name =  this.getFieldValue("customer name");
    this.field_name_shedule_visits_created_by =  this.getFieldValue("created by");
    this.field_name_shedule_visits_date =  this.getFieldValue("date");
    this.field_name_shedule_visits_time =  this.getFieldValue("time");
    this.field_name_product_currency = this.getFieldValue("currency");
    this.field_name_products_table = this.getFieldValue("product table");
    this.field_name_customer_table = this.getFieldValue("customer table");
    this.field_name_supplier_table = this.getFieldValue("supplier table");
    this.field_name_purchases_table = this.getFieldValue("purchase table");
    this.field_name_return_table = this.getFieldValue("return table");
    this.field_name_invoice_table = this.getFieldValue("invoice table");
    
break;



case GlobalConstants.COMPONENT_NAME.MARKETING_HISTORY:
    this.field_name_marketing_history_todate = this.getFieldValue("todate");
    this.field_name_marketing_history_fromdate = this.getFieldValue("fromdate");
    this.field_name_marketing_history_search= this.getFieldValue("search");
    this.field_name_marketing_history_email = this.getFieldValue("email");
   this.field_name_marketing_history_date = this.getFieldValue("date");
   this.field_name_marketing_history_action = this.getFieldValue("action");
   this.field_name_marketing_history_csv = this.getFieldValue("csv");
    
    break;


    case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER:

    this.field_name_supplier_name= this.getFieldValue("supplier_name");
    this.field_name_supplier_email= this.getFieldValue("supplier_email");
    this.field_name_supplier_phone= this.getFieldValue("supplier_phone");
    this.field_name_supplier_address =this.getFieldValue("supplier_address")
    this.field_name_supplier_product_name= this.getFieldValue("supplier_product");
    this.field_name_supplier_pricing= this.getFieldValue("supplier_pricing");
    this.field_name_supplier_payment= this.getFieldValue("supplier_payment");
    this.field_name_supplier_update= this.getFieldValue("supplier_update");
    this.field_name_supplier_created_by= this.getFieldValue("created_by");
    this.field_name_supplier_created_time= this.getFieldValue("created_time");
    this.field_name_supplier_updated_by= this.getFieldValue("updated_by");
    this.field_name_supplier_updated_time= this.getFieldValue("modified_time");
    this.field_name_supplier_todate= this.getFieldValue("todate");
    this.field_name_supplier_fromdate= this.getFieldValue("fromdate");
    this.field_name_supplier_addsupplier= this.getFieldValue("addsupplier");
    this.field_name_supplier_actions= this.getFieldValue("actions");
    this.field_name_supplier_search= this.getFieldValue("search");
    this.field_name_supplier_csv= this.getFieldValue("csv");
    this.field_name_supplier_btnuploadcsv = this.getFieldValue("import");
    this.field_name_supplier_upload_files = this.getFieldValue("upload files");
    this.field_name_supplier_pdf= this.getFieldValue("pdf");
    this.field_name_supplier_excel= this.getFieldValue("excel");
    this.field_name_supplier_import= this.getFieldValue("import");
    this.field_name_supplier_print= this.getFieldValue("print");
    this.field_name_supplier_details= this.getFieldValue("details");
    this.field_name_supplier_supplierinfo= this.getFieldValue("supplierinfo");

break;



case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_INVOICE:
this.field_name_invoice_name= this.getFieldValue("invoice_name");
this.field_name_invoice_date = this.getFieldValue("date");

this.field_name_invoice_product_category=this.getFieldValue("product_category");
this.field_name_invoice_product_rate=this.getFieldValue("product_rate");
this.field_name_invoice_product_total=this.getFieldValue("product_total");
this.field_name_invoice_product_actual_rate=this.getFieldValue("product_actual_rate");
this.field_name_invoice_product_quantity=this.getFieldValue("product_quantity");
this.field_name_invoice_product_discount=this.getFieldValue("product_discount");
this.field_name_invoice_mobile = this.getFieldValue("mobile");
this.field_name_invoice_product_name =this.getFieldValue("product_name");
this.field_name_invoice_customer_name =this.getFieldValue("customer_name");
this.field_name_invoice_update= this.getFieldValue("update");
this.field_name_invoice_created_by= this.getFieldValue("created_by");
this.field_name_invoice_created_time= this.getFieldValue("created_time");
this.field_name_invoice_updated_by= this.getFieldValue("updated_by");
this.field_name_invoice_updated_time = this.getFieldValue("modified_time");
this.field_name_invoice_todate = this.getFieldValue("todate");
this.field_name_invoice_fromdate = this.getFieldValue("fromdate");
this.field_name_invoice_addinvoice = this.getFieldValue("add_invoice");
this.field_name_invoice_btnuploadcsv = this.getFieldValue("import");
this.field_name_invoice_upload_files = this.getFieldValue("upload files");
this.field_name_invoice_please_upload_csv = "Please Upload CSV";
this.field_name_invoice_actions = this.getFieldValue("actions");
this.field_name_invoice_search = this.getFieldValue("search");
this.field_name_invoice_csv = this.getFieldValue("csv");
this.field_name_invoice_pdf = this.getFieldValue("pdf");
this.field_name_invoice_excel = this.getFieldValue("excel");
this.field_name_invoice_import = this.getFieldValue("import");
this.field_name_invoice_print = this.getFieldValue("print");
this.field_name_invoice_details = this.getFieldValue("details");
this.field_name_invoice_invoiceinfo = this.getFieldValue("invoice_info");
this.field_name_invoice_total_invoices = this.getFieldValue("total_invoices");
this.field_name_invoice_total_amount = this.getFieldValue("total_amount");
break;

 case GlobalConstants.SALES_COMPONENT_NAME.SALES_PRODUCT:
    this.field_name_product_name = this.getFieldValue("product_name");
    this.field_name_product_currency = this.getFieldValue("currency");

    this.field_name_code=  this.getFieldValue("product_code");
this.field_name_weight = this.getFieldValue("product_Weight");
this.field_name_stock=this.getFieldValue("Stock");
this.field_name_availability= this.getFieldValue("Availability");
this.field_name_cost= this.getFieldValue("cost");

this.field_name_supplier_name= this.getFieldValue("supplier_name");
this.field_name_category_name =this.getFieldValue("category_name");
this.field_name_files =this.getFieldValue("files");
this.field_name_product_created_by=this.getFieldValue("created_by")
this.field_name_product_created_time=this.getFieldValue("created_time")
this.field_name_product_updated_by=this.getFieldValue("updated_by")
this.field_name_product_updated_time =this.getFieldValue("modified_time")
this.field_name_product_todate =this.getFieldValue("todate")
this.field_name_product_fromdate =this.getFieldValue("fromdate")
this.field_name_product_addproduct =this.getFieldValue("addproduct")
this.field_name_product_actions =this.getFieldValue("actions")
this.field_name_product_search =this.getFieldValue("search")
this.field_name_product_csv =this.getFieldValue("csv")
this.field_name_product_pdf =this.getFieldValue("pdf")
this.field_name_product_excel =this.getFieldValue("excel")
this.field_name_product_import =this.getFieldValue("import")
this.field_name_product_print =this.getFieldValue("print")
this.field_name_product_details =this.getFieldValue("details")
this.field_name_product_productinfo =this.getFieldValue("product_info")
this.field_name_product_uploadcsv = this.getFieldValue("uploadcsv");

this.field_product_name_required =this.getFieldRequired("product_name");
this.field_cost_required =this.getFieldRequired("cost");
this.field_supplier_name_required =this.getFieldRequired("supplier_name");
this.field_category_name_required = this.getFieldRequired("category_name");
this.field_files_required= this.getFieldRequired("files");

break;





case GlobalConstants.SALES_COMPONENT_NAME.SALES_QUOTATION:
this.field_name_quotes_mobile=this.getFieldValue("mobile")
this.field_name_quotes_customername=this.getFieldValue("customer_name")
this.field_name_quotes_productname=this.getFieldValue("product_name")
this.field_name_quotes_quotationdate=this.getFieldValue("date")
this.field_name_quotes_product_category=this.getFieldValue("product_category")
this.field_name_quotes_product_rate=this.getFieldValue("product_rate")
this.field_name_quotes_product_total=this.getFieldValue("product_total")
this.field_name_quotes_product_actual_rate=this.getFieldValue("product_actual_rate")
this.field_name_quotes_product_quantity=this.getFieldValue("product_quantity")
this.field_name_quotes_product_discount=this.getFieldValue("product_discount")
this.field_name_quotes_update =this.getFieldValue("update")
this.field_name_quotes_created_by=this.getFieldValue("created_by")
this.field_name_quotes_created_time=this.getFieldValue("created_time")
this.field_name_quotes_updated_by=this.getFieldValue("updated_by")
this.field_name_quotes_updated_time =this.getFieldValue("modified_time")
this.field_name_quotes_todate =this.getFieldValue("todate")
this.field_name_quotes_fromdate =this.getFieldValue("fromdate")
this.field_name_quotes_addquotes =this.getFieldValue("addquotes")
this.field_name_quotes_actions =this.getFieldValue("actions")
this.field_name_quotes_search =this.getFieldValue("search")
this.field_name_quotes_csv =this.getFieldValue("csv")
this.field_name_quotes_pdf =this.getFieldValue("pdf")
this.field_name_quotes_excel =this.getFieldValue("excel")
this.field_name_quotes_import =this.getFieldValue("import")
this.field_name_quotes_print =this.getFieldValue("print")
this.field_name_quotes_details =this.getFieldValue("details")
this.field_name_quotes_quotesinfo =this.getFieldValue("quotation_info")
this.field_name_quotes_btnuploadcsv =this.getFieldValue("import")
this.field_name_quotes_upload_csv = "Upload CSV";
this.field_name_quotes_upload_files = "Upload Files"; 
break;


case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_PURCHASE:
this.field_name_purchase_mobile=this.getFieldValue("mobile");
this.field_name_purchase_warehouse=this.getFieldValue("warehouse_name");
this.field_name_purchase_supplier_name=this.getFieldValue("supplier_name");
this.field_name_purchase_productname=this.getFieldValue("product_name");
this.field_name_purchase_date=this.getFieldValue("date");
this.field_name_purchase_product_category=this.getFieldValue("product_category");
this.field_name_purchase_product_rate=this.getFieldValue("product_rate");
this.field_name_purchase_product_total=this.getFieldValue("product_total");
this.field_name_purchase_product_actual_rate=this.getFieldValue("product_actual_rate");
this.field_name_purchase_availability = this.getFieldValue("availability");
this.field_name_purchase_product_quantity=this.getFieldValue("product_quantity");
this.field_name_purchase_product_discount=this.getFieldValue("product_discount");
this.field_name_purchase_update =this.getFieldValue("update");
this.field_name_purchase_created_by=this.getFieldValue("created_by");
this.field_name_purchase_created_time=this.getFieldValue("created_time");
this.field_name_purchase_updated_by=this.getFieldValue("updated_by");
this.field_name_purchase_updated_time =this.getFieldValue("modified_time");
this.field_name_purchase_todate =this.getFieldValue("todate");
this.field_name_purchase_fromdate =this.getFieldValue("fromdate");
this.field_name_purchase_addpurchase =this.getFieldValue("addpurchase");
this.field_name_purchase_actions =this.getFieldValue("actions");
this.field_name_purchase_search =this.getFieldValue("search");
this.field_name_purchase_csv =this.getFieldValue("csv");


this.field_name_purchase_upload_files =this.getFieldValue("upload files")
this.field_name_purchase_please_upload_csv = "Please Upload CSV";
this.field_name_purchase_pdf =this.getFieldValue("pdf");
this.field_name_purchase_excel =this.getFieldValue("excel");
this.field_name_purchase_import =this.getFieldValue("upload csv");
this.field_name_purchase_print =this.getFieldValue("print");
this.field_name_purchase_details =this.getFieldValue("details");
this.field_name_purchase_purchaseinfo =this.getFieldValue("purchase_info");
this.field_name_purchase_total_purchases =this.getFieldValue("total_purchases");
this.field_name_purchase_total_amount =this.getFieldValue("total_amount");

break;


case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_RETURN:
this.field_name_return_mobile = this.getFieldValue("mobile");
this.field_name_return_type = this.getFieldValue("type");
this.field_name_return_purchase_id = this.getFieldValue("purchase_id")
this.field_name_return_invoice_id = this.getFieldValue("invoice_id")
this.field_name_return_warehouse = this.getFieldValue("warehouse_name");
this.field_name_return_customer_name = this.getFieldValue("customer_name");
this.field_name_return_supplier_name = this.getFieldValue("supplier_name");
this.field_name_return_productname = this.getFieldValue("product_name");
this.field_name_return_date = this.getFieldValue("date");
this.field_name_return_product_category = this.getFieldValue("product_category");
this.field_name_return_product_rate = this.getFieldValue("product_rate");
this.field_name_return_product_total = this.getFieldValue("product_total");
this.field_name_return_product_actual_rate = this.getFieldValue("product_actual_rate");
this.field_name_return_product_quantity = this.getFieldValue("product_quantity");
this.field_name_return_product_discount = this.getFieldValue("product_discount");
this.field_name_return_update = this.getFieldValue("update");
this.field_name_return_created_by = this.getFieldValue("created_by");
this.field_name_return_created_time = this.getFieldValue("created_time");
this.field_name_return_updated_by = this.getFieldValue("updated_by");
this.field_name_return_updated_time = this.getFieldValue("modified_time");
this.field_name_return_todate = this.getFieldValue("todate");
this.field_name_return_fromdate = this.getFieldValue("fromdate");
this.field_name_return_addreturn = this.getFieldValue("addreturns");
this.field_name_return_actions = this.getFieldValue("actions");
this.field_name_return_search = this.getFieldValue("search");
this.field_name_return_csv = this.getFieldValue("csv");
this.field_name_return_pdf = this.getFieldValue("pdf");
this.field_name_return_excel = this.getFieldValue("excel");
this.field_name_return_import = this.getFieldValue("import");
this.field_name_return_print = this.getFieldValue("print");
this.field_name_return_details = this.getFieldValue("details");
this.field_name_return_returninfo = this.getFieldValue("return_info");
this.field_name_quotes_btnuploadcsv = this.getFieldValue("import")
this.field_name_return_upload_csv = this.getFieldValue("upload csv");
this.field_name_return_upload_files = this.getFieldValue("upload files");
this.field_name_quotes_btnuploadcsv =this.getFieldValue("import")

this.field_name_return_product_returned = this.getFieldValue("product_returned");
this.field_name_return_purchases_returned = this.getFieldValue("purchase_returned");
this.field_name_return_purchases_amount = this.getFieldValue("purchase_amount");
this.field_name_return_invoices_returned = this.getFieldValue("invoice_returned");
this.field_name_return_invoices_amount = this.getFieldValue("invoice_amount");






break


case GlobalConstants.SALES_COMPONENT_NAME.SALES_DEALS:
this.field_name_deals_phone= this.getFieldValue("phone");
this.field_name_deals_product_name= this.getFieldValue("product_name");
this.field_name_deals_product_category=this.getFieldValue("product_category")
this.field_name_deals_product_rate=this.getFieldValue("product_rate")
this.field_name_deals_product_total=this.getFieldValue("product_total")
this.field_name_deals_product_actual_rate=this.getFieldValue("product_actual_rate")
this.field_name_deals_product_quantity=this.getFieldValue("product_quantity")
this.field_name_deals_product_discount=this.getFieldValue("product_discount")
this.field_name_deals_close_date= this.getFieldValue("deal_close_date");
this.field_name_deals_deal_name= this.getFieldValue("deal_name");
this.field_name_deals_amount= this.getFieldValue("amount");
this.field_name_deals_customer_name= this.getFieldValue("customer_name");
this.field_name_deals_expected_date= this.getFieldValue("expected_close_date");
this.field_name_deals_pipeline= this.getFieldValue("pipeline_name");
this.field_name_deals_sales_stage= this.getFieldValue("salesstage_name");
this.field_name_deals_assigned_to= this.getFieldValue("assigned_to");
this.field_name_deals_lead_source= this.getFieldValue("lead_source_name");
this.field_name_deals_probability= this.getFieldValue("probobility");
this.field_name_deals_update= this.getFieldValue("update");
this.field_name_deals_created_by= this.getFieldValue("created_by");
this.field_name_deals_created_time= this.getFieldValue("created_time");
this.field_name_deals_updated_by= this.getFieldValue("updated_by");
this.field_name_deals_updated_time = this.getFieldValue("modified_time");
this.field_name_deals_todate = this.getFieldValue("todate");
this.field_name_deals_fromdate = this.getFieldValue("fromdate");
this.field_name_deals_adddeals = this.getFieldValue("add deals");
this.field_name_deals_actions = this.getFieldValue("actions");
this.field_name_deals_search = this.getFieldValue("search");
this.field_name_deals_csv = this.getFieldValue("csv");
this.field_name_deals_pdf = this.getFieldValue("pdf");
this.field_name_deals_excel = this.getFieldValue("excel");
this.field_name_deals_import = this.getFieldValue("import");
this.field_name_shedule_deals_print = this.getFieldValue("print");
this.field_name_deals_details = this.getFieldValue("details");
this.field_name_deals_dealsinfo = this.getFieldValue("deals_info");
this.field_name_deals_customer_info = this.getFieldValue("customer info");
this.field_name_deals_status  = this.getFieldValue("status");
this.field_name_deals_Closed = this.getFieldValue("closed");
this.field_name_deals_On_Hold = this.getFieldValue("on hold");
this.field_name_deals_Created  = this.getFieldValue("created");
this.field_name_deals_In_Progress  = this.getFieldValue("In progress");
break;




case GlobalConstants.SALES_COMPONENT_NAME.SALES_SHEDULE_VISITS:
this.field_name_shedule_visits_phone= this.getFieldValue("phone");
this.field_name_shedule_visits_date= this.getFieldValue("date");
this.field_name_shedule_visits_time= this.getFieldValue("time");
this.field_name_shedule_visits_address= this.getFieldValue("other_address");
this.field_name_shedule_visits_salesemail= this.getFieldValue("sales_email");
this.field_name_shedule_visits_customer_name= this.getFieldValue("customer_name");
this.field_name_shedule_visits_update= this.getFieldValue("update");
this.field_name_shedule_visits_created_by= this.getFieldValue("created_by");
this.field_name_shedule_visits_created_time= this.getFieldValue("created_time");
this.field_name_shedule_visits_updated_by= this.getFieldValue("updated_by");
this.field_name_shedule_visits_updated_time= this.getFieldValue("modified_time");
this.field_name_shedule_visits_todate = this.getFieldValue("todate");
this.field_name_shedule_visits_fromdate = this.getFieldValue("fromdate");
this.field_name_shedule_visits_addshedule_visits = this.getFieldValue("add_shedule");
this.field_name_shedule_visits_actions = this.getFieldValue("actions");
this.field_name_shedule_visits_search = this.getFieldValue("search");
this.field_name_shedule_visits_csv = this.getFieldValue("csv");
this.field_name_shedule_visits_pdf = this.getFieldValue("pdf");
this.field_name_shedule_visits_excel = this.getFieldValue("excel");
this.field_name_shedule_visits_import = this.getFieldValue("import");
this.field_name_shedule_visits_print = this.getFieldValue("print");
this.field_name_shedule_visits_details = this.getFieldValue("details");
this.field_name_shedule_visitsinfo = this.getFieldValue("shedule_visits_info");
break;


case GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_VISITS:
this.field_name_visits_phone = this.getFieldValue("phone");
this.field_name_visits_user_email = this.getFieldValue("user_email");
this.field_name_visits_last_name = this.getFieldValue("last_name");
this.field_name_visits_notes = this.getFieldValue("meeting_note");
this.field_name_visits_address = this.getFieldValue("address");
this.field_name_visits_email = this.getFieldValue("email");
this.field_name_visits_customer_name = this.getFieldValue("customer_name");
this.field_name_visits_update = this.getFieldValue("update");
this.field_name_visits_created_by = this.getFieldValue("created_by");
this.field_name_visits_created_time = this.getFieldValue("created_time");
this.field_name_visits_updated_by = this.getFieldValue("updated_by");
this.field_name_visits_updated_time  = this.getFieldValue("modified_time");
this.field_name_visits_todate  = this.getFieldValue("todate");
this.field_name_visits_fromdate  = this.getFieldValue("fromdate");
this.field_name_visits_addvisits  = this.getFieldValue("add visits");
this.field_name_visits_actions  = this.getFieldValue("actions");
this.field_name_visits_search  = this.getFieldValue("search");
this.field_name_visits_csv  = this.getFieldValue("csv");
this.field_name_visits_pdf  = this.getFieldValue("pdf");
this.field_name_visits_excel  = this.getFieldValue("excel");
this.field_name_visits_import  = this.getFieldValue("import");
this.field_name_visits_print  = this.getFieldValue("print");
this.field_name_visits_details  = this.getFieldValue("details");
this.field_name_visits_visitsinfo  = this.getFieldValue("visits info");
this.field_name_visits_Search_Visits  = this.getFieldValue("Search Visits");
this.field_name_visits_Know_your_location  = this.getFieldValue("Know your location");
this.field_name_visits_company_name  = this.getFieldValue("company_name");
this.field_name_visits_department  = this.getFieldValue("department");
this.field_name_visits_follow_update  = this.getFieldValue("follow_update");


break;




case GlobalConstants.SALES_COMPONENT_NAME.SALES_CATEGORY:
this.field_name_pro_category_name= this.getFieldValue("sales_category");
this.field_name_pro_category_update= this.getFieldValue("update");
this.field_name_pro_category_created_by= this.getFieldValue("created_by");
this.field_name_pro_category_created_time= this.getFieldValue("created_time");
this.field_name_pro_category_updated_by= this.getFieldValue("updated_by");
this.field_name_pro_category_updated_time = this.getFieldValue("modified_time");
this.field_name_pro_category_todate = this.getFieldValue("todate");
this.field_name_pro_category_fromdate = this.getFieldValue("fromdate");
this.field_name_pro_category_addpro_category = this.getFieldValue("add_category");
this.field_name_pro_category_actions = this.getFieldValue("actions");
this.field_name_pro_category_search = this.getFieldValue("search");
this.field_name_pro_category_csv = this.getFieldValue("csv");
this.field_name_pro_category_pdf = this.getFieldValue("pdf");
this.field_name_pro_category_excel = this.getFieldValue("excel");
this.field_name_pro_category_import = this.getFieldValue("import");
this.field_name_pro_category_print = this.getFieldValue("print");
this.field_name_pro_category_details = this.getFieldValue("details");
this.field_name_pro_category_categoryinfo = this.getFieldValue("category_info");
break;

/*pipline*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_PIPELINE:
this.field_name_pipeline_name= this.getFieldValue("pipeline_name");
this.field_name_pipeline_update= this.getFieldValue("update");
this.field_name_pipeline_created_by= this.getFieldValue("created_by");
this.field_name_pipeline_created_time= this.getFieldValue("created_time");
this.field_name_pipeline_updated_by= this.getFieldValue("updated_by");
this.field_name_pipeline_updated_time = this.getFieldValue("modified_time");
this.field_name_pipeline_todate = this.getFieldValue("todate");
this.field_name_pipeline_fromdate = this.getFieldValue("fromdate");
this.field_name_pipeline_addpipeline = this.getFieldValue("add_pipeline");
this.field_name_pipeline_actions = this.getFieldValue("actions");
this.field_name_pipeline_search = this.getFieldValue("search");
this.field_name_pipeline_csv = this.getFieldValue("csv");
this.field_name_pipeline_pdf = this.getFieldValue("pdf");
this.field_name_pipeline_excel = this.getFieldValue("excel");
this.field_name_pipeline_import = this.getFieldValue("import");
this.field_name_pipeline_print = this.getFieldValue("print");
this.field_name_pipeline_details = this.getFieldValue("details");
this.field_name_pipeline_pipelineinfo = this.getFieldValue("pipline_info");
break;

/* sales stage*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_SALES_STAGE:
this.field_name_sales_stage_name= this.getFieldValue("sales_stage");
this.field_name_sales_stage_update= this.getFieldValue("update");
this.field_name_sales_stage_created_by= this.getFieldValue("created_by");
this.field_name_sales_stage_created_time= this.getFieldValue("created_time");
this.field_name_sales_stage_updated_by= this.getFieldValue("updated_by");
this.field_name_sales_stage_updated_time = this.getFieldValue("modified_time");
this.field_name_sales_stage_todate = this.getFieldValue("todate");
this.field_name_sales_stage_fromdate = this.getFieldValue("fromdate");
this.field_name_sales_stage_addsales_stage = this.getFieldValue("add_sales_stage");
this.field_name_sales_stage_actions = this.getFieldValue("actions");
this.field_name_sales_stage_search = this.getFieldValue("search");
this.field_name_sales_stage_csv = this.getFieldValue("csv");
this.field_name_sales_stage_pdf = this.getFieldValue("pdf");
this.field_name_sales_stage_excel = this.getFieldValue("excel");
this.field_name_sales_stage_import = this.getFieldValue("import");
this.field_name_sales_stage_print = this.getFieldValue("print");
this.field_name_sales_stage_details = this.getFieldValue("details");
this.field_name_sales_stage_stageinfo = this.getFieldValue("sales_stage_info");
/* lead sorce*/

break;
case GlobalConstants.SALES_COMPONENT_NAME.SALES_LEAD_SOURCE:
this.field_name_lead_source_name= this.getFieldValue("lead_source_name");
this.field_name_lead_source_update= this.getFieldValue("update");
this.field_name_lead_source_created_by= this.getFieldValue("created_by");
this.field_name_lead_source_created_time= this.getFieldValue("created_time");
this.field_name_lead_source_updated_by= this.getFieldValue("updated_by");
this.field_name_lead_source_updated_time = this.getFieldValue("modified_time");
this.field_name_lead_source_todate = this.getFieldValue("todate");
this.field_name_lead_source_fromdate = this.getFieldValue("fromdate");
this.field_name_lead_source_addlead_source = this.getFieldValue("add_lead_source");
this.field_name_lead_source_actions = this.getFieldValue("actions");
this.field_name_lead_source_search = this.getFieldValue("search");
this.field_name_lead_source_csv = this.getFieldValue("csv");
this.field_name_lead_source_pdf = this.getFieldValue("pdf");
this.field_name_lead_source_excel = this.getFieldValue("excel");
this.field_name_lead_source_import = this.getFieldValue("import");
this.field_name_lead_source_print = this.getFieldValue("print");
this.field_name_lead_source_details = this.getFieldValue("details");
this.field_name_lead_source_leadsourceinfo = this.getFieldValue("lead_source_info");

/*source*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_SOURCE:
this.field_name_source_name= this.getFieldValue("source_name");
this.field_name_source_update= this.getFieldValue("update");
this.field_name_source_created_by= this.getFieldValue("created_by");
this.field_name_source_created_time= this.getFieldValue("created_time");
this.field_name_source_updated_by= this.getFieldValue("updated_by");
this.field_name_source_updated_time = this.getFieldValue("modified_time");
this.field_name_source_todate = this.getFieldValue("todate");
this.field_name_source_fromdate = this.getFieldValue("fromdate");
this.field_name_source_addsource = this.getFieldValue("add_source");
this.field_name_source_actions = this.getFieldValue("actions");
this.field_name_source_search = this.getFieldValue("search");
this.field_name_source_csv = this.getFieldValue("csv");
this.field_name_source_pdf = this.getFieldValue("pdf");
this.field_name_source_excel = this.getFieldValue("excel");
this.field_name_source_import = this.getFieldValue("import");
this.field_name_source_print = this.getFieldValue("print");
this.field_name_source_details = this.getFieldValue("details");
this.field_name_source_sourceinfo = this.getFieldValue("source_info");

/*department*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT:
this.field_name_department_name= this.getFieldValue("department_name");
this.field_name_department_update= this.getFieldValue("update");
this.field_name_department_created_by= this.getFieldValue("created_by");
this.field_name_department_created_time= this.getFieldValue("created_time");
this.field_name_department_updated_by= this.getFieldValue("updated_by");
this.field_name_department_updated_time = this.getFieldValue("modified_time");
this.field_name_department_todate = this.getFieldValue("todate");
this.field_name_department_fromdate = this.getFieldValue("fromdate");
this.field_name_department_adddepartment = this.getFieldValue("add_department");
this.field_name_department_actions = this.getFieldValue("actions");
this.field_name_department_search = this.getFieldValue("search");
this.field_name_department_csv = this.getFieldValue("csv");
this.field_name_department_pdf = this.getFieldValue("pdf");
this.field_name_department_excel = this.getFieldValue("excel");
this.field_name_department_import = this.getFieldValue("import");
this.field_name_department_print = this.getFieldValue("print");
this.field_name_department_details = this.getFieldValue("details");
this.field_name_department_departmentinfo = this.getFieldValue("department_info");
break;


/*Warehouse*/
case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_WAREHOUSE:

    this.field_name_warehouse_name= this.getFieldValue("warehouse_name");
    this.field_name_warehouse_update= this.getFieldValue("update");
    this.field_name_warehouse_created_by= this.getFieldValue("created_by");
    this.field_name_warehouse_created_time= this.getFieldValue("created_time");
    this.field_name_warehouse_updated_by= this.getFieldValue("updated_by");
    this.field_name_warehouse_updated_time = this.getFieldValue("modified_time");
    this.field_name_warehouse_todate = this.getFieldValue("todate");
    this.field_name_warehouse_fromdate = this.getFieldValue("fromdate");
    this.field_name_warehouse_addwarehouse = this.getFieldValue("add_warehouse");
    this.field_name_warehouse_actions = this.getFieldValue("actions");
    this.field_name_warehouse_search = this.getFieldValue("search");
    this.field_name_warehouse_csv = this.getFieldValue("csv");
    this.field_name_warehouse_pdf = this.getFieldValue("pdf");
    this.field_name_warehouse_excel = this.getFieldValue("excel");
    this.field_name_warehouse_import = this.getFieldValue("import");
    this.field_name_warehouse_print = this.getFieldValue("print");
    this.field_name_warehouse_details = this.getFieldValue("details");
    this.field_name_warehouse_info = this.getFieldValue("warehouse_info");




/*currency*/
case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CURRENCY:
this.field_name_currency_name= this.getFieldValue("currency_name");
this.field_name_currency_update= this.getFieldValue("update");
this.field_name_currency_created_by= this.getFieldValue("created_by");
this.field_name_currency_created_time= this.getFieldValue("created_time");
this.field_name_currency_updated_by= this.getFieldValue("updated_by");
this.field_name_currency_updated_time = this.getFieldValue("modified_time");
this.field_name_currency_todate = this.getFieldValue("todate");
this.field_name_currency_fromdate = this.getFieldValue("fromdate");
this.field_name_currency_addcurrency = this.getFieldValue("add_currency");
this.field_name_currency_actions = this.getFieldValue("actions");
this.field_name_currency_search = this.getFieldValue("search");
this.field_name_currency_csv = this.getFieldValue("csv");
this.field_name_currency_pdf = this.getFieldValue("pdf");
this.field_name_currency_excel = this.getFieldValue("excel");
this.field_name_currency_import = this.getFieldValue("import");
this.field_name_currency_print = this.getFieldValue("print");
this.field_name_currency_details = this.getFieldValue("details");
this.field_name_currency_info = this.getFieldValue("currency_info");
/*expenses_item*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_EXPENSES_ITEM:
this.field_name_expense_item_name= this.getFieldValue("expenses_item");
this.field_name_expense_item_update= this.getFieldValue("update");
this.field_name_expense_item_created_by= this.getFieldValue("created_by");
this.field_name_expense_item_created_time= this.getFieldValue("created_time");
this.field_name_expense_item_updated_by= this.getFieldValue("updated_by");
this.field_name_expense_item_updated_time = this.getFieldValue("modified_time");
this.field_name_expense_item_todate = this.getFieldValue("todate");
this.field_name_expense_item_fromdate = this.getFieldValue("fromdate");
this.field_name_expense_item_addexpense_item = this.getFieldValue("add_expenses_item");
this.field_name_expense_item_actions = this.getFieldValue("actions");
this.field_name_expense_item_search = this.getFieldValue("search");
this.field_name_expense_item_csv = this.getFieldValue("csv");
this.field_name_expense_item_pdf = this.getFieldValue("pdf");
this.field_name_expense_item_excel = this.getFieldValue("excel");
this.field_name_expense_item_import = this.getFieldValue("import");
this.field_name_expense_item_print = this.getFieldValue("print");
this.field_name_expense_item_details = this.getFieldValue("details");
this.field_name_expense_item_info = this.getFieldValue("expenses_item_info");
break;
/*add expenses*/

case GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_EXPENSES:
this.field_name_add_expense_name= this.getFieldValue("expenses_name");
this.field_name_add_expense_user_email= this.getFieldValue("User Email");
this.field_name_add_expense_update= this.getFieldValue("update");
this.field_name_add_expense_date= this.getFieldValue("date");
this.field_name_add_expense_amount= this.getFieldValue("amount"); 
this.field_name_add_expense_upload_files= this.getFieldValue("upload_files");
this.field_name_add_expense_add_expense_item = this.getFieldValue("Expenses_item");
this.field_name_add_expense_created_by= this.getFieldValue("created_by");
this.field_name_add_expense_created_time= this.getFieldValue("created_time");
this.field_name_add_expense_updated_by= this.getFieldValue("updated_by");
this.field_name_add_expense_updated_time = this.getFieldValue("modified_time");
this.field_name_add_expense_todate = this.getFieldValue("todate");
this.field_name_add_expense_fromdate = this.getFieldValue("fromdate");
this.field_name_add_expense_addadd_expense = this.getFieldValue("add_expenses");
this.field_name_add_expense_actions = this.getFieldValue("actions");
this.field_name_add_expense_search = this.getFieldValue("search");
this.field_name_add_expense_csv = this.getFieldValue("csv");
this.field_name_add_expense_pdf = this.getFieldValue("pdf");
this.field_name_add_expense_excel = this.getFieldValue("excel");
this.field_name_add_expense_import = this.getFieldValue("import");
this.field_name_add_expense_print = this.getFieldValue("print");
this.field_name_add_expense_details = this.getFieldValue("details");
this.field_name_add_expense_info = this.getFieldValue("expenses_info");
break;





case GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_ACTIVE:
this.field_name_campaign_active_name= this.getFieldValue("Active name");
this.field_name_campaign_active_update= this.getFieldValue("Update");
this.field_name_campaign_active_created_by= this.getFieldValue("created_by");
this.field_name_campaign_active_created_time= this.getFieldValue("created_time");
this.field_name_campaign_active_updated_by= this.getFieldValue("updated_by");
this.field_name_campaign_active_updated_time = this.getFieldValue("updated_time");
this.field_name_campaign_active_actions = this.getFieldValue("actions");
this.field_name_campaign_active_add= this.getFieldValue("active_add");

break;

case GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_TYPE:
    this.field_name_campaign_type_name= this.getFieldValue("Type name");
    this.field_name_campaign_type_update= this.getFieldValue("update");
    this.field_name_campaign_type_created_by = this.getFieldValue("created_by");
    this.field_name_campaign_type_created_time= this.getFieldValue("created_time");
    this.field_name_campaign_type_updated_by= this.getFieldValue("updated_by");
    this.field_name_campaign_type_updated_time = this.getFieldValue("updated_time");
    this.field_name_campaign_type_actions = this.getFieldValue("actions");
    this.field_name_campaign_type_add= this.getFieldValue("add");
    
break;

case GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD:
    this.field_name_change_password= this.getFieldValue("change password");
    this.field_name_old_password= this.getFieldValue("old password");
    this.field_name_new_password= this.getFieldValue("new password");
    this.field_name_confirm_password= this.getFieldValue("confirm password");
    
 
break;

case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_STOCK:
    this.field_name_stock_currency = this.getFieldValue("currency");
    this.field_name_stock_phone = this.getFieldValue("phone");
    this.field_name_stock_product_name = this.getFieldValue("product_name");
    this.field_name_stock_cost= this.getFieldValue("cost");
this.field_name_stock_supplier_name= this.getFieldValue("supplier_name");
this.field_name_stock_category_name =this.getFieldValue("category_name");
this.field_name_stock_stock = this.getFieldValue("stock");
this.field_name_stock_code = this.getFieldValue("code");
this.field_name_stock_stock_status = this.getFieldValue("status");
this.field_name_stock_manage_stock = this.getFieldValue("manage_stock");
this.field_name_stock_weight = this.getFieldValue("weight");
this.field_name_stock_update = this.getFieldValue("update");
this.field_name_stock_created_by = this.getFieldValue("created_by");
this.field_name_stock_created_time = this.getFieldValue("created_time");
this.field_name_stock_updated_by = this.getFieldValue("updated_by");
this.field_name_stock_updated_time  = this.getFieldValue("modified_time");
this.field_name_stock_todate  = this.getFieldValue("todate");
this.field_name_stock_fromdate  = this.getFieldValue("fromdate");
this.field_name_stock_addstock  = this.getFieldValue("addstock");
this.field_name_stock_actions  = this.getFieldValue("actions");
this.field_name_stock_search  = this.getFieldValue("search");
this.field_name_stock_csv  = this.getFieldValue("csv");
this.field_name_stock_pdf  = this.getFieldValue("pdf");
this.field_name_stock_excel  = this.getFieldValue("excel");
this.field_name_stock_import  = this.getFieldValue("import");
this.field_name_stock_print  = this.getFieldValue("print");
this.field_name_stock_details  = this.getFieldValue("detail");
this.field_name_stock_stockinfo  = this.getFieldValue("stockinfo");
this.field_name_stock_availability  = this.getFieldValue("availability");
break;



case GlobalConstants.SALES_COMPONENT_NAME.SALES_REPORTS:
this.field_name_report_headding =this.getFieldValue("Reports");
this.field_name_report_section = this.getFieldValue("Reports section In graphical format");
this.field_name_report_select_dropdown = this.getFieldValue("Please select the dropdown");
this.field_name_report_select_section = this.getFieldValue("Select the Section");
this.field_name_report_view_as = this.getFieldValue("View as");
this.field_name_report_select_chart = this.getFieldValue("Select the chart");
this.field_name_report_search = this.getFieldValue("search");

this.field_name_customers_first_name = this.getFieldValue("first name");
this.field_name_customers_last_name = this.getFieldValue("last name");
this.field_name_customers_email = this.getFieldValue("email");
this.field_name_customers_phone = this.getFieldValue("phone");
this.field_name_customers_actions = this.getFieldValue("actions");
this.field_name_customer_table = this.getFieldValue("customer table");
this.field_name_deals_deal_name = this.getFieldValue("deal name");
this.field_name_deals_amount = this.getFieldValue("deal amount ");
this.field_name_deals_expected_date = this.getFieldValue("expected close date");
this.field_name_deals_sales_stage = this.getFieldValue("sales stage");
this.field_name_deals_assigned_to = this.getFieldValue("deals assigned");
this.field_name_deals_status = this.getFieldValue("deals status");
this.field_name_deals_product_name =  this.getFieldValue("deals product name");
this.field_name_cost = this.getFieldValue("cost");
this.field_name_supplier_name = this.getFieldValue("supplier name");
this.field_name_quotes_customername = this.getFieldValue("customer name");
this.field_name_quotes_quotationdate = this.getFieldValue("quotation date");
this.field_name_quotes_quotation_id = this.getFieldValue("quote id");
this.field_name_quotes_productname = this.getFieldValue("quotes product name");
this.field_name_product_name = this.getFieldValue("product name");
this.field_name_product_currency = this.getFieldValue("currency");
this.field_name_shedule_visits_salesemail = this.getFieldValue("sales email");
this.field_name_shedule_visits_customer_name = this.getFieldValue("visit customer name");
this.field_name_shedule_visits_created_by = this.getFieldValue("created by");
this.field_name_shedule_visits_date = this.getFieldValue("visits date");
this.field_name_shedule_visits_time = this.getFieldValue("visits time");
this.field_name_deals_table = this.getFieldValue("deals table");
this.field_name_products_table = this.getFieldValue("products table");
this.field_name_quotes_table = this.getFieldValue("quotes table");
this.field_name_users_table = this.getFieldValue("users table");
this.field_name_leads_table = this.getFieldValue("leads table");
this.field_name_schedule_table = this.getFieldValue("schedule visits table");
this.field_name_visits_table = this.getFieldValue("visits table");
break;




case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_REPORTS:
this.field_name_report_headding =this.getFieldValue("Reports");
this.field_name_report_section = this.getFieldValue("Reports section In graphical format");
this.field_name_report_select_dropdown = this.getFieldValue("Please select the dropdown");
this.field_name_report_select_section = this.getFieldValue("Select the Section");
this.field_name_report_view_as = this.getFieldValue("View as");
this.field_name_report_select_chart = this.getFieldValue("Select the chart");
this.field_name_report_search = this.getFieldValue("search");
this.field_name_customers_first_name = this.getFieldValue("first name");
this.field_name_customers_last_name = this.getFieldValue("last name");
this.field_name_customers_email= this.getFieldValue("email");
this.field_name_customers_phone = this.getFieldValue("phone");
this.field_name_customers_actions = this.getFieldValue("actions");
this.field_name_faq_questions= this.getFieldValue("questions");
this.field_name_faq_answers = this.getFieldValue("answers");
this.field_name_faq_status= this.getFieldValue("status");
this.field_name_customer_table= this.getFieldValue("customer table");

this.field_name_faq_table= this.getFieldValue("faq table");
this.field_name_ticketing_table= this.getFieldValue("ticketing table");
this.field_name_service_ticketing_email= this.getFieldValue("email");
this.field_name_service_ticketing_Assigned_Users= this.getFieldValue("Assigned_Users");
this.field_name_service_ticketing_status = this.getFieldValue("status");
this.field_name_service_ticketing_description= this.getFieldValue("description");
 this.field_name_service_ticketing_subject= this.getFieldValue("subject");
 this.field_name_service_ticketing_name= this.getFieldValue("name");


break;




case GlobalConstants.COMPONENT_NAME.MARKETING_REPORTS:
this.field_name_report_headding =this.getFieldValue("Reports");
this.field_name_report_section = this.getFieldValue("Reports section In graphical format");
this.field_name_report_select_dropdown = this.getFieldValue("Please select the dropdown");
this.field_name_report_select_section = this.getFieldValue("Select the Section");
this.field_name_report_view_as = this.getFieldValue("View as");
this.field_name_report_select_chart = this.getFieldValue("Select the chart");
this.field_name_report_search = this.getFieldValue("search");
this.field_name_customers_first_name= this.getFieldValue("first name");
this.field_name_customers_last_name = this.getFieldValue("last name");
this.field_name_customers_email= this.getFieldValue("email");
this.field_name_customers_phone = this.getFieldValue("phone");
this.field_name_customers_actions= this.getFieldValue("actions");
this.field_name_campaign_campaign_owner = this.getFieldValue("campaign owner");
this.field_name_campaign_campaign_name  = this.getFieldValue("campaign name");
this.field_name_campaign_active = this.getFieldValue("active");
this.field_name_campaign_status  = this.getFieldValue("status");
this.field_name_campaign_type = this.getFieldValue("type");
this.field_name_activities_record_type = this.getFieldValue("record type");
this.field_name_activities_subject = this.getFieldValue("subject");
this.field_name_activities_due_date  = this.getFieldValue("due date");
this.field_name_contact_table  = this.getFieldValue("contacts table");
this.field_name_customer_table  = this.getFieldValue("customer table");
this.field_name_leads_table  = this.getFieldValue("leads table");
this.field_name_campaign_table  = this.getFieldValue("campaign table");
this.field_name_activity_table  = this.getFieldValue("activity table");
break;



case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_REPORTS:
this.field_name_report_headding =this.getFieldValue("Reports");
this.field_name_report_section = this.getFieldValue("Reports section In graphical format");
this.field_name_report_select_dropdown = this.getFieldValue("Please select the dropdown");
this.field_name_report_select_section = this.getFieldValue("Select the Section");
this.field_name_report_view_as = this.getFieldValue("View as");
this.field_name_report_select_chart = this.getFieldValue("Select the chart");
this.field_name_report_search = this.getFieldValue("search");

this.field_name_customers_first_name =  this.getFieldValue("first name");
this.field_name_customers_last_name =  this.getFieldValue("last name");
this.field_name_customers_email =  this.getFieldValue("email");
this.field_name_customers_phone=  this.getFieldValue("phone");
this.field_name_customers_actions=  this.getFieldValue("actions");
this.field_name_deals_deal_name=  this.getFieldValue("deal name");
this.field_name_deals_amount=  this.getFieldValue("amount");
this.field_name_deals_expected_date  =  this.getFieldValue("expected close date");
this.field_name_deals_sales_stage =  this.getFieldValue("salesstage name");
this.field_name_deals_assigned_to =  this.getFieldValue("assigned to");
this.field_name_deals_status =  this.getFieldValue("status");
this.field_name_deals_product_name =  this.getFieldValue("product name");
this.field_name_cost=  this.getFieldValue("cost");
this.field_name_supplier_name  =  this.getFieldValue("supplier name");
this.field_name_quotes_customername =  this.getFieldValue("customer name");
this.field_name_quotes_quotationdate =  this.getFieldValue("date");
this.field_name_quotes_productname =  this.getFieldValue("product name");
this.field_name_product_name =  this.getFieldValue("product name");
this.field_name_shedule_visits_salesemail =  this.getFieldValue("sales mail");
this.field_name_shedule_visits_customer_name =  this.getFieldValue("customer name");
this.field_name_shedule_visits_created_by =  this.getFieldValue("created by");
this.field_name_shedule_visits_date =  this.getFieldValue("date");
this.field_name_shedule_visits_time =  this.getFieldValue("time");
this.field_name_product_currency = this.getFieldValue("currency");
this.field_name_products_table = this.getFieldValue("product table");
this.field_name_customer_table = this.getFieldValue("customer table");
this.field_name_supplier_table = this.getFieldValue("supplier table");
this.field_name_purchases_table = this.getFieldValue("purchase table");
this.field_name_return_table = this.getFieldValue("return table");
this.field_name_invoice_table = this.getFieldValue("invoice table");
break;





case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_REPORTS:
    this.field_name_report_headding =this.getFieldValue("Reports");
this.field_name_report_section = this.getFieldValue("Reports section In graphical format");
this.field_name_report_select_dropdown = this.getFieldValue("Please select the dropdown");
this.field_name_report_select_section = this.getFieldValue("Select the Section");
this.field_name_report_view_as = this.getFieldValue("View as");
this.field_name_report_select_chart = this.getFieldValue("Select the chart");
this.field_name_report_search = this.getFieldValue("search");
this.field_name_hrms_employee_table=this.getFieldValue("employees table");
this.field_name_hrms_employee_first_name=this.getFieldValue("first_name");
this.field_name_hrms_employee_email_id=this.getFieldValue("email");
this.field_name_hrms_employee_mobile=this.getFieldValue("phone");
this.field_name_hrms_employee_role=this.getFieldValue("Role");
this.field_name_hrms_employee_join_date=this.getFieldValue("joining_date");
this.field_name_hrms_leaves_table=this.getFieldValue("leaves table");
this.field_name_hrms_training_table=this.getFieldValue("training table");
this.field_name_hrms_holiday_table=this.getFieldValue("holiday table");
this.field_name_hrms_holiday_name=this.getFieldValue("holiday_name");
this.field_name_hrms_holiday_date=this.getFieldValue("holiday_date");
this.field_name_hrms_holiday_day=this.getFieldValue("holiday_day");
this.field_name_hrms_project_table=this.getFieldValue("project table");
this.field_name_hrms_notice_table=this.getFieldValue("notice table");
this.field_name_hrms_actons=this.getFieldValue("actions");
this.field_name_hrms_leaves_type=this.getFieldValue("leave_type");
this.field_name_hrms_leaves_from=this.getFieldValue("leave_from");
this.field_name_hrms_leaves_to=this.getFieldValue("leave_to");
this.field_name_hrms_leaves_reason=this.getFieldValue("leave_reason");
this.field_name_hrms_training_type=this.getFieldValue("training_type");
this.field_name_hrms_training_trainer=this.getFieldValue("trainer_name");
this.field_name_hrms_training_employee=this.getFieldValue("trained_employee_name");
this.field_name_hrms_training_cost=this.getFieldValue("training_cost");
this.field_name_hrms_training_description=this.getFieldValue("training_description");
this.field_name_hrms_project_name=this.getFieldValue("project_name");
this.field_name_hrms_project_description=this.getFieldValue("project_description");
this.field_name_hrms_project_team=this.getFieldValue("project_team");
this.field_name_hrms_notice_type=this.getFieldValue("notice_type");
this.field_name_hrms_notice_date=this.getFieldValue("notice_date");
this.field_name_hrms_notice_by=this.getFieldValue("notice_by");
this.field_name_hrms_candidate_table=this.getFieldValue("candidate_table");
this.field_name_hrms_policy_table=this.getFieldValue("policy_table");
this.field_name_hrms_expenses_table=this.getFieldValue("expenses_table");
this.field_name_hrms_candidate_name=this.getFieldValue("candidate_name"); 
this.field_name_hrms_candidate_email=this.getFieldValue("candidate_email"); 
this.field_name_hrms_candidate_phone=this.getFieldValue("candidate_phone"); 
this.field_name_hrms_policy_id=this.getFieldValue("policy_id"); 
this.field_name_hrms_policy_name=this.getFieldValue("policy_name"); 
this.field_name_hrms_policy_size=this.getFieldValue("size"); 
this.field_name_hrms_policy_file=this.getFieldValue("files"); 
this.field_name_hrms_policy_download=this.getFieldValue("download"); 
this.field_name_add_expense_user_email= this.getFieldValue("User Email");
this.field_name_add_expense_add_expense_item = this.getFieldValue("Expenses_item");
this.field_name_add_expense_amount= this.getFieldValue("amount"); 
this.field_name_add_expense_date = this.getFieldValue("date");
this.field_name_hrms_payroll_table= this.getFieldValue("payroll_table");
this.field_name_hrms_payroll_basic_salary=this.getFieldValue("basic_salary");
this.field_name_hrms_payroll_net_salary=this.getFieldValue("net_salary"); 
 this.field_name_hrms_payroll_employee_name=this.getFieldValue("employee_name"); 
 this.field_name_hrms_travel_table=this.getFieldValue("travel_table");
 this.field_name_hrms_travel_info=this.getFieldValue("travel_info"); 
 this.field_name_hrms_travel_employee_name=this.getFieldValue("employee_name"); 
this.field_name_hrms_travel_date=this.getFieldValue("travel_date"); 
this.field_name_hrms_travel_return_date=this.getFieldValue("return_date"); 
 this.field_name_hrms_task_management_table=this.getFieldValue("task_management_table");
 this.field_name_hrms_task_record_type=this.getFieldValue("task_record_type"); 
 this.field_name_hrms_task_name=this.getFieldValue("task_name"); 
 this.field_name_hrms_task_subject=this.getFieldValue("task_subject"); 
 this.field_name_hrms_task_due_date=this.getFieldValue("task_due_date"); 
 this.field_name_hrms_attendance_table=this.getFieldValue("attendance_table"); 
 this.field_name_hrms_attendence_name=this.getFieldValue("name"); 
 this.field_name_hrms_attendence_days=this.getFieldValue("attended_days");        
 this.field_name_hrms_leave_days=this.getFieldValue("leave_days"); 



   
 
break;


case GlobalConstants.SALES_COMPONENT_NAME.ORGANISATION:
    this.field_name_Organisation_details =this.getFieldValue("Organisation details");
this.field_name_subscription_status = this.getFieldValue("subscription status");
this.field_name_expires_on = this.getFieldValue("expires on");
this.field_name_currency_selected = this.getFieldValue("currency selected");
this.field_name_free_trial =this.getFieldValue("free trial period");
break;


case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DASHBOARD:
this.field_name_hrms_dashboard=this.getFieldValue("hrms details");
this.field_name_hrms_employee=this.getFieldValue("employees");
this.field_name_hrms_holidays=this.getFieldValue("holidays");
this.field_name_hrms_projects=this.getFieldValue("projects");
this.field_name_hrms_leaves=this.getFieldValue("leaves");
this.field_name_hrms_notice=this.getFieldValue("notice_tab");
this.field_name_hrms_fromdate=this.getFieldValue("fromdate");
this.field_name_hrms_todate=this.getFieldValue("todate");
this.field_name_hrms_trainings=this.getFieldValue("trainings");
this.field_name_hrms_search=this.getFieldValue("search");
this.field_name_hrms_notices=this.getFieldValue("notices");

this.field_name_hrms_employee_table=this.getFieldValue("employees table");
this.field_name_hrms_employee_first_name=this.getFieldValue("first_name");
this.field_name_hrms_employee_email_id=this.getFieldValue("email");
this.field_name_hrms_employee_mobile=this.getFieldValue("phone");
this.field_name_hrms_employee_role=this.getFieldValue("Role");
this.field_name_hrms_employee_join_date=this.getFieldValue("joining_date");
this.field_name_hrms_leaves_table=this.getFieldValue("leaves table");
this.field_name_hrms_training_table=this.getFieldValue("training table");
this.field_name_hrms_holiday_table=this.getFieldValue("holiday table");
this.field_name_hrms_holiday_name=this.getFieldValue("holiday_name");
this.field_name_hrms_holiday_date=this.getFieldValue("holiday_date");
this.field_name_hrms_holiday_day=this.getFieldValue("holiday_day");
this.field_name_hrms_project_table=this.getFieldValue("project table");
this.field_name_hrms_notice_table=this.getFieldValue("notice table");
this.field_name_hrms_actons=this.getFieldValue("actions");
this.field_name_hrms_leaves_type=this.getFieldValue("leave_type");
this.field_name_hrms_leaves_from=this.getFieldValue("leave_from");
this.field_name_hrms_leaves_to=this.getFieldValue("leave_to");
this.field_name_hrms_leaves_reason=this.getFieldValue("leave_reason");
this.field_name_hrms_training_type=this.getFieldValue("training_type");
this.field_name_hrms_training_trainer=this.getFieldValue("trainer_name");
this.field_name_hrms_training_employee=this.getFieldValue("trained_employee_name");
this.field_name_hrms_training_cost=this.getFieldValue("training_cost");
this.field_name_hrms_training_description=this.getFieldValue("training_description");
this.field_name_hrms_project_name=this.getFieldValue("project_name");
this.field_name_hrms_project_description=this.getFieldValue("project_description");
this.field_name_hrms_project_team=this.getFieldValue("project_team");
this.field_name_hrms_notice_type=this.getFieldValue("notice_type");
this.field_name_hrms_notice_date=this.getFieldValue("notice_date");
this.field_name_hrms_notice_by=this.getFieldValue("notice_by");

this.field_name_hrms_candidates=this.getFieldValue("candidates");
this.field_name_hrms_interviews=this.getFieldValue("interviews");
this.field_name_hrms_policy=this.getFieldValue("policy");
this.field_name_hrms_expenses=this.getFieldValue("expenses");
this.field_name_hrms_candidate_table=this.getFieldValue("candidate_table");
this.field_name_hrms_policy_table=this.getFieldValue("policy_table");
this.field_name_hrms_expenses_table=this.getFieldValue("expenses_table");
this.field_name_hrms_candidate_name=this.getFieldValue("candidate_name"); 
this.field_name_hrms_candidate_email=this.getFieldValue("candidate_email"); 
this.field_name_hrms_candidate_phone=this.getFieldValue("candidate_phone"); 
this.field_name_hrms_policy_id=this.getFieldValue("policy_id"); 
this.field_name_hrms_policy_name=this.getFieldValue("policy_name"); 
this.field_name_hrms_policy_size=this.getFieldValue("size"); 
this.field_name_hrms_policy_file=this.getFieldValue("files"); 
this.field_name_hrms_policy_download=this.getFieldValue("download"); 
this.field_name_add_expense_user_email= this.getFieldValue("User Email");
this.field_name_add_expense_add_expense_item = this.getFieldValue("Expenses_item");
this.field_name_add_expense_amount= this.getFieldValue("amount"); 
this.field_name_add_expense_date= this.getFieldValue("date");





break


case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEES:
this.field_name_hrms_employee_first_name=this.getFieldValue("first_name");
this.field_name_hrms_employee_email_id=this.getFieldValue("email");
this.field_name_hrms_employee_designation=this.getFieldValue("designation");
this.field_name_hrms_employee_last_name=this.getFieldValue("last_name");
this.field_name_hrms_employee_mobile=this.getFieldValue("phone");
this.field_name_hrms_employee_join_date=this.getFieldValue("joining_date");
this.field_name_hrms_employee_role=this.getFieldValue("Role");
this.field_name_hrms_employee_from_date=this.getFieldValue("fromDate");
this.field_name_hrms_employee_to_date=this.getFieldValue("toDate");
this.field_name_hrms_employee_search=this.getFieldValue("search");
this.field_name_hrms_employee_status=this.getFieldValue("employee_status");
this.field_name_hrms_employee_pdf=this.getFieldValue("pdf");
this.field_name_hrms_employee_csv=this.getFieldValue("csv");
this.field_name_hrms_employee_Add_employee=this.getFieldValue("add employee");
this.field_name_hrms_employee_update_leaves=this.getFieldValue("update");
this.field_name_hrms_employee_details=this.getFieldValue("details");
this.field_name_hrms_employee_assigned_to=this.getFieldValue("assigned_to");
this.field_name_hrms_employee_leaves_avaialable=this.getFieldValue("leaves_available");
this.field_name_hrms_employee_uploaded_picture=this.getFieldValue("profile_picture");
this.field_name_hrms_employee_bank_name=this.getFieldValue("employee_bank");
this.field_name_hrms_employee_account_number=this.getFieldValue("employee_account_number");
this.field_name_hrms_employee_created_by=this.getFieldValue("created_by");
this.field_name_hrms_employee_created_time=this.getFieldValue("created_time");
this.field_name_hrms_employee_updated_by=this.getFieldValue("updated_by");
this.field_name_hrms_employee_updated_time=this.getFieldValue("modified_time");
this.field_name_hrms_actons=this.getFieldValue("actions");
break;





case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVES_LIST:
    this.field_name_hrms_leaves_fromdate=this.getFieldValue("fromdate");
    this.field_name_hrms_leaves_todate=this.getFieldValue("todate");
    this.field_name_hrms_leaves_search=this.getFieldValue("search");
    this.field_name_hrms_leaves_pdf=this.getFieldValue("pdf");
    this.field_name_hrms_leaves_csv=this.getFieldValue("csv");
    this.field_name_hrms_add_leaves=this.getFieldValue("add leaves");
    this.field_name_hrms_leaves_update_leaves=this.getFieldValue("update");
    this.field_name_hrms_leaves_details=this.getFieldValue("details");
    this.field_name_hrms_leaves_status=this.getFieldValue("leave_status");
    this.field_name_hrms_leaves_annual=this.getFieldValue("Anuual Leave");
    this.field_name_hrms_leaves_medical=this.getFieldValue("Medical Leave");
    this.field_name_hrms_leaves_other=this.getFieldValue("Other leave");
    this.field_name_hrms_leaves_remaining=this.getFieldValue("Remaining Leave");
    this.field_name_hrms_leaves_type=this.getFieldValue("leave_type");
    this.field_name_hrms_leaves_from=this.getFieldValue("leave_from");
    this.field_name_hrms_leaves_to=this.getFieldValue("leave_to");
    this.field_name_hrms_leaves_reason=this.getFieldValue("leave_reason");
    this.field_name_hrms_leaves_employee_email=this.getFieldValue("leave_email");
    this.field_name_hrms_leaves_created_by=this.getFieldValue("created_by");
    this.field_name_hrms_leaves_created_time=this.getFieldValue("created_time");
    this.field_name_hrms_leaves_updated_by=this.getFieldValue("updated_by");
    this.field_name_hrms_leaves_updated_time =this.getFieldValue("modified_time");  
    this.field_name_hrms_actons=this.getFieldValue("actions");         
break;

case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_HOLIDAYLIST:
    this.field_name_hrms_holiday_fromdate=this.getFieldValue("fromdate");
    this.field_name_hrms_holiday_todate=this.getFieldValue("todate");
    this.field_name_hrms_holiday_search=this.getFieldValue("search");
    this.field_name_hrms_holiday_pdf=this.getFieldValue("pdf");
    this.field_name_hrms_holiday_csv=this.getFieldValue("csv");
    this.field_name_hrms_holiday_add_holiday=this.getFieldValue("add holidays");
    this.field_name_hrms_holiday_update_holiday=this.getFieldValue("update");
    this.field_name_hrms_holiday_details=this.getFieldValue("details");
    this.field_name_hrms_holiday_name=this.getFieldValue("holiday_name");
    this.field_name_hrms_holiday_date=this.getFieldValue("holiday_date");
    this.field_name_hrms_holiday_day=this.getFieldValue("holiday_day");
    this.field_name_hrms_holiday_created_by=this.getFieldValue("created_by");
    this.field_name_hrms_holiday_created_time=this.getFieldValue("created_time");
    this.field_name_hrms_holiday_updated_by=this.getFieldValue("updated_by");
    this.field_name_hrms_holiday_updated_time=this.getFieldValue("modified_time");  
    this.field_name_hrms_actons=this.getFieldValue("actions");         
break;


case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_NOTICE:
    this.field_name_hrms_notice_details=this.getFieldValue("details");
    this.field_name_hrms_notice_update=this.getFieldValue("update");
    this.field_name_hrms_notice_add_notice=this.getFieldValue("add noticetab");
    this.field_name_hrms_notice_type=this.getFieldValue("notice_type");
    this.field_name_hrms_notice_date=this.getFieldValue("notice_date");
    this.field_name_hrms_notice_by=this.getFieldValue("notice_by");
    this.field_name_hrms_notice_attchmnet=this.getFieldValue("attatchment");
    this.field_name_hrms_notice_description=this.getFieldValue("description");
    this.field_name_hrms_notice_created_by=this.getFieldValue("created_by");
    this.field_name_hrms_notice_created_time=this.getFieldValue("created_time");
    this.field_name_hrms_notice_updated_by=this.getFieldValue("updated_by");
    this.field_name_hrms_notice_updated_time=this.getFieldValue("modified_time");
    this.field_name_hrms_notice_fromdate=this.getFieldValue("fromdate");
    this.field_name_hrms_notice_todate=this.getFieldValue("todate");
    this.field_name_hrms_notice_search=this.getFieldValue("search");
    this.field_name_hrms_notice_pdf=this.getFieldValue("pdf");
    this.field_name_hrms_notice_csv=this.getFieldValue("csv");
    this.field_name_hrms_notice_uploadcsv=this.getFieldValue("upload csv");
    this.field_name_hrms_notice_uploadcsvfile=this.getFieldValue("upload file");  
    this.field_name_hrms_actons=this.getFieldValue("actions");     
    break;



    case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PROJECT_LIST:
        this.field_name_hrms_project_details=this.getFieldValue("details");
        this.field_name_hrms_project_fromdate=this.getFieldValue("fromdate");
        this.field_name_hrms_project_todate=this.getFieldValue("todate");
        this.field_name_hrms_project_search=this.getFieldValue("search");
        this.field_name_hrms_project_pdf=this.getFieldValue("pdf");
        this.field_name_hrms_project_csv=this.getFieldValue("csv");
        this.field_name_hrms_project_add_project=this.getFieldValue("add project");
        this.field_name_hrms_project_name=this.getFieldValue("project_name");
        this.field_name_hrms_project_description=this.getFieldValue("project_description");
        this.field_name_hrms_project_team=this.getFieldValue("project_team");
        this.field_name_hrms_project_created_by=this.getFieldValue("created_by");
        this.field_name_hrms_project_created_time=this.getFieldValue("created_time");
        this.field_name_hrms_project_updated_by=this.getFieldValue("updated_by");
        this.field_name_hrms_project_updated_time=this.getFieldValue("modified_time");  
        this.field_name_hrms_actons=this.getFieldValue("actions");    
break;



case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAINING_LIST:
    this.field_name_hrms_training_details=this.getFieldValue("details");
    this.field_name_hrms_training_fromdate=this.getFieldValue("fromdate");
    this.field_name_hrms_training_startdate=this.getFieldValue("training_from");
    this.field_name_hrms_training_enddate=this.getFieldValue("training_to");
    this.field_name_hrms_training_todate=this.getFieldValue("todate");
    this.field_name_hrms_training_search=this.getFieldValue("search");
    this.field_name_hrms_training_status=this.getFieldValue("training_status");
    this.field_name_hrms_training_pdf=this.getFieldValue("pdf");
    this.field_name_hrms_training_csv=this.getFieldValue("csv");
    this.field_name_hrms_training_add_training=this.getFieldValue("add training");
    this.field_name_hrms_training_update=this.getFieldValue("update");
    this.field_name_hrms_training_type=this.getFieldValue("training_type");
    this.field_name_hrms_training_trainer=this.getFieldValue("trainer_name");
    this.field_name_hrms_training_employee=this.getFieldValue("trained_employee_name");
    this.field_name_hrms_training_cost=this.getFieldValue("training_cost");
    this.field_name_hrms_training_description=this.getFieldValue("training_description");
    this.field_name_hrms_training_created_by=this.getFieldValue("created_by");
    this.field_name_hrms_training_created_time=this.getFieldValue("created_time");
    this.field_name_hrms_training_updated_by=this.getFieldValue("updated_by");
    this.field_name_hrms_training_updated_time =this.getFieldValue("modified_time");   
    this.field_name_hrms_actons=this.getFieldValue("actions");        
break;

case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ATTENDENCES:
this.field_name_hrms_attendence_details=this.getFieldValue("details");
this.field_name_hrms_attendence_fromdate=this.getFieldValue("fromdate");
this.field_name_hrms_attendence_todate=this.getFieldValue("todate");
this.field_name_hrms_attendence_phone=this.getFieldValue("phone_number");
this.field_name_hrms_attendence_search=this.getFieldValue("search");
this.field_name_hrms_attendence_pdf=this.getFieldValue("pdf");
this.field_name_hrms_attendence_csv=this.getFieldValue("csv");
this.field_name_hrms_attendence_add_attendence=this.getFieldValue("add_attendence");
this.field_name_hrms_attendence_update=this.getFieldValue("update");
this.field_name_hrms_attendence_leave_type=this.getFieldValue("leave_type");
this.field_name_hrms_attendence_leave_from=this.getFieldValue("leave_from");
this.field_name_hrms_attendence_leave_to=this.getFieldValue("leave_to");
this.field_name_hrms_attendence_leave_reason=this.getFieldValue("leave_reason");
this.field_name_hrms_attendence_employee_name=this.getFieldValue("first_name");
this.field_name_hrms_attendence_created_by=this.getFieldValue("created_by");
this.field_name_hrms_attendence_created_time=this.getFieldValue("created_time");
this.field_name_hrms_attendence_updated_by=this.getFieldValue("updated_by");
this.field_name_hrms_attendence_updated_time =this.getFieldValue("modified_time");   
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;

case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_INFO:
this.field_name_candidates_addcomments =this.getFieldValue("add_comments");
this.field_name_candidates_update_leaves =this.getFieldValue("update");
this.field_name_candidates_details =this.getFieldValue("details");
this.field_name_candidates_candidate_name =this.getFieldValue("candidate_name");
this.field_name_candidates_candidate_phone =this.getFieldValue("candidate_phone");
this.field_name_candidates_email =this.getFieldValue("candidate_email");
this.field_name_candidates_candidate_resume =this.getFieldValue("candidate_resume");
this.field_name_candidates_candidate_status =this.getFieldValue("candidate_status");
this.field_name_candidates_hiring_manager_comments =this.getFieldValue("hiring_manager_comments");
this.field_name_candidates_feedback_comments =this.getFieldValue("request_feedback_comments");
this.field_name_candidates_review_comments =this.getFieldValue("review_comments");
this.field_name_candidates_interview_comments =this.getFieldValue("interview_comments");
this.field_name_candidates_offer_comments =this.getFieldValue("offer_accepted_comments");
this.field_name_candidates_rejected_comments =this.getFieldValue("rejected_comments");
this.field_name_candidates_created_by =this.getFieldValue("created_by");
this.field_name_candidates_created_time =this.getFieldValue("created_time");
this.field_name_candidates_updated_by =this.getFieldValue("updated_by");
this.field_name_candidates_updated_time =this.getFieldValue("modified_time");
break; 
/* case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EVENT_POP_UP:
this.field_name_hrms_event_title=this.getFieldValue("Reports");
this.field_name_hrms_event_start_time=this.getFieldValue("Reports");
this.field_name_hrms_event_end_time=this.getFieldValue("Reports");
this.field_name_hrms_event_type=this.getFieldValue("Reports");
this.field_name_hrms_event_urgency=this.getFieldValue("Reports");
this.field_name_hrms_event_agenda=this.getFieldValue("Reports");
this.field_name_hrms_event_add_participants=this.getFieldValue("Reports");
this.field_name_hrms_event_add_email=this.getFieldValue("Reports");
this.field_name_hrms_event_remove_email=this.getFieldValue("Reports");
this.field_name_hrms_event_list_email=this.getFieldValue("Reports");

break;  */
case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVE_APPROVE:
    this.field_name_hrms_leave_approve_details=this.getFieldValue("details"); 
    this.field_name_hrms_leave_approve_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_leave_approve_todate=this.getFieldValue("todate"); 
    this.field_name_hrms_leave_approve_from=this.getFieldValue("leave_from"); 
    this.field_name_hrms_leave_approve_to=this.getFieldValue("leave_to"); 
    this.field_name_hrms_leave_approve_search=this.getFieldValue("search"); 
    this.field_name_hrms_leave_approve_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_leave_approve_csv=this.getFieldValue("csv"); 
    this.field_name_hrms_leave_approve_add_leave_approve=this.getFieldValue("add_approve"); 
    this.field_name_hrms_leave_approve_update=this.getFieldValue("update"); 
    this.field_name_hrms_leave_approve_type=this.getFieldValue("leave_type"); 
    this.field_name_hrms_leave_approve_reason=this.getFieldValue("leave_reason"); 
    this.field_name_hrms_leave_approve_status=this.getFieldValue("leave_status"); 
    this.field_name_hrms_leave_approve_alert=this.getFieldValue("leave_assigned_to"); 
    this.field_name_hrms_leave_approve_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_leave_approve_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_leave_approve_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_leave_approve_updated_time =this.getFieldValue("modified_time"); 
    this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;

/* case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CALENDAR_POP_UP:
this.field_name_calendar_popup_notice_details =this.getFieldValue("Reports");
this.field_name_calendar_popup_notice_type =this.getFieldValue("Reports");
this.field_name_calendar_popup_notice_date =this.getFieldValue("Reports");
this.field_name_calendar_popup_notice_by =this.getFieldValue("Reports");
this.field_name_calendar_popup_notice_attachment =this.getFieldValue("Reports");
this.field_name_calendar_popup_notice_description =this.getFieldValue("Reports");
break;  */




case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYROLL:
    this.field_name_hrms_payroll_details=this.getFieldValue("details"); 
    this.field_name_hrms_payroll_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_payroll_todate=this.getFieldValue("todate"); 
    this.field_name_hrms_payroll_search=this.getFieldValue("search"); 
    this.field_name_hrms_payroll_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_payroll_csv=this.getFieldValue("csv"); 
    this.field_name_hrms_payroll_add_payroll=this.getFieldValue("add_paroll"); 
    this.field_name_hrms_payroll_emplyee_info=this.getFieldValue("employee_info"); 
    this.field_name_hrms_payroll_update=this.getFieldValue("update"); 
    this.field_name_hrms_payroll_salary_info=this.getFieldValue("salary_info"); 
    this.field_name_hrms_payroll_employee_name=this.getFieldValue("employee_name"); 
    this.field_name_hrms_payroll_last_name=this.getFieldValue("last_name"); 
    this.field_name_hrms_payroll_email=this.getFieldValue("email"); 
    this.field_name_hrms_payroll_phone=this.getFieldValue("phone"); 
    this.field_name_hrms_payroll_designation=this.getFieldValue("designation"); 
    this.field_name_hrms_payroll_basic_salary=this.getFieldValue("basic_salary"); 
    this.field_name_hrms_payroll_transportaion_allowance=this.getFieldValue("allowance_transportation"); 
    this.field_name_hrms_payroll_food_allowance=this.getFieldValue("allowance_food"); 
    this.field_name_hrms_payroll_acccomadation_allowance=this.getFieldValue("allowance_accomadation"); 
    this.field_name_hrms_payroll_net_salary=this.getFieldValue("net_salary"); 
    this.field_name_hrms_payroll_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_payroll_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_payroll_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_payroll_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;






case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYSLIP:
    this.field_name_hrms_payslip_details=this.getFieldValue("details"); 
    this.field_name_hrms_payslip_generate=this.getFieldValue("generate_payslip"); 
    this.field_name_hrms_payslip_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_payslip_todate=this.getFieldValue("todate"); 
    this.field_name_hrms_payslip_search=this.getFieldValue("search"); 
    this.field_name_hrms_payslip_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_payslip_csv=this.getFieldValue("csv"); 
    this.field_name_hrms_payslip_info=this.getFieldValue("add_payslip"); 
    this.field_name_hrms_payslip_update=this.getFieldValue("update"); 
    this.field_name_hrms_payslip_select_year_month=this.getFieldValue("select_year_month"); 
    this.field_name_hrms_payslip_employee_name=this.getFieldValue("first_name"); 
    this.field_name_hrms_payslip_account_number=this.getFieldValue("employee_account_number"); 
    this.field_name_hrms_payslip_bank_name=this.getFieldValue("employee_bank"); 
    this.field_name_hrms_payslip_designation=this.getFieldValue("designation"); 
    this.field_name_hrms_payslip_assigned_to=this.getFieldValue("assigned_to"); 
    this.field_name_hrms_payslip_join_date=this.getFieldValue("joining_date"); 
    this.field_name_hrms_payslip_payments=this.getFieldValue("payslip_payments"); 
    this.field_name_hrms_payslip_amount=this.getFieldValue("payslip_amount"); 
    this.field_name_hrms_payslip_deduction=this.getFieldValue("payslip_deduction"); 
    this.field_name_hrms_payslip_basic_salary=this.getFieldValue("basic_salary"); 
    this.field_name_hrms_payslip_transportaion_allowance=this.getFieldValue("transportation_allowance"); 
    this.field_name_hrms_payslip_food_allowance=this.getFieldValue("allowance_food"); 
    this.field_name_hrms_payslip_acccomadation_allowance=this.getFieldValue("allowance_accomadation"); 
    this.field_name_hrms_payslip_send_email_employee =this.getFieldValue("send_email_to_employee"); 
    this.field_name_hrms_payslip_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_payslip_total_payments=this.getFieldValue("total_payments"); 
    this.field_name_hrms_payslip_total_deduction=this.getFieldValue("total_deduction"); 
    this.field_name_hrms_payslip_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_payslip_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_payslip_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;





case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_POLICY_LIST:
    this.field_name_hrms_policy_details=this.getFieldValue("details"); 
    this.field_name_hrms_policy_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_policy_todate=this.getFieldValue("todate"); 
    this.field_name_hrms_policy_search=this.getFieldValue("search"); 
    this.field_name_hrms_policy_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_policy_csv=this.getFieldValue("csv"); 
    this.field_name_hrms_policy_add_policy=this.getFieldValue("add_policy"); 
    this.field_name_hrms_policy_update=this.getFieldValue("update"); 
    this.field_name_hrms_policy_id=this.getFieldValue("policy_id"); 
    this.field_name_hrms_policy_name=this.getFieldValue("policy_name"); 
    this.field_name_hrms_policy_size=this.getFieldValue("size"); 
    this.field_name_hrms_policy_file=this.getFieldValue("files"); 
    this.field_name_hrms_policy_download=this.getFieldValue("download"); 
    this.field_name_hrms_policy_description=this.getFieldValue("description"); 
    this.field_name_hrms_policy_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_policy_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_policy_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_policy_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;



case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TASK_LIST:
    this.field_name_hrms_task_details=this.getFieldValue("details"); 
    this.field_name_hrms_task_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_task_todate=this.getFieldValue("todate"); 
    this.field_name_hrms_task_search=this.getFieldValue("search"); 
    this.field_name_hrms_task_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_task_csv=this.getFieldValue("csv"); 
    this.field_name_hrms_task_add_task=this.getFieldValue("add_task"); 
    this.field_name_hrms_task_update=this.getFieldValue("update"); 
    this.field_name_hrms_task_record_type=this.getFieldValue("task_record_type"); 
    this.field_name_hrms_task_name=this.getFieldValue("task_name"); 
    this.field_name_hrms_task_subject=this.getFieldValue("task_subject"); 
    this.field_name_hrms_task_due_date=this.getFieldValue("task_due_date"); 
    this.field_name_hrms_task_employee_name=this.getFieldValue("first_name"); 
    this.field_name_hrms_task_phone=this.getFieldValue("phone_number"); 
    this.field_name_hrms_task_follow_update=this.getFieldValue("task_follow_up"); 
    this.field_name_hrms_task_comments=this.getFieldValue("task_comments"); 
    this.field_name_hrms_task_status=this.getFieldValue("task_status"); 
    this.field_name_hrms_task_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_task_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_task_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_task_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;





case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_LIST:
    this.field_name_hrms_candidate_details=this.getFieldValue("details"); 
   /*  this.field_name_hrms_candidate_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_candidate_todate=this.getFieldValue("todate");  */
    this.field_name_hrms_candidate_search=this.getFieldValue("search"); 
  /*   this.field_name_hrms_candidate_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_candidate_csv=this.getFieldValue("csv");  */
    this.field_name_hrms_candidate_add_candidate=this.getFieldValue("add_candidate"); 
    this.field_name_hrms_candidate_update=this.getFieldValue("update"); 
    this.field_name_hrms_candidate_name=this.getFieldValue("candidate_name"); 
    this.field_name_hrms_candidate_email=this.getFieldValue("candidate_email"); 
    this.field_name_hrms_candidate_phone=this.getFieldValue("candidate_phone"); 
    this.field_name_hrms_candidate_resume=this.getFieldValue("candidate_resume"); 
    this.field_name_hrms_candidate_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_candidate_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_candidate_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_candidate_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;





case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CONFIGURE_LEAVE_LIST:
    this.field_name_hrms_configureleave_details=this.getFieldValue("details"); 
    /* this.field_name_hrms_configureleave_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_configureleave_todate=this.getFieldValue("todate");  */
    this.field_name_hrms_configureleave_search=this.getFieldValue("search"); 
  /*   this.field_name_hrms_configureleave_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_configureleave_csv=this.getFieldValue("csv"); */ 
    this.field_name_hrms_configureleave_add_leavetype=this.getFieldValue("add_configure_leave"); 
    this.field_name_hrms_configureleave_update=this.getFieldValue("update"); 
    this.field_name_hrms_configureleave_leavetype=this.getFieldValue("leavetype_name"); 
    this.field_name_hrms_configureleave_leavedays=this.getFieldValue("leavetype_days"); 
    this.field_name_hrms_configureleave_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_configureleave_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_configureleave_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_configureleave_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;



case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DESIGNATION_LIST:
    this.field_name_hrms_designation_details=this.getFieldValue("details"); 
   /*  this.field_name_hrms_designation_fromdate=this.getFieldValue("fromdate"); 
    this.field_name_hrms_designation_todate=this.getFieldValue("todate"); */ 
    this.field_name_hrms_designation_search=this.getFieldValue("search"); 
  /*   this.field_name_hrms_designation_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_designation_csv=this.getFieldValue("csv");  */
    this.field_name_hrms_designation_add_designation=this.getFieldValue("add_designation"); 
    this.field_name_hrms_designation_update=this.getFieldValue("update"); 
    this.field_name_hrms_designation_name=this.getFieldValue("designation_name"); 
    this.field_name_hrms_designation_department=this.getFieldValue("department_name"); 
    this.field_name_hrms_designation_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_designation_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_designation_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_designation_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;




case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEE_STATUS_LIST:
    this.field_name_hrms_emyployeestatus_details=this.getFieldValue("details"); 
   /*  this.field_name_hrms_emyployeestatus_fromdate=this.getFieldValue("todate"); 
    this.field_name_hrms_emyployeestatus_todate=this.getFieldValue("fromdate");  */
    this.field_name_hrms_emyployeestatus_search=this.getFieldValue("search"); 
/*     this.field_name_hrms_emyployeestatus_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_emyployeestatus_csv=this.getFieldValue("csv");  */
    this.field_name_hrms_emyployeestatus_add_emyployeestatus=this.getFieldValue("add_employee_status"); 
    this.field_name_hrms_emyployeestatus_update=this.getFieldValue("update"); 
    this.field_name_hrms_emyployeestatus_status=this.getFieldValue("employee_status"); 
    this.field_name_hrms_emyployeestatus_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_emyployeestatus_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_emyployeestatus_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_emyployeestatus_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;




case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ORGANISATIONS_INFO_LIST:
    this.field_name_hrms_organisationinfo_details=this.getFieldValue("details"); 
   /*  this.field_name_hrms_organisationinfo_fromdate=this.getFieldValue("todate"); 
    this.field_name_hrms_organisationinfo_todate=this.getFieldValue("fromdate"); */ 
    this.field_name_hrms_organisationinfo_search=this.getFieldValue("search"); 
   /*  this.field_name_hrms_organisationinfo_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_organisationinfo_csv=this.getFieldValue("csv");  */
    this.field_name_hrms_organisationinfo_add_organisationinfo=this.getFieldValue("add_organisation_info"); 
    this.field_name_hrms_organisationinfo_update=this.getFieldValue("update"); 
    this.field_name_hrms_organisationinfo_name=this.getFieldValue("orginfo_name"); 
    this.field_name_hrms_organisationinfo_address=this.getFieldValue("orginfo_address"); 
    this.field_name_hrms_organisationinfo_phone=this.getFieldValue("orginfo_mobile"); 
    this.field_name_hrms_organisationinfo_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_organisationinfo_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_organisationinfo_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_organisationinfo_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;



case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAVEL_LIST:
    this.field_name_hrms_travel_details=this.getFieldValue("details"); 
   /*  this.field_name_hrms_travel_fromdate=this.getFieldValue("todate"); 
    this.field_name_hrms_travel_todate=this.getFieldValue("fromdate");  */
    this.field_name_hrms_travel_search=this.getFieldValue("search"); 
   /*  this.field_name_hrms_travel_pdf=this.getFieldValue("pdf"); 
    this.field_name_hrms_travel_csv=this.getFieldValue("csv");  */
    this.field_name_hrms_travel_info=this.getFieldValue("travel_info"); 
    this.field_name_hrms_travel_add_travel=this.getFieldValue("add_travel"); 
    this.field_name_hrms_travel_update=this.getFieldValue("update"); 
    this.field_name_hrms_travel_employee_name=this.getFieldValue("employee_name"); 
    this.field_name_hrms_travel_date=this.getFieldValue("travel_date"); 
    this.field_name_hrms_travel_ticket_info=this.getFieldValue("ticket_info"); 
    this.field_name_hrms_travel_return_date=this.getFieldValue("return_date"); 
    this.field_name_hrms_travel_created_by=this.getFieldValue("created_by"); 
    this.field_name_hrms_travel_created_time=this.getFieldValue("created_time"); 
    this.field_name_hrms_travel_updated_by=this.getFieldValue("updated_by"); 
    this.field_name_hrms_travel_updated_time =this.getFieldValue("modified_time"); 
this.field_name_hrms_actons=this.getFieldValue("actions"); 
break;


case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_SETTINGS:
            this.field_name_hrms_settings_user_management=this.getFieldValue("user management"); 
            this.field_name_hrms_settings_user_management_headings=this.getFieldValue("manage user management"); 
            this.field_name_hrms_settings_history=this.getFieldValue("history"); 
            this.field_name_hrms_settings_history_heading=this.getFieldValue("manage history"); 
            this.field_name_hrms_settings_configuration_management=this.getFieldValue("configuration management"); 
            this.field_name_hrms_settings_configuration_management_heading=this.getFieldValue("manage configuration management"); 
            this.field_name_hrms_settings_addexpenses=this.getFieldValue("add expenses"); 
            this.field_name_hrms_settings_addexpenses_heading=this.getFieldValue("manage add expenses"); 
            this.field_name_hrms_settings_leave_approve_heading=this.getFieldValue("manage leave approve"); 
            this.field_name_hrms_settings_leave_approve=this.getFieldValue("leave approve"); 
            this.field_name_hrms_settings_edit_profile=this.getFieldValue("edit profile"); 
            this.field_name_hrms_settings_edit_profile_heading=this.getFieldValue("manage edit profile"); 
            this.field_name_hrms_settings_change_password=this.getFieldValue("change password"); 
            this.field_name_hrms_settings_change_password_heading=this.getFieldValue("manage change password"); 
            this.field_name_hrms_settings_attendance=this.getFieldValue("attendance"); 
            this.field_name_hrms_settings_attendance_heading=this.getFieldValue("manage attendance"); 
            this.field_name_hrms_settings_policy=this.getFieldValue("policy"); 
            this.field_name_hrms_settings_policy_heading=this.getFieldValue("manage policy"); 
            this.field_name_hrms_settings_payroll=this.getFieldValue("payroll"); 
            this.field_name_hrms_settings_payroll_heading=this.getFieldValue("manage payroll"); 
            this.field_name_hrms_settings_organisation_chart=this.getFieldValue("organisation chart"); 
            this.field_name_hrms_settings_organisation_chart_heading=this.getFieldValue("manage organisation chart"); 
            this.field_name_hrms_settings_task_management=this.getFieldValue("task management"); 
            this.field_name_hrms_settings_task_management_heading=this.getFieldValue("manage task management"); 
            this.field_name_hrms_settings_pay_slip=this.getFieldValue("pay slip"); 
            this.field_name_hrms_settings_pay_slip_heading=this.getFieldValue("manage pay slip"); 
            this.field_name_hrms_settings_interview=this.getFieldValue("interview"); 
            this.field_name_hrms_settings_interview_heading=this.getFieldValue("manage interview"); 
            this.field_name_hrms_settings_edit_form_fields=this.getFieldValue("edit form"); 
            this.field_name_hrms_settings_edit_form_fields_heading=this.getFieldValue("manage edit form"); 

break;
case GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DYNAMIC_SETTINGS:
            this.field_name_hrms_dynamic_fields_designation_heading=this.getFieldValue("configure designation"); 
            this.field_name_hrms_dynamic_fields_designation=this.getFieldValue("designation"); 
            this.field_name_hrms_dynamic_fields_department_heading=this.getFieldValue("configure department"); 
            this.field_name_hrms_dynamic_fields_department=this.getFieldValue("department"); 
            this.field_name_hrms_dynamic_fields_travel_reimbursement_heading=this.getFieldValue("configure travel reimbursement"); 
            this.field_name_hrms_dynamic_fields_travel_reimbursement=this.getFieldValue("travel reimbursement"); 
            this.field_name_hrms_dynamic_fields_candidate_heading=this.getFieldValue("configure candidate"); 
            this.field_name_hrms_dynamic_fields_candidate=this.getFieldValue("candidate"); 
            this.field_name_hrms_dynamic_fields_employee_status_heading=this.getFieldValue("configure employee status"); 
            this.field_name_hrms_dynamic_fields_employee_status=this.getFieldValue("employee status"); 
            this.field_name_hrms_dynamic_fields_configure_leavetype_heading=this.getFieldValue("configure leavetype"); 
            this.field_name_hrms_dynamic_fields_configure_leavetype=this.getFieldValue("leavetype"); 
            this.field_name_hrms_dynamic_fields_organisation_info_heading=this.getFieldValue("configure organisation info"); 
            this.field_name_hrms_dynamic_fields_organisation_info=this.getFieldValue("organisation info"); 
break;



case GlobalConstants.SALES_COMPONENT_NAME.SALES_DYNAMIC_SETTINGS:
            this.field_name_sales_dynamic_fields_product_category=this.getFieldValue("product category"); 
            this.field_name_sales_dynamic_fields_product_category_heading=this.getFieldValue("manage product category"); 
            this.field_name_sales_dynamic_fields_pipeline=this.getFieldValue("pipline"); 
            this.field_name_sales_dynamic_fields_pipeline_heading=this.getFieldValue("manage pipline"); 
            this.field_name_sales_dynamic_fields_sales_stage=this.getFieldValue("sales stage"); 
            this.field_name_sales_dynamic_fields_sales_stage_heading=this.getFieldValue("manage sales stage"); 
            this.field_name_sales_dynamic_fields_lead_source=this.getFieldValue("lead source"); 
            this.field_name_sales_dynamic_fields_lead_source_heading=this.getFieldValue("manage lead source"); 
            this.field_name_sales_dynamic_fields_source=this.getFieldValue("source"); 
            this.field_name_sales_dynamic_fields_source_heading=this.getFieldValue("manage source"); 
            this.field_name_sales_dynamic_fields_department=this.getFieldValue("department"); 
            this.field_name_sales_dynamic_fields_department_heading=this.getFieldValue("manage department"); 
            this.field_name_sales_dynamic_fields_expenses_item=this.getFieldValue("expenses item"); 
            this.field_name_sales_dynamic_fields_expenses_item_heading=this.getFieldValue("manage expenses item"); 
            this.field_name_sales_dynamic_fields_supplier=this.getFieldValue("supplier"); 
            this.field_name_sales_dynamic_fields_supplier_heading=this.getFieldValue("manage supplier"); 
            this.field_name_sales_dynamic_fields_currency=this.getFieldValue("currency"); 
            this.field_name_sales_dynamic_fields_currency_heading=this.getFieldValue("manage currency"); 
break;



case GlobalConstants.SALES_COMPONENT_NAME.SALES_SETTINGS:
        this.field_name_sales_settings_edit_form_fields=this.getFieldValue("edit form fields"); 
            this.field_name_sales_settings_edit_form_fields_heading=this.getFieldValue("manage edit form fields"); 
            this.field_name_sales_settings_user_management=this.getFieldValue("user management"); 
            this.field_name_sales_settings_user_management_headings=this.getFieldValue("manage user management"); 
            this.field_name_sales_settings_history=this.getFieldValue("history"); 
            this.field_name_sales_settings_history_heading=this.getFieldValue("manage history"); 
            this.field_name_sales_settings_configuration_management=this.getFieldValue("configuration management"); 
            this.field_name_sales_settings_configuration_management_heading=this.getFieldValue("manage configuration management"); 
            this.field_name_sales_settings_addexpenses=this.getFieldValue("add expenses"); 
            this.field_name_sales_settings_addexpenses_heading=this.getFieldValue("manage add expenses"); 
            this.field_name_sales_settings_edit_profile=this.getFieldValue("edit profile"); 
            this.field_name_sales_settings_edit_profile_heading=this.getFieldValue("manage edit profile"); 
            this.field_name_sales_settings_change_password=this.getFieldValue("change password"); 
            this.field_name_sales_settings_change_password_heading=this.getFieldValue("manage change password"); 
            this.field_name_sales_settings_organisation_heading=this.getFieldValue("configure organisation"); 
            this.field_name_sales_settings_organisation=this.getFieldValue("organisation"); 
break;
break;



case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_SETTINGS:
    this.field_name_service_settings_edit_form_fields=this.getFieldValue("edit form fields"); 
    this.field_name_service_settings_edit_form_fields_heading=this.getFieldValue("manage edit form fields"); 
    this.field_name_service_settings_user_management=this.getFieldValue("user management"); 
    this.field_name_service_settings_user_management_headings=this.getFieldValue("manage user management"); 
    this.field_name_service_settings_history=this.getFieldValue("history"); 
    this.field_name_service_settings_history_heading=this.getFieldValue("manage history"); 
    this.field_name_service_settings_configuration_management=this.getFieldValue("configuration management"); 
    this.field_name_service_settings_configuration_management_heading=this.getFieldValue("manage configuration management"); 
    this.field_name_service_settings_edit_profile=this.getFieldValue("edit profile"); 
    this.field_name_service_settings_edit_profile_heading=this.getFieldValue("manage edit profile"); 
    this.field_name_service_settings_change_password=this.getFieldValue("change password"); 
    this.field_name_service_settings_change_password_heading=this.getFieldValue("manage change password"); 
break;



case GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_DYNAMIC_SETTINGS:
          
            this.field_name_service_dynamic_fields_source=this.getFieldValue("source"); 
            this.field_name_service_dynamic_fields_source_heading=this.getFieldValue("manage source"); 
            this.field_name_service_dynamic_fields_department=this.getFieldValue("department"); 
            this.field_name_service_dynamic_fields_department_heading=this.getFieldValue("manage department"); 
           
break;


case GlobalConstants.COMPONENT_NAME.MARKETING_SETTINGS:
this.field_name_marketing_settings_edit_form_fields=this.getFieldValue("edit form fields"); 
this.field_name_marketing_settings_edit_form_fields_heading=this.getFieldValue("manage edit form fields"); 
this.field_name_marketing_settings_user_management=this.getFieldValue("user management"); 
this.field_name_marketing_settings_user_management_headings=this.getFieldValue("manage user management"); 
this.field_name_marketing_settings_history=this.getFieldValue("history"); 
this.field_name_marketing_settings_history_heading=this.getFieldValue("manage history"); 
this.field_name_marketing_settings_configuration_management=this.getFieldValue("configuration management"); 
this.field_name_marketing_settings_configuration_management_heading=this.getFieldValue("manage configuration management"); 
this.field_name_marketing_settings_edit_profile=this.getFieldValue("edit profile"); 
this.field_name_marketing_settings_edit_profile_heading=this.getFieldValue("manage edit profile"); 
this.field_name_marketing_settings_change_password=this.getFieldValue("change password"); 
this.field_name_marketing_settings_change_password_heading=this.getFieldValue("manage change password"); 
break;



case GlobalConstants.COMPONENT_NAME.MARKETING_DYNAMIC_SETTINGS:
        this.field_name_marketing_dynamic_fields_source=this.getFieldValue("source"); 
        this.field_name_marketing_dynamic_fields_source_heading=this.getFieldValue("manage source"); 
        this.field_name_marketing_dynamic_fields_department=this.getFieldValue("department"); 
        this.field_name_marketing_dynamic_fields_department_heading=this.getFieldValue("manage department"); 
        this.field_name_marketing_dynamic_fields_campaignactive_heading=this.getFieldValue("manage campaign active"); 
        this.field_name_marketing_dynamic_fields_campaignactive=this.getFieldValue("campaign active"); 
        this.field_name_marketing_dynamic_fields_campaigntype_heading=this.getFieldValue("manage campaign type"); 
        this.field_name_marketing_dynamic_fields_campaigntype=this.getFieldValue("campaign type"); 
       
break;


case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SETTINGS:
this.field_name_inventory_settings_edit_form_fields=this.getFieldValue("edit form fields"); 
this.field_name_inventory_settings_edit_form_fields_heading=this.getFieldValue("manage edit form fields"); 
this.field_name_inventory_settings_user_management=this.getFieldValue("user management"); 
this.field_name_inventory_settings_user_management_headings=this.getFieldValue("manage user management"); 
this.field_name_inventory_settings_history=this.getFieldValue("history"); 
this.field_name_inventory_settings_history_heading=this.getFieldValue("manage history"); 
this.field_name_inventory_settings_configuration_management=this.getFieldValue("configuration management"); 
this.field_name_inventory_settings_configuration_management_heading=this.getFieldValue("manage configuration management"); 
this.field_name_inventory_settings_edit_profile=this.getFieldValue("edit profile"); 
this.field_name_inventory_settings_edit_profile_heading=this.getFieldValue("manage edit profile"); 
this.field_name_inventory_settings_change_password=this.getFieldValue("change password"); 
this.field_name_inventory_settings_change_password_heading=this.getFieldValue("manage change password"); 
break;

case GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_DYNAMIC_SETTINGS:
    this.field_name_inventory_dynamic_fields_product_category=this.getFieldValue("product category"); 
    this.field_name_inventory_dynamic_fields_product_category_heading=this.getFieldValue("manage product category"); 
    this.field_name_inventory_dynamic_fields_source=this.getFieldValue("source"); 
    this.field_name_inventory_dynamic_fields_source_heading=this.getFieldValue("manage source"); 
    this.field_name_inventory_dynamic_fields_department=this.getFieldValue("manage department"); 
    this.field_name_inventory_dynamic_fields_department_heading=this.getFieldValue("manage department"); 
    this.field_name_inventory_dynamic_fields_currency=this.getFieldValue("currency"); 
    this.field_name_inventory_dynamic_fields_currency_heading=this.getFieldValue("manage currency"); 
    this.field_name_inventory_dynamic_fields_warehouse=this.getFieldValue("warehouse"); 
    this.field_name_inventory_dynamic_fields_warehouse_heading=this.getFieldValue("manage warehouse"); 
    this.field_name_inventory_dynamic_fields_expenses_item=this.getFieldValue("expenses item"); 
    this.field_name_inventory_dynamic_fields_expenses_item_heading=this.getFieldValue("manage expenses item"); 
break;



    }
}



field_button_save: string = "";
field_button_reset: string = "";
field_button_cancel: string = "";
field_button_update: string = "";
field_can_be_deleted: string = "";

fillCommonFieldNames() {
    this.field_button_save = this.getFieldValue("button_save");
    this.field_button_update = this.getFieldValue("button_update");
    this.field_button_reset = this.getFieldValue("button_reset");
    this.field_button_cancel = this.getFieldValue("button_cancel");
    this.field_can_be_deleted = this.getFieldValue("can_be_deleted");
}

component_name: string = "";
currentFieldValue: string;
currentFieldDetail: string;
protected _dbService: DBService;
//get field names from database
fieldDetailMap = new Map<string, string>();
fieldRequiredMap = new Map<string, boolean>();

constructor(component_name, injector: Injector) {
    this._dbService = injector.get(DBService);
    this.component_name = component_name;
    // this.populateFields();
}

async populateFields() {
   // CustomLogger.logStringWithObject("Will load map for component:::", this.component_name);
    //populate fields
   // CustomLogger.logStringWithObject("_dbService:::", this._dbService);
    let result = await this._dbService.getFieldDetailsForComponent(this.component_name).toPromise();
    //CustomLogger.logStringWithObject("RESULT:::", result);
    let fieldDetailArr: FieldDetail[] = result["data"];
    fieldDetailArr.forEach(fieldDetail => {
   
// this.fieldDetailMap.set(fieldDetail.field_name, this.currentFieldValue = fieldDetail.en); 
//console.log("Language:", GlobalConstants.CURRENT_SELECTED_LANGUAGE);
let  tmp = fieldDetail.en;
if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "en"){
    tmp = fieldDetail.en
} 
else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ar")
{
    tmp = fieldDetail.ar
}
else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "zh")
{
    tmp = fieldDetail.zh
}

else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "es")
{
    tmp = fieldDetail.es
}

else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "fr")
{
    tmp = fieldDetail.fr
}

else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ru")
{
    tmp = fieldDetail.ru
}


else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ko")
{
    tmp = fieldDetail.ko
}


else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ja")
{
    tmp = fieldDetail.ja
}

else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "tr")
{
    tmp = fieldDetail.tr
}



this.fieldDetailMap.set(fieldDetail.field_name, tmp); 
   /*  this.fieldDetailMap.set(fieldDetail.field_name,this.currentFieldDetail); 
    */
        this.fieldRequiredMap.set(fieldDetail.field_name, fieldDetail.is_required);
    });
    //CustomLogger.logStringWithObject("Filled Field Map:", this.fieldDetailMap);

    this.fillCommonFieldNames();
    this.initializeHtmlFields();
}

getFieldValue(field_name): string {
    return this.fieldDetailMap.get(field_name);
}

getFieldRequired(field_name): boolean {
    return this.fieldRequiredMap.get(field_name);
}


/*
async populateWebsitetext() {
    // CustomLogger.logStringWithObject("Will load map for component:::", this.component_name);
     //populate fields
    // CustomLogger.logStringWithObject("_dbService:::", this._dbService);
     let result = await this._dbService.getlandingpageForComponent(this.component_name).toPromise();
     //CustomLogger.logStringWithObject("RESULT:::", result);
     let landingpageArr: LandingPage[] = result["data"];
     landingpageArr.forEach(landingpage => {
    
 // this.fieldDetailMap.set(fieldDetail.field_name, this.currentFieldValue = fieldDetail.en); 
 //console.log("Language:", GlobalConstants.CURRENT_SELECTED_LANGUAGE);
 let  tmp = landingpage.en;
 if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "en"){
     tmp = landingpage.en
 } 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ar")
 {
     tmp = landingpage.ar
 }
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "zh")
 {
     tmp = landingpage.zh
 }
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "es")
 {
     tmp = landingpage.es
 }
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "fr")
 {
     tmp = landingpage.fr
 }
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ru")
 {
     tmp = landingpage.ru
 }
 
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ko")
 {
     tmp = landingpage.ko
 }
 
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "ja")
 {
     tmp = landingpage.ja
 }
 
 else if(GlobalConstants.CURRENT_SELECTED_LANGUAGE == "tr")
 {
     tmp = landingpage.tr
 }
 
 
 

         this.fieldRequiredMap.set(landingpage.field_name, landingpage.is_required);
     });
     //CustomLogger.logStringWithObject("Filled Field Map:", this.fieldDetailMap);
 
     this.fillCommonFieldNames();
     this.initializeHtmlFields();
 }

*/


}