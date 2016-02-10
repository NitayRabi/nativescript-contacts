var appModule = require("application");

function User(){
    this.id = "";
    this.name = {
        given: "",
        middle: "",
        family: "",
        prefix: "",
        suffix: "",
        phonetic: {
            first: "",
            middle: "",
            last: ""   
        }
    }
    
    this.jobTitle = "";
    this.nickname = "";
    this.department = "";
    this.organization = "";
    this.notes = "";

    this.phoneNumbers = [];
    this.emailAddresses = [];
    this.postalAddresses = [];
    
    this.initalize = function(contactData){
       if(appModule.ios){
            this.id = getiOSValue("identifier", contactData);
            
            this.name.given = getiOSValue("givenName", contactData);    
            this.name.family = getiOSValue("familyName", contactData);
            this.name.middle = getiOSValue("middleName", contactData);
            this.name.prefix = getiOSValue("namePrefix", contactData);
            this.name.suffix = getiOSValue("nameSuffix", contactData);
            this.name.phonetic.first = getiOSValue("phoneticGivenName", contactData);
            this.name.phonetic.middle = getiOSValue("phoneticMiddleName", contactData);
            this.name.phonetic.last = getiOSValue("phoneticFamilyName", contactData);

            this.jobTitle = getiOSValue("jobTitle", contactData);    
            this.department = getiOSValue("departmentName", contactData);
            this.organization = getiOSValue("organizationName", contactData);
            this.nickname = getiOSValue("nickname", contactData);
            this.notes = getiOSValue("notes", contactData);
            
            if(contactData.phoneNumbers.count > 0){
                for(var i = 0; i < contactData.phoneNumbers.count; i++){
                    var pdata = contactData.phoneNumbers[i];
                    this.phoneNumbers.push(
                        {
                            id: pdata.identifier,
                            label: pdata.label.replace("_$!<","").replace(">!$_",""),
                            value: pdata.value.stringValue
                        });
                }
            }
            
            if(contactData.emailAddresses.count > 0){
                for(var i = 0; i < contactData.emailAddresses.count; i++){
                    var edata = contactData.emailAddresses[i];
                    this.emailAddresses.push(
                        {
                            id: edata.identifier,
                            label: edata.label.replace("_$!<","").replace(">!$_",""),
                            value: edata.value
                        });
                }
            }
            
            if(contactData.postalAddresses.count > 0){
                for(var i = 0; i < contactData.postalAddresses.count; i++){
                    var postaldata = contactData.postalAddresses[i];
                    this.postalAddresses.push(
                        {
                            id: postaldata.identifier,
                            label: postaldata.label.replace("_$!<","").replace(">!$_",""),
                            location: {
                                street: postaldata.value.street,
                                city: postaldata.value.city,
                                state: postaldata.value.state,
                                postalCode: postaldata.value.postalCode,
                                country: postaldata.value.country,
                                countryCode: postaldata.value.ISOCountryCode
                            }
                        });
                }
            }
            

        }
        else if(appModule.android){
            this.id = contactData["_id"];
        }
    }
} 


function getiOSValue(key, contactData){
    return contactData.isKeyAvailable(key) ? contactData[key] : "";
}

module.exports = User;