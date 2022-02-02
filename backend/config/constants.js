module.exports = {

   
    EVENT_TYPES: {
        CREATE: "Create",
        READ: "Read",
        UPDATE: "Update",
        DELETE: "Delete",
        ADDING_USER: "Adding User",
        ADDING_FIELD: "Adding Field",
        UPDATE_ERROR: "Error in Update"

    },

    DEFAULTS_FILE_LOCATIONS: {
       

        // ENTITY_ICONS: "../frontend/src/assets/images/sectors"
        // ENTITY_ICONS: "c://fakepath"
        ENTITY_ICONS: "./public"

    },
  

    OBJECT_TYPES: {
        CUSTOMER: 3,
        CONTACT: 1,
        LEAD: 2,
        CAMPAIGN: 4,
       
    },
    ACTIVITY_OBJECT_TYPE:{
        CUSTOMER: 'Customer',
        CONTACT: 'Contact',
        LEAD: 'Lead',
        CAMPAIGN: 'Campaign'

    },

  


    PREFERRED_LANGUAGE: {
        ENGLISH: "en",
        ARABIC: "ar"
    },

}