define(['handlebars'], function(Handlebars) {

this["handlebars"] = this["handlebars"] || {};

this["handlebars"]["editAccount"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form><div><label for=\"emailAddress\">Email Address:</label><input id=\"emailAddress\" name=\"emailAddress\" value=\""
    + alias3(((helper = (helper = helpers.emailAddress || (depth0 != null ? depth0.emailAddress : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"emailAddress","hash":{},"data":data}) : helper)))
    + "\"></div><div><label for=\"password\">Password:</label><input id=\"password\" name=\"password\" value=\"\" type=\"password\"></div><div><label for=\"firstName\">First Name:</label><input id=\"firstName\" name=\"firstName\" value=\""
    + alias3(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + "\"></div><div><label for=\"lastName\">Last Name:</label><input id=\"lastName\" name=\"lastName\" value=\""
    + alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "\"></div><button type=\"button\" data-save-account>Save</button> <button type=\"button\" data-delete-account>Delete</button> <button type=\"button\" data-view-account>Cancel</button></form>";
},"useData":true});

this["handlebars"]["home"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div>HBS Welcome "
    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "! <button class=\"ok\">Ok!</button></div>";
},"useData":true});

this["handlebars"]["home0"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div><button class=\"ok\">Ok!</button></div>";
},"useData":true});

this["handlebars"]["viewAccount"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<form><div>Email Address: "
    + alias3(((helper = (helper = helpers.emailAddress || (depth0 != null ? depth0.emailAddress : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"emailAddress","hash":{},"data":data}) : helper)))
    + "</div><div>First Name:"
    + alias3(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + "</div><div>Last Name:"
    + alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</div><button type=\"button\" data-edit-account>Edit Account</button> <button type=\"button\" data-list-accounts>Return to List</button></form>";
},"useData":true});

this["handlebars"]["viewDrob"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<table id=\"ericg\"><thead><tr><td>Filename</td><td>Size in Bytes</td><td>Uploaded</td><td>Description</td><td>Edit Info</td></tr></thead></table><div data-drobbable>Drop your file here!</div>";
},"useData":true});

return this["handlebars"];

});