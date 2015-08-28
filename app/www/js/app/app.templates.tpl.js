define(function(){

this["underscore"] = this["underscore"] || {};

this["underscore"]["home"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>Underscore Welcome' +
((__t = ( name )) == null ? '' : __t) +
'!</div>';

}
return __p
};

  return this["underscore"];

});
