// Commented By Kiran Munjani. not in use for now
//(function (factory) {
//    /* global define */
//    if (typeof define === 'function' && define.amd) {
//        // AMD. Register as an anonymous module.
//        define(['jquery'], factory);
//    } else {
//        // Browser globals: jQuery
//        factory(window.jQuery);
//    }
//}(function ($) {
//    // template
//    var tmpl = $.summernote.renderer.getTemplate();
//    var fieldname = '', parentfieldid = '', list = '', fromlist = '', subfieldname = '', subfromlist = '', tolist = '', subtolist = '';

//    // Getting Fields from system and showing it in from-to fields dropdown list

//    $.ajax({
//        url: "/Core/BindMastersDetails?ServiceName=CORE_FORMULAFIELDS_GET&ColumnRequested=FIELDID,PARENTID,TEXTVALUE",
//        async: false,
//        cache: false,
//        type: 'POST',
//        success: function (data) {
//            if ($(data).find('RESPONSECODE').text() == "0") {
//                if ($(data).find(xmlvars.common_root).text() != '') {

//                    // Parent Main loop
//                    $(data).find('PARENTS').each(function (index) {
//                        if ($(this).find('PARENTID').text() == "0" || $(this).find('PARENTID').text() == "-1") {

//                            if ($(this).find('PARENTID').text() == "0")
//                            { parentfieldid = $(this).find('FIELDID').text(); }

//                            else if ($(this).find('PARENTID').text() == "-1")
//                            { parentfieldid = "-1"; }

//                            list += '<li>' + $(this).find('TEXTVALUE').text();
//                            list += '<ul>';

//                            // Fetching respected parent's child fields
//                            $(data).find('DETAILS').each(function (index) {
//                                if ($(this).find('PARENTID').text() == parentfieldid) {
//                                    list += '<li><a data-event="fieldid" href="javascript:void(0)" data-value="' + $(this).find('TEXTVALUE').text() + '">' + $(this).find('TEXTVALUE').text() + '</a>';
//                                }
//                            });
//                            list += '</ul></li>';
//                        }
//                    });

//                }

//                // replacing dummy id field to to actual control field
//                fromlist = list.replace(/fieldid/gi, "FromFieldsDropdown");
//                tolist = list.replace(/fieldid/gi, "ToFieldsDropdown");
//                list = '';
//            }
//            else
//                notificationMessage('Response', $(data).find('RESPONSEMESSAGE').text(), 'error');
//        },
//        error: function (e) {
//            notificationMessage('Response', 'Operation failed when fetching fields', 'error');
//        }

//    });

//    /**
//     * @class plugin.hello 
//     * 
//     * Hello Plugin  
//     */
//    $.summernote.addPlugin({
//        /** @property {String} name name of plugin */
//        name: 'Fields',
//        /** 
//         * @property {Object} buttons 
//         * @property {Function} buttons.hello   function to make button
//         * @property {Function} buttons.helloDropdown   function to make button
//         * @property {Function} buttons.helloImage   function to make button
//         */
//        buttons: { // buttons

//            FromFieldsDropdown: function (lang, options) {
//                var dropdown = '<ul class="dropdown-menu" style="overflow-y:auto;overflow-x:hidden;max-height:300px;width:300px;">' + fromlist + ' </ul>';

//                return tmpl.iconButton(options.iconPrefix + 'paper-plane', {
//                    title: 'From Fields',
//                    hide: true,
//                    dropdown: dropdown
//                });
//            },
//            ToFieldsDropdown: function (lang, options) {
//                var dropdown = '<ul class="dropdown-menu" style="overflow-y:auto;overflow-x:hidden;max-height:300px;width:300px;">' + tolist + '</ul>';

//                return tmpl.iconButton(options.iconPrefix + 'envelope-o', {
//                    title: 'To Fields',
//                    hide: true,
//                    dropdown: dropdown
//                });
//            },

//        },

//        /**
//         * @property {Object} events 
//         * @property {Function} events.hello  run function when button that has a 'hello' event name  fires click
//         * @property {Function} events.helloDropdown run function when button that has a 'helloDropdown' event name  fires click
//         * @property {Function} events.helloImage run function when button that has a 'helloImage' event name  fires click
//         */
//        events: { // events

//            FromFieldsDropdown: function (event, editor, layoutInfo, value) {
//                // Get current editable node
//                var $editable = layoutInfo.editable();

//                // Call insertText with 'hello'
//                editor.insertText($editable, '{From-' + value + '}');
//                return false;
//            },
//            ToFieldsDropdown: function (event, editor, layoutInfo, value) {
//                // Get current editable node
//                var $editable = layoutInfo.editable();

//                // Call insertText with 'hello'
//                editor.insertText($editable, '{To-' + value + '}');
//                return false;
//            },





//        }
//    });
//}));


