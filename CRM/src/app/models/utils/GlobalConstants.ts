/**
 * All constants used in the application will go in this class file
 */
import { environment } from "../../../environments/environment";

export class GlobalConstants {

  


    static readonly OBJECT_DETAIL_CUSTOMER = 3;
    static readonly OBJECT_DETAIL_CONTACT = 1;
    static readonly OBJECT_DETAIL_LEAD = 2;
    static readonly OBJECT_DETAIL_CAMPAIGN = 4;

    static CURRENT_MODULE = "sales";

    static readonly PARENT_ACTIVITY_CUSTOMER = 'Customer';
    static readonly PARENT_ACTIVITY_CONTACT = 'Contact';
    static readonly PARENT_ACTIVITY_LEAD = 'Lead';
    static readonly PARENT_ACTIVITY_CAMPAIGN = 'Campaign';

    static readonly plan_starter ='Starter';
    static readonly plan_medium='Medium'
    //local storage variable key names

    //read from environment file
    static readonly BACKEND_SERVER_URL = environment.BACKEND_SERVER_URL;
    static readonly SERVER_URL = environment.SERVER_URL;

    //default file locations
    static readonly DEFAULTS_FILE_LOCATIONS = {
        // ENTITY_ICONS: "assets/images/sectors/"
        // ENTITY_ICONS: "c://fakepath//"
  /*     ENTITY_ICONS: "../../backend/public/"  */
          ENTITY_ICONS:GlobalConstants.BACKEND_SERVER_URL +'/'
     
        /* ENTITY_ICONS:'public' */
    }

    //reporting types


    static readonly PARAM_CRUD_TYPE = "crudType";

    static readonly CRUD_CREATE = "c";
    static readonly CRUD_READ = "r";
    static readonly CRUD_UPDATE = "u";
    static readonly CRUD_DELETE = "d";
//component names

//component names




static readonly CRM_LANDING_PAGE = {
  
   NAVBAR:"navbar",
   HOMEPAGE:"home",
   ABOUTUS:"about us",
   FEATURES:"features",
   PRODUCTS_MARKETING:"products_marketing",
   PRODUCTS_SALES:"products_sales",
   PRODUCTS_SERVICE:"products_services",
   SERVICES:"services",
   SUPPORT:"support"
   
   
   
  
}




static readonly COMPONENT_NAME = {
  
    CRUD_USER: "User",
    MARKETING_DASHBOARD:"Marketing Dashboard",
    MARKETING_CONTACTS:"Contacts",
    MARKETING_CUSTOMER:"Customers",
    MARKETING_LEADS:"Leads",
    MARKETING_CAMPAIGNS:"Campaigns",
    MARKETING_ACTIVITIES:"Activity Management",
    MARKETING_HISTORY:"History",
    MARKETING_CAMPAIGNS_ACTIVE:"Campaigns Active",
    MARKETING_CAMPAIGNS_TYPE:"Campaigns Type",
    SALES_SOURCE:"Source",
    SALES_DEPARTMENT: "Department",
    CHANGE_PASSWORD:"Change Password",
    MARKETING_REPORTS:"Marketing Reports",
    MARKETING_SETTINGS:"Marketing Settings",
    MARKETING_DYNAMIC_SETTINGS:"Marketing Dynamic Settings"

   
   
   
  
}


static readonly SERVICE_COMPONENT_NAME = {
 
   SERVICE_DASHBOARD:"Service Dashboard",
   SERVICE_TICKETING:"Service Ticketing",
   SERVICE_CASES:"Service Cases",
    /* SERVICE_CASES:"Cases", */
    SERVICE_FAQ:"Faq",
    SERVICE_CUSTOMER:"Customers",
    SERVICE_USER:"User",
    MARKETING_HISTORY:"History",
    SALES_SOURCE:"Source",
    INVENTORY_SUPPLIER:"Supplier",
    INVENTORY_CURRENCY:"Currency",
    SALES_DEPARTMENT: "Department",
    CHANGE_PASSWORD:"Change Password",
    SERVICE_REPORTS:"Service Reports",
    SERVICE_SETTINGS:"Service Settings",
    SERVICE_DYNAMIC_SETTINGS:"Service Dynamic Settings"
  
} 


static readonly SALES_COMPONENT_NAME = {

    
    SALES_DASHBOARD:"Sales Dashboard",
    SALES_CUSTOMER:"Customers",
    SALES_LEADS:"Leads",
    SALES_ADD_VISITS:"Add Visits",
    SALES_SHEDULE_VISITS:"Shedule Visits",
    SALES_DEALS:"Deals",
    SALES_PRODUCT:"Products",
    SALES_QUOTATION:"Quotation",
    SALES_USER:"User",
    MARKETING_HISTORY:"History",
    SALES_CATEGORY : "Product Category",
    SALES_PIPELINE: "Pipline",
    SALES_DEPARTMENT: "Department",
    SALES_LEAD_SOURCE:"Lead Source",
    SALES_SOURCE:"Source",
    SALES_SALES_STAGE:"Sales Stage",
    SALES_EXPENSES_ITEM:"Expenses Item",
    SALES_ADD_EXPENSES:"Add Expenses",
    CHANGE_PASSWORD:"Change Password",
    SALES_REPORTS:"Sales Reports",
    ORGANISATION:"Organisation",
    SALES_SETTINGS:"Sales Settings",
    SALES_DYNAMIC_SETTINGS:"Sales Dynamic Settings"
 } 



 static readonly INVENTORY_COMPONENT_NAME = {
 
    INVENTORY_DASHBOARD:"Inventory Dashboard",
   /*  INVENTORY_PRODUCT:"Products", */
    INVENTORY_CUSTOMER:"Customers",
    INVENTORY_USER:"User",
   
    INVENTORY_HISTORY:"History",
    INVENTORY_CATEGORY : "Product Category",
     SALES_SOURCE:"Source",
     SALES_DEPARTMENT: "Department",
     CHANGE_PASSWORD:"Change Password",
     SALES_EXPENSES_ITEM:"Expenses Item",
     SALES_ADD_EXPENSES:"Add Expenses",
     INVENTORY_SUPPLIER:"Supplier",
      INVENTORY_CURRENCY:"Currency",
     INVENTORY_PURCHASE:"Purchase",
    INVENTORY_INVOICE: "Invoice",
    INVENTORY_STOCK: "Stock",
    INVENTORY_WAREHOUSE: "Warehouse",
    INVENTORY_RETURN: "Returns",
    INVENTORY_REPORTS:"Inventory Reports",
    INVENTORY_SETTINGS:"Inventory Settings",
    INVENTORY_DYNAMIC_SETTINGS:"Inventory Dynamic Settings"
   
 } 
 


 

 static readonly HRMS_COMPONENT_NAMES = {
 
    HRMS_DASHBOARD:"Hrms Dashboard",
  /*   HRMS_CALENDAR_POP_UP:"Calendar Pop Up", */
  HRMS_ADD_EXPENSES:"Add Expenses",
    HRMS_LEAVE_APPROVE:"Leave Aprrove",
    HRMS_PAYROLL:"Payroll",
    HRMS_PAYSLIP:"Pay Slip",
    HRMS_POLICY_LIST:"Policy List",
    HRMS_TASK_LIST:"Task List",
    HRMS_CANDIDATE_LIST:"Candidate List",
    HRMS_CANDIDATE_INFO:"Candidate Info List",
    HRMS_CONFIGURE_LEAVE_LIST:"Configure leave list",
    HRMS_ATTENDENCES:"Attendances",
    HRMS_EMPLOYEES: "Employees List",
   /*  HRMS_EVENT_POP_UP:"Event Pop Up",  */
    HRMS_HOLIDAYLIST: "Holiday List",
   /*  HRMS_INTERVIEWS:"Interviews",  */
     HRMS_LEAVES_LIST:"Leaves List",
     HRMS_NOTICE:"Notice tab",
     HRMS_PROJECT_LIST:"Project List",
     HRMS_TRAINING_LIST:"Training List",
     HRMS_DESIGNATION_LIST:"Designation List",
     HRMS_EMPLOYEE_STATUS_LIST:"Employee Status List",
     HRMS_ORGANISATIONS_INFO_LIST:"Organisations Info List",
     HRMS_TRAVEL_LIST:"Travel List",
     HRMS_HISTORY:"History",
     HRMS_USER:"User",
     HRMS_CHANGE_PASSWORD:"Change Password",
     HRMS_REPORTS:"Hrms Reports",
     HRMS_SETTINGS:"Hrms Settings",
     HRMS_DYNAMIC_SETTINGS:"Hrms Dynamic Settings"
   
 } 



 static readonly LANDING_PAGE = {
    LANDING_PAGE_LABELS: [
      
        GlobalConstants.CRM_LANDING_PAGE.NAVBAR,
        GlobalConstants.CRM_LANDING_PAGE.HOMEPAGE,
        GlobalConstants.CRM_LANDING_PAGE.ABOUTUS,
        GlobalConstants.CRM_LANDING_PAGE.FEATURES,
        GlobalConstants.CRM_LANDING_PAGE.SERVICES,
        GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_MARKETING,
        GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_SALES,
        GlobalConstants.CRM_LANDING_PAGE.PRODUCTS_SERVICE,
        GlobalConstants.CRM_LANDING_PAGE.SUPPORT,
   
    ]
}


static readonly ALL = {
    ALL_COMPONENT_NAMES: [
        
        GlobalConstants.COMPONENT_NAME.CRUD_USER,
        GlobalConstants.COMPONENT_NAME.MARKETING_DASHBOARD,
        GlobalConstants.COMPONENT_NAME.MARKETING_CONTACTS,
        GlobalConstants.COMPONENT_NAME.MARKETING_CUSTOMER,
        GlobalConstants.COMPONENT_NAME.MARKETING_LEADS,
        GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS,
        GlobalConstants.COMPONENT_NAME.MARKETING_ACTIVITIES,
        GlobalConstants.COMPONENT_NAME.MARKETING_HISTORY,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SOURCE,
        GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_TYPE,
        GlobalConstants.COMPONENT_NAME.MARKETING_CAMPAIGNS_ACTIVE,
        GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD,
        GlobalConstants.COMPONENT_NAME.MARKETING_REPORTS,
        GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD,
        GlobalConstants.COMPONENT_NAME.MARKETING_REPORTS,
        GlobalConstants.COMPONENT_NAME.MARKETING_SETTINGS,
        GlobalConstants.COMPONENT_NAME.MARKETING_DYNAMIC_SETTINGS


      
       

      
    ]
}    

static readonly INVENTORY = {
    INVENTORY_COMPONENT_NAMES:[
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_DASHBOARD,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CUSTOMER,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_RETURN,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_HISTORY,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_USER,
        GlobalConstants.INVENTORY_COMPONENT_NAME.SALES_DEPARTMENT,
        GlobalConstants.INVENTORY_COMPONENT_NAME.SALES_SOURCE,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CATEGORY,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CURRENCY,
        GlobalConstants.INVENTORY_COMPONENT_NAME.SALES_EXPENSES_ITEM,
        GlobalConstants.INVENTORY_COMPONENT_NAME.SALES_ADD_EXPENSES,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_INVOICE,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_PURCHASE,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_WAREHOUSE,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_STOCK,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_WAREHOUSE,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_REPORTS,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SETTINGS,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_DYNAMIC_SETTINGS
     
      
        
    
      

    ]

}

 static readonly SERVICE = {
    SERVICE_COMPONENT_NAMES: [
      
        GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_USER,
        GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_DASHBOARD,
       /*  GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_CASES, */
        GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_FAQ,
        GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_CUSTOMER,
         GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_TICKETING,
        GlobalConstants.COMPONENT_NAME.MARKETING_HISTORY,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SOURCE,
         GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD,
         GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_REPORTS,
         GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_SETTINGS,
         GlobalConstants.SERVICE_COMPONENT_NAME.SERVICE_DYNAMIC_SETTINGS
      

       
     
    ]
}

static readonly SALES = {
    SALES_COMPONENT_NAMES: [
      
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DASHBOARD,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_CUSTOMER,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_LEADS,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_ADD_VISITS,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SHEDULE_VISITS,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DEALS,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_PRODUCT,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_QUOTATION,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_USER,
        GlobalConstants.COMPONENT_NAME.MARKETING_HISTORY,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_CATEGORY,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_PIPELINE,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DEPARTMENT,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_LEAD_SOURCE,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SOURCE,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SALES_STAGE,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_EXPENSES_ITEM,
        GlobalConstants.SALES_COMPONENT_NAME .SALES_ADD_EXPENSES,
        GlobalConstants.COMPONENT_NAME.CHANGE_PASSWORD,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_REPORTS,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_SUPPLIER,
        GlobalConstants.INVENTORY_COMPONENT_NAME.INVENTORY_CURRENCY,
        GlobalConstants.SALES_COMPONENT_NAME.ORGANISATION,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_SETTINGS,
        GlobalConstants.SALES_COMPONENT_NAME.SALES_DYNAMIC_SETTINGS
       
     
    ]
}




static readonly HRMS = {
    HRMS_COMPONENT_NAMES: [
    
     
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DASHBOARD,
    /*    GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CALENDAR_POP_UP, */
    GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ADD_EXPENSES, 
       GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVE_APPROVE,  
       GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ATTENDENCES, 
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_INFO, 
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEES,
        /* GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EVENT_POP_UP,  */
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_HOLIDAYLIST,
       /*  GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_INTERVIEWS,  */
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_LEAVES_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_NOTICE,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYSLIP,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PAYROLL,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CANDIDATE_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CONFIGURE_LEAVE_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_PROJECT_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAINING_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TASK_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DESIGNATION_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_EMPLOYEE_STATUS_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_ORGANISATIONS_INFO_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_TRAVEL_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_POLICY_LIST,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_HISTORY,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_USER,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_CHANGE_PASSWORD,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_REPORTS,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_SETTINGS,
        GlobalConstants.HRMS_COMPONENT_NAMES.HRMS_DYNAMIC_SETTINGS,
       
        
      
       
          


     
    ]
}

static readonly PREFERRED_LANGUAGE = {
    ENGLISH: "en",
    ARABIC: "ar"
}


static readonly ARRAY_PREFERRED_LANGUAGE = [
    {
        id: GlobalConstants.PREFERRED_LANGUAGE.ENGLISH,
        name: "English"
    },
     {
        id: GlobalConstants.PREFERRED_LANGUAGE.ARABIC,
        name: "عربى"
    }
    
]
static INVENTORY_DASHBOARD = "inventory";
static HRMS_DASHBOARD="hrms";
static OGOUL_DASHBOARD = "ogoul";
static CURRENT_DASHBOARD = "sales";
static CURRENT_SELECTED_LANGUAGE = "en";

    constructor() {
    }
}